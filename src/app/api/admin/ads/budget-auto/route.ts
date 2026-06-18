import { isAuthenticated, unauthorizedResponse } from "@/lib/auth";

type GoogleAdsChunk<T> = { results?: T[] };

type CampaignRow = {
  campaign?: { id?: string; name?: string; status?: string };
  campaignBudget?: { resourceName?: string; amountMicros?: string };
};

type MetricsRow = {
  campaign?: { id?: string };
  segments?: { date?: string };
  metrics?: {
    costMicros?: string;
    conversions?: number;
    clicks?: string;
    searchBudgetLostImpressionShare?: number;
  };
};

const CAMPAIGNS = [
  { id: "21332391109", label: "PMax", useLostBudgetSignal: false },
  { id: "21322235649", label: "Search", useLostBudgetSignal: true },
];

const NEVER_ENABLE_CAMPAIGN_IDS = new Set(["21784047542"]);

const RULES = {
  minBudget: 5,
  maxBudget: 30,
  maxStepUp: 2,
  boostFactor: 1.15,
  reduceFactor: 0.8,
  targetCpa: 25,
  acceptableCpa: 45,
  noConversionSpendDays: 3,
  searchLostBudgetBoost: 0.25,
  monthlyCapPerCampaign: 900,
  monthlyFreezePct: 0.85,
};

async function getAccessToken(): Promise<string> {
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
  const payload = (await response.json()) as { access_token?: string; error?: { message?: string } };
  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error?.message ?? "Connexion OAuth impossible");
  }
  return payload.access_token;
}

