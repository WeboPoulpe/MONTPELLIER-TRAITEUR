"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  UtensilsCrossed,
  Coffee,
  Wine,
  Truck,
  Utensils,
  Leaf,
  Check,
  ArrowRight,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import PageTransition from "@/components/PageTransition";
import FAQ from "@/components/FAQ";

const services = [
  {
    icon: Utensils,
    title: "Grazing Tables",
    description:
      "Tables d'abondance spectaculaires composées de fromages, charcuteries, fruits frais, crudités et pains artisanaux. Un visuel impressionnant qui attire et fidélise vos visiteurs sur votre stand.",
  },
  {
    icon: Coffee,
    title: "Packs Café & Thé",
    description:
      "Prêt de machine à capsules, sélection de thés et infusions bio, mignardises d'accompagnement. La pause idéale pour vos équipes et vos clients entre deux conférences.",
  },
  {
    icon: Wine,
    title: "Cocktails VIP",
    description:
      "Cocktails dînatoires haut de gamme avec canapés raffinés, mignardises et vins de région. Pour vos soirées inaugurales, vernissages et réceptions exclusives sur salon.",
  },
  {
    icon: Truck,
    title: "Logistique Complète",
    description:
      "Livraison directe sur stand, installation du matériel de présentation, vaisselle élégante et débarrassage. Nous gérons l'intégralité de la logistique pour vous.",
  },
  {
    icon: UtensilsCrossed,
    title: "Plateaux Repas",
    description:
      "Plateaux salés chauds ou froids, paniers individuels, formules déjeuner équilibrées. Parfaits pour nourrir vos équipes staff entre les temps forts du salon.",
  },
  {
    icon: Leaf,
    title: "Boissons Bio",
    description:
      "Sélection de boissons softs bio, jus de fruits pressés, eaux aromatisées maison et vins de la région. Une offre responsable alignée avec vos valeurs RSE.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Premier contact",
    description: "Vous nous décrivez votre salon, le nombre de jours, l'affluence prévue et vos attentes spécifiques.",
  },
  {
    step: "02",
    title: "Proposition sur mesure",
    description: "Nous élaborons un menu et un planning de livraison adaptés à votre programme et à votre budget.",
  },
  {
    step: "03",
    title: "Livraison & Installation",
    description: "Notre équipe livre et installe directement sur votre stand, avec le matériel de présentation inclus.",
  },
  {
    step: "04",
    title: "Jour J & Suivi",
    description: "Service fluide pendant l'événement, réapprovisionnement si besoin, et débarrassage complet en fin de journée.",
  },
];

