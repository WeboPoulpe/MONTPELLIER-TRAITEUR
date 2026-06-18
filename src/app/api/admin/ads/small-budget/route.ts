import { isAuthenticated, unauthorizedResponse } from "@/lib/auth";

type GoogleAdsChunk<T> = { results?: T[] };

type KeywordRow = {
  campaign?: { id?: string; name?: string };
  adGroup?: { id?: string; name?: string; resourceName?: string };
  adGroupCriterion?: {
    resourceName?: string;
    status?: string;
    keyword?: { text?: string; matchType?: string };
  };
};

type CampaignBudgetRow = {
  campaign?: { id?: string; name?: string; status?: string };
  campaignBudget?: { resourceName?: string; amountMicros?: string };
};

type NegativeRow = {
  campaign?: { id?: string; name?: string };
  campaignCriterion?: {
    negative?: boolean;
    keyword?: { text?: string; matchType?: string };
  };
};

const SEARCH_CAMPAIGN_ID = "21322235649";
const PMAX_CAMPAIGN_ID = "21332391109";
const DAILY_BUDGET_MICROS = "5000000";

const KEYWORDS_TO_KEEP = [
  { text: "traiteur montpellier", matchType: "EXACT" },
  { text: "traiteur montpellier", matchType: "PHRASE" },
  { text: "traiteur entreprise montpellier", matchType: "PHRASE" },
  { text: "traiteur evenementiel montpellier", matchType: "PHRASE" },
  { text: "traiteur mariage montpellier", matchType: "PHRASE" },
  { text: "buffet traiteur montpellier", matchType: "PHRASE" },
];

const NEGATIVE_KEYWORDS = [
  "restaurant",
  "a emporter",
  "à emporter",
  "food truck",
  "paella",
  "italien",
  "libanais",
  "cabiron",
  "chef jean",
  "germain traiteur",
  "table de cana",
  "baldassarre",
  "croq gourmet",
  "parguel",
  "dufour",
  "halles castellane",
  "mechoui",
];

