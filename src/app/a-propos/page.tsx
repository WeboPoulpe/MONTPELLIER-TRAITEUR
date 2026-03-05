import type { Metadata } from "next";
import AProposContent from "./AProposContent";

export const metadata: Metadata = {
  title: "A Propos & Contact - Notre Histoire",
  description:
    "Decouvrez l'histoire de Traiteur Montpellier depuis 2008, notre engagement ecoresponsable et notre passion pour la cuisine mediterraneenne. Contactez-nous pour un devis personnalise gratuit.",
  keywords: [
    "traiteur montpellier contact",
    "a propos traiteur montpellier",
    "devis traiteur montpellier",
    "traiteur ecoresponsable montpellier",
    "traiteur mediterraneen montpellier",
    "histoire traiteur montpellier",
  ],
  openGraph: {
    title: "A Propos & Contact | Traiteur Montpellier",
    description:
      "Notre histoire, nos valeurs et notre passion pour une gastronomie engagee a Montpellier depuis 2008.",
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
