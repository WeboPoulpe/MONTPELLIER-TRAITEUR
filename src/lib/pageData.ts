import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import { pageContents } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const fetchPageRow = (pageKey: string) =>
  unstable_cache(
    async () => {
      try {
        const result = await db
          .select()
          .from(pageContents)
          .where(eq(pageContents.pageKey, pageKey))
          .limit(1);
        return result[0]?.data ?? null;
      } catch {
        return null;
      }
    },
    ["page-data", pageKey],
    { tags: [`page-${pageKey}`, "pages"], revalidate: false }
  )();

export async function getPageData<T extends Record<string, unknown>>(
  pageKey: string,
  defaults: T
): Promise<T> {
  const data = await fetchPageRow(pageKey);
  if (data) return { ...defaults, ...(data as T) };
  return defaults;
}
