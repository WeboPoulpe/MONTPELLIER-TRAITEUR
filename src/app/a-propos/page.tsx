import type { Metadata } from "next";
import AProposContent from "./AProposContent";

export const metadata: Metadata = {
  title: "À Propos & Contact | Traiteur Montpellier",
  description:
    "Découvrez l'histoire de Traiteur Montpellier, notre engagement écoresponsable et notre passion pour la cuisine méditerranéenne. Contactez-nous pour un devis personnalisé.",
  keywords: [
    "traiteur montpellier contact",
    "à propos traiteur montpellier",
    "devis traiteur montpellier",
    "traiteur écoresponsable montpellier",
    "traiteur méditerranéen contact",
  ],
  openGraph: {
    title: "À Propos & Contact | Traiteur Montpellier",
    description:
      "Notre histoire, nos valeurs et notre passion pour une gastronomie engagée à Montpellier.",
    url: "https://traiteurmontpellier.com/a-propos",
    siteName: "Traiteur Montpellier",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://traiteurmontpellier.com/a-propos",
  },
};

export default function AProposPage() {
  return <AProposContent />;
}
