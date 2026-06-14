import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  MapPin,
  PartyPopper,
  UtensilsCrossed,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import PageTransition from "@/components/PageTransition";
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
} from "@/components/SeoJsonLd";

export const metadata: Metadata = {
  title: "Guide Événementiel Local à Montpellier",
  description:
    "Lieux, quartiers, formats et conseils pratiques pour organiser un événement professionnel ou privé à Montpellier avec un traiteur local.",
  alternates: {
    canonical: "https://www.traiteurmontpellier.com/guide-local",
  },
  openGraph: {
    title: "Guide local de l'événementiel à Montpellier",
    description:
      "Conseils locaux pour choisir votre lieu, anticiper la logistique et organiser une réception réussie à Montpellier.",
    url: "https://www.traiteurmontpellier.com/guide-local",
    type: "article",
  },
};

const areas = [
  {
    title: "Centre historique et Écusson",
    text: "Idéal pour les réceptions de caractère. Les accès étroits, les zones piétonnes et les horaires de livraison doivent être validés avec le lieu en amont.",
  },
  {
    title: "Port Marianne et Odysseum",
    text: "Un secteur adapté aux événements d'entreprise, lancements et cocktails, avec des espaces contemporains et une bonne accessibilité depuis l'autoroute.",
  },
  {
    title: "Antigone et Corum",
    text: "Pratique pour les congrès, séminaires et événements professionnels. Anticipez les flux de participants et les créneaux d'installation du traiteur.",
  },
  {
    title: "Littoral et alentours",
    text: "De Lattes à Palavas-les-Flots, les domaines et lieux extérieurs conviennent aux grandes réceptions. Prévoyez une solution météo et les besoins électriques.",
  },
];

const formats = [
  {
    icon: Building2,
    title: "Séminaire et conférence",
    text: "Accueil café, pauses, déjeuner et cocktail de clôture pensés selon le rythme de votre programme.",
    href: "/entreprises",
  },
  {
    icon: UtensilsCrossed,
    title: "Foire et salon",
    text: "Livraison sur stand, paniers individuels, grazing table ou cocktail VIP avec logistique adaptée au parc des expositions.",
    href: "/foires-salons",
  },
  {
    icon: PartyPopper,
    title: "Réception privée",
    text: "Anniversaire, baptême ou garden-party avec menu sur mesure, livraison ou service complet.",
    href: "/evenements-prives",
  },
];

export default function GuideLocalPage() {
  return (
    <PageTransition>
      <main>
        <BreadcrumbJsonLd
          items={[
            { name: "Accueil", url: "https://www.traiteurmontpellier.com" },
            {
              name: "Guide local",
              url: "https://www.traiteurmontpellier.com/guide-local",
            },
          ]}
        />
        <ArticleJsonLd
          title="Guide local pour organiser un événement à Montpellier"
          description="Conseils pratiques sur les quartiers, les formats et la logistique événementielle à Montpellier."
          image="https://www.traiteurmontpellier.com/photos%20site/cocktail-service-traiteur-montpellier.webp"
          url="https://www.traiteurmontpellier.com/guide-local"
          publishedAt="2026-06-14T00:00:00+02:00"
          updatedAt="2026-06-14T00:00:00+02:00"
        />
        <PageHero
          subtitle="Guide local"
          title="Organiser un événement"
          titleAccent="à Montpellier"
          description="Les repères locaux pour choisir votre format, préparer la logistique et recevoir vos invités dans les meilleures conditions."
          image="/photos site/cocktail-service-traiteur-montpellier.webp"
          ctaLabel="Décrire mon événement"
          ctaHref="/devis"
        />

        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <span className="text-xs font-semibold tracking-[0.25em] text-purple uppercase">
                  Bien préparer sa réception
                </span>
                <h2
                  className="mt-4 text-3xl font-bold text-black md:text-4xl"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Les points à valider avant de réserver
                </h2>
                <p className="mt-6 leading-relaxed text-neutral-600">
                  À Montpellier, le choix du lieu influence directement la livraison,
                  l&apos;installation et le type de service. Vérifiez les accès, le
                  stationnement, les horaires autorisés, la cuisine disponible et la
                  puissance électrique avant de finaliser votre formule traiteur.
                </p>
                <ul className="mt-6 list-disc space-y-3 pl-5 text-sm text-neutral-700">
                  <li>Nombre d&apos;invités et configuration assise ou debout</li>
                  <li>Accès livraison, monte-charge et distance jusqu&apos;à la salle</li>
                  <li>Mobilier, vaisselle, eau, électricité et espace de préparation</li>
                  <li>Contraintes alimentaires et horaires précis du programme</li>
                  <li>Solution de repli pour les événements en extérieur</li>
                </ul>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image
                  src="/photos site/mise-en-place-traiteur-montpellier.webp"
                  alt="Mise en place d'une réception avec un traiteur à Montpellier"
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
              <MapPin className="mx-auto h-8 w-8 text-purple" />
              <h2
                className="mt-4 text-3xl font-bold text-black md:text-4xl"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Quel secteur pour votre événement ?
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {areas.map((area) => (
                <article key={area.title} className="rounded-2xl bg-white p-7 shadow-sm">
                  <h3 className="text-lg font-bold text-black">{area.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{area.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <h2
              className="text-center text-3xl font-bold text-black md:text-4xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Choisir le bon format
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {formats.map((format) => (
                <Link
                  key={format.title}
                  href={format.href}
                  className="group rounded-2xl border border-neutral-100 p-7 transition-all hover:-translate-y-1 hover:border-purple/20 hover:shadow-xl"
                >
                  <format.icon className="h-7 w-7 text-purple" />
                  <h3 className="mt-5 text-lg font-bold text-black">{format.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{format.text}</p>
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
              Un projet à Montpellier ou dans l&apos;Hérault ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/60">
              Donnez-nous la date, le lieu et le nombre d&apos;invités. Nous vous
              répondons sous 24h avec une proposition adaptée.
            </p>
            <Link
              href="/devis"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-purple px-8 py-4 text-sm font-semibold text-white"
            >
              Demander un devis
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
