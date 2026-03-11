import type { Metadata } from "next";
import EntreprisesContent from "./EntreprisesContent";
import { getPageData } from "@/lib/pageData";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Nos Prestations - Événements & Réceptions",
  description:
    "Découvrez les prestations de Traiteur Montpellier : événements d'entreprise, foires et salons, événements privés. Cuisine méditerranéenne raffinée et sur mesure à Montpellier.",
  keywords: [
    "traiteur prestations montpellier",
    "traiteur entreprise montpellier",
    "traiteur événement privé montpellier",
    "catering foires salons montpellier",
    "cocktail dînatoire montpellier",
    "plateaux repas montpellier",
    "séminaire traiteur montpellier",
  ],
  openGraph: {
    title: "Nos Prestations | Traiteur Montpellier",
    description:
      "Événements d'entreprise, foires et salons, célébrations privées. Des prestations culinaires sur mesure à Montpellier.",
    url: "https://traiteurmontpellier.com/entreprises",
    siteName: "Traiteur Montpellier",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://traiteurmontpellier.com/entreprises",
  },
};

export default async function EntreprisesPage() {
  const pageContent = await getPageData("entreprises", {});
  return <EntreprisesContent data={pageContent} />;
}
