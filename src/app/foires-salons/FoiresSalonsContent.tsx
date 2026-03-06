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
      "Tables d'abondance spectaculaires composees de fromages, charcuteries, fruits frais, crudites et pains artisanaux. Un visuel impressionnant qui attire et fidélise vos visiteurs sur votre stand.",
  },
  {
    icon: Coffee,
    title: "Packs Cafe & The",
    description:
      "Pret de machine a capsules, selection de thes et infusions bio, mignardises d'accompagnement. La pause ideale pour vos equipes et vos clients entre deux conferences.",
  },
  {
    icon: Wine,
    title: "Cocktails VIP",
    description:
      "Cocktails dinatoires haut de gamme avec canapes raffines, mignardises et vins de region. Pour vos soirees inaugurales, vernissages et receptions exclusives sur salon.",
  },
  {
    icon: Truck,
    title: "Logistique Complete",
    description:
      "Livraison directe sur stand, installation du materiel de presentation, vaisselle elegante et debarrassage. Nous gerons l'integalite de la logistique pour vous.",
  },
  {
    icon: UtensilsCrossed,
    title: "Plateaux Repas",
    description:
      "Plateaux sales chauds ou froids, paniers individuels, formules dejeuner equilibrees. Parfaits pour nourrir vos equipes staff entre les temps forts du salon.",
  },
  {
    icon: Leaf,
    title: "Boissons Bio",
    description:
      "Selection de boissons softs bio, jus de fruits presses, eaux aromatisees maison et vins de la region. Une offre responsable alignee avec vos valeurs RSE.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Premier contact",
    description: "Vous nous decrivez votre salon, le nombre de jours, l'affluence prevue et vos attentes specifiques.",
  },
  {
    step: "02",
    title: "Proposition sur mesure",
    description: "Nous elaborons un menu et un planning de livraison adaptes a votre programme et a votre budget.",
  },
  {
    step: "03",
    title: "Livraison & Installation",
    description: "Notre equipe livre et installe directement sur votre stand, avec le materiel de presentation inclus.",
  },
  {
    step: "04",
    title: "Jour J & Suivi",
    description: "Service fluide pendant l'evenement, reapprovisionnement si besoin, et debarrassage complet en fin de journee.",
  },
];

const faqItems = [
  {
    question: "Dans quel rayon intervenez-vous pour les foires et salons ?",
    answer: "Nous intervenons principalement a Montpellier et dans tout le departement de l'Herault (34). Pour les salons d'envergure, nous pouvons nous deplacer dans toute la region Occitanie. Contactez-nous pour discuter de votre evenement specifique.",
  },
  {
    question: "Quel est le delai minimum pour commander un catering de salon ?",
    answer: "Nous recommandons de nous contacter au moins 2 semaines avant votre evenement pour garantir la disponibilite et personnaliser votre commande. Pour les grands salons (plus de 100 personnes), un delai de 3 a 4 semaines est preferable.",
  },
  {
    question: "Proposez-vous des options pour les regimes alimentaires specifiques ?",
    answer: "Absolument. Nous proposons des options vegetariennes, vegan, sans gluten et sans lactose. Signalez-nous toute allergie ou restriction alimentaire lors de votre demande de devis et nous adapterons le menu en consequence.",
  },
  {
    question: "La vaisselle et le materiel sont-ils inclus dans vos prestations ?",
    answer: "Oui, nous fournissons la vaisselle, les couverts, les nappes et le materiel de presentation necessaire. Tout est inclus dans nos forfaits. Nous proposons egalement la location de materiel supplementaire si besoin (machines a cafe, fontaines, etc.).",
  },
  {
    question: "Pouvez-vous livrer sur plusieurs jours consecutifs ?",
    answer: "Bien sur. Pour les salons de plusieurs jours, nous proposons des forfaits multi-journees avec des menus varies pour eviter la repetition. Nous adaptons le planning de livraison a vos horaires d'ouverture.",
  },
  {
    question: "Comment fonctionne la livraison sur un stand de salon ?",
    answer: "Nous livrons directement sur votre stand aux horaires convenus. Notre equipe installe la presentation, vous briefe sur le contenu et revient pour le debarrassage. Aucune manutention de votre cote.",
  },
];

export default function FoiresSalonsContent() {
  return (
    <PageTransition>
      <main>
        <PageHero
          subtitle="Foires & Salons"
          title="Catering professionnel"
          titleAccent="pour vos salons"
          description="Faites la difference avec un service culinaire fluide, raffine et respectueux de votre image de marque. Livraison directe sur stand, materiel inclus."
          image="/photos site/table-amuse-bouche-apero-traiteur-montpellier-150x150.jpg"
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
        <CTASection />

        {/* FAQ */}
        <FAQ items={faqItems} title="Questions sur nos prestations salons" />
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
              Confiez a Traiteur Montpellier le catering de vos foires et salons pour sublimer vos
              participations professionnelles avec une prestation sur mesure. Nous comprenons les
              contraintes specifiques des salons : timing serre, logistique complexe, besoin de flexibilite.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-500">
              Notre equipe s&apos;adapte a votre planning et livre directement sur votre stand, avec un materiel
              de presentation elegant qui valorise votre image de marque. Des paniers individuels aux
              grazing tables spectaculaires, chaque formule est pensee pour impressionner vos visiteurs.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {["Livraison sur stand", "Materiel fourni", "Menus varies", "Eco-responsable"].map((item, i) => (
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
                  src="/photos site/table-amuse-bouche-apero-traiteur-montpellier-150x150.jpg"
                  alt="Grazing table traiteur salon Montpellier"
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
            Comment ca marche
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
    "/photos site/table-amuse-bouche-apero-traiteur-montpellier-150x150.jpg",
    "/photos site/assiette-dressage-salon-traiteur-montpellier-150x150.jpg",
    "/photos site/cocktail-dinatoire-traiteur-montpellier-1-150x150.jpg",
    "/photos site/minis-burgers-boeuf-traiteur-montpellier-150x150.jpg",
    "/photos site/canapes-mousse-lavande-traiteur-montpellier-150x150.jpg",
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
                alt="Realisation traiteur salon"
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

function CTASection() {
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
            Un salon a venir ?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
            Parlez-nous de votre participation et recevez une proposition adaptee a votre stand, votre budget et votre programme. Devis gratuit sous 24h.
          </p>
          <Link
            href="/a-propos#devis"
            className="group relative mt-10 inline-block overflow-hidden rounded-full border border-white/30 bg-white/10 px-10 py-4 text-sm font-semibold tracking-widest text-white uppercase backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/20"
          >
            <span className="relative z-10">Demander un devis gratuit</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
