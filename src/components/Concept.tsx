"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, MapPin, Heart } from "lucide-react";
import Image from "next/image";

const values = [
  {
    icon: Leaf,
    title: "Zéro Déchet",
    description:
      "Valorisation des déchets par compostage, création d'huiles aromatisées, de soupes gourmandes et de poudres de décoration issues de matières premières récupérées.",
  },
  {
    icon: MapPin,
    title: "Circuits Courts",
    description:
      "Collaboration étroite avec des producteurs de la région pour garantir la fraîcheur de nos produits tout en soutenant l'économie locale.",
  },
  {
    icon: Heart,
    title: "Solidarité",
    description:
      "Les surplus de production sont soigneusement redistribués à une association humanitaire de Montpellier.",
  },
];

export default function Concept() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="concept" className="relative overflow-hidden bg-white py-28 lg:py-36" ref={ref}>
      <div className="absolute top-0 right-0 hidden h-96 w-96 rounded-full bg-purple-muted blur-[120px] md:block" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-semibold tracking-[0.3em] text-purple uppercase">
              Notre engagement
            </span>
            <h2
              className="mt-4 text-4xl font-bold tracking-tight text-black md:text-5xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Une vision
              <br />
              <span className="text-purple">gastronomique</span>
              <br />
              engagée
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-neutral-600">
              Traiteur Montpellier incarne depuis 2008 une vision gastronomique qui
              célèbre la richesse des cultures méditerranéennes dans leur diversité,
              tout en y insufflant des inspirations caribéennes délicates.
            </p>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-neutral-500">
              Chez Traiteur Montpellier, l&apos;art de recevoir s&apos;accompagne d&apos;un profond
              respect pour la planète. Un engagement sincère pour des événements aussi
              savoureux que responsables.
            </p>

            <div className="mt-10 space-y-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="flex gap-5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple/5">
                    <value.icon className="h-5 w-5 text-purple" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold tracking-wide text-black uppercase">
                      {value.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-500">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/photos site/plat-haut-de-gamme-traiteur-montpellier.jpg"
                alt="Plat gastronomique Traiteur Montpellier"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 rounded-2xl bg-purple p-6 text-white shadow-2xl shadow-purple/30">
              <p className="text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
                15+
              </p>
              <p className="mt-1 text-xs font-medium tracking-wider uppercase opacity-80">
                Années d&apos;excellence
              </p>
            </div>
            <div className="absolute -top-4 -right-4 -z-10 h-full w-full rounded-2xl border-2 border-purple/20" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
