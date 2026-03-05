"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Carousel from "./Carousel";

const slides = [
  { src: "/photos site/cocktail-dinatoire-traiteur-montpellier-1-150x150.jpg", alt: "Cocktail dinatoire" },
  { src: "/photos site/plat-haut-de-gamme-traiteur-montpellier-150x150.jpg", alt: "Plat haut de gamme" },
  { src: "/photos site/canapes-mousse-lavande-traiteur-montpellier-150x150.jpg", alt: "Canapes mousse lavande" },
  { src: "/photos site/macarons-traiteur-montpellier-150x150.jpg", alt: "Macarons" },
  { src: "/photos site/mise-en-place-traiteur-montpellier-150x150.jpg", alt: "Mise en place" },
  { src: "/photos site/minis-burgers-boeuf-traiteur-montpellier-150x150.jpg", alt: "Mini burgers boeuf" },
  { src: "/photos site/plat-dressage-elegance-traiteur-montpellier-150x150.jpg", alt: "Dressage elegant" },
  { src: "/photos site/choux-creme-traiteur-montpellier-150x150.jpg", alt: "Choux a la creme" },
];

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-white py-28 lg:py-36" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="text-xs font-semibold tracking-[0.3em] text-purple uppercase">
            Notre savoir-faire
          </span>
          <h2
            className="mt-4 text-4xl font-bold tracking-tight text-black md:text-5xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Une cuisine qui
            <br />
            <span className="text-purple">emerveille</span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-14"
        >
          <Carousel slides={slides} autoplayDelay={4000} />
        </motion.div>

        {/* Link to full gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 text-center"
        >
          <Link
            href="/galerie"
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-purple uppercase transition-colors hover:text-purple-dark"
          >
            Voir toute la galerie
            <span className="transition-transform duration-300 hover:translate-x-1">&rarr;</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
