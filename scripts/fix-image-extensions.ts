import "dotenv/config";
import { neon } from "@neondatabase/serverless";

async function fix() {
  const sql = neon(process.env.DATABASE_URL!);

  const articles = await sql`
    UPDATE articles
    SET featured_image = REPLACE(featured_image, '.jpg', '.webp'),
        updated_at = NOW()
    WHERE featured_image LIKE '%.jpg'
    RETURNING slug, featured_image
  `;
  console.log(`Updated ${articles.length} article image(s):`);
  for (const a of articles) console.log(`  ✓ ${a.slug} -> ${a.featured_image}`);

  const pages = await sql`
    UPDATE page_contents
    SET data = REPLACE(data::text, '.jpg', '.webp')::jsonb,
        updated_at = NOW()
    WHERE data::text LIKE '%.jpg%'
    RETURNING page_key
  `;
  console.log(`Updated ${pages.length} page content row(s):`);
  for (const p of pages) console.log(`  ✓ ${p.page_key}`);

  console.log("Done.");
}

fix().catch((e) => {
  console.error(e);
  process.exit(1);
});
