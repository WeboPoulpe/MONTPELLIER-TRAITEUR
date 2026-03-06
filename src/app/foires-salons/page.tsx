import type { Metadata } from "next";
import FoiresSalonsContent from "./FoiresSalonsContent";

export const metadata: Metadata = {
  title: "Traiteur Foires & Salons Montpellier - Catering Professionnel",
  description:
    "Catering sur mesure pour vos foires et salons a Montpellier. Grazing tables, plateaux repas, cocktails VIP, paniers staff. Traiteur eco-responsable depuis 2008.",
  keywords: [
    "traiteur foire montpellier",
    "catering salon professionnel montpellier",
    "traiteur salon exposition montpellier",
    "grazing table montpellier",
    "plateaux repas salon montpellier",
    "cocktail VIP foire montpellier",
    "traiteur stand exposition",
  ],
  openGraph: {
    title: "Traiteur Foires & Salons | Traiteur Montpellier",
    description:
      "Catering professionnel pour foires et salons a Montpellier. Grazing tables, plateaux repas, cocktails VIP.",
    url: "https://traiteurmontpellier.com/foires-salons",
    siteName: "Traiteur Montpellier",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://traiteurmontpellier.com/foires-salons",
  },
};

export default function FoiresSalonsPage() {
  return <FoiresSalonsContent />;
}
