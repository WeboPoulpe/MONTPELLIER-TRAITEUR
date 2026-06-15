import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, Building2, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import PageTransition from "@/components/PageTransition";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/SeoJsonLd";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Traiteur Béziers — Livraison et Service depuis Montpellier",
  description:
    "Traiteur à Béziers pour vos événements d'entreprise, cocktails dinatoires et réceptions. Livraison et service depuis Montpellier. Devis gratuit sous 24h.",
  keywords: [
    "traiteur beziers",
    "traiteur béziers",
    "traiteur événement béziers",
    "cocktail dinatoire béziers",
    "traiteur entreprise béziers",
    "livraison traiteur béziers",
    "traiteur herault ouest",
  ],
  alternates: {
    canonical: "https://www.traiteurmontpellier.com/traiteur-beziers",
  },
  openGraph: {
    title: "Traiteur Béziers | Traiteur Montpellier",
    description:
      "Cocktails, repas d'affaires et réceptions sur mesure à Béziers. Livraison et service complet disponibles depuis Montpellier.",
    url: "https://www.traiteurmontpellier.com/traiteur-beziers",
    siteName: "Traiteur Montpellier",
    locale: "fr_FR",
    type: "website",
  },
};

const atouts = [
  "Livraison réfrigérée à Béziers (65 km)",
  "Service avec personnel sur place disponible",
  "Devis sous 24h, réponse rapide garantie",
  "Cuisine méditerranéenne et caraïbéenne raffinée",
  "Formules adaptées aux grandes tablées et cocktails debout",
  "Expérience salons et événements professionnels",
];

const lieuxBeziers = [
  {
    nom: "Palais des Congrès de Béziers",
    detail: "Conférences, séminaires et galas — un lieu polyvalent où nous assurons livraison et service avec toute notre équipe.",
  },
  {
    nom: "Stade de la Méditerranée et Arènes",
    detail: "Événements d'envergure, soirées d'entreprise et hospitalités lors de grands rendez-vous sportifs et culturels.",
  },
  {
    nom: "Zone d'activités Montimaran et Soleil",
    detail: "Cocktails de fin d'année, inaugurations et anniversaires d'entreprise pour les sociétés des zones d'activités biterroises.",
  },
  {
    nom: "Domaines viticoles et bastides de l'Hérault",
    detail: "Réceptions privées haut de gamme dans les domaines viticoles entre Béziers et Pézenas — un cadre exceptionnel pour vos événements.",
  },
];

