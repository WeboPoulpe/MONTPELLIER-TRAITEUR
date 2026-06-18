#!/usr/bin/env node
/**
 * Budget auto-ajuste — Google Ads Traiteur Montpellier
 *
 * Usage:
 *   npm run ads:budget-auto             -> simulation
 *   npm run ads:budget-auto -- --apply  -> applique les changements
 *
 * Objectif:
 *   - Demarrer a 5 EUR/jour par campagne active.
 *   - Augmenter progressivement jusqu'a 30 EUR/jour max si les resultats suivent.
 *   - Ne jamais relancer la campagne Search-2 pausee.
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";

const DRY_RUN = !process.argv.includes("--apply");
const LOG_FILE = "scripts/budget-auto-log.json";

const CAMPAIGNS = [
  {
    id: "21332391109",
    label: "PMax",
    name: "Website traffic-Performance Max-1",
    useLostBudgetSignal: false,
  },
  {
    id: "21322235649",
    label: "Search",
    name: "Website traffic-Search-1",
    useLostBudgetSignal: true,
  },
];

const NEVER_ENABLE_CAMPAIGN_IDS = new Set([
  "21784047542", // Website traffic-Search-2
]);

const RULES = {
  BUDGET_MIN_EUR: 5,
  BUDGET_MAX_EUR: 30,
  MAX_STEP_UP_EUR: 2,
  BOOST_FACTOR: 1.15,
  REDUCE_FACTOR: 0.8,
  TARGET_CPA_EUR: 25,
  ACCEPTABLE_CPA_EUR: 45,
  NO_CONVERSION_SPEND_DAYS: 3,
  SEARCH_LOST_BUDGET_BOOST: 0.25,
  MONTHLY_CAP_PER_CAMPAIGN_EUR: 900,
  MONTHLY_FREEZE_PCT: 0.85,
};

function loadEnv(path) {
  try {
    for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
      if (!line || line.startsWith("#") || !line.includes("=")) continue;
      const index = line.indexOf("=");
      const key = line.slice(0, index).trim();
      let value = line.slice(index + 1).trim();
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // Optional env file.
  }
}

loadEnv(".env.google");
loadEnv(".env.local");
loadEnv(".env.production");

const {
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET,
  GOOGLE_OAUTH_REFRESH_TOKEN,
  GOOGLE_ADS_CUSTOMER_ID,
  GOOGLE_ADS_LOGIN_CUSTOMER_ID,
  GOOGLE_ADS_DEVELOPER_TOKEN,
} = process.env;

const GOOGLE_ADS_API_VERSION = process.env.GOOGLE_ADS_API_VERSION || "v22";
const CUSTOMER_ID = GOOGLE_ADS_CUSTOMER_ID?.replaceAll("-", "");

function requireEnv() {
  const missing = [];
  for (const [key, value] of Object.entries({
    GOOGLE_OAUTH_CLIENT_ID,
    GOOGLE_OAUTH_CLIENT_SECRET,
    GOOGLE_OAUTH_REFRESH_TOKEN,
    GOOGLE_ADS_CUSTOMER_ID,
    GOOGLE_ADS_DEVELOPER_TOKEN,
  })) {
    if (!value) missing.push(key);
  }
  if (missing.length) {
    throw new Error(`Variables manquantes: ${missing.join(", ")}. Ajouter .env.google ou exporter les variables.`);
  }
}

async function getAccessToken() {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: GOOGLE_OAUTH_CLIENT_ID,
      client_secret: GOOGLE_OAUTH_CLIENT_SECRET,
      refresh_token: GOOGLE_OAUTH_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });
  const payload = await response.json();
  if (!payload.access_token) throw new Error(`OAuth failed: ${JSON.stringify(payload)}`);
  return payload.access_token;
}

function apiHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    "developer-token": GOOGLE_ADS_DEVELOPER_TOKEN,
    "Content-Type": "application/json",
    ...(GOOGLE_ADS_LOGIN_CUSTOMER_ID
      ? { "login-customer-id": GOOGLE_ADS_LOGIN_CUSTOMER_ID.replaceAll("-", "") }
      : {}),
  };
}

async function searchStream(token, query) {
  const response = await fetch(
    `https://googleads.googleapis.com/${GOOGLE_ADS_API_VERSION}/customers/${CUSTOMER_ID}/googleAds:searchStream`,
    {
      method: "POST",
      headers: apiHeaders(token),
      body: JSON.stringify({ query: query.replace(/\s+/g, " ").trim() }),
    },
  );
  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;
  if (!response.ok || !Array.isArray(payload)) {
    throw new Error(`Google Ads search failed: ${JSON.stringify(payload)}`);
  }
  return payload.flatMap((chunk) => chunk.results || []);
}

async function mutate(token, resource, operations) {
  const response = await fetch(
    `https://googleads.googleapis.com/${GOOGLE_ADS_API_VERSION}/customers/${CUSTOMER_ID}/${resource}:mutate`,
    {
      method: "POST",
      headers: apiHeaders(token),
      body: JSON.stringify({ operations }),
    },
  );
  const payload = await response.json();
  if (!response.ok || payload.error) {
    throw new Error(`${resource}: ${JSON.stringify(payload.error || payload)}`);
  }
  return payload;
}

function eur(micros) {
  return Number(micros || 0) / 1_000_000;
}

function toMicros(amount) {
  return Math.round(amount * 1_000_000);
}

function fmt(amount) {
  return `${amount.toFixed(2)} EUR`;
}

function isoDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function today() {
  return isoDate(new Date());
}

function daysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return isoDate(date);
}

function firstOfMonth() {
  const date = new Date();
  date.setDate(1);
  return isoDate(date);
}

function loadLog() {
  if (!existsSync(LOG_FILE)) return [];
  try {
    return JSON.parse(readFileSync(LOG_FILE, "utf8"));
  } catch {
    return [];
  }
}

function saveLog(entries) {
  writeFileSync(LOG_FILE, JSON.stringify(entries, null, 2));
}

async function getCampaignRows(token) {
  const ids = [...CAMPAIGNS.map((campaign) => campaign.id), ...NEVER_ENABLE_CAMPAIGN_IDS].join(", ");
  return searchStream(token, `
    SELECT
      campaign.id,
      campaign.name,
      campaign.status,
      campaign.serving_status,
      campaign.advertising_channel_type,
      campaign_budget.resource_name,
      campaign_budget.amount_micros
    FROM campaign
    WHERE campaign.id IN (${ids})
  `);
}

async function getDailyMetrics(token, campaignId, days) {
  const rows = await searchStream(token, `
    SELECT
      segments.date,
      metrics.impressions,
      metrics.clicks,
      metrics.cost_micros,
      metrics.conversions
    FROM campaign
    WHERE campaign.id = ${campaignId}
      AND segments.date BETWEEN '${daysAgo(days)}' AND '${today()}'
    ORDER BY segments.date DESC
  `);
  return rows.map((row) => ({
    date: row.segments?.date,
    impressions: Number(row.metrics?.impressions || 0),
    clicks: Number(row.metrics?.clicks || 0),
    cost: eur(row.metrics?.costMicros),
    conversions: Number(row.metrics?.conversions || 0),
  }));
}

async function getLostBudgetShare(token, campaignId) {
  const rows = await searchStream(token, `
    SELECT
      metrics.search_budget_lost_impression_share,
      metrics.search_impression_share
    FROM campaign
    WHERE campaign.id = ${campaignId}
      AND segments.date DURING LAST_7_DAYS
  `);
  const values = rows
    .map((row) => Number(row.metrics?.searchBudgetLostImpressionShare || 0))
    .filter((value) => Number.isFinite(value));
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

async function getMonthlySpend(token, campaignId) {
  const rows = await searchStream(token, `
    SELECT metrics.cost_micros
    FROM campaign
    WHERE campaign.id = ${campaignId}
      AND segments.date BETWEEN '${firstOfMonth()}' AND '${today()}'
  `);
  return rows.reduce((sum, row) => sum + eur(row.metrics?.costMicros), 0);
}

function summarize(days) {
  const cost = days.reduce((sum, day) => sum + day.cost, 0);
  const conversions = days.reduce((sum, day) => sum + day.conversions, 0);
  const clicks = days.reduce((sum, day) => sum + day.clicks, 0);
  return {
    cost,
    conversions,
    clicks,
    cpa: conversions > 0 ? cost / conversions : null,
  };
}

function nextBudget(current, action) {
  if (action === "BOOST") {
    const boosted = Math.min(current * RULES.BOOST_FACTOR, current + RULES.MAX_STEP_UP_EUR);
    return Math.min(RULES.BUDGET_MAX_EUR, Math.round(boosted * 100) / 100);
  }
  if (action === "REDUCE") {
    const reduced = current * RULES.REDUCE_FACTOR;
    return Math.max(RULES.BUDGET_MIN_EUR, Math.round(reduced * 100) / 100);
  }
  if (action === "RESET_MIN") return RULES.BUDGET_MIN_EUR;
  return current;
}

function evaluateCampaign({ campaign, budget, dailyMetrics, monthlySpend, lostBudgetShare }) {
  const last3 = summarize(dailyMetrics.slice(0, 3));
  const last7 = summarize(dailyMetrics);
  const monthRatio = monthlySpend / RULES.MONTHLY_CAP_PER_CAMPAIGN_EUR;

  if (budget < RULES.BUDGET_MIN_EUR) {
    return {
      action: "RESET_MIN",
      reason: `budget sous minimum (${fmt(budget)} < ${fmt(RULES.BUDGET_MIN_EUR)})`,
      last3,
      last7,
      monthlySpend,
    };
  }

  if (monthRatio >= RULES.MONTHLY_FREEZE_PCT && new Date().getDate() < 25) {
    return {
      action: "HOLD",
      reason: `plafond mensuel proche (${fmt(monthlySpend)} / ${fmt(RULES.MONTHLY_CAP_PER_CAMPAIGN_EUR)})`,
      last3,
      last7,
      monthlySpend,
    };
  }

  const noConversionSpendLimit = budget * RULES.NO_CONVERSION_SPEND_DAYS;
  if (last7.conversions === 0 && last7.cost >= noConversionSpendLimit) {
    return {
      action: budget > RULES.BUDGET_MIN_EUR ? "REDUCE" : "HOLD",
      reason: `0 conversion pour ${fmt(last7.cost)} depenses sur 7j`,
      last3,
      last7,
      monthlySpend,
    };
  }

  if (last7.cpa !== null && last7.cpa > RULES.ACCEPTABLE_CPA_EUR) {
    return {
      action: budget > RULES.BUDGET_MIN_EUR ? "REDUCE" : "HOLD",
      reason: `CPA 7j trop haut (${fmt(last7.cpa)} > ${fmt(RULES.ACCEPTABLE_CPA_EUR)})`,
      last3,
      last7,
      monthlySpend,
    };
  }

  if (
    last7.conversions >= 2 &&
    last7.cpa !== null &&
    last7.cpa <= RULES.TARGET_CPA_EUR &&
    budget < RULES.BUDGET_MAX_EUR
  ) {
    return {
      action: "BOOST",
      reason: `CPA 7j bon (${fmt(last7.cpa)} <= ${fmt(RULES.TARGET_CPA_EUR)}) avec ${last7.conversions.toFixed(1)} conversions`,
      last3,
      last7,
      monthlySpend,
    };
  }

  if (
    campaign.useLostBudgetSignal &&
    last7.conversions >= 1 &&
    last7.cpa !== null &&
    last7.cpa <= RULES.ACCEPTABLE_CPA_EUR &&
    lostBudgetShare > RULES.SEARCH_LOST_BUDGET_BOOST &&
    budget < RULES.BUDGET_MAX_EUR
  ) {
    return {
      action: "BOOST",
      reason: `Search limite par budget (${(lostBudgetShare * 100).toFixed(1)}% perdu) avec CPA acceptable (${fmt(last7.cpa)})`,
      last3,
      last7,
      monthlySpend,
    };
  }

  return {
    action: "HOLD",
    reason: "signaux insuffisants ou dans la zone neutre",
    last3,
    last7,
    monthlySpend,
  };
}

function printSummary(label, budget, decision, newBudget, lostBudgetShare) {
  console.log(`\n--- ${label} ---`);
  console.log(`Budget actuel     : ${fmt(budget)}/jour`);
  console.log(`Depense 7j        : ${fmt(decision.last7.cost)}`);
  console.log(`Conversions 7j    : ${decision.last7.conversions.toFixed(1)}`);
  console.log(`CPA 7j            : ${decision.last7.cpa === null ? "-" : fmt(decision.last7.cpa)}`);
  console.log(`Depense mois      : ${fmt(decision.monthlySpend)}`);
  if (lostBudgetShare !== null) console.log(`IS perdue budget  : ${(lostBudgetShare * 100).toFixed(1)}%`);
  console.log(`Decision          : ${decision.action} - ${decision.reason}`);
  if (newBudget !== budget) console.log(`Nouveau budget    : ${fmt(newBudget)}/jour`);
}

async function main() {
  requireEnv();

  console.log(`\nBudget Auto Traiteur Montpellier ${DRY_RUN ? "(simulation)" : "(application)"}`);
  console.log(`Date: ${today()}`);
  console.log(`Regles: min ${fmt(RULES.BUDGET_MIN_EUR)}, max ${fmt(RULES.BUDGET_MAX_EUR)}, hausse max ${fmt(RULES.MAX_STEP_UP_EUR)} par passage`);
  console.log("Search-2 reste exclue et ne sera jamais activee par ce script.\n");

  const log = loadLog();
  const todayLog = log.find((entry) => entry.date === today() && entry.applied);
  if (todayLog && !DRY_RUN) {
    console.log("Une action budget a deja ete appliquee aujourd'hui. Relancer demain ou en simulation.");
    return;
  }

  const token = await getAccessToken();
  const rows = await getCampaignRows(token);
  const rowsById = new Map(rows.map((row) => [row.campaign?.id, row]));

  for (const blockedId of NEVER_ENABLE_CAMPAIGN_IDS) {
    const row = rowsById.get(blockedId);
    if (row?.campaign?.status !== "PAUSED") {
      console.log(`ALERTE: campagne exclue ${blockedId} statut=${row?.campaign?.status || "inconnu"}. Le script ne la modifie pas.`);
    }
  }

  const operations = [];
  const decisions = [];

  for (const campaign of CAMPAIGNS) {
    const row = rowsById.get(campaign.id);
    if (!row) {
      console.log(`Campagne introuvable: ${campaign.label} (${campaign.id})`);
      continue;
    }
    if (row.campaign?.status !== "ENABLED") {
      console.log(`Campagne ignoree car non active: ${campaign.label} statut=${row.campaign?.status}`);
      continue;
    }

    const budgetResource = row.campaignBudget?.resourceName;
    const budget = eur(row.campaignBudget?.amountMicros);
    if (!budgetResource) throw new Error(`Budget introuvable pour ${campaign.label}`);

    const [dailyMetrics, monthlySpend, lostBudgetShare] = await Promise.all([
      getDailyMetrics(token, campaign.id, 7),
      getMonthlySpend(token, campaign.id),
      campaign.useLostBudgetSignal ? getLostBudgetShare(token, campaign.id) : Promise.resolve(null),
    ]);
    const decision = evaluateCampaign({ campaign, budget, dailyMetrics, monthlySpend, lostBudgetShare: lostBudgetShare || 0 });
    const newBudget = nextBudget(budget, decision.action);

    printSummary(campaign.label, budget, decision, newBudget, lostBudgetShare);

    decisions.push({
      campaign: campaign.label,
      campaignId: campaign.id,
      action: decision.action,
      reason: decision.reason,
      budgetBefore: budget,
      budgetAfter: newBudget,
      metrics7d: decision.last7,
      monthlySpend: decision.monthlySpend,
    });

    if (newBudget !== budget) {
      operations.push({
        update: {
          resourceName: budgetResource,
          amountMicros: String(toMicros(newBudget)),
        },
        updateMask: "amount_micros",
      });
    }
  }

  if (!operations.length) {
    console.log("\nAucune modification budget necessaire.");
  } else if (DRY_RUN) {
    console.log("\nSimulation uniquement. Relancer avec `npm run ads:budget-auto -- --apply` pour appliquer.");
  } else {
    console.log("\nApplication des budgets...");
    const result = await mutate(token, "campaignBudgets", operations);
    console.log(JSON.stringify(result, null, 2));
  }

  log.push({
    date: today(),
    dryRun: DRY_RUN,
    applied: !DRY_RUN && operations.length > 0,
    decisions,
  });
  saveLog(log.slice(-60));
  console.log(`\nLog: ${LOG_FILE}\n`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
