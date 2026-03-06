import type { Metadata } from "next";
import PolitiqueContent from "./PolitiqueContent";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | Traiteur Montpellier",
  description: "Politique de confidentialité et protection des données personnelles du site Traiteur Montpellier.",
  robots: { index: false, follow: false },
};

export default function PolitiquePage() {
  return <PolitiqueContent />;
}
