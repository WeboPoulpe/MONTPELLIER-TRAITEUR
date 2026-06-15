import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, Building2, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import PageTransition from "@/components/PageTransition";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/SeoJsonLd";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Traiteur Lunel — Livraison et Service depuis Montpellier",
  description:
    "Traiteur à Lunel pour événements d'entreprise, cocktails et réceptions privées. Livraison rapide depuis Montpellier en 20 min. Devis gratuit sous 24h.",
  keywords: [
    "traiteur lunel",
    "traiteur événement lunel",
    "cocktail dinatoire lunel",
    "traiteur entreprise lunel",
    "livraison traiteur lunel",
    "traiteur herault est",
    "traiteur entre montpellier nimes",
  ],
  alternates: {
    canonical: "https://www.traiteurmontpellier.com/traiteur-lunel",
  },
  openGraph: {
    title: "Traiteur Lunel | Traiteur Montpellier",
    description:
      "Cocktails, repas et réceptions sur mesure à Lunel et dans l'est héraultais. Livraison express depuis Montpellier.",
    url: "https://www.traiteurmontpellier.com/traiteur-lunel",
    siteName: "Traiteur Montpellier",
    locale: "fr_FR",
    type: "website",
  },
};

const atouts = [
  "Livraison réfrigérée à Lunel (25 km)",
  "Intervention express possible le jour même",
  "Service avec personnel sur place disponible",
  "Cuisine méditerranéenne sur mesure",
  "Formules cocktail, buffet, plateau repas et repas assis",
  "Devis sous 24h, tarifs sans majoration distance",
];

const lieuxLunel = [
  {
    nom: "Zone d'activités La Plaine et Les Étuves",
    detail: "Nombreuses entreprises industrielles et tertiaires — cocktails de fin d'année, inaugurations et repas d'affaires livrés directement sur site.",
  },
  {
    nom: "Salle des fêtes et salles de réception",
    detail: "Réceptions privées, anniversaires et célébrations familiales à Lunel et dans les communes alentour — Lunel-Viel, Saturargues, Valergues.",
  },
  {
    nom: "Hippodrome de Lunel",
    detail: "Événements équestres, galas et soirées d'entreprise dans un cadre atypique entre Montpellier et Nîmes.",
  },
  {
    nom: "Communes du Lunellois",
    detail: "Boisseron, Restinclières, Saint-Just, Villetelle — nous couvrons tout le bassin lunellois pour vos événements privés et professionnels.",
  },
];

export default function TraiteurLunelPage() {
  return (
    <PageTransition>
      <main>
        <BreadcrumbJsonLd
          items={[
            { name: "Accueil", url: "https://www.traiteurmontpellier.com" },
            {
              name: "Traiteur Lunel",
              url: "https://www.traiteurmontpellier.com/traiteur-lunel",
            },
          ]}
        />
        <ServiceJsonLd
          id="traiteur-lunel"
          name="Traiteur à Lunel"
          description="Livraison et service traiteur à Lunel et dans l'est héraultais pour événements d'entreprise et réceptions privées. À seulement 25 km de Montpellier."
          serviceType="Traiteur événementiel"
          url="https://www.traiteurmontpellier.com/traiteur-lunel"
        />

        <PageHero
          subtitle="Zone d'intervention"
          title="Traiteur à"
          titleAccent="Lunel"
          description="Cocktails, repas et réceptions sur mesure à Lunel et dans tout le bassin lunellois. À 25 km de Montpellier, notre équipe intervient rapidement sur place."
          image="/photos site/canape-concombre-traiteur-montpellier.webp"
          ctaLabel="Demander un devis"
          ctaHref="/devis"
        />

        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <span className="text-xs font-semibold tracking-[0.25em] text-purple uppercase">
                  Lunel &amp; est héraultais
                </span>
                <h2
                  className="mt-4 text-3xl font-bold text-black md:text-4xl"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Un traiteur de Montpellier qui intervient à Lunel
                </h2>
                <p className="mt-6 leading-relaxed text-neutral-600">
                  Lunel est l&apos;une de nos zones d&apos;intervention les plus proches — 25 km
                  via l&apos;A9, soit moins de 20 minutes. Cette proximité nous permet d&apos;intervenir
                  dans des délais courts et même de répondre à des demandes de dernière minute dans
                  certains cas.
                </p>
                <p className="mt-4 leading-relaxed text-neutral-600">
                  Ville carrefour entre Montpellier et Nîmes, Lunel concentre un tissu économique
                  actif — zones d&apos;activités, commerces et services — qui génère une demande
                  régulière en traiteur pour des événements professionnels et des réceptions privées.
                </p>
                <div className="mt-8 flex flex-wrap gap-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-purple" />
                    <span className="text-sm font-medium text-neutral-700">25 km depuis Montpellier</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-purple" />
                    <span className="text-sm font-medium text-neutral-700">20 min via A9</span>
                  </div>
                </div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image
                  src="/photos site/canapes-mousse-lavande-traiteur-montpellier.webp"
                  alt="Canapés traiteur à Lunel"
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
                Ce que nous proposons à Lunel
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-neutral-600">
                La réactivité en plus — notre position vous garantit des délais courts et des tarifs sans surprises.
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
                Lieux où nous intervenons à Lunel
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {lieuxLunel.map((lieu) => (
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
              Nos prestations pour Lunel
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                { href: "/entreprises", label: "Événements d'entreprise", desc: "Cocktails pro, repas d'affaires et inaugurations à Lunel et dans le Lunellois." },
                { href: "/foires-salons", label: "Stands et salons", desc: "Livraison sur stand et plateau repas pour les événements de la région." },
                { href: "/evenements-prives", label: "Réceptions privées", desc: "Anniversaire, vin d'honneur et garden-party dans le bassin lunellois." },
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

        <section className="bg-purple-dark py-20 text-center">
          <div className="mx-auto max-w-3xl px-6">
            <h2
              className="text-3xl font-bold text-white md:text-4xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Un événement à Lunel ou dans le Lunellois&nbsp;?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/60">
              Donnez-nous la date, le lieu et le nombre d&apos;invités. Réponse sous 24h,
              livraison rapide garantie depuis Montpellier.
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
