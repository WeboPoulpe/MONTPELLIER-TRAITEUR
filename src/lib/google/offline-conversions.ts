import "server-only";

import { and, desc, eq, isNotNull, ne, or, sql, type SQL } from "drizzle-orm";
import { db } from "@/lib/db";
import { leadSubmissions, type LeadSubmission } from "@/lib/db/schema";

const DEFAULT_CONVERSION_ACTION_NAME = "Demande de devis - import leads site";
const DEFAULT_CURRENCY = "EUR";
const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 200;

type SearchStreamChunk = {
  results?: Array<{
    conversionAction?: {
      resourceName?: string;
      id?: string;
      name?: string;
      type?: string;
      status?: string;
    };
  }>;
};

type UploadMode = "validate" | "upload";

export type OfflineConversionResult = {
  mode: UploadMode;
  status: "ready" | "uploaded" | "blocked" | "error";
  conversionAction?: {
    id: string;
    resourceName: string;
    name: string;
  };
  totalCandidates: number;
  attempted: number;
  uploaded: number;
  failed: number;
  requestId?: string;
  message?: string;
  rows: Array<{
    leadId: string;
    createdAt: string;
    clickIdType: "gclid" | "gbraid" | "wbraid";
    value: number;
    status: "ready" | "uploaded" | "failed";
    error?: string;
  }>;
};

function requireGoogleAdsConfig() {
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID?.replaceAll("-", "");
  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
  const loginCustomerId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID?.replaceAll("-", "");

  if (!customerId || !developerToken) {
    throw new Error("GOOGLE_ADS_CUSTOMER_ID ou GOOGLE_ADS_DEVELOPER_TOKEN manquant");
  }

  return {
    customerId,
    developerToken,
    loginCustomerId,
    version: process.env.GOOGLE_ADS_API_VERSION || "v22",
  };
}

async function getAccessToken() {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Identifiants OAuth Google manquants");
  }

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
    cache: "no-store",
  });

  const payload = (await response.json()) as {
    access_token?: string;
    error?: string;
    error_description?: string;
  };

  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error_description || payload.error || "Connexion OAuth impossible");
  }

  return payload.access_token;
}

function googleAdsHeaders(accessToken: string, config: ReturnType<typeof requireGoogleAdsConfig>) {
  return {
    Authorization: `Bearer ${accessToken}`,
    "developer-token": config.developerToken,
    "Content-Type": "application/json",
    ...(config.loginCustomerId ? { "login-customer-id": config.loginCustomerId } : {}),
  };
}

