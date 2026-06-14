import type { Metadata } from "next";
import { Suspense } from "react";
import DevisContent from "./DevisContent";
import { BreadcrumbJsonLd } from "@/components/SeoJsonLd";

export const metadata: Metadata = {
  title: "Devis Traiteur Gratuit à Montpellier",
  description:
    "Obtenez votre devis personnalisé en 2 minutes. Traiteur Montpellier : cocktails, buffets, service traiteur pour tous vos événements dans l'Hérault.",
  alternates: {
    canonical: "https://www.traiteurmontpellier.com/devis",
  },
};

export default function DevisPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://www.traiteurmontpellier.com" },
          { name: "Devis", url: "https://www.traiteurmontpellier.com/devis" },
        ]}
      />
      <Suspense>
        <DevisContent />
      </Suspense>
    </>
  );
}
