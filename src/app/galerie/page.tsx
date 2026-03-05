import type { Metadata } from "next";
import GalerieContent from "./GalerieContent";

export const metadata: Metadata = {
  title: "Galerie Photo - Nos Realisations Culinaires",
  description:
    "Decouvrez en images les creations culinaires de Traiteur Montpellier : cocktails dinatoires, plats gastronomiques, canapes raffines, desserts et mises en place soignees pour vos evenements.",
  keywords: [
    "galerie traiteur montpellier",
    "photos traiteur montpellier",
    "realisations culinaires montpellier",
    "cocktail dinatoire photos",
    "plats gastronomiques montpellier",
  ],
  openGraph: {
    title: "Galerie Photo | Traiteur Montpellier",
    description:
      "Parcourez notre galerie de realisations culinaires : evenements d'entreprise, cocktails dinatoires, buffets et prestations sur mesure a Montpellier.",
    url: "https://traiteurmontpellier.com/galerie",
    siteName: "Traiteur Montpellier",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://traiteurmontpellier.com/galerie",
  },
};

export default function GaleriePage() {
  return <GalerieContent />;
}
