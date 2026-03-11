import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import type { Article } from "@/lib/db/schema";

export type { Article };

export async function getPublishedArticles(): Promise<Article[]> {
  try {
    return await db
      .select()
      .from(articles)
      .where(eq(articles.status, "published"))
      .orderBy(desc(articles.publishedAt));
  } catch {
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  try {
    const results = await db
      .select()
      .from(articles)
      .where(eq(articles.slug, slug))
      .limit(1);
    return results[0];
  } catch {
    return undefined;
  }
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const all = await getPublishedArticles();
  return all.filter((a) => a.category === category);
}

export async function getRecentArticles(count: number = 3): Promise<Article[]> {
  try {
    return await db
      .select()
      .from(articles)
      .where(eq(articles.status, "published"))
      .orderBy(desc(articles.publishedAt))
      .limit(count);
  } catch {
    return [];
  }
}

export async function getAllSlugs(): Promise<string[]> {
  try {
    const results = await db
      .select({ slug: articles.slug })
      .from(articles)
      .where(eq(articles.status, "published"));
    return results.map((r) => r.slug);
  } catch {
    return [];
  }
}

export const categoryLabels: Record<string, string> = {
  entreprise: "Événements d'entreprise",
  "foires-salons": "Foires & Salons",
  "evenements-prives": "Événements privés",
  rse: "RSE & Engagement",
  conseils: "Conseils",
};
