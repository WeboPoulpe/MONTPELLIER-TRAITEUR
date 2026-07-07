"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  PartyPopper,
  Cake,
  Baby,
  TreePine,
  Heart,
  Sparkles,
  Check,
  ArrowRight,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import PageTransition from "@/components/PageTransition";
import FAQ from "@/components/FAQ";

const celebrations = [
  {
    icon: PartyPopper,
    title: "Cocktail Dînatoire de Fête",
    description:
      "Sublimez vos soirées avec un cocktail dînatoire élégant et convivial. Canapés raffinés, verrines gourmandes, mignardises et boissons sélectionnées pour un moment festif inoubliable.",
    image: "/photos site/cocktail-dinatoire-traiteur-montpellier-1.webp",
  },
  {
    icon: Cake,
    title: "Baptême, Anniversaire & Fête de Famille",
    description:
      "Célébrez vos moments précieux en famille avec des buffets généreux et personnalisés. Menus adaptés a tous les ages, pièces montées, mignardises et décoration culinaire soignée.",
    image: "/photos site/donut-presentoir-traiteur-montpellier.webp",
  },
  {
    icon: TreePine,
    title: "Garden Party",
    description:
      "Profitez du climat méditerranéen avec une réception en plein air. Grazing tables, brochettes gourmet, cocktails rafraîchissants et buffets champêtres pour un moment convivial en extérieur.",
    image: "/photos site/table-apero-dinatoire-traiteur-montpellier.webp",
  },
  {
    icon: Heart,
    title: "Brunch Privé",
    description:
      "Un brunch gourmand et raffiné pour vos matinées entre proches. Viennoiseries artisanales, fruits frais, œufs brouillés, pancakes, jus pressés et boissons chaudes a volonté.",
    image: "/photos site/apero-dinatoire-or-traiteur-montpellier.webp",
  },
  {
    icon: Users,
    title: "Cheffe à Domicile",
    description:
      "Notre cheffe se déplace chez vous pour créer un menu sur mesure, cuisiner sur place et assurer le service. Une expérience gastronomique exclusive dans le confort de votre foyer.",
    image: "/photos site/cocktail-service-traiteur-montpellier.webp",
  },
  {
    icon: Sparkles,
    title: "Cheffe à Demeure",
    description:
      "Pour vos séjours prolongés, profitez d'une cheffe a demeure qui compose et prépare vos repas au quotidien. Menus personnalisés, courses incluses et cuisine adaptée a vos envies.",
    image: "/photos site/apero-dinatoire-canape-traiteur-montpellier.webp",
  },
];

const whyUs = [
  "Menu 100% personnalisé selon vos gouts",
  "Produits frais et de saison",
  "Cuisine méditerranéenne et caribéenne",
  "Engagement éco-responsable",
  "Service discret et professionnel",
  "Livraison et installation incluses",
];

