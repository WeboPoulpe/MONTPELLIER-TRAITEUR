"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-purple/10 blur-[120px]" />
      <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-purple/8 blur-[150px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block border border-white/20 px-6 py-2 text-xs font-semibold tracking-[0.3em] text-white/70 uppercase">
            Depuis 2008 &mdash; Montpellier
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 text-5xl leading-tight font-bold tracking-tight text-white md:text-7xl lg:text-8xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          L&apos;Art de la
          <br />
          <span className="bg-gradient-to-r from-white via-purple-light to-white bg-clip-text text-transparent">
            Gastronomie
          </span>
          <br />
          <span className="text-4xl font-light italic md:text-5xl lg:text-6xl">
            sur mesure
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl"
        >
          Inspirés par les grandes traditions méditerranéennes, enrichies de
          touches caribéennes, nous imaginons des expériences culinaires alliant{" "}
          <span className="text-white">authenticité</span>,{" "}
          <span className="text-white">créativité</span> et{" "}
          <span className="text-white">engagement écoresponsable</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
        >
          <Link
            href="/a-propos#devis"
            className="group relative overflow-hidden rounded-full bg-purple px-10 py-4 text-sm font-semibold tracking-widest text-white uppercase transition-all duration-500 hover:bg-purple-dark hover:shadow-2xl hover:shadow-purple/30"
          >
            <span className="relative z-10">Demander un devis</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
          <Link
            href="#services"
            className="rounded-full border border-white/30 px-10 py-4 text-sm font-semibold tracking-widest text-white uppercase transition-all duration-300 hover:border-white/60 hover:bg-white/5"
          >
            Nos prestations
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest text-white/40 uppercase">
            Découvrir
          </span>
          <ArrowDown className="h-4 w-4 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
