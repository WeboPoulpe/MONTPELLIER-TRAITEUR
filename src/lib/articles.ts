import { cache } from "react";
import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import type { Article } from "@/lib/db/schema";

export type { Article };

export const getPublishedArticles = unstable_cache(
  async (): Promise<Article[]> => {
    try {
      return await db
        .select()
        .from(articles)
        .where(eq(articles.status, "published"))
        .orderBy(desc(articles.publishedAt));
    } catch {
      return [];
    }
  },
  ["articles-published"],
  { tags: ["articles"], revalidate: false }
);

const fetchArticleBySlug = unstable_cache(
  async (slug: string): Promise<Article | undefined> => {
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
  },
  ["article-by-slug"],
  { tags: ["articles"], revalidate: false }
);

export const getArticleBySlug = cache(
  (slug: string): Promise<Article | undefined> => fetchArticleBySlug(slug)
);

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const all = await getPublishedArticles();
  return all.filter((a) => a.category === category);
}

export const getRecentArticles = unstable_cache(
  async (count: number = 3): Promise<Article[]> => {
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
  },
  ["articles-recent"],
  { tags: ["articles"], revalidate: false }
);

export const getAllSlugs = unstable_cache(
  async (): Promise<string[]> => {
    try {
      const results = await db
        .select({ slug: articles.slug })
        .from(articles)
        .where(eq(articles.status, "published"));
      return results.map((r) => r.slug);
    } catch {
      return [];
    }
  },
  ["articles-slugs"],
  { tags: ["articles"], revalidate: false }
);

export const categoryLabels: Record<string, string> = {
  entreprise: "Événements d'entreprise",
  "foires-salons": "Foires & Salons",
  "evenements-prives": "Événements privés",
  rse: "RSE & Engagement",
  conseils: "Conseils",
};
