import type { Metadata } from "next";
import MariageContent from "./MariageContent";
import {
  BreadcrumbJsonLd,
  FaqJsonLd,
  ServiceJsonLd,
} from "@/components/SeoJsonLd";

export const dynamic = "force-static";

const faqItems = [
  {
    question: "Proposez-vous un traiteur pour mariage complet ?",
    answer:
      "Nous accompagnons surtout les receptions de mariage autour du vin d'honneur, du cocktail, du buffet, du repas convivial et du brunch du lendemain. Le devis est adapte au format, au lieu et au nombre de convives.",
  },
  {
    question: "Intervenez-vous pour un vin d'honneur a Montpellier ?",
    answer:
      "Oui, nous pouvons preparer un vin d'honneur avec pieces cocktail, verrines, grazing table, boissons et mise en place selon les besoins de la reception.",
  },
  {
    question: "Quel budget prevoir pour un mariage ?",
    answer:
      "Le budget depend du nombre de convives, du format choisi, du service sur place, de la livraison et des options. Nous privilegions les demandes detaillees pour proposer un devis realiste.",
  },
  {
    question: "Faites-vous aussi les brunchs du lendemain ?",
    answer:
      "Oui, le brunch du lendemain peut etre propose en complement : assortiment sale et sucre, boissons, fruits, pieces a partager et presentation soignee.",
  },
];

export const metadata: Metadata = {
  title: "Traiteur Mariage Montpellier - Vin d'honneur, Buffet & Cocktail",
  description:
    "Traiteur mariage a Montpellier pour vin d'honneur, buffet, cocktail, repas prive et brunch du lendemain. Prestation sur mesure pour receptions serieuses.",
  keywords: [
    "traiteur mariage montpellier",
    "traiteur montpellier mariage",
    "traiteur mariage herault",
    "vin d'honneur mariage montpellier",
    "buffet mariage montpellier",
    "cocktail mariage montpellier",
    "brunch mariage montpellier",
  ],
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  openGraph: {
    title: "Traiteur Mariage Montpellier | Traiteur Montpellier",
    description:
      "Vin d'honneur, buffet, cocktail, repas prive et brunch du lendemain pour receptions de mariage a Montpellier.",
    url: "https://www.traiteurmontpellier.com/mariage",
    siteName: "Traiteur Montpellier",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://www.traiteurmontpellier.com/mariage",
  },
};

export default function MariagePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://www.traiteurmontpellier.com" },
          {
            name: "Traiteur mariage",
            url: "https://www.traiteurmontpellier.com/mariage",
          },
        ]}
      />
      <ServiceJsonLd
        id="mariage"
        name="Traiteur mariage a Montpellier"
        description="Prestations traiteur pour vin d'honneur, cocktail, buffet, repas prive et brunch de mariage a Montpellier et dans l'Herault."
        serviceType="Traiteur mariage"
        url="https://www.traiteurmontpellier.com/mariage"
      />
      <FaqJsonLd id="mariage" items={faqItems} />
      <MariageContent faqItems={faqItems} />
    </>
  );
}
