"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import PageHero from "@/components/PageHero";
import FAQ from "@/components/FAQ";

const galerieFaq = [
  {
    question: "Puis-je voir des photos de réalisations similaires à mon événement ?",
    answer: "Bien sûr ! Lors de notre premier échange, nous vous partageons des exemples de prestations similaires à votre projet. Notre galerie en ligne présente un aperçu de notre savoir-faire, mais nous disposons d'un portfolio plus complet sur demande.",
  },
  {
    question: "Réalisez-vous des présentations sur mesure pour chaque événement ?",
    answer: "Absolument. Chaque événement bénéficie d'une mise en scène culinaire unique, pensée en fonction de votre thème, de vos couleurs et de l'ambiance souhaitée. Nos dressages sont aussi beaux que bons.",
  },
  {
    question: "Proposez-vous des grazing tables comme celles de la galerie ?",
    answer: "Oui, nos grazing tables sont l'une de nos spécialités les plus demandées. Composées de fromages, charcuteries, fruits frais, crudités et pains artisanaux, elles constituent un véritable spectacle visuel et gustatif.",
  },
  {
    question: "Puis-je personnaliser les couleurs et le thème de la présentation culinaire ?",
    answer: "Tout à fait. Nous adaptons les couleurs des canapés, les contenants, la décoration des plateaux et même les saveurs pour matcher votre thème événementiel. N'hésitez pas à nous partager votre moodboard.",
  },
];

type Category = "tous" | "cocktails" | "plats" | "canapes" | "desserts" | "dressage";

interface GalleryImage {
  src: string;
  alt: string;
  category: Category;
  tall?: boolean;
}

const categories: { key: Category; label: string }[] = [
  { key: "tous", label: "Tous" },
  { key: "cocktails", label: "Cocktails" },
  { key: "plats", label: "Plats" },
  { key: "canapes", label: "Canapés" },
  { key: "desserts", label: "Desserts" },
  { key: "dressage", label: "Dressage" },
];

