"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface PageHeroProps {
  subtitle: string;
  title: string;
  titleAccent: string;
  description: string;
  image: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function PageHero({
  subtitle,
  title,
  titleAccent,
  description,
  image,
  ctaLabel = "Demander un devis",
  ctaHref = "/a-propos#devis",
}: PageHeroProps) {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-purple/10 blur-[120px]" />
      <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-purple/8 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-24 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block border border-white/20 px-6 py-2 text-xs font-semibold tracking-[0.3em] text-white/70 uppercase">
            {subtitle}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 text-4xl leading-tight font-bold tracking-tight text-white md:text-6xl lg:text-7xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {title}
          <br />
          <span className="bg-gradient-to-r from-white via-purple-light to-white bg-clip-text text-transparent">
            {titleAccent}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10"
        >
          <Link
            href={ctaHref}
            className="group relative inline-block overflow-hidden rounded-full bg-purple px-10 py-4 text-sm font-semibold tracking-widest text-white uppercase transition-all duration-500 hover:bg-purple-dark hover:shadow-2xl hover:shadow-purple/30"
          >
            <span className="relative z-10">{ctaLabel}</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