async function googleAdsPost<T>(
  accessToken: string,
  path: string,
  body: unknown,
  config: ReturnType<typeof requireGoogleAdsConfig>
): Promise<T> {
  const response = await fetch(`https://googleads.googleapis.com/${config.version}/${path}`, {
    method: "POST",
    headers: googleAdsHeaders(accessToken, config),
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const text = await response.text();
  const payload = parseJson(text);

  if (!response.ok) {
    throw new Error(formatGoogleError(response.status, payload, text));
  }

  return payload as T;
}

async function googleAdsSearch(
  accessToken: string,
  query: string,
  config: ReturnType<typeof requireGoogleAdsConfig>
) {
  const chunks = await googleAdsPost<SearchStreamChunk[]>(
    accessToken,
    `customers/${config.customerId}/googleAds:searchStream`,
    { query: query.replace(/\s+/g, " ").trim() },
    config
  );

  return chunks.flatMap((chunk) => chunk.results ?? []);
}

async function ensureConversionAction(accessToken: string, config: ReturnType<typeof requireGoogleAdsConfig>) {
  const configuredActionId = process.env.GOOGLE_ADS_OFFLINE_CONVERSION_ACTION_ID?.trim();
  if (configuredActionId) {
    return {
      id: configuredActionId,
      resourceName: `customers/${config.customerId}/conversionActions/${configuredActionId}`,
      name: process.env.GOOGLE_ADS_OFFLINE_CONVERSION_ACTION_NAME || DEFAULT_CONVERSION_ACTION_NAME,
    };
  }

  const actionName = process.env.GOOGLE_ADS_OFFLINE_CONVERSION_ACTION_NAME || DEFAULT_CONVERSION_ACTION_NAME;
  const escapedName = actionName.replaceAll("'", "\\'");
  const existing = (
    await googleAdsSearch(
      accessToken,
      `
        SELECT
          conversion_action.id,
          conversion_action.name,
          conversion_action.resource_name,
          conversion_action.type,
          conversion_action.status
        FROM conversion_action
        WHERE conversion_action.name = '${escapedName}'
        LIMIT 1
      `,
      config
    )
  )[0]?.conversionAction;

  if (existing?.id && existing.resourceName) {
    return {
      id: existing.id,
      resourceName: existing.resourceName,
      name: existing.name || actionName,
    };
  }

  const created = await googleAdsPost<{ results?: Array<{ resourceName?: string }> }>(
    accessToken,
    `customers/${config.customerId}/conversionActions:mutate`,
    {
      operations: [
        {
          create: {
            name: actionName,
            category: "SUBMIT_LEAD_FORM",
            type: "UPLOAD_CLICKS",
            status: "ENABLED",
            primaryForGoal: true,
            countingType: "MANY_PER_CLICK",
            valueSettings: {
              defaultValue: 1,
              defaultCurrencyCode: DEFAULT_CURRENCY,
              alwaysUseDefaultValue: false,
            },
          },
        },
      ],
    },
    config
  );

  const resourceName = created.results?.[0]?.resourceName;
  const id = resourceName?.split("/").at(-1);
  if (!resourceName || !id) {
    throw new Error("Création de l'action de conversion Google Ads impossible");
  }

  return { id, resourceName, name: actionName };
}

function parseJson(text: string) {
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return {};
  }
}

function formatGoogleError(status: number, payload: unknown, rawText: string) {
  const error = (payload as {
    error?: {
      message?: string;
      status?: string;
      details?: Array<{
        errors?: Array<{
          errorCode?: Record<string, string>;
          message?: string;
        }>;
        fieldViolations?: Array<{
          field?: string;
          description?: string;
          reason?: string;
        }>;
        requestId?: string;
      }>;
    };
  } | null)?.error;

  const detail = error?.details?.find(
    (item) => item.errors?.[0] || item.fieldViolations?.[0] || item.requestId
  );
  const googleError = detail?.errors?.[0];
  const fieldViolation = detail?.fieldViolations?.[0];
  const requestDetail = error?.details?.find((item) => item.requestId);
  const code = googleError?.errorCode
    ? Object.entries(googleError.errorCode)
        .map(([key, value]) => `${key}.${value}`)
        .join(", ")
    : fieldViolation?.reason;

  return [
    `Google API ${status}`,
    error?.status ? `status=${error.status}` : "",
    code ? `code=${code}` : "",
    fieldViolation?.field ? `field=${fieldViolation.field}` : "",
    googleError?.message || fieldViolation?.description || error?.message || rawText.slice(0, 180),
    requestDetail?.requestId ? `requestId=${requestDetail.requestId}` : "",
  ]
    .filter(Boolean)
    .join(" — ");
}

function parseLimit(limit?: number) {
  if (!Number.isInteger(limit) || !limit || limit <= 0) return DEFAULT_LIMIT;
  return Math.min(limit, MAX_LIMIT);
}

function clickId(lead: LeadSubmission) {
  if (lead.gclid) return { type: "gclid" as const, value: lead.gclid };
  if (lead.gbraid) return { type: "gbraid" as const, value: lead.gbraid };
  if (lead.wbraid) return { type: "wbraid" as const, value: lead.wbraid };
  return null;
}

function conversionValue(lead: LeadSubmission) {
  const parsed = Number(String(lead.estimatedValue || "").replace(",", "."));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

async function getCandidateLeads(limit: number, since?: Date) {
  const filters: SQL[] = [
    or(
      isNotNull(leadSubmissions.gclid),
      isNotNull(leadSubmissions.gbraid),
      isNotNull(leadSubmissions.wbraid)
    ) as SQL,
    ne(leadSubmissions.googleAdsConversionStatus, "uploaded"),
  ];

  if (since) {
    filters.push(sql`${leadSubmissions.createdAt} >= ${since}`);
  }

  return db
    .select()
    .from(leadSubmissions)
    .where(and(...filters))
    .orderBy(desc(leadSubmissions.createdAt))
    .limit(limit);
}

async function ingestEvents(accessToken: string, body: unknown) {
  const response = await fetch("https://datamanager.googleapis.com/v1/events:ingest", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const text = await response.text();
  const payload = parseJson(text);

  if (!response.ok) {
    throw new Error(formatGoogleError(response.status, payload, text));
  }

  return payload as { requestId?: string };
}

export async function uploadOfflineLeadConversions(options?: {
  validateOnly?: boolean;
  limit?: number;
  since?: Date;
}): Promise<OfflineConversionResult> {
  const mode: UploadMode = options?.validateOnly === false ? "upload" : "validate";
  const limit = parseLimit(options?.limit);
  const config = requireGoogleAdsConfig();
  const accessToken = await getAccessToken();
  const action = await ensureConversionAction(accessToken, config);
  const leads = await getCandidateLeads(limit, options?.since);

  const rows = leads.flatMap((lead) => {
    const id = clickId(lead);
    if (!id) return [];
    return [
      {
        lead,
        clickIdType: id.type,
        event: {
          destinationReferences: ["lead_import"],
          transactionId: lead.leadId,
          eventTimestamp: lead.createdAt.toISOString(),
          eventSource: "WEB",
          currency: DEFAULT_CURRENCY,
          conversionValue: conversionValue(lead),
          conversionCount: 1,
          adIdentifiers: { [id.type]: id.value },
        },
      },
    ];
  });

  const visibleRows = rows.map(({ lead, clickIdType }) => ({
    leadId: lead.leadId,
    createdAt: lead.createdAt.toISOString(),
    clickIdType,
    value: conversionValue(lead),
    status: mode === "upload" ? ("uploaded" as const) : ("ready" as const),
  }));

  if (rows.length === 0) {
    return {
      mode,
      status: "ready",
      conversionAction: action,
      totalCandidates: leads.length,
      attempted: 0,
      uploaded: 0,
      failed: 0,
      rows: [],
    };
  }

  try {
    const result = await ingestEvents(accessToken, {
      destinations: [
        {
          reference: "lead_import",
          operatingAccount: { accountType: "GOOGLE_ADS", accountId: config.customerId },
          ...(config.loginCustomerId
            ? { loginAccount: { accountType: "GOOGLE_ADS", accountId: config.loginCustomerId } }
            : {}),
          productDestinationId: action.id,
        },
      ],
      events: rows.map((row) => row.event),
      consent: {
        adUserData: "CONSENT_GRANTED",
        adPersonalization: "CONSENT_GRANTED",
      },
      validateOnly: mode === "validate",
    });

    if (mode === "upload") {
      const now = new Date();
      await Promise.all(
        rows.map(({ lead }) =>
          db
            .update(leadSubmissions)
            .set({
              googleAdsConversionStatus: "uploaded",
              googleAdsConversionUploadedAt: now,
              googleAdsConversionAction: action.id,
              googleAdsConversionError: null,
              updatedAt: now,
            })
            .where(eq(leadSubmissions.id, lead.id))
        )
      );
    }

    return {
      mode,
      status: mode === "upload" ? "uploaded" : "ready",
      conversionAction: action,
      totalCandidates: leads.length,
      attempted: rows.length,
      uploaded: mode === "upload" ? rows.length : 0,
      failed: 0,
      requestId: result.requestId,
      rows: visibleRows,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur Data Manager API inconnue";

    if (mode === "upload") {
      const now = new Date();
      await Promise.all(
        rows.map(({ lead }) =>
          db
            .update(leadSubmissions)
            .set({
              googleAdsConversionStatus: "failed",
              googleAdsConversionAction: action.id,
              googleAdsConversionError: message,
              updatedAt: now,
            })
            .where(eq(leadSubmissions.id, lead.id))
        )
      );
    }

    return {
      mode,
      status: "blocked",
      conversionAction: action,
      totalCandidates: leads.length,
      attempted: rows.length,
      uploaded: 0,
      failed: rows.length,
      message,
      rows: visibleRows.map((row) => ({ ...row, status: "failed", error: message })),
    };
  }
}
