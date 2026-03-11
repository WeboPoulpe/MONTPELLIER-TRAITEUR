import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { isAuthenticated, unauthorizedResponse } from "@/lib/auth";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) return unauthorizedResponse();

  const { id } = await params;
  const body = await req.json();
  const result = await db
    .update(articles)
    .set({
      slug: body.slug,
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      category: body.category,
      featuredImage: body.featuredImage,
      featuredImageAlt: body.featuredImageAlt,
      metaTitle: body.metaTitle,
      metaDescription: body.metaDescription,
      status: body.status,
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : undefined,
      updatedAt: new Date(),
    })
    .where(eq(articles.id, Number(id)))
    .returning();

  if (result.length === 0) {
    return Response.json({ error: "Article non trouvé" }, { status: 404 });
  }
  return Response.json(result[0]);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) return unauthorizedResponse();

  const { id } = await params;
  const result = await db
    .delete(articles)
    .where(eq(articles.id, Number(id)))
    .returning();

  if (result.length === 0) {
    return Response.json({ error: "Article non trouvé" }, { status: 404 });
  }
  return Response.json({ success: true });
}
