import { db } from "@/lib/db";
import { pageContents } from "@/lib/db/schema";
import { isAuthenticated, unauthorizedResponse } from "@/lib/auth";

export async function GET() {
  const all = await db.select().from(pageContents);
  return Response.json(all);
}
