import { isAuthenticated, unauthorizedResponse } from "@/lib/auth";

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

  const payload = (await response.json()) as { access_token?: string; error?: { message?: string } };
  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error?.message ?? "Connexion OAuth impossible");
  }
  return payload.access_token;
}

async function analyticsAdmin<T>(path: string, accessToken: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`https://analyticsadmin.googleapis.com/v1beta/${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });
  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;
  if (!response.ok) throw new Error(JSON.stringify(payload));
  return payload as T;
}

export async function POST() {
  if (!(await isAuthenticated())) return unauthorizedResponse();

  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!propertyId) {
    return Response.json({ status: "error", message: "GA4_PROPERTY_ID manquant" }, { status: 400 });
  }

  try {
    const accessToken = await getAccessToken();
    const parent = `properties/${propertyId}`;
    const existing = await analyticsAdmin<{ keyEvents?: Array<{ name?: string; eventName?: string }> }>(
      `${parent}/keyEvents`,
      accessToken,
    );
    const alreadyExists = (existing.keyEvents || []).some((event) => event.eventName === "generate_lead");
    if (alreadyExists) {
      return Response.json({ status: "ok", action: "already_exists", keyEvents: existing.keyEvents });
    }

    const created = await analyticsAdmin(`${parent}/keyEvents`, accessToken, {
      method: "POST",
      body: JSON.stringify({ eventName: "generate_lead" }),
    });

    return Response.json({ status: "ok", action: "created", created });
  } catch (error) {
    return Response.json(
      { status: "error", message: error instanceof Error ? error.message : "Erreur inconnue" },
      { status: 500 },
    );
  }
}
