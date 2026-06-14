import "server-only";

export type GoogleSourceStatus = "connected" | "missing_config" | "error";

export interface GoogleSource<T> {
  status: GoogleSourceStatus;
  data?: T;
  message?: string;
}

export interface GoogleAnalyticsSnapshot {
  period: { startDate: string; endDate: string };
  ga4: GoogleSource<{
    sessions: number;
    users: number;
    keyEvents: number;
    events: number;
  }>;
  googleAds: GoogleSource<{
    impressions: number;
    clicks: number;
    conversions: number;
    cost: number;
  }>;
  searchConsole: GoogleSource<{
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
    topQueries: Array<{
      query: string;
      clicks: number;
      impressions: number;
      ctr: number;
      position: number;
    }>;
    topPages: Array<{
      page: string;
      clicks: number;
      impressions: number;
      ctr: number;
      position: number;
    }>;
  }>;
}

interface GoogleApiError {
  error?: {
    message?: string;
  };
}

let accessTokenCache: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (accessTokenCache && accessTokenCache.expiresAt > Date.now() + 60_000) {
    return accessTokenCache.token;
  }

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

  const payload = (await response.json()) as GoogleApiError & {
    access_token?: string;
    expires_in?: number;
  };

  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error?.message ?? "Connexion OAuth Google impossible");
  }

  accessTokenCache = {
    token: payload.access_token,
    expiresAt: Date.now() + (payload.expires_in ?? 3600) * 1000,
  };

  return payload.access_token;
}

async function googleJson<T>(
  url: string,
  accessToken: string,
  init: RequestInit
): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
    cache: "no-store",
  });

  const payload = (await response.json()) as T & GoogleApiError;
  if (!response.ok) {
    throw new Error(payload.error?.message ?? `Erreur Google API ${response.status}`);
  }
  return payload;
}

function metricValue(
  row: { metricValues?: Array<{ value?: string }> } | undefined,
  index: number
) {
  return Number(row?.metricValues?.[index]?.value ?? 0);
}

async function fetchGa4(
  accessToken: string,
  startDate: string,
  endDate: string
): Promise<GoogleAnalyticsSnapshot["ga4"]> {
  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!propertyId) {
    return { status: "missing_config", message: "GA4_PROPERTY_ID manquant" };
  }

  try {
    const report = await googleJson<{
      rows?: Array<{ metricValues?: Array<{ value?: string }> }>;
    }>(
      `https://analyticsdata.googleapis.com/v1beta/properties/${encodeURIComponent(propertyId)}:runReport`,
      accessToken,
      {
        method: "POST",
        body: JSON.stringify({
          dateRanges: [{ startDate, endDate }],
          metrics: [
            { name: "sessions" },
            { name: "totalUsers" },
            { name: "keyEvents" },
            { name: "eventCount" },
          ],
        }),
      }
    );
    const row = report.rows?.[0];
    return {
      status: "connected",
      data: {
        sessions: metricValue(row, 0),
        users: metricValue(row, 1),
        keyEvents: metricValue(row, 2),
        events: metricValue(row, 3),
      },
    };
  } catch (error) {
    return { status: "error", message: errorMessage(error) };
  }
}

