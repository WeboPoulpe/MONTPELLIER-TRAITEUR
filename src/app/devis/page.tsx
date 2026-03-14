import type { Metadata } from "next";
import { Suspense } from "react";
import DevisContent from "./DevisContent";

export const metadata: Metadata = {
  title: "Demande de Devis Gratuit",
  description:
    "Obtenez votre devis personnalisé en 2 minutes. Traiteur Montpellier : cocktails, buffets, service traiteur pour tous vos événements dans l'Hérault.",
  alternates: {
    canonical: "https://www.traiteurmontpellier.com/devis",
  },
};

export default function DevisPage() {
  return (
    <Suspense>
      <DevisContent />
    </Suspense>
  );
}