async function googleAdsFetch<T>(path: string, body: Record<string, unknown>): Promise<T> {
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID?.replaceAll("-", "");
  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
  const loginCustomerId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID?.replaceAll("-", "");
  const version = process.env.GOOGLE_ADS_API_VERSION || "v22";

  if (!customerId || !developerToken) throw new Error("Configuration Google Ads incomplete");

  const accessToken = await getAccessToken();
  const response = await fetch(`https://googleads.googleapis.com/${version}/customers/${customerId}/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "developer-token": developerToken,
      "Content-Type": "application/json",
      ...(loginCustomerId ? { "login-customer-id": loginCustomerId } : {}),
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;
  if (!response.ok) throw new Error(JSON.stringify(payload));
  return payload as T;
}

async function search<T>(query: string): Promise<T[]> {
  const chunks = await googleAdsFetch<Array<GoogleAdsChunk<T>>>("googleAds:searchStream", {
    query: query.replace(/\s+/g, " ").trim(),
  });
  return chunks.flatMap((chunk) => chunk.results ?? []);
}

function eur(micros: string | number | undefined) {
  return Number(micros || 0) / 1_000_000;
}

function toMicros(amount: number) {
  return String(Math.round(amount * 1_000_000));
}

function iso(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function daysAgo(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return iso(date);
}

function today() {
  return iso(new Date());
}

function firstOfMonth() {
  const date = new Date();
  date.setDate(1);
  return iso(date);
}

function summarize(rows: MetricsRow[]) {
  const cost = rows.reduce((sum, row) => sum + eur(row.metrics?.costMicros), 0);
  const conversions = rows.reduce((sum, row) => sum + Number(row.metrics?.conversions || 0), 0);
  const clicks = rows.reduce((sum, row) => sum + Number(row.metrics?.clicks || 0), 0);
  return { cost, conversions, clicks, cpa: conversions > 0 ? cost / conversions : null };
}

function nextBudget(current: number, action: string) {
  if (action === "BOOST") {
    return Math.min(RULES.maxBudget, Math.round(Math.min(current * RULES.boostFactor, current + RULES.maxStepUp) * 100) / 100);
  }
  if (action === "REDUCE") {
    return Math.max(RULES.minBudget, Math.round(current * RULES.reduceFactor * 100) / 100);
  }
  if (action === "RESET_MIN") return RULES.minBudget;
  return current;
}

function evaluate(input: {
  budget: number;
  monthlySpend: number;
  metrics7d: ReturnType<typeof summarize>;
  lostBudgetShare: number;
  useLostBudgetSignal: boolean;
}) {
  const { budget, monthlySpend, metrics7d, lostBudgetShare, useLostBudgetSignal } = input;
  const monthRatio = monthlySpend / RULES.monthlyCapPerCampaign;

  if (budget < RULES.minBudget) return { action: "RESET_MIN", reason: "budget sous minimum" };
  if (monthRatio >= RULES.monthlyFreezePct && new Date().getDate() < 25) {
    return { action: "HOLD", reason: "plafond mensuel proche" };
  }
  if (metrics7d.conversions === 0 && metrics7d.cost >= budget * RULES.noConversionSpendDays) {
    return { action: budget > RULES.minBudget ? "REDUCE" : "HOLD", reason: "0 conversion avec depense significative sur 7j" };
  }
  if (metrics7d.cpa !== null && metrics7d.cpa > RULES.acceptableCpa) {
    return { action: budget > RULES.minBudget ? "REDUCE" : "HOLD", reason: "CPA 7j trop haut" };
  }
  if (metrics7d.conversions >= 2 && metrics7d.cpa !== null && metrics7d.cpa <= RULES.targetCpa && budget < RULES.maxBudget) {
    return { action: "BOOST", reason: "CPA 7j bon avec au moins 2 conversions" };
  }
  if (
    useLostBudgetSignal &&
    metrics7d.conversions >= 1 &&
    metrics7d.cpa !== null &&
    metrics7d.cpa <= RULES.acceptableCpa &&
    lostBudgetShare > RULES.searchLostBudgetBoost &&
    budget < RULES.maxBudget
  ) {
    return { action: "BOOST", reason: "Search limite par budget avec CPA acceptable" };
  }
  return { action: "HOLD", reason: "signaux neutres ou donnees insuffisantes" };
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) return unauthorizedResponse();

  const url = new URL(request.url);
  const apply = url.searchParams.get("apply") === "1";
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID?.replaceAll("-", "");
  if (!customerId) return Response.json({ status: "error", message: "GOOGLE_ADS_CUSTOMER_ID manquant" }, { status: 400 });

  try {
    const campaignIds = [...CAMPAIGNS.map((campaign) => campaign.id), ...NEVER_ENABLE_CAMPAIGN_IDS].join(", ");
    const campaignRows = await search<CampaignRow>(`
      SELECT campaign.id, campaign.name, campaign.status, campaign_budget.resource_name, campaign_budget.amount_micros
      FROM campaign
      WHERE campaign.id IN (${campaignIds})
    `);
    const rowsById = new Map(campaignRows.map((row) => [row.campaign?.id, row]));
    const blocked = [...NEVER_ENABLE_CAMPAIGN_IDS].map((id) => ({
      id,
      status: rowsById.get(id)?.campaign?.status || "UNKNOWN",
    }));

    const operations = [];
    const decisions = [];

    for (const campaign of CAMPAIGNS) {
      const row = rowsById.get(campaign.id);
      if (!row || row.campaign?.status !== "ENABLED") {
        decisions.push({ campaign: campaign.label, action: "SKIP", reason: `statut ${row?.campaign?.status || "introuvable"}` });
        continue;
      }

      const budget = eur(row.campaignBudget?.amountMicros);
      const metricsRows = await search<MetricsRow>(`
        SELECT segments.date, metrics.cost_micros, metrics.conversions, metrics.clicks
        FROM campaign
        WHERE campaign.id = ${campaign.id}
          AND segments.date BETWEEN '${daysAgo(7)}' AND '${today()}'
      `);
      const monthlyRows = await search<MetricsRow>(`
        SELECT metrics.cost_micros
        FROM campaign
        WHERE campaign.id = ${campaign.id}
          AND segments.date BETWEEN '${firstOfMonth()}' AND '${today()}'
      `);
      const lostRows = campaign.useLostBudgetSignal
        ? await search<MetricsRow>(`
            SELECT metrics.search_budget_lost_impression_share
            FROM campaign
            WHERE campaign.id = ${campaign.id}
              AND segments.date DURING LAST_7_DAYS
          `)
        : [];
      const lostValues = lostRows.map((lostRow) => Number(lostRow.metrics?.searchBudgetLostImpressionShare || 0));
      const lostBudgetShare = lostValues.length ? lostValues.reduce((sum, value) => sum + value, 0) / lostValues.length : 0;
      const metrics7d = summarize(metricsRows);
      const monthlySpend = monthlyRows.reduce((sum, monthlyRow) => sum + eur(monthlyRow.metrics?.costMicros), 0);
      const decision = evaluate({
        budget,
        monthlySpend,
        metrics7d,
        lostBudgetShare,
        useLostBudgetSignal: campaign.useLostBudgetSignal,
      });
      const budgetAfter = nextBudget(budget, decision.action);

      decisions.push({
        campaign: campaign.label,
        campaignId: campaign.id,
        budgetBefore: budget,
        budgetAfter,
        ...decision,
        metrics7d,
        monthlySpend,
        lostBudgetShare,
      });

      if (budgetAfter !== budget && row.campaignBudget?.resourceName) {
        operations.push({
          update: {
            resourceName: row.campaignBudget.resourceName,
            amountMicros: toMicros(budgetAfter),
          },
          updateMask: "amount_micros",
        });
      }
    }

    const mutation =
      apply && operations.length > 0
        ? await googleAdsFetch("campaignBudgets:mutate", { operations })
        : null;

    return Response.json({
      status: "ok",
      mode: apply ? "apply" : "dry_run",
      rules: RULES,
      blockedCampaigns: blocked,
      operationsCount: operations.length,
      decisions,
      mutation,
    });
  } catch (error) {
    return Response.json(
      { status: "error", message: error instanceof Error ? error.message : "Erreur inconnue" },
      { status: 500 },
    );
  }
}
