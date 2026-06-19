import { and, desc, eq, gte, isNotNull, lte, or, type SQL } from "drizzle-orm";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { leadSubmissions } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

const MAX_LIMIT = 200;
const DEFAULT_LIMIT = 100;

function jsonResponse(body: unknown, init?: ResponseInit) {
  return Response.json(body, {
    ...init,
    headers: {
      "Cache-Control": "no-store",
      ...(init?.headers ?? {}),
    },
  });
}

function isAuthorized(request: NextRequest) {
  const expectedToken = process.env.LOVABLE_LEADS_API_TOKEN;
  if (!expectedToken) return false;

  const bearer = request.headers.get("authorization");
  const headerToken = request.headers.get("x-lovable-token");
  const token = bearer?.startsWith("Bearer ")
    ? bearer.slice("Bearer ".length)
    : headerToken;

  return token === expectedToken;
}

function parseLimit(value: string | null) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) return DEFAULT_LIMIT;
  return Math.min(parsed, MAX_LIMIT);
}

function parseOffset(value: string | null) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 0) return 0;
  return parsed;
}

function parseDate(value: string | null, endOfDay = false) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  if (endOfDay && value.length <= 10) {
    date.setUTCHours(23, 59, 59, 999);
  }
  return date;
}

function readFormValue(formData: unknown, key: string) {
  if (!formData || typeof formData !== "object") return null;
  const value = (formData as Record<string, unknown>)[key];
  if (typeof value === "string") return value;
  if (typeof value === "number") return value;
  if (typeof value === "boolean") return value;
  return null;
}

function hasClickId(lead: {
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
}) {
  return Boolean(lead.gclid || lead.gbraid || lead.wbraid);
}

export async function GET(request: NextRequest) {
  if (!process.env.LOVABLE_LEADS_API_TOKEN) {
    return jsonResponse(
      { error: "LOVABLE_LEADS_API_TOKEN is not configured" },
      { status: 503 }
    );
  }

  if (!isAuthorized(request)) {
    return jsonResponse({ error: "Non autorisé" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const limit = parseLimit(searchParams.get("limit"));
  const offset = parseOffset(searchParams.get("offset"));
  const since = parseDate(searchParams.get("since"));
  const until = parseDate(searchParams.get("until"), true);
  const status = searchParams.get("status");
  const source = searchParams.get("source");
  const campaign = searchParams.get("campaign");
  const onlyWithClickId = searchParams.get("has_click_id") === "true";

  const filters: SQL[] = [];
  if (since) filters.push(gte(leadSubmissions.createdAt, since));
  if (until) filters.push(lte(leadSubmissions.createdAt, until));
  if (status) filters.push(eq(leadSubmissions.status, status));
  if (source) filters.push(eq(leadSubmissions.utmSource, source));
  if (campaign) filters.push(eq(leadSubmissions.utmCampaign, campaign));
  if (onlyWithClickId) {
    filters.push(
      or(
        isNotNull(leadSubmissions.gclid),
        isNotNull(leadSubmissions.gbraid),
        isNotNull(leadSubmissions.wbraid)
      ) as SQL
    );
  }

  const whereClause = filters.length > 0 ? and(...filters) : undefined;

  const leads = whereClause
    ? await db
        .select()
        .from(leadSubmissions)
        .where(whereClause)
        .orderBy(desc(leadSubmissions.createdAt))
        .limit(limit)
        .offset(offset)
    : await db
        .select()
        .from(leadSubmissions)
        .orderBy(desc(leadSubmissions.createdAt))
        .limit(limit)
        .offset(offset);

  return jsonResponse({
    data: leads.map((lead) => {
      const clickIdAvailable = hasClickId(lead);
      return {
        lead_id: lead.leadId,
        created_at: lead.createdAt.toISOString(),
        first_name: lead.firstName,
        last_name: lead.lastName,
        full_name: `${lead.firstName} ${lead.lastName}`.trim(),
        company: lead.company,
        email: lead.email,
        phone: lead.phone,
        event_type: lead.eventType,
        event_date: lead.eventDate,
        event_city: lead.eventCity,
        event_postal_code: lead.eventPostalCode,
        guest_count: readFormValue(lead.formData, "guestCount"),
        estimated_value: lead.estimatedValue,
        utm_source: lead.utmSource,
        utm_medium: lead.utmMedium,
        utm_campaign: lead.utmCampaign,
        utm_content: lead.utmContent,
        utm_term: lead.utmTerm,
        gclid: lead.gclid,
        gbraid: lead.gbraid,
        wbraid: lead.wbraid,
        fbclid: lead.fbclid,
        click_id_available: clickIdAvailable,
        landing_page: lead.landingPage,
        referrer: lead.referrer,
        crm_success: lead.crmSuccess,
        crm_status: lead.crmStatus,
        email_sent: lead.emailSent,
        status: lead.status,
        conversion: {
          type: "Demande de devis",
          currency: "EUR",
          value: lead.estimatedValue,
          status: clickIdAvailable ? "a_envoyer" : "ignore",
          reason: clickIdAvailable
            ? null
            : "Aucun gclid, gbraid ou wbraid disponible",
        },
        form_data: lead.formData,
        updated_at: lead.updatedAt.toISOString(),
      };
    }),
    pagination: {
      limit,
      offset,
      next_offset: leads.length === limit ? offset + limit : null,
    },
    filters: {
      since: since?.toISOString() ?? null,
      until: until?.toISOString() ?? null,
      status,
      source,
      campaign,
      has_click_id: onlyWithClickId,
    },
  });
}
