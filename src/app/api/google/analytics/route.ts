import { NextRequest } from "next/server";
import { isAuthenticated, unauthorizedResponse } from "@/lib/auth";
import { getGoogleAnalyticsSnapshot } from "@/lib/google/analytics";

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function isDate(value: string | null): value is string {
  return Boolean(value && /^\d{4}-\d{2}-\d{2}$/.test(value));
}

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated())) return unauthorizedResponse();

  const today = new Date();
  const defaultStart = new Date(today);
  defaultStart.setUTCDate(defaultStart.getUTCDate() - 29);

  const requestedStart = request.nextUrl.searchParams.get("start");
  const requestedEnd = request.nextUrl.searchParams.get("end");
  const startDate = isDate(requestedStart) ? requestedStart : formatDate(defaultStart);
  const endDate = isDate(requestedEnd) ? requestedEnd : formatDate(today);

  if (startDate > endDate) {
    return Response.json(
      { error: "La date de debut doit preceder la date de fin" },
      { status: 400 }
    );
  }

  return Response.json(await getGoogleAnalyticsSnapshot(startDate, endDate));
}