const images: GalleryImage[] = [
  // Cocktails & Apéro
  { src: "/photos site/cocktail-dinatoire-traiteur-montpellier-1.jpg", alt: "Plateau cocktail dînatoire gastronomique - Traiteur Montpellier", category: "cocktails" },
  { src: "/photos site/cocktail-service-traiteur-montpellier.jpg", alt: "Service cocktail élégant pour réception - Traiteur Montpellier", category: "cocktails", tall: true },
  { src: "/photos site/cocktail-traiteur-montpellier.jpg", alt: "Cocktail raffiné pour événement d'entreprise - Traiteur Montpellier", category: "cocktails" },
  { src: "/photos site/apero-dinatoire-canape-saumon-traiteur-montpellier.jpg", alt: "Canapé au saumon pour apéritif dînatoire - Traiteur Montpellier", category: "cocktails" },
  { src: "/photos site/apero-dinatoire-canape-traiteur-montpellier.jpg", alt: "Assortiment de canapés apéro dînatoire - Traiteur Montpellier", category: "cocktails", tall: true },
  { src: "/photos site/apero-dinatoire-or-traiteur-montpellier.jpg", alt: "Apéritif dînatoire présentation dorée - Traiteur Montpellier", category: "cocktails" },
  { src: "/photos site/apero-dinatoire-traiteur-montpellier.jpg", alt: "Apéritif dînatoire gastronomique à Montpellier - Traiteur Montpellier", category: "cocktails" },
  { src: "/photos site/table-apero-dinatoire-traiteur-montpellier.jpg", alt: "Table dressée apéro dînatoire pour réception - Traiteur Montpellier", category: "cocktails" },
  { src: "/photos site/table-amuse-bouche-apero-traiteur-montpellier.jpg", alt: "Table d'amuse-bouches pour cocktail événementiel - Traiteur Montpellier", category: "cocktails", tall: true },
  { src: "/photos site/cone-apero-dinatoire-traiteur-montpellier.jpg", alt: "Cônes apéritifs créatifs pour réception - Traiteur Montpellier", category: "cocktails" },
  { src: "/photos site/cones-or-traiteur-montpellier.jpg", alt: "Cônes dorés gastronomiques pour cocktail - Traiteur Montpellier", category: "cocktails" },

  // Plats
  { src: "/photos site/plat-haut-de-gamme-traiteur-montpellier.jpg", alt: "Plat gastronomique haut de gamme produits locaux - Traiteur Montpellier", category: "plats", tall: true },
  { src: "/photos site/plat-dressage-elegance-traiteur-montpellier.jpg", alt: "Dressage élégant assiette gastronomique - Traiteur Montpellier", category: "plats" },
  { src: "/photos site/plat-poulet-traiteur-montpellier.jpg", alt: "Plat de poulet fermier cuisine méditerranéenne - Traiteur Montpellier", category: "plats" },
  { src: "/photos site/plat-sauce-traiteur-montpellier.jpg", alt: "Plat en sauce raffiné pour événement - Traiteur Montpellier", category: "plats", tall: true },
  { src: "/photos site/plat-traiteur-montpellier.jpg", alt: "Création culinaire méditerranéenne - Traiteur Montpellier", category: "plats" },
  { src: "/photos site/plat-2-traiteur-montpellier.jpg", alt: "Assiette créative cuisine d'auteur - Traiteur Montpellier", category: "plats" },
  { src: "/photos site/plat-3-traiteur-montpellier.jpg", alt: "Assiette gastronomique produits de saison - Traiteur Montpellier", category: "plats" },
  { src: "/photos site/assiette-poisson-traiteur-montpellier-1.jpg", alt: "Assiette de poisson frais méditerranéen - Traiteur Montpellier", category: "plats", tall: true },
  { src: "/photos site/assiette-choux-bruxelle-traiteur-montpellier.jpg", alt: "Assiette végétale choux de Bruxelles - Traiteur Montpellier", category: "plats" },
  { src: "/photos site/assiettes-cuisses-poulet-traiteur-montpellier.jpg", alt: "Cuisses de poulet rôties aux herbes - Traiteur Montpellier", category: "plats" },
  { src: "/photos site/ballotine-traiteur-montpellier.jpg", alt: "Ballotine gastronomique fait maison - Traiteur Montpellier", category: "plats" },
  { src: "/photos site/cromesqui-banane-plantin-traiteur-montpellier.jpg", alt: "Cromesqui banane plantain inspiration caribéenne - Traiteur Montpellier", category: "plats" },
  { src: "/photos site/mini-cassolette-traiteur-montpellier.jpg", alt: "Mini cassolette gourmande pour réception - Traiteur Montpellier", category: "plats" },

  // Canapés & Bouchées
  { src: "/photos site/amuse-bouche-carre-traiteur-montpellier.jpg", alt: "Amuse-bouche carré création originale - Traiteur Montpellier", category: "canapes", tall: true },
  { src: "/photos site/amuse-bouche-traiteur-montpellier.jpg", alt: "Amuse-bouche raffiné pour cocktail dînatoire - Traiteur Montpellier", category: "canapes" },
  { src: "/photos site/canape-concombre-traiteur-montpellier.jpg", alt: "Canapé frais au concombre pour apéritif - Traiteur Montpellier", category: "canapes" },
  { src: "/photos site/canapes-mousse-lavande-traiteur-montpellier.jpg", alt: "Canapés mousse lavande produits locaux Hérault - Traiteur Montpellier", category: "canapes", tall: true },
  { src: "/photos site/bouchee-boeuf-traiteur-montpellier.jpg", alt: "Bouchée de boeuf gastronomique - Traiteur Montpellier", category: "canapes" },
  { src: "/photos site/bouchee-traiteur-montpellier.jpg", alt: "Bouchée raffinée pour événement privé - Traiteur Montpellier", category: "canapes" },
  { src: "/photos site/bouchees-boeuf-traiteur-montpellier.jpg", alt: "Assortiment bouchées de boeuf pour réception - Traiteur Montpellier", category: "canapes" },
  { src: "/photos site/maki-traiteur-montpellier.jpg", alt: "Maki fusion japonais-méditerranéen - Traiteur Montpellier", category: "canapes", tall: true },
  { src: "/photos site/mini-calzone-traiteur-montpellier.jpg", alt: "Mini calzone artisanale pour cocktail - Traiteur Montpellier", category: "canapes" },
  { src: "/photos site/minis-burgers-boeuf-traiteur-montpellier.jpg", alt: "Mini burgers boeuf gourmet pour événement - Traiteur Montpellier", category: "canapes" },
  { src: "/photos site/minis-burgers-saumon-traiteur-montpellier.jpg", alt: "Mini burgers saumon fumé pour cocktail - Traiteur Montpellier", category: "canapes" },
  { src: "/photos site/tartelette-fromage-frais-traiteur-montpellier-1.jpg", alt: "Tartelette fromage frais et herbes fraîches - Traiteur Montpellier", category: "canapes" },
  { src: "/photos site/tartelette-traiteur-montpellier.jpg", alt: "Tartelette salée fait maison pour réception - Traiteur Montpellier", category: "canapes", tall: true },
  { src: "/photos site/petits-fours-traiteur-montpellier.jpg", alt: "Assortiment de petits fours pour événement - Traiteur Montpellier", category: "canapes" },

  // Desserts
  { src: "/photos site/choux-creme-traiteur-montpellier.jpg", alt: "Choux à la crème pâtisserie artisanale - Traiteur Montpellier", category: "desserts", tall: true },
  { src: "/photos site/choux-violet-traiteur-montpellier.jpg", alt: "Choux violet création pâtissière originale - Traiteur Montpellier", category: "desserts" },
  { src: "/photos site/donut-presentoir-traiteur-montpellier.jpg", alt: "Présentoir donuts gourmands pour réception - Traiteur Montpellier", category: "desserts" },
  { src: "/photos site/macarons-traiteur-montpellier.jpg", alt: "Macarons artisanaux fait maison - Traiteur Montpellier", category: "desserts", tall: true },
  { src: "/photos site/gouter-traiteur-montpellier.jpg", alt: "Goûter gourmand pâtisseries maison - Traiteur Montpellier", category: "desserts" },

  // Dressage & Mise en place
  { src: "/photos site/mise-en-place-traiteur-montpellier.jpg", alt: "Dressage de table élégant pour réception privée dans l'Hérault - Traiteur Montpellier", category: "dressage", tall: true },
  { src: "/photos site/fleurs-traiteur-montpellier.jpg", alt: "Décoration florale raffinée pour événement - Traiteur Montpellier", category: "dressage" },
  { src: "/photos site/verres-epices-traiteur-montpellier.jpg", alt: "Présentation verres et épices décoration culinaire - Traiteur Montpellier", category: "dressage" },
  { src: "/photos site/assiette-dressage-salon-traiteur-montpellier.jpg", alt: "Dressage assiette pour salon professionnel - Traiteur Montpellier", category: "dressage", tall: true },
  { src: "/photos site/plateau-sauces-traiteur-montpellier.jpg", alt: "Plateau de sauces artisanales maison - Traiteur Montpellier", category: "dressage" },
  { src: "/photos site/huile-olive-traiteur-montpellier.jpg", alt: "Huile d'olive artisanale produit local Hérault - Traiteur Montpellier", category: "dressage" },
  { src: "/photos site/huile-traiteur-montpellier.jpg", alt: "Huile aromatisée zéro déchet éco-responsable - Traiteur Montpellier", category: "dressage" },
  { src: "/photos site/omar-traiteur-montpellier.jpg", alt: "Cheffe de cuisine Traiteur Montpellier diplômée École Ducasse", category: "dressage" },
];

