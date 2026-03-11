"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, PartyPopper, UtensilsCrossed, GlassWater, Cake, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    icon: Building2,
    title: "Événement Entreprise",
    subtitle: "Séminaires & Conférences",
    description:
      "Organisez vos événements d'entreprise avec l'assurance d'une prestation culinaire soignée et sur mesure. Traiteur Montpellier accompagne vos séminaires, repas d'affaires, conférences et lancements en apportant une attention toute particulière aux détails et à l'expérience gustative. Faites de chaque rencontre professionnelle un moment mémorable, empreint de saveurs raffinées et d'élégance naturelle.",
    image: "/photos site/cocktail-service-traiteur-montpellier.jpg",
    features: ["Cocktail déjeunatoire & dînatoire", "Séminaires & conférences", "Arbre de Noël"],
    href: "/entreprises",
  },
  {
    icon: UtensilsCrossed,
    title: "Foires & Salons",
    subtitle: "Stands & Expositions",
    description:
      "Confiez à Traiteur Montpellier le catering de vos foires et salons pour sublimer vos participations professionnelles. Paniers de fruits frais, plateaux petits déjeuners, grazing tables, plateaux salés chauds ou froids, mignardises, boissons softs bio et vins de région. Packs viennoiserie, location de verrerie et cocktails VIP pour vos événements prestigieux.",
    image: "/photos site/table-amuse-bouche-apero-traiteur-montpellier.jpg",
    features: ["Cocktail VIP", "Grazing table", "Catering sur stand"],
    href: "/foires-salons",
  },
  {
    icon: PartyPopper,
    title: "Événement Privé",
    subtitle: "Célébrations & Réceptions",
    description:
      "Célébrez vos moments précieux avec une cuisine qui conjugue générosité, authenticité et délicatesse. Traiteur Montpellier imagine pour vos événements privés des prestations personnalisées, où chaque détail est pensé pour refléter votre sens de l'accueil et votre goût de l'excellence discrète. Possibilité de prestation sur mesure, avec un concept créé spécialement pour l'événement.",
    image: "/photos site/apero-dinatoire-canape-traiteur-montpellier.jpg",
    features: ["Cheffe à domicile", "Brunch privé", "Garden party"],
    href: "/evenements-prives",
  },
];

const offerings = [
  { icon: GlassWater, label: "Cocktails & Boissons" },
  { icon: Cake, label: "Mignardises & Desserts" },
  { icon: Users, label: "Service & Personnel" },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Services({ data }: { data?: any }) {
  const svcSubtitle = data?.subtitle ?? "Nos prestations";
  const svcT1 = data?.titleLine1 ?? "Des expériences culinaires";
  const svcT2 = data?.titleLine2 ?? "d'exception";
  const svcDesc = data?.description ?? "Sublimez vos réceptions grâce à notre savoir-faire et à notre passion pour une cuisine généreuse et raffinée.";
  // Override card text from DB if present
  const dbCards = data?.cards as any[] | undefined;
  const svcIcons = [Building2, UtensilsCrossed, PartyPopper];
  const svcImages = ["/photos site/cocktail-service-traiteur-montpellier.jpg", "/photos site/table-amuse-bouche-apero-traiteur-montpellier.jpg", "/photos site/apero-dinatoire-canape-traiteur-montpellier.jpg"];
  const svcHrefs = ["/entreprises", "/foires-salons", "/evenements-prives"];
  const svcCards = dbCards
    ? dbCards.map((c: any, i: number) => ({ ...services[i], title: c.title, subtitle: c.subtitle, description: c.description, features: c.features ?? services[i].features }))
    : services;
  const dbOfferings = data?.offerings as string[] | undefined;
  const offeringIcons = [GlassWater, Cake, Users];
  const svcOfferings = dbOfferings
    ? dbOfferings.map((label: string, i: number) => ({ icon: offeringIcons[i] || GlassWater, label }))
    : offerings;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="bg-neutral-50 py-28 lg:py-36" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="text-xs font-semibold tracking-[0.3em] text-purple uppercase">
            {svcSubtitle}
          </span>
          <h2
            className="mt-4 text-4xl font-bold tracking-tight text-black md:text-5xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {svcT1}
            <br />
            <span className="text-purple">{svcT2}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-500">
            {svcDesc}
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {svcCards.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple/10 hover:ring-1 hover:ring-purple/10"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  quality={60}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
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

                <div className="mt-6 flex flex-wrap gap-2">
                  {service.features.map((feature: string) => (
                    <span
                      key={feature}
                      className="rounded-full bg-purple/5 px-3 py-1 text-xs font-medium text-purple"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <Link
                  href={service.href}
                  className="mt-6 inline-flex items-center text-sm font-semibold text-purple transition-colors hover:text-purple-dark"
                >
                  Découvrir
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 lg:gap-16"
        >
          {svcOfferings.map((item) => (
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
