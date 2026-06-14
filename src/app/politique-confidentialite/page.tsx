import type { Metadata } from "next";
import PolitiqueContent from "./PolitiqueContent";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description: "Politique de confidentialité et protection des données personnelles du site Traiteur Montpellier.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "https://www.traiteurmontpellier.com/politique-confidentialite",
  },
};

export default function PolitiquePage() {
  return <PolitiqueContent />;
}