async function fetchSearchConsole(
  accessToken: string,
  startDate: string,
  endDate: string
): Promise<GoogleAnalyticsSnapshot["searchConsole"]> {
  const siteUrl = process.env.SEARCH_CONSOLE_SITE_URL;
  if (!siteUrl) {
    return {
      status: "missing_config",
      message: "SEARCH_CONSOLE_SITE_URL manquant",
    };
  }

  try {
    const endpoint = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;
    const [summary, queries, pages] = await Promise.all([
      googleJson<{
        rows?: Array<{
          clicks?: number;
          impressions?: number;
          ctr?: number;
          position?: number;
        }>;
      }>(endpoint, accessToken, {
        method: "POST",
        body: JSON.stringify({ startDate, endDate, type: "web" }),
      }),
      googleJson<{
        rows?: Array<{
          keys?: string[];
          clicks?: number;
          impressions?: number;
          ctr?: number;
          position?: number;
        }>;
      }>(endpoint, accessToken, {
        method: "POST",
        body: JSON.stringify({
          startDate,
          endDate,
          type: "web",
          dimensions: ["query"],
          rowLimit: 5,
        }),
      }),
      googleJson<{
        rows?: Array<{
          keys?: string[];
          clicks?: number;
          impressions?: number;
          ctr?: number;
          position?: number;
        }>;
      }>(endpoint, accessToken, {
        method: "POST",
        body: JSON.stringify({
          startDate,
          endDate,
          type: "web",
          dimensions: ["page"],
          rowLimit: 10,
        }),
      }),
    ]);
    const row = summary.rows?.[0];
    return {
      status: "connected",
      data: {
        clicks: row?.clicks ?? 0,
        impressions: row?.impressions ?? 0,
        ctr: row?.ctr ?? 0,
        position: row?.position ?? 0,
        topQueries: (queries.rows ?? []).map((query) => ({
          query: query.keys?.[0] ?? "",
          clicks: query.clicks ?? 0,
          impressions: query.impressions ?? 0,
          ctr: query.ctr ?? 0,
          position: query.position ?? 0,
        })),
        topPages: (pages.rows ?? []).map((page) => ({
          page: page.keys?.[0] ?? "",
          clicks: page.clicks ?? 0,
          impressions: page.impressions ?? 0,
          ctr: page.ctr ?? 0,
          position: page.position ?? 0,
        })),
      },
    };
  } catch (error) {
    return { status: "error", message: errorMessage(error) };
  }
}

async function fetchGoogleAds(
  accessToken: string,
  startDate: string,
  endDate: string
): Promise<GoogleAnalyticsSnapshot["googleAds"]> {
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID?.replaceAll("-", "");
  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
  if (!customerId || !developerToken) {
    return {
      status: "missing_config",
      message: "Configuration Google Ads incomplete",
    };
  }

  try {
    const version = process.env.GOOGLE_ADS_API_VERSION || "v22";
    const loginCustomerId =
      process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID?.replaceAll("-", "");
    const response = await googleJson<
      Array<{
        results?: Array<{
          metrics?: {
            impressions?: string;
            clicks?: string;
            conversions?: number;
            costMicros?: string;
          };
        }>;
      }>
    >(
      `https://googleads.googleapis.com/${version}/customers/${customerId}:searchStream`,
      accessToken,
      {
        method: "POST",
        headers: {
          "developer-token": developerToken,
          ...(loginCustomerId ? { "login-customer-id": loginCustomerId } : {}),
        },
        body: JSON.stringify({
          query: `
            SELECT
              metrics.impressions,
              metrics.clicks,
              metrics.conversions,
              metrics.cost_micros
            FROM customer
            WHERE segments.date BETWEEN '${startDate}' AND '${endDate}'
          `.replace(/\s+/g, " ").trim(),
        }),
      }
    );

    const metrics = response[0]?.results?.[0]?.metrics;
    return {
      status: "connected",
      data: {
        impressions: Number(metrics?.impressions ?? 0),
        clicks: Number(metrics?.clicks ?? 0),
        conversions: Number(metrics?.conversions ?? 0),
        cost: Number(metrics?.costMicros ?? 0) / 1_000_000,
      },
    };
  } catch (error) {
    return { status: "error", message: errorMessage(error) };
  }
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Erreur Google inconnue";
}

export async function getGoogleAnalyticsSnapshot(
  startDate: string,
  endDate: string
): Promise<GoogleAnalyticsSnapshot> {
  const base: GoogleAnalyticsSnapshot = {
    period: { startDate, endDate },
    ga4: { status: "missing_config" },
    googleAds: { status: "missing_config" },
    searchConsole: { status: "missing_config" },
  };

  try {
    const accessToken = await getAccessToken();
    const [ga4, googleAds, searchConsole] = await Promise.all([
      fetchGa4(accessToken, startDate, endDate),
      fetchGoogleAds(accessToken, startDate, endDate),
      fetchSearchConsole(accessToken, startDate, endDate),
    ]);
    return { ...base, ga4, googleAds, searchConsole };
  } catch (error) {
    const message = errorMessage(error);
    return {
      ...base,
      ga4: { status: "missing_config", message },
      googleAds: { status: "missing_config", message },
      searchConsole: { status: "missing_config", message },
    };
  }
}
