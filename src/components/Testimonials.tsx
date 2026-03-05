"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sophie & Antoine",
    event: "Mariage — Juin 2024",
    text: "Une prestation exceptionnelle pour notre mariage. Les saveurs méditerranéennes et caribéennes ont transporté nos invités. Le service était impeccable, discret et chaleureux. Un immense merci à toute l'équipe !",
    rating: 5,
  },
  {
    name: "Marie-Claire Durand",
    event: "Séminaire d'entreprise",
    text: "Nous faisons appel à Traiteur Montpellier pour tous nos événements corporate. La qualité est toujours au rendez-vous, les grazing tables sont spectaculaires et le service est d'une fluidité remarquable.",
    rating: 5,
  },
  {
    name: "Laurent Bergman",
    event: "Cocktail VIP — 120 personnes",
    text: "L'engagement écoresponsable combiné à une cuisine raffinée, c'est exactement ce que nous recherchions. Les mignardises étaient sublimes et le concept zéro déchet nous a particulièrement séduits.",
    rating: 5,
  },
  {
    name: "Isabelle Fournier",
    event: "Anniversaire — 80 personnes",
    text: "Chaque détail était pensé avec soin. Du buffet aux desserts, tout était d'une fraîcheur et d'une saveur incomparables. Nos invités en parlent encore des mois après !",
    rating: 5,
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section
      id="temoignages"
      className="relative overflow-hidden bg-black py-28 lg:py-36"
      ref={ref}
    >
      {/* Background accent - hidden on mobile for perf */}
      <div className="absolute top-1/2 left-1/2 hidden h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple/5 blur-[150px] md:block" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="text-xs font-semibold tracking-[0.3em] text-purple-light uppercase">
            Témoignages
          </span>
          <h2
            className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Ce que disent
            <br />
            nos <span className="text-purple-light">clients</span>
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16"
        >
          <div className="relative mx-auto max-w-3xl">
            <Quote className="mx-auto mb-8 h-10 w-10 text-purple/30" />

            <div className="min-h-[200px]">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                {/* Stars */}
                <div className="flex items-center justify-center gap-1">
                  {Array.from({ length: testimonials[current].rating }).map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-purple-light text-purple-light"
                      />
                    )
                  )}
                </div>

                {/* Text */}
                <p className="mt-6 text-xl leading-relaxed font-light italic text-white/80 md:text-2xl">
                  &ldquo;{testimonials[current].text}&rdquo;
                </p>

                {/* Author */}
                <div className="mt-8">
                  <p className="text-sm font-bold tracking-wider text-white uppercase">
                    {testimonials[current].name}
                  </p>
                  <p className="mt-1 text-xs tracking-wider text-white/40">
                    {testimonials[current].event}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                onClick={prev}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-purple hover:text-purple"
                aria-label="Témoignage précédent"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-8 bg-purple"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Témoignage ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-purple hover:text-purple"
                aria-label="Témoignage suivant"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 gap-8 border-t border-white/10 pt-16 md:grid-cols-4"
        >
          {[
            { number: "500+", label: "Événements réalisés" },
            { number: "15+", label: "Années d'expérience" },
            { number: "98%", label: "Clients satisfaits" },
            { number: "50k+", label: "Convives servis" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-3xl font-bold text-white md:text-4xl"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {stat.number}
              </p>
              <p className="mt-2 text-xs font-medium tracking-wider text-white/40 uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
