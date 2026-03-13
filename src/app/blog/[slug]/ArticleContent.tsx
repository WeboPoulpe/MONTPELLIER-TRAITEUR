"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { categoryLabels } from "@/lib/articles";
import type { Article } from "@/lib/db/schema";

export default function ArticleContent({
  article,
  recentArticles,
}: {
  article: Article;
  recentArticles: Article[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.metaDescription || article.excerpt,
    image: `https://www.traiteurmontpellier.com${article.featuredImage}`,
    datePublished: article.publishedAt,
    author: {
      "@type": "Organization",
      name: "Traiteur Montpellier",
    },
    publisher: {
      "@type": "Organization",
      name: "Traiteur Montpellier",
      url: "https://www.traiteurmontpellier.com",
    },
  };

  return (
    <PageTransition>
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Hero image */}
        <section className="relative h-[50vh] min-h-[400px]">
          <Image
            src={article.featuredImage}
            alt={article.featuredImageAlt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
        </section>

        {/* Article */}
        <section className="relative -mt-32 bg-transparent pb-20">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl bg-white p-8 shadow-xl shadow-black/5 md:p-12"
            >
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-xs text-neutral-400">
                <Link href="/" className="hover:text-purple">Accueil</Link>
                <ChevronRight className="h-3 w-3" />
                <Link href="/blog" className="hover:text-purple">Blog</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-neutral-600 line-clamp-1">{article.title}</span>
              </nav>

              {/* Meta */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-purple/10 px-3 py-1 text-xs font-medium text-purple">
                  {categoryLabels[article.category] || article.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-neutral-400">
                  <Calendar className="h-3 w-3" />
                  {new Date(article.publishedAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Title */}
              <h1
                className="mt-6 text-3xl font-bold tracking-tight text-black md:text-4xl"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {article.title}
              </h1>

              {/* Content */}
              <div
                className="prose prose-neutral mt-10 max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:text-black prose-h3:text-lg prose-h3:text-black prose-p:leading-relaxed prose-p:text-neutral-600 prose-a:text-purple prose-a:no-underline hover:prose-a:underline"
                style={{ fontFamily: "var(--font-geist-sans)" }}
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* CTA */}
              <div className="mt-12 rounded-2xl bg-purple/5 p-8 text-center">
                <p
                  className="text-xl font-bold text-black"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Un projet d&apos;événement ?
                </p>
                <p className="mt-2 text-sm text-neutral-500">
                  Demandez votre devis gratuit et recevez une proposition personnalisée sous 24h.
                </p>
                <Link
                  href="/a-propos#devis"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-purple px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-purple-dark hover:shadow-lg hover:shadow-purple/20"
                >
                  Demander un devis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* Related articles */}
            {recentArticles.length > 0 && (
              <div className="mt-16">
                <h2
                  className="text-2xl font-bold text-black"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Articles récents
                </h2>
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {recentArticles.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/blog/${a.slug}`}
                      className="group flex gap-4 rounded-2xl border border-neutral-100 bg-white p-4 transition-all hover:border-purple/20 hover:shadow-lg"
                    >
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                        <Image
                          src={a.featuredImage}
                          alt={a.featuredImageAlt}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-xs text-neutral-400">
                          {new Date(a.publishedAt).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        <h3 className="mt-1 text-sm font-bold text-black transition-colors group-hover:text-purple line-clamp-2">
                          {a.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Back to blog */}
            <div className="mt-12 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-purple"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour au blog
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
