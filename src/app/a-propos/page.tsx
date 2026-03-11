import type { Metadata } from "next";
import AProposContent from "./AProposContent";
import { getPageData } from "@/lib/pageData";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "À Propos & Contact - Notre Histoire",
  description:
    "Découvrez l'histoire de Traiteur Montpellier depuis 2008, notre engagement écoresponsable et notre passion pour la cuisine méditerranéenne. Contactez-nous pour un devis personnalisé gratuit.",
  keywords: [
    "traiteur montpellier contact",
    "à propos traiteur montpellier",
    "devis traiteur montpellier",
    "traiteur écoresponsable montpellier",
    "traiteur méditerranéen montpellier",
    "histoire traiteur montpellier",
  ],
  openGraph: {
    title: "À Propos & Contact | Traiteur Montpellier",
    description:
      "Notre histoire, nos valeurs et notre passion pour une gastronomie engagée à Montpellier depuis 2008.",
    url: "https://traiteurmontpellier.com/a-propos",
    siteName: "Traiteur Montpellier",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://traiteurmontpellier.com/a-propos",
  },
};

export default async function AProposPage() {
  const pageContent = await getPageData("a-propos", {});
  return <AProposContent data={pageContent} />;
}
