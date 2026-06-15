import { desc } from "drizzle-orm";
import { isAuthenticated, unauthorizedResponse } from "@/lib/auth";
import { db } from "@/lib/db";
import { leadSubmissions } from "@/lib/db/schema";

function csvValue(value: unknown) {
  const text =
    value instanceof Date ? value.toISOString() : String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

export async function GET(request: Request) {
  if (!(await isAuthenticated())) return unauthorizedResponse();

  const leads = await db
    .select()
    .from(leadSubmissions)
    .orderBy(desc(leadSubmissions.createdAt));

  if (new URL(request.url).searchParams.get("format") !== "csv") {
    return Response.json(leads);
  }

  const headers = [
    "lead_id",
    "created_at",
    "first_name",
    "last_name",
    "company",
    "email",
    "phone",
    "event_type",
    "event_date",
    "event_city",
    "estimated_value",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "gclid",
    "gbraid",
    "wbraid",
    "crm_success",
  ];
  const rows = leads.map((lead) => [
    lead.leadId,
    lead.createdAt,
    lead.firstName,
    lead.lastName,
    lead.company,
    lead.email,
    lead.phone,
    lead.eventType,
    lead.eventDate,
    lead.eventCity,
    lead.estimatedValue,
    lead.utmSource,
    lead.utmMedium,
    lead.utmCampaign,
    lead.gclid,
    lead.gbraid,
    lead.wbraid,
    lead.crmSuccess,
  ]);
  const csv = [headers, ...rows]
    .map((row) => row.map(csvValue).join(","))
    .join("\r\n");

  return new Response(`\uFEFF${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="leads-attribution.csv"',
      "Cache-Control": "no-store",
    },
  });
}
