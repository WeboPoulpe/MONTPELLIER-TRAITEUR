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
    icon: Cake,
    title: "Anniversaires",
    description:
      "De l'anniversaire intime entre amis a la grande fete familiale, nous creons des buffets et menus qui marquent le coup. Cocktails colores, buffets gourmands, pieces montees et mignardises personnalisees.",
    image: "/photos site/donut-presentoir-traiteur-montpellier-150x150.jpg",
  },
  {
    icon: Baby,
    title: "Baptemes & Baby Showers",
    description:
      "Celebrez l'arrivee de bebe avec delicatesse. Buffets doux et colores, canapes fins, boissons fraiches et patisseries personnalisees aux couleurs de votre evenement.",
    image: "/photos site/choux-violet-traiteur-montpellier-150x150.jpg",
  },
  {
    icon: TreePine,
    title: "Garden-Parties",
    description:
      "Profitez du climat mediterraneen avec une reception en plein air. Grazing tables, barbecue chic, brochettes gourmet et cocktails rafraichissants pour un moment convivial.",
    image: "/photos site/table-apero-dinatoire-traiteur-montpellier-150x150.jpg",
  },
  {
    icon: Heart,
    title: "Fiancailles & EVJF/EVG",
    description:
      "Marquez ce moment special avec une prestation qui reflete votre joie. Cocktail elegant, brunch gourmand ou apero dinatoire festif, selon vos envies.",
    image: "/photos site/apero-dinatoire-or-traiteur-montpellier-150x150.jpg",
  },
  {
    icon: Users,
    title: "Reunions de Famille",
    description:
      "Retrouvailles, fetes de famille, celebrations intergenerationnelles : nous proposons des menus genereux et varies qui plaisent a tous les ages et tous les palais.",
    image: "/photos site/cocktail-service-traiteur-montpellier-150x150.jpg",
  },
  {
    icon: Sparkles,
    title: "Evenements Sur Mesure",
    description:
      "Pendaison de cremaillere, pot de depart, soiree a theme... Chaque evenement merite une cuisine a la hauteur. Dites-nous votre vision, nous la concretisons.",
    image: "/photos site/apero-dinatoire-canape-traiteur-montpellier-150x150.jpg",
  },
];

const whyUs = [
  "Menu 100% personnalise selon vos gouts",
  "Produits frais et de saison",
  "Cuisine mediterraneenne et caribeenne",
  "Engagement eco-responsable",
  "Service discret et professionnel",
  "Livraison et installation incluses",
];

const faqItems = [
  {
    question: "Combien de temps a l'avance dois-je reserver pour un evenement prive ?",
    answer: "Pour garantir votre date et personnaliser votre menu, nous recommandons de nous contacter au minimum 3 semaines avant votre evenement. Pour les grandes celebrations (100+ convives), prevoyez 1 a 2 mois a l'avance.",
  },
  {
    question: "Proposez-vous un service de degustation avant l'evenement ?",
    answer: "Oui, pour les evenements de plus de 50 convives, nous proposons une degustation sur rendez-vous afin que vous puissiez valider les saveurs et l'esthetique des plats avant le jour J.",
  },
  {
    question: "Gerez-vous le service sur place ou uniquement la livraison ?",
    answer: "Nous proposons les deux formules. La livraison simple avec mise en place, ou le service complet avec notre equipe sur place pour assurer le service, le reapprovisionnement et le debarrassage.",
  },
  {
    question: "Peut-on mixer plusieurs types de cuisine dans un meme menu ?",
    answer: "Absolument ! C'est meme notre specialite. Notre cuisine s'inspire des traditions mediterraneennes et caribeennes, ce qui nous permet de creer des menus originaux et metisses qui surprennent agreablement vos convives.",
  },
  {
    question: "Fournissez-vous la decoration de table et la vaisselle ?",
    answer: "Nous fournissons la vaisselle, les couverts et le materiel de service. Pour la decoration de table (fleurs, bougies, nappes specifiques), nous pouvons vous orienter vers nos partenaires decorateurs de confiance.",
  },
  {
    question: "Quel est le nombre minimum de convives pour une prestation privee ?",
    answer: "Nous intervenons a partir de 10 convives. Pour les petits evenements intimes, nous proposons des formules adaptees : plateaux a partager, coffrets gourmands ou buffets compacts.",
  },
];

export default function EvenementsPrivesContent() {
  return (
    <PageTransition>
      <main>
        <PageHero
          subtitle="Evenements Prives"
          title="Celebrez vos"
          titleAccent="moments precieux"
          description="Une cuisine qui conjugue generosite, authenticite et delicatesse. Chaque detail est pense pour refleter votre sens de l'accueil et votre gout de l'excellence."
          image="/photos site/apero-dinatoire-canape-traiteur-montpellier-150x150.jpg"
        />

        {/* Intro */}
        <IntroSection />

        {/* Types de celebrations */}
        <CelebrationsGrid />

        {/* Why us */}
        <WhyUsSection />

        {/* CTA */}
        <CTASection />

        {/* FAQ */}
        <FAQ items={faqItems} title="Questions sur les evenements prives" />
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
              Votre evenement, notre passion
            </span>
            <h2
              className="mt-4 text-3xl font-bold tracking-tight text-black md:text-4xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Creez des souvenirs
              <br />
              <span className="text-purple">gourmands</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-neutral-600">
              Traiteur Montpellier imagine pour vos evenements prives des prestations personnalisees,
              ou chaque detail est pense pour refleter votre sens de l&apos;accueil et votre gout de
              l&apos;excellence discrete.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-500">
              Que ce soit pour un anniversaire intime, une garden-party estivale, un bapteme ou toute
              autre celebration, nous composons un menu qui raconte votre histoire. Notre cuisine
              d&apos;inspiration mediterraneenne et caribeenne apporte une touche d&apos;originalite a chaque
              assiette, tandis que notre engagement eco-responsable garantit des evenements aussi
              savoureux que respectueux.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8"
            >
              <Link
                href="/a-propos#devis"
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
                  src="/photos site/apero-dinatoire-canape-traiteur-montpellier-150x150.jpg"
                  alt="Canapes apero dinatoire Montpellier"
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
            Nos celebrations
          </span>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight text-black md:text-4xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Chaque moment merite <span className="text-purple">l&apos;exception</span>
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
                  alt={item.title}
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
                  href="/a-propos#devis"
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
                  src="/photos site/plat-haut-de-gamme-traiteur-montpellier-150x150.jpg"
                  alt="Plat haut de gamme"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src="/photos site/macarons-traiteur-montpellier-150x150.jpg"
                  alt="Macarons"
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
              La difference Traiteur Montpellier
            </span>
            <h2
              className="mt-4 text-3xl font-bold tracking-tight text-black md:text-4xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Pourquoi nous <span className="text-purple">choisir</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-neutral-600">
              Du premier contact au dernier service, nous sommes a vos cotes. Notre approche
              sincere et soignee fait de chaque celebration un moment unique et inoubliable.
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
            Un evenement a celebrer ?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
            Racontez-nous votre projet et recevez une proposition gourmande et personnalisee.
            Devis gratuit et sans engagement sous 24h.
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
