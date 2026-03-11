"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import PageTransition from "@/components/PageTransition";
import { categoryLabels } from "@/lib/articles";
import type { Article } from "@/lib/db/schema";

const allCategories = Object.keys(categoryLabels);

export default function BlogContent({ articles }: { articles: Article[] }) {
  const categories = ["all", ...allCategories.filter((c) => articles.some((a) => a.category === c))];
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <PageTransition>
      <main>
        <PageHero
          subtitle="Blog & Actualités"
          title="Nos"
          titleAccent="articles"
          description="Conseils, tendances et coulisses de la gastronomie événementielle à Montpellier."
          image="/photos site/mise-en-place-traiteur-montpellier.jpg"
          ctaLabel="Demander un devis"
          ctaHref="/a-propos#devis"
        />

        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Category filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-purple text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {cat === "all" ? "Tous" : categoryLabels[cat] || cat}
                </button>
              ))}
            </div>

            {/* Articles grid */}
            {filtered.length === 0 ? (
              <p className="mt-16 text-center text-neutral-500">
                Aucun article dans cette catégorie pour le moment.
              </p>
            ) : (
              <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((article, i) => (
                  <motion.article
                    key={article.slug}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
                        <h2
                          className="mt-3 text-lg font-bold text-black transition-colors group-hover:text-purple"
                          style={{ fontFamily: "var(--font-playfair)" }}
                        >
                          {article.title}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-neutral-500 line-clamp-3">
                          {article.excerpt}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-purple transition-all group-hover:gap-3">
                          Lire l&apos;article
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