export default function GalerieContent() {
  const [activeCategory, setActiveCategory] = useState<Category>("tous");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === "tous" ? images : images.filter((img) => img.category === activeCategory);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const navigateLightbox = useCallback(
    (direction: 1 | -1) => {
      if (lightboxIndex === null) return;
      setLightboxIndex((prev) => {
        if (prev === null) return null;
        const next = prev + direction;
        if (next < 0) return filtered.length - 1;
        if (next >= filtered.length) return 0;
        return next;
      });
    },
    [lightboxIndex, filtered.length]
  );

  return (
    <PageTransition>
      <main>
        <PageHero
          subtitle="Notre savoir-faire"
          title="Galerie"
          titleAccent="photo"
          description="Découvrez nos créations culinaires en images : cocktails, plats gastronomiques, canapés et mises en place soignées."
          image="/photos site/plat-haut-de-gamme-traiteur-montpellier.jpg"
        />

        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Filter tabs */}
            <LayoutGroup>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors duration-300 ${
                      activeCategory === cat.key
                        ? "text-white"
                        : "text-neutral-500 hover:text-neutral-800"
                    }`}
                  >
                    {activeCategory === cat.key && (
                      <motion.div
                        layoutId="activeFilter"
                        className="absolute inset-0 rounded-full bg-purple"
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{cat.label}</span>
                  </button>
                ))}
              </div>
            </LayoutGroup>

            {/* Masonry Grid */}
            <motion.div
              layout
              className="mt-12 columns-2 gap-4 sm:columns-3 lg:columns-4"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((img, index) => (
                  <motion.div
                    key={img.src}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group mb-4 cursor-pointer break-inside-avoid overflow-hidden rounded-xl"
                    onClick={() => openLightbox(index)}
                  >
                    <div className={`relative ${img.tall ? "aspect-[3/4]" : "aspect-square"}`}>
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform duration-500 group-hover:translate-y-0">
                        <p className="text-sm font-medium text-white">{img.alt}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && filtered[lightboxIndex] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
              onClick={closeLightbox}
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                aria-label="Fermer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Nav arrows */}
              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
                className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 md:left-8"
                aria-label="Précédent"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
                className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 md:right-8"
                aria-label="Suivant"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Image */}
              <motion.div
                key={filtered[lightboxIndex].src}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative h-[70vh] w-[90vw] max-w-4xl"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={filtered[lightboxIndex].src}
                  alt={filtered[lightboxIndex].alt}
                  fill
                  className="rounded-lg object-contain"
                  sizes="90vw"
                  priority
                />
              </motion.div>

              {/* Caption */}
              <div className="absolute bottom-8 text-center">
                <p className="text-sm font-medium text-white/80">
                  {filtered[lightboxIndex].alt}
                </p>
                <p className="mt-1 text-xs text-white/50">
                  {lightboxIndex + 1} / {filtered.length}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAQ */}
        <FAQ items={galerieFaq} title="Questions sur nos créations" />
      </main>
    </PageTransition>
  );
}
