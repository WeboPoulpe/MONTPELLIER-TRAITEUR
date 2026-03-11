import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { articles } from "../src/lib/db/schema";
import articlesData from "../src/data/articles.json";

async function seed() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  console.log("Seeding articles...");

  for (const a of articlesData) {
    await db.insert(articles).values({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      content: a.content,
      category: a.category,
      featuredImage: a.featuredImage,
      featuredImageAlt: a.featuredImageAlt,
      metaTitle: a.metaTitle,
      metaDescription: a.metaDescription,
      status: a.status as "draft" | "published",
      publishedAt: new Date(a.publishedAt),
    });
    console.log(`  ✓ ${a.title}`);
  }

  console.log("Done! Seeded", articlesData.length, "articles.");
}

seed().catch(console.error);
