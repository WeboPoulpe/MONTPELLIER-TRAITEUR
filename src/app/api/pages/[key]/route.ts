import { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { db } from "@/lib/db";
import { pageContents } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { isAuthenticated, unauthorizedResponse } from "@/lib/auth";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const result = await db
    .select()
    .from(pageContents)
    .where(eq(pageContents.pageKey, key))
    .limit(1);
  if (result.length === 0) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  return Response.json(result[0]);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ key: string }> }) {
  if (!(await isAuthenticated())) return unauthorizedResponse();

  const { key } = await params;
  const body = await req.json();

  const existing = await db
    .select()
    .from(pageContents)
    .where(eq(pageContents.pageKey, key))
    .limit(1);

  if (existing.length > 0) {
    const result = await db
      .update(pageContents)
      .set({ data: body.data, updatedAt: new Date() })
      .where(eq(pageContents.pageKey, key))
      .returning();
    revalidateTag(`page-${key}`, "max");
    revalidateTag("pages", "max");
    return Response.json(result[0]);
  } else {
    const result = await db
      .insert(pageContents)
      .values({ pageKey: key, data: body.data })
      .returning();
    revalidateTag(`page-${key}`, "max");
    revalidateTag("pages", "max");
    return Response.json(result[0], { status: 201 });
  }
}
