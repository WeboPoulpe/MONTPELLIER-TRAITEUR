import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, Building2, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import PageTransition from "@/components/PageTransition";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/SeoJsonLd";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Traiteur Sète — Livraison et Service depuis Montpellier",
  description:
    "Traiteur à Sète pour événements d'entreprise, cocktails et réceptions. Livraison et service sur place depuis Montpellier en 30 min. Devis gratuit sous 24h.",
  keywords: [
    "traiteur sete",
    "traiteur sète",
    "traiteur événement sète",
    "cocktail dinatoire sète",
    "traiteur entreprise sète",
    "livraison traiteur sète",
    "traiteur herault littoral",
  ],
  alternates: {
    canonical: "https://www.traiteurmontpellier.com/traiteur-sete",
  },
  openGraph: {
    title: "Traiteur Sète | Traiteur Montpellier",
    description:
      "Cocktails, repas et réceptions sur mesure à Sète et sur le littoral héraultais. Livraison et service disponibles.",
    url: "https://www.traiteurmontpellier.com/traiteur-sete",
    siteName: "Traiteur Montpellier",
    locale: "fr_FR",
    type: "website",
  },
};

const atouts = [
  "Livraison réfrigérée à Sète (30 km)",
  "Service avec personnel sur place disponible",
  "Expérience des lieux atypiques (bateaux, quais, pinèdes)",
  "Cuisine méditerranéenne adaptée au littoral",
  "Formules cocktail, buffet, brunch et repas assis",
  "Devis sous 24h, livraison ponctuelle garantie",
];

const lieuxSete = [
  {
    nom: "Mont Saint-Clair et domaines privés",
    detail: "Vue panoramique sur l'étang de Thau et la Méditerranée — idéal pour réceptions haut de gamme et événements uniques.",
  },
  {
    nom: "Quais et espaces portuaires",
    detail: "Événements nautiques, soirées d'entreprise sur les quais — une logistique que nous maîtrisons avec des accès spécifiques.",
  },
  {
    nom: "Zone d'activités de Sète-Frontignan",
    detail: "Cocktails déjeunatoires, anniversaires de société et inaugurations pour les entreprises de la zone portuaire et industrielle.",
  },
  {
    nom: "Plages et espaces événementiels du littoral",
    detail: "Team building, séminaires de fin d'année et garden-parties entre mer et étang avec service clé en main.",
  },
];

export default function TraiteurSetePage() {
  return (
    <PageTransition>
      <main>
        <BreadcrumbJsonLd
          items={[
            { name: "Accueil", url: "https://www.traiteurmontpellier.com" },
            {
              name: "Traiteur Sète",
              url: "https://www.traiteurmontpellier.com/traiteur-sete",
            },
          ]}
        />
        <ServiceJsonLd
          id="traiteur-sete"
          name="Traiteur à Sète"
          description="Livraison et service traiteur à Sète et sur le littoral héraultais pour événements d'entreprise, cocktails et réceptions privées. À 30 km de Montpellier."
          serviceType="Traiteur événementiel"
          url="https://www.traiteurmontpellier.com/traiteur-sete"
        />

        <PageHero
          subtitle="Zone d'intervention"
          title="Traiteur à"
          titleAccent="Sète"
          description="Réceptions sur mesure, cocktails et repas d'affaires livrés ou servis à Sète et sur le littoral héraultais. Notre équipe intervient depuis Montpellier."
          image="/photos site/apero-dinatoire-traiteur-montpellier.webp"
          ctaLabel="Demander un devis"
          ctaHref="/devis"
        />

        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <span className="text-xs font-semibold tracking-[0.25em] text-purple uppercase">
                  Sète &amp; littoral héraultais
                </span>
                <h2
                  className="mt-4 text-3xl font-bold text-black md:text-4xl"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Un traiteur de Montpellier qui intervient à Sète
                </h2>
                <p className="mt-6 leading-relaxed text-neutral-600">
                  À 30 km via l&apos;A9, Sète est l&apos;une de nos destinations les plus fréquentes.
                  Ville singulière entre mer et étang, elle accueille des événements à la personnalité
                  forte — des soirées sur les quais aux réceptions dans les domaines des hauteurs du
                  Mont Saint-Clair.
                </p>
                <p className="mt-4 leading-relaxed text-neutral-600">
                  Notre cuisine méditerranéenne et caraïbéenne s&apos;accorde naturellement avec
                  l&apos;identité de Sète. Nous gérons la logistique spécifique des lieux atypiques
                  — accès quais, espaces sans cuisine, sites en extérieur — avec le même soin qu&apos;un
                  événement en salle classique.
                </p>
                <div className="mt-8 flex flex-wrap gap-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-purple" />
                    <span className="text-sm font-medium text-neutral-700">30 km depuis Montpellier</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-purple" />
                    <span className="text-sm font-medium text-neutral-700">30 min via A9</span>
                  </div>
                </div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image
                  src="/photos site/apero-dinatoire-canape-traiteur-montpellier.webp"
                  alt="Apéro dinatoire traiteur à Sète"
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
                Ce que nous proposons à Sète
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-neutral-600">
                Des prestations pensées pour les spécificités du littoral et de la Venise du Languedoc.
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
                Lieux où nous intervenons à Sète
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {lieuxSete.map((lieu) => (
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
              Nos prestations pour Sète
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                { href: "/entreprises", label: "Événements d'entreprise", desc: "Cocktails pro, séminaires, repas d'affaires et inaugurations à Sète." },
                { href: "/foires-salons", label: "Foires et salons", desc: "Stand traiteur, plateau repas et animation sur les salons du littoral." },
                { href: "/evenements-prives", label: "Réceptions privées", desc: "Mariage, vin d'honneur, anniversaire entre mer et étang de Thau." },
                { href: "/mariage", label: "Mariage et vin d'honneur", desc: "Cocktail, buffet et réception de mariage à Sète et sur le littoral." },
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
                { href: "/traiteur-beziers", label: "Traiteur Béziers" },
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
              Un événement à Sète ou sur le littoral&nbsp;?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/60">
              Décrivez votre projet — date, lieu, nombre d&apos;invités. Nous vous répondons sous 24h
              avec une proposition adaptée à votre événement sétois.
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
