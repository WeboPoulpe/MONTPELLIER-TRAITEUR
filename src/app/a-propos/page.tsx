import type { Metadata } from "next";
import AProposContent from "./AProposContent";
import { getPageData } from "@/lib/pageData";
import { BreadcrumbJsonLd } from "@/components/SeoJsonLd";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Notre Histoire et Nos Engagements",
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
    url: "https://www.traiteurmontpellier.com/a-propos",
    siteName: "Traiteur Montpellier",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://www.traiteurmontpellier.com/a-propos",
  },
};

export default async function AProposPage() {
  const pageContent = await getPageData("a-propos", {});
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://www.traiteurmontpellier.com" },
          {
            name: "À propos",
            url: "https://www.traiteurmontpellier.com/a-propos",
          },
        ]}
      />
      <AProposContent data={pageContent} />
    </>
  );
}
