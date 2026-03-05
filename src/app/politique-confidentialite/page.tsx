import type { Metadata } from "next";
import PolitiqueContent from "./PolitiqueContent";

export const metadata: Metadata = {
  title: "Politique de Confidentialite | Traiteur Montpellier",
  description: "Politique de confidentialite et protection des donnees personnelles du site Traiteur Montpellier.",
  robots: { index: false, follow: false },
};

export default function PolitiquePage() {
  return <PolitiqueContent />;
}
