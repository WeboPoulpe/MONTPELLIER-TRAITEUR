import type { Metadata } from "next";
import GalerieContent from "./GalerieContent";

export const metadata: Metadata = {
  title: "Galerie Photo - Nos Réalisations Culinaires",
  description:
    "Découvrez en images les créations culinaires de Traiteur Montpellier : cocktails dînatoires, plats gastronomiques, canapés raffinés, desserts et mises en place soignées pour vos événements.",
  keywords: [
    "galerie traiteur montpellier",
    "photos traiteur montpellier",
    "réalisations culinaires montpellier",
    "cocktail dînatoire photos",
    "plats gastronomiques montpellier",
  ],
  openGraph: {
    title: "Galerie Photo | Traiteur Montpellier",
    description:
      "Parcourez notre galerie de réalisations culinaires : événements d'entreprise, cocktails dînatoires, buffets et prestations sur mesure à Montpellier.",
    url: "https://www.traiteurmontpellier.com/galerie",
    siteName: "Traiteur Montpellier",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://www.traiteurmontpellier.com/galerie",
  },
};

export default function GaleriePage() {
  return <GalerieContent />;
}
