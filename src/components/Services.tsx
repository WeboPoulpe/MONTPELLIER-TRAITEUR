"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, PartyPopper, UtensilsCrossed, GlassWater, Cake, Users } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Building2,
    title: "Evenement Entreprise",
    subtitle: "Seminaires & Conferences",
    description:
      "Organisez vos evenements d'entreprise avec l'assurance d'une prestation culinaire soignee et sur mesure. Traiteur Montpellier accompagne vos seminaires, repas d'affaires, conferences et lancements en apportant une attention toute particuliere aux details et a l'experience gustative. Faites de chaque rencontre professionnelle un moment memorable, empreint de saveurs raffinees et d'elegance naturelle.",
    image:
      "https://images.unsplash.com/photo-1530062845289-9109b2c9c868?q=80&w=2072&auto=format&fit=crop",
    features: ["Cocktails VIP", "Plateaux dejeuners", "Pack cafe & the"],
    href: "/entreprises",
  },
  {
    icon: UtensilsCrossed,
    title: "Foires & Salons",
    subtitle: "Stands & Expositions",
    description:
      "Confiez a Traiteur Montpellier le catering de vos foires et salons pour sublimer vos participations professionnelles. Paniers de fruits frais, plateaux petits dejeuners, grazing tables, plateaux sales chauds ou froids, mignardises, boissons softs bio et vins de region. Packs cafe, location de materiel et cocktails VIP pour vos evenements prestigieux.",
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop",
    features: ["Paniers repas staff", "Grazing tables", "Logistique complete"],
    href: "/entreprises",
  },
  {
    icon: PartyPopper,
    title: "Evenement Prive",
    subtitle: "Celebrations & Receptions",
    description:
      "Celebrez vos moments precieux avec une cuisine qui conjugue generosite, authenticite et delicatesse. Traiteur Montpellier imagine pour vos evenements prives des prestations personnalisees, ou chaque detail est pense pour refleter votre sens de l'accueil et votre gout de l'excellence discrete. Creez des souvenirs gourmands, portes par une approche sincere et soignee.",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop",
    features: ["Menu sur mesure", "Decoration culinaire", "Service complet"],
    href: "/entreprises",
  },
];

const offerings = [
  { icon: GlassWater, label: "Cocktails & Boissons" },
  { icon: Cake, label: "Mignardises & Desserts" },
  { icon: Users, label: "Service & Personnel" },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="bg-neutral-50 py-28 lg:py-36" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="text-xs font-semibold tracking-[0.3em] text-purple uppercase">
            Nos prestations
          </span>
          <h2
            className="mt-4 text-4xl font-bold tracking-tight text-black md:text-5xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Des experiences culinaires
            <br />
            <span className="text-purple">d&apos;exception</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-500">
            Sublimez vos receptions grace a notre savoir-faire et a notre passion
            pour une cuisine genereuse et raffinee.
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple/10 hover:ring-1 hover:ring-purple/10"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${service.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                      <service.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-medium tracking-wider text-white/70 uppercase">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3
                  className="text-2xl font-bold text-black"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                  {service.description}
                </p>

                {/* Features */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full bg-purple/5 px-3 py-1 text-xs font-medium text-purple"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <Link
                  href={service.href}
                  className="mt-6 inline-flex items-center text-sm font-semibold text-purple transition-colors hover:text-purple-dark"
                >
                  Decouvrir
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional offerings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 lg:gap-16"
        >
          {offerings.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 text-neutral-400"
            >
              <item.icon className="h-5 w-5" />
              <span className="text-sm font-medium tracking-wide">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
