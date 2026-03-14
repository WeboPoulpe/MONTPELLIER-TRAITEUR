"use client";

import { motion } from "framer-motion";
import { CalendarCheck, ArrowRight, Star, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";

const partners = [
  { name: "Montpellier Tennis de Table", logo: "/logoPartenaire/Montpellier tennis de table.png" },
  { name: "Arabesques", logo: "/logoPartenaire/arabesque.png" },
  { name: "La Tribune", logo: "/logoPartenaire/La tribune.png" },
  { name: "Montpellier Métropole", logo: "/logoPartenaire/Montpellier métropole.png" },
  { name: "L'Assurance Maladie", logo: "/logoPartenaire/L'assurance maladie.png" },
  { name: "Chambres de Métiers et de l'Artisanat", logo: "/logoPartenaire/Chambres de métiers et de l'artisanat.png" },
  { name: "Green Power", logo: "/logoPartenaire/Green power.png" },
  { name: "Cycl'eau", logo: "/logoPartenaire/Cycl'eau.png" },
  { name: "Publi-Topex", logo: "/logoPartenaire/publi -topex.png" },
];

const testimonials = [
  {
    name: "Marie D.",
    text: "Un service impeccable pour notre mariage. Les plats étaient raffinés et le personnel adorable. Je recommande à 100% !",
    rating: 5,
  },
  {
    name: "Jean-Pierre L.",
    text: "Traiteur Montpellier a sublimé notre séminaire d'entreprise. Cocktail dînatoire parfait, tous nos collaborateurs étaient ravis.",
    rating: 5,
  },
  {
    name: "Sophie M.",
    text: "Deuxième fois que nous faisons appel à eux pour un salon professionnel. Toujours aussi excellent, ponctuel et créatif.",
    rating: 5,
  },
];

export default function MerciContent() {
  return (
    <PageTransition>
      <main className="min-h-screen bg-gradient-to-b from-black to-neutral-900">
        {/* Hero */}
        <div className="py-28 text-center lg:py-36">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-purple/20">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <CalendarCheck className="h-10 w-10 text-purple-light" />
              </motion.div>
            </div>
            <h1
              className="mt-8 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Merci pour votre <span className="text-purple-light">confiance</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/60">
              Votre demande de devis a bien été envoyée. Notre équipe vous recontacte
              sous 24h avec une proposition personnalisée.
            </p>

            {/* CTA Prioritaire */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-10"
            >
              <a
                href="https://calendar.app.google/XT1QFNcSibpRtgmFA"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-purple px-10 py-4 text-sm font-semibold tracking-widest text-white uppercase transition-all duration-300 hover:bg-purple-dark hover:shadow-xl hover:shadow-purple/30"
              >
                <CalendarCheck className="h-5 w-5" />
                Réserver un rendez-vous
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <p className="mt-4 text-sm text-white/40">
                Prenez directement rendez-vous pour discuter de votre projet
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Ils nous font confiance */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <h2
                className="text-center text-2xl font-bold text-white md:text-3xl"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Ils nous font <span className="text-purple-light">confiance</span>
              </h2>

              <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
                {partners.map((partner, i) => (
                  <motion.div
                    key={partner.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.05, duration: 0.3 }}
                    className="flex h-20 w-36 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-3 transition-colors hover:border-purple/30 hover:bg-white/10"
                  >
                    <Image
                      src={partner.logo}
                      alt={`Logo ${partner.name} - Partenaire Traiteur Montpellier`}
                      width={120}
                      height={60}
                      className="h-auto max-h-14 w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Avis */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <h2
                className="text-center text-2xl font-bold text-white md:text-3xl"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Ce qu&apos;ils en <span className="text-purple-light">disent</span>
              </h2>

              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {testimonials.map((t, i) => (
                  <motion.div
                    key={t.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 + i * 0.1, duration: 0.4 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6"
                  >
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-white/70">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <p className="mt-4 text-sm font-semibold text-white">{t.name}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Retour accueil */}
        <section className="border-t border-white/5 py-16 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3 text-sm font-medium text-white/60 transition-all hover:border-white/40 hover:text-white"
          >
            <Home className="h-4 w-4" />
            Retour à l&apos;accueil
          </Link>
        </section>
      </main>
    </PageTransition>
  );
}
