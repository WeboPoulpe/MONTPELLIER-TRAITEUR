"use client";

import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Check,
  Clock,
  Coffee,
  GlassWater,
  Heart,
  PartyPopper,
  Sparkles,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import FAQ from "@/components/FAQ";
import PageHero from "@/components/PageHero";
import PageTransition from "@/components/PageTransition";

type FaqItem = {
  question: string;
  answer: string;
};

const offers = [
  {
    icon: GlassWater,
    title: "Vin d'honneur",
    description:
      "Pieces cocktail, verrines, bouchées froides ou chaudes, boissons et presentation elegante pour accueillir vos invites.",
  },
  {
    icon: PartyPopper,
    title: "Cocktail & buffet",
    description:
      "Buffet convivial, grazing table, mignardises salees et sucrées, formats faciles a partager pour une reception fluide.",
  },
  {
    icon: Users,
    title: "Repas prive",
    description:
      "Menu sur mesure pour une reception familiale ou un mariage civil, avec livraison, installation ou service selon le besoin.",
  },
  {
    icon: Coffee,
    title: "Brunch du lendemain",
    description:
      "Assortiment sale et sucre, fruits, viennoiseries, boissons et pieces a partager pour prolonger le moment simplement.",
  },
];

const fitItems = [
  "Mariage civil ou reception familiale",
  "Vin d'honneur, cocktail, buffet ou brunch",
  "Demande detaillee avec date, lieu et nombre de convives",
  "Prestation sur mesure plutot qu'une formule standardisee",
];

const avoidItems = [
  "Recherche d'une salle, d'un DJ ou d'un photographe",
  "Demande sans date, lieu ni nombre de convives",
  "Comparaison uniquement sur le prix le plus bas",
  "Organisation complete de mariage de type wedding planner",
];

export default function MariageContent({ faqItems }: { faqItems: FaqItem[] }) {
  return (
    <PageTransition>
      <main>
        <PageHero
          subtitle="Traiteur mariage"
          title="Un traiteur pour"
          titleAccent="votre mariage"
          description="Cocktail, vin d'honneur, buffet, repas de reception ou brunch du lendemain : composez une prestation gourmande et sur mesure pour partager un moment memorable avec vos proches."
          image="/photos site/mise-en-place-traiteur-montpellier.webp"
          ctaLabel="Demander un devis"
          ctaHref="/devis"
        />

        <PositioningSection />
        <OffersSection />
        <QualificationSection />
        <ProcessSection />
        <CtaSection />
        <FAQ items={faqItems} title="Questions sur le traiteur mariage" />
      </main>
    </PageTransition>
  );
}

function PositioningSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-semibold tracking-[0.3em] text-purple uppercase">
            Reception de mariage a Montpellier
          </span>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight text-black md:text-4xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Une cuisine genereuse
            <br />
            <span className="text-purple">pour un jour qui compte</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-neutral-600">
            Votre mariage merite une table qui rassemble. Traiteur Montpellier vous accompagne
            pour imaginer une reception a votre image : pieces cocktail, buffet elegant, repas
            convivial, douceurs sucrees ou brunch du lendemain.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-neutral-500">
            Chaque proposition est construite selon votre date, votre lieu, le nombre de convives
            et l&apos;ambiance souhaitee. Vous nous partagez votre projet, nous vous repondons avec une
            solution claire, soignee et adaptee a votre reception.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-3xl">
            <div className="relative aspect-[4/3]">
              <Image
                src="/photos site/apero-dinatoire-canape-traiteur-montpellier.webp"
                alt="Canapes et pieces cocktail pour reception de mariage a Montpellier"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
          <div className="absolute -right-4 -bottom-4 rounded-2xl bg-purple p-6 text-white shadow-2xl shadow-purple/30">
            <Heart className="h-7 w-7" />
            <p className="mt-3 max-w-44 text-sm font-semibold">
              Reception privee, cocktail, buffet et brunch sur devis.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function OffersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-neutral-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-xs font-semibold tracking-[0.3em] text-purple uppercase">
            Formats proposes
          </span>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight text-black md:text-4xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Une offre mariage centree sur <span className="text-purple">la reception</span>
          </h2>
          <p className="mt-5 text-neutral-600">
            La page doit vendre les formats que l&apos;equipe peut traiter efficacement, sans attirer
            des demandes qui sortent du metier traiteur.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-xl hover:shadow-purple/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple/10 text-purple">
                <offer.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-bold text-black">{offer.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">{offer.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QualificationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-xs font-semibold tracking-[0.3em] text-purple uppercase">
            Qualifier avant de vendre
          </span>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight text-black md:text-4xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Attirer les bonnes demandes,
            <br />
            <span className="text-purple">filtrer les mauvaises</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <CheckList
            title="Demandes a encourager"
            icon={Check}
            items={fitItems}
            tone="positive"
          />
          <CheckList
            title="Demandes a eviter"
            icon={Sparkles}
            items={avoidItems}
            tone="neutral"
          />
        </div>
      </div>
    </section>
  );
}

function CheckList({
  title,
  icon: Icon,
  items,
  tone,
}: {
  title: string;
  icon: typeof Check;
  items: string[];
  tone: "positive" | "neutral";
}) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-8">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
            tone === "positive" ? "bg-purple text-white" : "bg-neutral-200 text-neutral-700"
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-bold text-black">{title}</h3>
      </div>
      <ul className="mt-7 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-neutral-700">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-purple" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProcessSection() {
  const steps = [
    "Vous envoyez les informations essentielles : date, lieu, nombre de convives et format souhaite.",
    "Nous qualifions la demande pour verifier le format, le niveau de service et la faisabilite.",
    "Nous preparons un devis adapte dans Digifactory, avec les options utiles uniquement.",
  ];

  return (
    <section className="bg-neutral-950 py-24 text-white lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="text-xs font-semibold tracking-[0.3em] text-purple-light uppercase">
              Parcours simple
            </span>
            <h2
              className="mt-4 text-3xl font-bold tracking-tight md:text-4xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Une demande claire donne un devis utile.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              Cette page doit aider le prospect a formuler une demande exploitable, pas seulement
              generer du volume. C&apos;est ce qui permettra ensuite de mesurer les leads vendables.
            </p>
          </div>

          <div className="space-y-5">
            {steps.map((step, index) => (
              <div key={step} className="flex gap-5 rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-purple text-sm font-bold">
                  {index + 1}
                </div>
                <p className="text-sm leading-relaxed text-white/75">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
        <Clock className="mx-auto h-10 w-10 text-purple" />
        <h2
          className="mt-5 text-3xl font-bold tracking-tight text-black md:text-4xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Un mariage, un vin d&apos;honneur ou un brunch a organiser ?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-neutral-600">
          Envoyez une demande avec votre date, votre lieu, le nombre de convives et le format
          souhaite. Nous vous repondons avec une proposition adaptee si la prestation correspond a
          notre savoir-faire.
        </p>
        <Link
          href="/devis"
          className="mt-9 inline-flex items-center gap-3 rounded-full bg-purple px-9 py-4 text-sm font-semibold tracking-widest text-white uppercase transition-all hover:bg-purple-dark"
        >
          Demander un devis
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
