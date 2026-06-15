import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, Building2, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import PageTransition from "@/components/PageTransition";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/SeoJsonLd";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Traiteur Nîmes — Livraison et Service depuis Montpellier",
  description:
    "Traiteur à Nîmes pour vos événements d'entreprise, cocktails et réceptions privées. Livraison et service sur place depuis Montpellier. Devis gratuit sous 24h.",
  keywords: [
    "traiteur nimes",
    "traiteur nîmes",
    "traiteur événement nîmes",
    "cocktail dinatoire nîmes",
    "traiteur entreprise nîmes",
    "livraison traiteur nîmes",
    "traiteur gard",
  ],
  alternates: {
    canonical: "https://www.traiteurmontpellier.com/traiteur-nimes",
  },
  openGraph: {
    title: "Traiteur Nîmes | Traiteur Montpellier",
    description:
      "Cocktails, repas d'affaires et réceptions sur mesure à Nîmes. Livraison et service complet disponibles.",
    url: "https://www.traiteurmontpellier.com/traiteur-nimes",
    siteName: "Traiteur Montpellier",
    locale: "fr_FR",
    type: "website",
  },
};

const atouts = [
  "Livraison réfrigérée jusqu'à Nîmes (55 km)",
  "Service avec personnel sur place disponible",
  "Devis sous 24h, quelle que soit la date",
  "Cuisine méditerranéenne et caraïbéenne",
  "Formules cocktail, repas assis, brunch, stand",
  "Expérience sur les salons et foires du Gard",
];

const lieuxNimes = [
  {
    nom: "Carrée d'Art et place de la Maison Carrée",
    detail: "Cœur historique de Nîmes — idéal pour les réceptions haut de gamme et événements culturels.",
  },
  {
    nom: "Palais des Congrès de Nîmes",
    detail: "Séminaires, conférences et grands banquets. Cuisine disponible sur place, accès livraison aisé.",
  },
  {
    nom: "Arena de Nîmes",
    detail: "Grands événements corporate, soirées gala et salons professionnels dans un cadre exceptionnel.",
  },
  {
    nom: "Parcs d'activités Ville Active et Léon Blum",
    detail: "Zones d'entreprises actives — cocktails déjeunatoires, anniversaires de société et inaugurations.",
  },
];

export default function TraiteurNimesPage() {
  return (
    <PageTransition>
      <main>
        <BreadcrumbJsonLd
          items={[
            { name: "Accueil", url: "https://www.traiteurmontpellier.com" },
            {
              name: "Traiteur Nîmes",
              url: "https://www.traiteurmontpellier.com/traiteur-nimes",
            },
          ]}
        />
        <ServiceJsonLd
          id="traiteur-nimes"
          name="Traiteur à Nîmes"
          description="Livraison et service traiteur à Nîmes pour événements d'entreprise, cocktails dinatoires et réceptions privées. Depuis Montpellier, à 55 km."
          serviceType="Traiteur événementiel"
          url="https://www.traiteurmontpellier.com/traiteur-nimes"
        />

        <PageHero
          subtitle="Zone d'intervention"
          title="Traiteur à"
          titleAccent="Nîmes"
          description="Cocktails, repas d'affaires et réceptions sur mesure livrés ou servis à Nîmes et dans le Gard. Notre équipe intervient sur place depuis Montpellier."
          image="/photos site/cocktail-service-traiteur-montpellier.webp"
          ctaLabel="Demander un devis"
          ctaHref="/devis"
        />

        {/* Intro + distance */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <span className="text-xs font-semibold tracking-[0.25em] text-purple uppercase">
                  Nîmes &amp; Gard
                </span>
                <h2
                  className="mt-4 text-3xl font-bold text-black md:text-4xl"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Un traiteur de Montpellier qui intervient à Nîmes
                </h2>
                <p className="mt-6 leading-relaxed text-neutral-600">
                  À 55 km via l&apos;A9, Nîmes fait partie de notre zone d&apos;intervention régulière.
                  Que vous organisiez un cocktail dinatoire pour votre entreprise, une inauguration,
                  un séminaire ou une réception privée, nous livrons et assurons le service sur place.
                </p>
                <p className="mt-4 leading-relaxed text-neutral-600">
                  Nous avons l&apos;habitude des sites nîmois — de l&apos;Arène au Palais des Congrès,
                  des zones d&apos;activités aux domaines privés. La distance n&apos;allonge pas vos
                  délais&nbsp;: devis sous 24h, livraison ponctuelle, équipe disponible sur place si besoin.
                </p>
                <div className="mt-8 flex flex-wrap gap-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-purple" />
                    <span className="text-sm font-medium text-neutral-700">55 km depuis Montpellier</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-purple" />
                    <span className="text-sm font-medium text-neutral-700">45 min via A9</span>
                  </div>
                </div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image
                  src="/photos site/cocktail-dinatoire-traiteur-montpellier-1.webp"
                  alt="Cocktail dinatoire traiteur à Nîmes"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Atouts */}
        <section className="bg-neutral-50 py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="text-center">
              <h2
                className="text-3xl font-bold text-black md:text-4xl"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Ce que nous proposons à Nîmes
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-neutral-600">
                Les mêmes prestations qu&apos;à Montpellier, livrées dans le Gard avec la même exigence.
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

        {/* Lieux */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="text-center">
              <Building2 className="mx-auto h-8 w-8 text-purple" />
              <h2
                className="mt-4 text-3xl font-bold text-black md:text-4xl"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Lieux où nous intervenons à Nîmes
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {lieuxNimes.map((lieu) => (
                <article key={lieu.nom} className="rounded-2xl border border-neutral-100 p-7">
                  <h3 className="text-base font-bold text-black">{lieu.nom}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{lieu.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Prestations links */}
        <section className="bg-neutral-50 py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <h2
              className="text-center text-3xl font-bold text-black md:text-4xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Nos prestations pour Nîmes
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                { href: "/entreprises", label: "Événements d'entreprise", desc: "Séminaires, cocktails pro, inaugurations, repas d'affaires." },
                { href: "/foires-salons", label: "Foires et salons", desc: "Livraison sur stand, plateau repas, animation culinaire." },
                { href: "/evenements-prives", label: "Réceptions privées", desc: "Anniversaire, vin d'honneur, garden-party dans le Gard." },
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

        {/* CTA */}
        <section className="bg-purple-dark py-20 text-center">
          <div className="mx-auto max-w-3xl px-6">
            <h2
              className="text-3xl font-bold text-white md:text-4xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Un événement à Nîmes ou dans le Gard&nbsp;?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/60">
              Donnez-nous la date, le lieu et le nombre d&apos;invités. Nous vous répondons sous 24h
              avec une proposition adaptée à votre projet.
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
