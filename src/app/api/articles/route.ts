import { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { isAuthenticated, unauthorizedResponse } from "@/lib/auth";

export async function GET() {
  const all = await db.select().from(articles).orderBy(desc(articles.publishedAt));
  return Response.json(all);
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) return unauthorizedResponse();

  const body = await req.json();
  const result = await db
    .insert(articles)
    .values({
      slug: body.slug,
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      category: body.category,
      featuredImage: body.featuredImage,
      featuredImageAlt: body.featuredImageAlt,
      metaTitle: body.metaTitle,
      metaDescription: body.metaDescription,
      status: body.status || "draft",
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
    })
    .returning();

  revalidateTag("articles", "max");
  return Response.json(result[0], { status: 201 });
}