function normalizeKeyword(text: string | undefined) {
  return (text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function keywordKey(text: string | undefined, matchType: string | undefined) {
  return `${normalizeKeyword(text)}|${matchType || ""}`;
}

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

async function googleAdsFetch<T>(
  path: string,
  body: Record<string, unknown>,
): Promise<T> {
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID?.replaceAll("-", "");
  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
  const loginCustomerId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID?.replaceAll("-", "");
  const version = process.env.GOOGLE_ADS_API_VERSION || "v22";

  if (!customerId || !developerToken) {
    throw new Error("Configuration Google Ads incomplete");
  }

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
  if (!response.ok) {
    throw new Error(JSON.stringify(payload));
  }

  return payload as T;
}

async function search<T>(query: string): Promise<T[]> {
  const chunks = await googleAdsFetch<Array<GoogleAdsChunk<T>>>("googleAds:searchStream", {
    query: query.replace(/\s+/g, " ").trim(),
  });
  return chunks.flatMap((chunk) => chunk.results ?? []);
}

export async function POST() {
  if (!(await isAuthenticated())) return unauthorizedResponse();

  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID?.replaceAll("-", "");
  if (!customerId) {
    return Response.json({ status: "error", message: "GOOGLE_ADS_CUSTOMER_ID manquant" }, { status: 400 });
  }

  try {
    const [keywordRows, budgetRows, negativeRows] = await Promise.all([
      search<KeywordRow>(`
        SELECT
          campaign.id,
          campaign.name,
          ad_group.id,
          ad_group.name,
          ad_group.resource_name,
          ad_group_criterion.resource_name,
          ad_group_criterion.status,
          ad_group_criterion.keyword.text,
          ad_group_criterion.keyword.match_type
        FROM keyword_view
        WHERE campaign.id = ${SEARCH_CAMPAIGN_ID}
          AND ad_group_criterion.type = 'KEYWORD'
      `),
      search<CampaignBudgetRow>(`
        SELECT
          campaign.id,
          campaign.name,
          campaign.status,
          campaign_budget.resource_name,
          campaign_budget.amount_micros
        FROM campaign
        WHERE campaign.id IN (${SEARCH_CAMPAIGN_ID}, ${PMAX_CAMPAIGN_ID})
      `),
      search<NegativeRow>(`
        SELECT
          campaign.id,
          campaign.name,
          campaign_criterion.negative,
          campaign_criterion.keyword.text,
          campaign_criterion.keyword.match_type
        FROM campaign_criterion
        WHERE campaign.id = ${SEARCH_CAMPAIGN_ID}
          AND campaign_criterion.negative = true
      `),
    ]);

    const searchAdGroup = keywordRows.find((row) => row.adGroup?.resourceName)?.adGroup;
    if (!searchAdGroup?.resourceName) {
      throw new Error("Ad group Search-1 introuvable");
    }

    const existingKeywords = new Map(
      keywordRows.map((row) => [
        keywordKey(row.adGroupCriterion?.keyword?.text, row.adGroupCriterion?.keyword?.matchType),
        row,
      ]),
    );

    const adGroupCriterionOperations = [];
    for (const row of keywordRows) {
      const criterion = row.adGroupCriterion;
      if (
        criterion?.resourceName &&
        criterion.status === "ENABLED" &&
        criterion.keyword?.matchType === "BROAD"
      ) {
        adGroupCriterionOperations.push({
          update: { resourceName: criterion.resourceName, status: "PAUSED" },
          updateMask: "status",
        });
      }
    }

    for (const keyword of KEYWORDS_TO_KEEP) {
      const existing = existingKeywords.get(keywordKey(keyword.text, keyword.matchType));
      if (existing?.adGroupCriterion?.resourceName) {
        if (existing.adGroupCriterion.status === "PAUSED") {
          adGroupCriterionOperations.push({
            update: { resourceName: existing.adGroupCriterion.resourceName, status: "ENABLED" },
            updateMask: "status",
          });
        }
        continue;
      }
      adGroupCriterionOperations.push({
        create: {
          adGroup: searchAdGroup.resourceName,
          status: "ENABLED",
          keyword: {
            text: keyword.text,
            matchType: keyword.matchType,
          },
        },
      });
    }

    const existingNegatives = new Set(
      negativeRows.map((row) => keywordKey(row.campaignCriterion?.keyword?.text, "PHRASE")),
    );
    const negativeOperations = NEGATIVE_KEYWORDS
      .filter((text) => !existingNegatives.has(keywordKey(text, "PHRASE")))
      .map((text) => ({
        create: {
          campaign: `customers/${customerId}/campaigns/${SEARCH_CAMPAIGN_ID}`,
          negative: true,
          keyword: { text, matchType: "PHRASE" },
        },
      }));

    const budgetOperations = budgetRows
      .filter((row) => row.campaignBudget?.resourceName)
      .filter((row) => String(row.campaignBudget?.amountMicros || "") !== DAILY_BUDGET_MICROS)
      .map((row) => ({
        update: {
          resourceName: row.campaignBudget?.resourceName,
          amountMicros: DAILY_BUDGET_MICROS,
        },
        updateMask: "amount_micros",
      }));

    const results: Record<string, unknown> = {};
    if (adGroupCriterionOperations.length > 0) {
      results.adGroupCriteria = await googleAdsFetch("adGroupCriteria:mutate", {
        operations: adGroupCriterionOperations,
        partialFailure: false,
      });
    }

    if (negativeOperations.length > 0) {
      results.campaignCriteria = await googleAdsFetch("campaignCriteria:mutate", {
        operations: negativeOperations,
        partialFailure: false,
      });
    }

    if (budgetOperations.length > 0) {
      results.campaignBudgets = await googleAdsFetch("campaignBudgets:mutate", {
        operations: budgetOperations,
        partialFailure: false,
      });
    }

    return Response.json({
      status: "ok",
      budgetMicros: DAILY_BUDGET_MICROS,
      pausedBroadKeywords: adGroupCriterionOperations.filter((operation) => "update" in operation).length,
      addedOrEnabledKeywords: KEYWORDS_TO_KEEP,
      addedNegatives: negativeOperations.map((operation) => operation.create.keyword.text),
      updatedBudgets: budgetOperations.length,
      results,
    });
  } catch (error) {
    return Response.json(
      { status: "error", message: error instanceof Error ? error.message : "Erreur inconnue" },
      { status: 500 },
    );
  }
}
