import { isAuthenticated, unauthorizedResponse } from "@/lib/auth";
import { uploadOfflineLeadConversions } from "@/lib/google/offline-conversions";

export const dynamic = "force-dynamic";

function parseDate(value: unknown) {
  if (typeof value !== "string" || !value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function parseLimit(value: unknown) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined;
}

export async function GET(request: Request) {
  if (!(await isAuthenticated())) return unauthorizedResponse();

  const params = new URL(request.url).searchParams;
  const result = await uploadOfflineLeadConversions({
    validateOnly: true,
    limit: parseLimit(params.get("limit")),
    since: parseDate(params.get("since")),
  });

  return Response.json(result, {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) return unauthorizedResponse();

  const body = (await request.json().catch(() => ({}))) as {
    validateOnly?: boolean;
    limit?: number;
    since?: string;
  };

  const result = await uploadOfflineLeadConversions({
    validateOnly: body.validateOnly !== false,
    limit: parseLimit(body.limit),
    since: parseDate(body.since),
  });

  return Response.json(result, {
    status: result.status === "blocked" || result.status === "error" ? 502 : 200,
    headers: { "Cache-Control": "no-store" },
  });
}
