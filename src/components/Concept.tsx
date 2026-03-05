"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, MapPin, Heart } from "lucide-react";

const values = [
  {
    icon: Leaf,
    title: "Zero Dechet",
    description:
      "Valorisation des dechets par compostage, creation d'huiles aromatisees, de soupes gourmandes et de poudres de decoration issues de matieres premieres recuperees.",
  },
  {
    icon: MapPin,
    title: "Circuits Courts",
    description:
      "Collaboration etroite avec des producteurs de la region pour garantir la fraicheur de nos produits tout en soutenant l'economie locale.",
  },
  {
    icon: Heart,
    title: "Solidarite",
    description:
      "Les surplus de production sont soigneusement redistribues a une association humanitaire de Montpellier.",
  },
];

export default function Concept() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="concept" className="relative overflow-hidden bg-white py-28 lg:py-36" ref={ref}>
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-purple-muted blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
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
              engagee
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-neutral-600">
              Traiteur Montpellier incarne depuis 2008 une vision gastronomique qui
              celebre la richesse des cultures mediterraneennes dans leur diversite,
              tout en y insufflant des inspirations caribeennes delicates.
            </p>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-neutral-500">
              Chez Traiteur Montpellier, l&apos;art de recevoir s&apos;accompagne d&apos;un profond
              respect pour la planete. Un engagement sincere pour des evenements aussi
              savoureux que responsables.
            </p>

            <div className="mt-10 space-y-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
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
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <div
                className="aspect-[4/5] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 rounded-2xl bg-purple p-6 text-white shadow-2xl shadow-purple/30">
              <p className="text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
                15+
              </p>
              <p className="mt-1 text-xs font-medium tracking-wider uppercase opacity-80">
                Annees d&apos;excellence
              </p>
            </div>
            {/* Decorative border */}
            <div className="absolute -top-4 -right-4 -z-10 h-full w-full rounded-2xl border-2 border-purple/20" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