const faqItems = [
  {
    question: "Dans quel rayon intervenez-vous pour les foires et salons ?",
    answer: "Nous intervenons principalement à Montpellier et dans tout le département de l'Hérault (34). Pour les salons d'envergure, nous pouvons nous déplacer dans toute la région Occitanie. Contactez-nous pour discuter de votre événement spécifique.",
  },
  {
    question: "Quel est le délai minimum pour commander un catering de salon ?",
    answer: "Nous recommandons de nous contacter au moins 2 semaines avant votre événement pour garantir la disponibilité et personnaliser votre commande. Pour les grands salons (plus de 100 personnes), un délai de 3 à 4 semaines est préférable.",
  },
  {
    question: "Proposez-vous des options pour les régimes alimentaires spécifiques ?",
    answer: "Absolument. Nous proposons des options végétariennes, vegan, sans gluten et sans lactose. Signalez-nous toute allergie ou restriction alimentaire lors de votre demande de devis et nous adapterons le menu en conséquence.",
  },
  {
    question: "La vaisselle et le matériel sont-ils inclus dans vos prestations ?",
    answer: "Oui, nous fournissons la vaisselle, les couverts, les nappes et le matériel de présentation nécessaire. Tout est inclus dans nos forfaits. Nous proposons également la location de matériel supplémentaire si besoin (machines à café, fontaines, etc.).",
  },
  {
    question: "Pouvez-vous livrer sur plusieurs jours consécutifs ?",
    answer: "Bien sûr. Pour les salons de plusieurs jours, nous proposons des forfaits multi-journées avec des menus variés pour éviter la répétition. Nous adaptons le planning de livraison à vos horaires d'ouverture.",
  },
  {
    question: "Comment fonctionne la livraison sur un stand de salon ?",
    answer: "Nous livrons directement sur votre stand aux horaires convenus. Notre équipe installe la présentation, vous briefé sur le contenu et revient pour le débarrassage. Aucune manutention de votre côté.",
  },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function FoiresSalonsContent({ data }: { data?: any }) {
  const d = data || {};
  const hero = d.hero || {};
  const intro = d.intro || {};
  const dbServices = d.services as any[] | undefined;
  const dbSteps = d.steps as any[] | undefined;
  const cta = d.cta || {};
  const dbFaq = d.faq as { question: string; answer: string }[] | undefined;

  return (
    <PageTransition>
      <main>
        <PageHero
          subtitle={hero.subtitle ?? "Foires & Salons"}
          title={hero.title ?? "Catering professionnel"}
          titleAccent={hero.titleAccent ?? "pour vos salons"}
          description={hero.description ?? "Faites la différence avec un service culinaire fluide, raffiné et respectueux de votre image de marque. Livraison directe sur stand, matériel inclus."}
          image={hero.image ?? "/photos site/table-amuse-bouche-apero-traiteur-montpellier.jpg"}
        />

        {/* Intro section */}
        <IntroSection />

        {/* Services grid */}
        <ServicesGrid />

        {/* Process */}
        <ProcessSection />

        {/* Gallery strip */}
        <GalleryStrip />

        {/* CTA */}
        <CTASection cta={cta} />

        {/* FAQ */}
        <FAQ items={dbFaq || faqItems} title="Questions sur nos prestations salons" />
      </main>
    </PageTransition>
  );
}

function IntroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-white py-24 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs font-semibold tracking-[0.3em] text-purple uppercase">
              Pourquoi nous choisir
            </span>
            <h2
              className="mt-4 text-3xl font-bold tracking-tight text-black md:text-4xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Sublimez vos participations
              <br />
              <span className="text-purple">professionnelles</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-neutral-600">
              Confiez à Traiteur Montpellier le catering de vos foires et salons pour sublimer vos
              participations professionnelles avec une prestation sur mesure. Nous comprenons les
              contraintes spécifiques des salons : timing serré, logistique complexe, besoin de flexibilité.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-500">
              Notre équipe s&apos;adapte à votre planning et livre directement sur votre stand, avec un matériel
              de présentation élégant qui valorise votre image de marque. Des paniers individuels aux
              grazing tables spectaculaires, chaque formule est pensée pour impressionner vos visiteurs.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {["Livraison sur stand", "Matériel fourni", "Menus variés", "Éco-responsable"].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-2"
                >
                  <Check className="h-4 w-4 shrink-0 text-purple" />
                  <span className="text-sm text-neutral-700">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/photos site/table-amuse-bouche-apero-traiteur-montpellier.jpg"
                  alt="Grazing table buffet événementiel éco-responsable pour salon professionnel - Traiteur Montpellier"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <div className="absolute -top-4 -right-4 -z-10 h-full w-full rounded-2xl border-2 border-purple/15" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ServicesGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-neutral-50 py-24 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="text-xs font-semibold tracking-[0.3em] text-purple uppercase">
            Nos formules
          </span>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight text-black md:text-4xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Tout pour votre <span className="text-purple">salon</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              className="group rounded-2xl border border-neutral-100 bg-white p-8 transition-all duration-300 hover:border-purple/20 hover:shadow-xl hover:shadow-purple/5"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple/5 transition-colors group-hover:bg-purple/10">
                <service.icon className="h-6 w-6 text-purple" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-black">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-white py-24 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="text-xs font-semibold tracking-[0.3em] text-purple uppercase">
            Comment ça marche
          </span>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight text-black md:text-4xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Un processus <span className="text-purple">simple</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
              className="relative text-center"
            >
              <span
                className="text-5xl font-bold text-purple/10"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {item.step}
              </span>
              <h3 className="mt-2 text-lg font-bold text-black">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">{item.description}</p>
              {i < processSteps.length - 1 && (
                <div className="absolute top-8 -right-4 hidden h-[2px] w-8 bg-purple/20 lg:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryStrip() {
  const images = [
    "/photos site/table-amuse-bouche-apero-traiteur-montpellier.jpg",
    "/photos site/assiette-dressage-salon-traiteur-montpellier.jpg",
    "/photos site/cocktail-dinatoire-traiteur-montpellier-1.jpg",
    "/photos site/minis-burgers-boeuf-traiteur-montpellier.jpg",
    "/photos site/canapes-mousse-lavande-traiteur-montpellier.jpg",
  ];

  return (
    <section className="bg-neutral-50 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {images.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <Image
                src={src}
                alt="Réalisation culinaire pour foire et salon professionnel - Traiteur Montpellier"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection({ cta }: { cta: any }) {
  return (
    <section className="bg-purple-dark py-24">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2
            className="text-3xl font-bold text-white md:text-5xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {cta.title ?? "Un salon à venir ?"}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
            {cta.description ?? "Parlez-nous de votre participation et recevez une proposition adaptée à votre stand, votre budget et votre programme. Devis gratuit sous 24h."}
          </p>
          <Link
            href="/devis"
            className="group relative mt-10 inline-block overflow-hidden rounded-full border border-white/30 bg-white/10 px-10 py-4 text-sm font-semibold tracking-widest text-white uppercase backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/20"
          >
            <span className="relative z-10">{cta.buttonText ?? "Demander un devis gratuit"}</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
