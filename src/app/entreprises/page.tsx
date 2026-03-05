import type { Metadata } from "next";
import EntreprisesContent from "./EntreprisesContent";

export const metadata: Metadata = {
  title: "Nos Prestations - Evenements & Receptions",
  description:
    "Decouvrez les prestations de Traiteur Montpellier : evenements d'entreprise, foires et salons, evenements prives. Cuisine mediterraneenne raffinee et sur mesure a Montpellier.",
  keywords: [
    "traiteur prestations montpellier",
    "traiteur entreprise montpellier",
    "traiteur evenement prive montpellier",
    "catering foires salons montpellier",
    "cocktail dinatoire montpellier",
    "plateaux repas montpellier",
    "seminaire traiteur montpellier",
  ],
  openGraph: {
    title: "Nos Prestations | Traiteur Montpellier",
    description:
      "Evenements d'entreprise, foires et salons, celebrations privees. Des prestations culinaires sur mesure a Montpellier.",
    url: "https://traiteurmontpellier.com/entreprises",
    siteName: "Traiteur Montpellier",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://traiteurmontpellier.com/entreprises",
  },
};

export default function EntreprisesPage() {
  return <EntreprisesContent />;
}