const faqItems = [
  {
    question: "Combien de temps a l'avance dois-je réserver pour un événement privé ?",
    answer: "Pour garantir votre date et personnaliser votre menu, nous recommandons de nous contacter au minimum 3 semaines avant votre événement. Pour les grandes célébrations (100+ convives), prévoyez 1 a 2 mois a l'avance.",
  },
  {
    question: "Proposez-vous un service de dégustation avant l'événement ?",
    answer: "Oui, pour les événements de plus de 50 convives, nous proposons une dégustation sur rendez-vous afin que vous puissiez valider les saveurs et l'esthétique des plats avant le jour J.",
  },
  {
    question: "Gérez-vous le service sur place ou uniquement la livraison ?",
    answer: "Nous proposons les deux formules. La livraison simple avec mise en place, ou le service complet avec notre équipe sur place pour assurer le service, le réapprovisionnement et le débarrassage.",
  },
  {
    question: "Peut-on mixer plusieurs types de cuisine dans un même menu ?",
    answer: "Absolument ! C'est même notre spécialité. Notre cuisine s'inspire des traditions méditerranéennes et caribéennes, ce qui nous permet de créer des menus originaux et métissés qui surprennent agréablement vos convives.",
  },
  {
    question: "Fournissez-vous la décoration de table et la vaisselle ?",
    answer: "Nous fournissons la vaisselle, les couverts et le matériel de service. Pour la décoration de table (fleurs, bougies, nappes spécifiques), nous pouvons vous orienter vers nos partenaires décorateurs de confiance.",
  },
  {
    question: "Quel est le nombre minimum de convives pour une prestation privée ?",
    answer: "Nous intervenons a partir de 10 convives. Pour les petits événements intimes, nous proposons des formules adaptées : plateaux a partager, coffrets gourmands ou buffets compacts.",
  },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function EvenementsPrivesContent({ data }: { data?: any }) {
  const d = data || {};
  const hero = d.hero || {};
  const intro = d.intro || {};
  const dbCelebrations = d.celebrations as any[] | undefined;
  const dbWhyUs = d.whyUs as string[] | undefined;
  const cta = d.cta || {};
  const dbFaq = d.faq as { question: string; answer: string }[] | undefined;

  return (
    <PageTransition>
      <main>
        <PageHero
          subtitle={hero.subtitle || "Événements Privés"}
          title={hero.title || "Célébrez vos"}
          titleAccent={hero.titleAccent || "moments précieux"}
          description={hero.description || "Une cuisine qui conjugue générosité, authenticité et délicatesse. Chaque détail est pensé pour refléter votre sens de l'accueil et votre gout de l'excellence."}
          image="/photos site/apero-dinatoire-canape-traiteur-montpellier.webp"
        />

        {/* Intro */}
        <IntroSection />

        {/* Types de célébrations */}
        <CelebrationsGrid />

        {/* Why us */}
        <WhyUsSection />

        {/* CTA */}
        <CTASection cta={cta} />

        {/* FAQ */}
        <FAQ items={dbFaq || faqItems} title="Questions sur les événements privés" />
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
              Votre événement, notre passion
            </span>
            <h2
              className="mt-4 text-3xl font-bold tracking-tight text-black md:text-4xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Créez des souvenirs
              <br />
              <span className="text-purple">gourmands</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-neutral-600">
              Traiteur Montpellier imagine pour vos événements privés des prestations personnalisées,
              ou chaque détail est pensé pour refléter votre sens de l&apos;accueil et votre gout de
              l&apos;excellence discrète.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-500">
              Que ce soit pour un anniversaire intime, une garden-party estivale, un bapteme ou toute
              autre célébration, nous composons un menu qui raconte votre histoire. Notre cuisine
              d&apos;inspiration méditerranéenne et caribéenne apporte une touche d&apos;originalité a chaque
              assiette, tandis que notre engagement éco-responsable garantit des événements aussi
              savoureux que respectueux.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-500">
              Pour une demande plus précise autour d&apos;un vin d&apos;honneur, d&apos;un cocktail ou d&apos;un brunch,
              consultez notre page dédiée au{" "}
              <Link href="/mariage" className="font-semibold text-purple underline-offset-4 hover:underline">
                traiteur mariage à Montpellier
              </Link>
              .
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8"
            >
              <Link
                href="/devis"
                className="group inline-flex items-center gap-2 rounded-full bg-purple px-8 py-3 text-sm font-semibold tracking-wide text-white uppercase transition-all duration-300 hover:bg-purple-dark hover:shadow-lg hover:shadow-purple/20"
              >
                Parlez-nous de votre projet
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
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
                  src="/photos site/apero-dinatoire-canape-traiteur-montpellier.webp"
                  alt="Canapés apéro dînatoire pour événement privé à Montpellier - Traiteur Montpellier"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <div className="absolute -top-4 -right-4 -z-10 h-full w-full rounded-2xl border-2 border-purple/15" />
            <div className="absolute -bottom-6 -left-6 rounded-2xl bg-purple p-6 text-white shadow-2xl shadow-purple/30">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-4 w-4 fill-white text-white" />
                ))}
              </div>
              <p className="mt-2 text-xs font-medium tracking-wider uppercase opacity-80">
                Avis Google 5/5
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CelebrationsGrid() {
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
            Nos célébrations
          </span>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight text-black md:text-4xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Chaque moment mérite <span className="text-purple">l&apos;exception</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {celebrations.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple/5"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={`${item.title} - Événement privé Traiteur Montpellier`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <item.icon className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-black" style={{ fontFamily: "var(--font-playfair)" }}>
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">{item.description}</p>
                <Link
                  href="/devis"
                  className="mt-4 inline-flex items-center text-sm font-semibold text-purple transition-colors hover:text-purple-dark"
                >
                  En savoir plus
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUsSection() {
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
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src="/photos site/plat-haut-de-gamme-traiteur-montpellier.webp"
                  alt="Plat gastronomique événement privé - Traiteur Montpellier"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src="/photos site/macarons-traiteur-montpellier.webp"
                  alt="Macarons artisanaux pour réception privée - Traiteur Montpellier"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <span className="text-xs font-semibold tracking-[0.3em] text-purple uppercase">
              La différence Traiteur Montpellier
            </span>
            <h2
              className="mt-4 text-3xl font-bold tracking-tight text-black md:text-4xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Pourquoi nous <span className="text-purple">choisir</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-neutral-600">
              Du premier contact au dernier service, nous sommes a vos cotes. Notre approche
              sincère et soignée fait de chaque célébration un moment unique et inoubliable.
            </p>

            <div className="mt-8 space-y-4">
              {whyUs.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.06 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple/10">
                    <Check className="h-3.5 w-3.5 text-purple" />
                  </div>
                  <span className="text-sm text-neutral-700">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CTASection({ cta }: { cta?: any }) {
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
            {cta?.title || "Un événement a célébrer ?"}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
            {cta?.description || "Racontez-nous votre projet et recevez une proposition gourmande et personnalisée. Devis gratuit et sans engagement sous 24h."}
          </p>
          <Link
            href="/devis"
            className="group relative mt-10 inline-block overflow-hidden rounded-full border border-white/30 bg-white/10 px-10 py-4 text-sm font-semibold tracking-widest text-white uppercase backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/20"
          >
            <span className="relative z-10">{cta?.buttonText || "Demander un devis gratuit"}</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
