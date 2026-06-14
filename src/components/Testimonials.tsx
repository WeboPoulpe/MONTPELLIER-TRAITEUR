"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, ExternalLink, Quote } from "lucide-react";
import Image from "next/image";
import type { GoogleReviewsData } from "@/lib/google/reviews";

export default function Testimonials({ data }: { data: GoogleReviewsData }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const testimonials = data.reviews;

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section
      id="temoignages"
      className="relative overflow-hidden bg-black py-28 lg:py-36"
      ref={ref}
    >
      <div className="absolute top-1/2 left-1/2 hidden h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple/5 blur-[150px] md:block" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <Image
              src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
              alt="Google"
              width={60}
              height={20}
              className="opacity-60"
            />
            <span className="text-sm font-medium text-white/40">Avis</span>
          </div>
          <span className="text-xs font-semibold tracking-[0.3em] text-purple-light uppercase">
            Avis Google vérifiés
          </span>
          <h2
            className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Ce que disent
            <br />
            nos <span className="text-purple-light">clients</span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-bold text-white">{data.rating.toFixed(1)}</span>
            <span className="text-sm text-white/40">
              sur Google ({data.totalReviews} avis)
            </span>
          </div>
        </motion.div>

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
                <div className="flex items-center justify-center gap-1">
                  {Array.from({ length: testimonials[current].rating }).map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    )
                  )}
                </div>

                <p className="mt-6 text-xl leading-relaxed font-light italic text-white/80 md:text-2xl">
                    &ldquo;{testimonials[current].text}&rdquo;
                </p>

                <div className="mt-8">
                  <p className="text-sm font-bold tracking-wider text-white uppercase">
                    {testimonials[current].authorName}
                  </p>
                  <p className="mt-1 flex items-center justify-center gap-1 text-xs tracking-wider text-white/40">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    {testimonials[current].relativeTime}
                  </p>
                  {(testimonials[current].reviewUrl || testimonials[current].authorUrl) && (
                    <a
                      href={testimonials[current].reviewUrl || testimonials[current].authorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-xs text-purple-light hover:underline"
                    >
                      Voir l&apos;avis sur Google
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            </div>

            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                onClick={prev}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-purple hover:text-purple"
                aria-label="Témoignage précédent"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className="h-2 w-8 rounded-full bg-purple transition-[transform,opacity] duration-300 will-change-transform"
                    style={{
                      transform: i === current ? "scaleX(1)" : "scaleX(0.25)",
                      opacity: i === current ? 1 : 0.3,
                    }}
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 gap-8 border-t border-white/10 pt-16 md:grid-cols-4"
        >
          {[
            { number: "500+", label: "Événements réalisés" },
            { number: "15+", label: "Années d'expérience" },
            { number: `${data.rating.toFixed(1)}/5`, label: `${data.totalReviews} avis Google` },
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

        <div className="mt-10 text-center">
          <a
            href={data.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-purple-light hover:underline"
          >
            Voir tous les avis sur Google
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
