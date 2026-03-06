import type { Metadata } from "next";
import EvenementsPrivesContent from "./EvenementsPrivesContent";

export const metadata: Metadata = {
  title: "Traiteur Evenements Prives Montpellier - Anniversaires, Baptemes, Receptions",
  description:
    "Traiteur pour vos evenements prives a Montpellier : anniversaires, baptemes, garden-parties, celebrations. Cuisine mediterraneenne sur mesure et eco-responsable.",
  keywords: [
    "traiteur evenement prive montpellier",
    "traiteur anniversaire montpellier",
    "traiteur bapteme montpellier",
    "traiteur garden party montpellier",
    "traiteur reception privee montpellier",
    "buffet anniversaire montpellier",
    "cocktail prive montpellier",
  ],
  openGraph: {
    title: "Traiteur Evenements Prives | Traiteur Montpellier",
    description:
      "Celebrez vos moments precieux avec une cuisine sur mesure. Anniversaires, baptemes, garden-parties a Montpellier.",
    url: "https://traiteurmontpellier.com/evenements-prives",
    siteName: "Traiteur Montpellier",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://traiteurmontpellier.com/evenements-prives",
  },
};

export default function EvenementsPrivesPage() {
  return <EvenementsPrivesContent />;
}
