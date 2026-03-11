"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { categoryLabels } from "@/lib/articles";
import type { Article } from "@/lib/db/schema";

export default function RecentArticles({ articles }: { articles: Article[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  if (articles.length === 0) return null;

  return (
    <section className="bg-neutral-50 py-28 lg:py-36" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="text-xs font-semibold tracking-[0.3em] text-purple uppercase">
            Blog & Actualités
          </span>
          <h2
            className="mt-4 text-4xl font-bold tracking-tight text-black md:text-5xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Nos derniers <span className="text-purple">articles</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="group"
            >
              <Link href={`/blog/${article.slug}`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                  <Image
                    src={article.featuredImage}
                    alt={article.featuredImageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="mt-5">
                  <div className="flex items-center gap-3">
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
                  <h3
                    className="mt-3 text-lg font-bold text-black transition-colors group-hover:text-purple"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500 line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-purple/30 px-8 py-3 text-sm font-semibold text-purple transition-all hover:bg-purple hover:text-white"
          >
            Voir tous les articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
