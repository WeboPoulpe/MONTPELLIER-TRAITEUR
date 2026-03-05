import type { Metadata } from "next";
import GalerieContent from "./GalerieContent";

export const metadata: Metadata = {
  title: "Galerie | Traiteur Montpellier - Nos Realisations",
  description:
    "Decouvrez en images les creations culinaires de Traiteur Montpellier : cocktails, plats gastronomiques, canapes, desserts et mises en place soignees.",
  openGraph: {
    title: "Galerie | Traiteur Montpellier",
    description:
      "Parcourez notre galerie de realisations culinaires : evenements d'entreprise, cocktails dinatoires, buffets et prestations sur mesure a Montpellier.",
  },
};

export default function GaleriePage() {
  return <GalerieContent />;
}
