import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import type { Article } from "@/lib/db/schema";

export type { Article };

export async function getPublishedArticles(): Promise<Article[]> {
  return db
    .select()
    .from(articles)
    .where(eq(articles.status, "published"))
    .orderBy(desc(articles.publishedAt));
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const results = await db
    .select()
    .from(articles)
    .where(eq(articles.slug, slug))
    .limit(1);
  return results[0];
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const all = await getPublishedArticles();
  return all.filter((a) => a.category === category);
}

export async function getRecentArticles(count: number = 3): Promise<Article[]> {
  return db
    .select()
    .from(articles)
    .where(eq(articles.status, "published"))
    .orderBy(desc(articles.publishedAt))
    .limit(count);
}

export async function getAllSlugs(): Promise<string[]> {
  const results = await db
    .select({ slug: articles.slug })
    .from(articles)
    .where(eq(articles.status, "published"));
  return results.map((r) => r.slug);
}

export const categoryLabels: Record<string, string> = {
  entreprise: "Événements d'entreprise",
  "foires-salons": "Foires & Salons",
  "evenements-prives": "Événements privés",
  rse: "RSE & Engagement",
  conseils: "Conseils",
};
