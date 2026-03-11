import { db } from "@/lib/db";
import { pageContents } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function getPageData<T extends Record<string, unknown>>(
  pageKey: string,
  defaults: T
): Promise<T> {
  try {
    const result = await db
      .select()
      .from(pageContents)
      .where(eq(pageContents.pageKey, pageKey))
      .limit(1);

    if (result.length > 0 && result[0].data) {
      return { ...defaults, ...(result[0].data as T) };
    }
  } catch {
    // Fallback to defaults if DB is unavailable
  }
  return defaults;
}
