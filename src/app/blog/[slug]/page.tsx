import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug, getAllSlugs, getRecentArticles } from "@/lib/articles";
import ArticleContent from "./ArticleContent";

type Params = { slug: string };

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.excerpt,
    openGraph: {
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt,
      images: [{ url: article.featuredImage }],
      type: "article",
      publishedTime: article.publishedAt.toISOString(),
    },
    alternates: {
      canonical: `https://www.traiteurmontpellier.com/blog/${slug}`,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const recentArticles = (await getRecentArticles(4)).filter((a) => a.slug !== article.slug).slice(0, 2);

  return <ArticleContent article={article} recentArticles={recentArticles} />;
}
