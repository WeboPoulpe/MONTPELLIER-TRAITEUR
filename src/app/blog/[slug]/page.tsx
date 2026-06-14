import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug, getAllSlugs, getRecentArticles } from "@/lib/articles";
import ArticleContent from "./ArticleContent";
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
} from "@/components/SeoJsonLd";

type Params = { slug: string };

export const dynamic = "force-static";
export const dynamicParams = true;

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
  const articleUrl = `https://www.traiteurmontpellier.com/blog/${article.slug}`;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://www.traiteurmontpellier.com" },
          { name: "Blog", url: "https://www.traiteurmontpellier.com/blog" },
          { name: article.title, url: articleUrl },
        ]}
      />
      <ArticleJsonLd
        title={article.title}
        description={article.metaDescription || article.excerpt}
        image={article.featuredImage}
        url={articleUrl}
        publishedAt={article.publishedAt.toISOString()}
        updatedAt={article.updatedAt.toISOString()}
      />
      <ArticleContent article={article} recentArticles={recentArticles} />
    </>
  );
}