export default function TraiteurBeziersPage() {
  return (
    <PageTransition>
      <main>
        <BreadcrumbJsonLd
          items={[
            { name: "Accueil", url: "https://www.traiteurmontpellier.com" },
            {
              name: "Traiteur Béziers",
              url: "https://www.traiteurmontpellier.com/traiteur-beziers",
            },
          ]}
        />
        <ServiceJsonLd
          id="traiteur-beziers"
          name="Traiteur à Béziers"
          description="Livraison et service traiteur à Béziers pour événements d'entreprise, cocktails dinatoires et réceptions privées. Depuis Montpellier, à 65 km."
          serviceType="Traiteur événementiel"
          url="https://www.traiteurmontpellier.com/traiteur-beziers"
        />

        <PageHero
          subtitle="Zone d'intervention"
          title="Traiteur à"
          titleAccent="Béziers"
          description="Cocktails, repas d'affaires et réceptions sur mesure livrés ou servis à Béziers et dans l'ouest de l'Hérault. Notre équipe intervient depuis Montpellier."
          image="/photos site/assiette-dressage-salon-traiteur-montpellier.webp"
          ctaLabel="Demander un devis"
          ctaHref="/devis"
        />

        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <span className="text-xs font-semibold tracking-[0.25em] text-purple uppercase">
                  Béziers &amp; ouest Hérault
                </span>
                <h2
                  className="mt-4 text-3xl font-bold text-black md:text-4xl"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Un traiteur de Montpellier qui intervient à Béziers
                </h2>
                <p className="mt-6 leading-relaxed text-neutral-600">
                  À 65 km via l&apos;A9, Béziers est la deuxième ville de l&apos;Hérault. Avec
                  plus de 80 000 habitants et un tissu économique dense, elle accueille de nombreux
                  événements professionnels — séminaires, inaugurations, repas d&apos;affaires et
                  cocktails d&apos;entreprise.
                </p>
                <p className="mt-4 leading-relaxed text-neutral-600">
                  Nous intervenons régulièrement dans l&apos;ouest héraultais et gérons la distance
                  sans impacter votre budget ou la qualité de la prestation. Livraison isotherme,
                  équipe ponctuelle, cuisine élaborée sur place si nécessaire.
                </p>
                <div className="mt-8 flex flex-wrap gap-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-purple" />
                    <span className="text-sm font-medium text-neutral-700">65 km depuis Montpellier</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-purple" />
                    <span className="text-sm font-medium text-neutral-700">50 min via A9</span>
                  </div>
                </div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image
                  src="/photos site/bouchees-boeuf-traiteur-montpellier.webp"
                  alt="Bouchées cocktail traiteur à Béziers"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-neutral-50 py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="text-center">
              <h2
                className="text-3xl font-bold text-black md:text-4xl"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Ce que nous proposons à Béziers
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-neutral-600">
                Des prestations de qualité montpelliéraine livrées dans tout l&apos;ouest de l&apos;Hérault.
              </p>
            </div>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {atouts.map((a) => (
                <li key={a} className="flex items-start gap-3 rounded-2xl bg-white p-5 shadow-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-purple" />
                  <span className="text-sm text-neutral-700">{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="text-center">
              <Building2 className="mx-auto h-8 w-8 text-purple" />
              <h2
                className="mt-4 text-3xl font-bold text-black md:text-4xl"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Lieux où nous intervenons à Béziers
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {lieuxBeziers.map((lieu) => (
                <article key={lieu.nom} className="rounded-2xl border border-neutral-100 p-7">
                  <h3 className="text-base font-bold text-black">{lieu.nom}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{lieu.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-neutral-50 py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <h2
              className="text-center text-3xl font-bold text-black md:text-4xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Nos prestations pour Béziers
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                { href: "/entreprises", label: "Événements d'entreprise", desc: "Séminaires, cocktails pro, repas d'affaires et inaugurations à Béziers." },
                { href: "/foires-salons", label: "Foires et salons", desc: "Livraison sur stand, animation culinaire et plateau repas à Béziers Expo." },
                { href: "/evenements-prives", label: "Réceptions privées", desc: "Anniversaire, mariage et garden-party dans les domaines de l'ouest Hérault." },
              ].map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="group rounded-2xl border border-neutral-100 bg-white p-7 transition-all hover:-translate-y-1 hover:border-purple/20 hover:shadow-xl"
                >
                  <h3 className="text-lg font-bold text-black">{p.label}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{p.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-purple">
                    Voir la prestation
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Maillage villes */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="text-center text-xl font-bold text-black">
              Nos autres zones d&apos;intervention
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {[
                { href: "/traiteur-nimes", label: "Traiteur Nîmes" },
                { href: "/traiteur-sete", label: "Traiteur Sète" },
                { href: "/traiteur-lunel", label: "Traiteur Lunel" },
                { href: "/guide-local", label: "Guide local Montpellier" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-full border border-neutral-200 px-5 py-2 text-sm font-medium text-neutral-600 transition-all hover:border-purple hover:text-purple"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-purple-dark py-20 text-center">
          <div className="mx-auto max-w-3xl px-6">
            <h2
              className="text-3xl font-bold text-white md:text-4xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Un événement à Béziers ou dans l&apos;ouest Hérault&nbsp;?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/60">
              Donnez-nous la date, le lieu et le nombre d&apos;invités. Nous vous répondons sous 24h
              avec une proposition adaptée à votre projet biterrois.
            </p>
            <Link
              href="/devis"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-purple px-8 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Demander un devis gratuit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
