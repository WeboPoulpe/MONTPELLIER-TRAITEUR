import type { Metadata } from "next";
import EntreprisesContent from "./EntreprisesContent";
import { getPageData } from "@/lib/pageData";
import {
  BreadcrumbJsonLd,
  FaqJsonLd,
  ServiceJsonLd,
} from "@/components/SeoJsonLd";
import { serviceFaqSchemas } from "@/data/seo";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Traiteur Entreprise Montpellier",
  description:
    "Traiteur entreprise à Montpellier pour séminaires, conférences, cocktails, repas d'affaires et inaugurations. Formules sur mesure et devis sous 24h.",
  keywords: [
    "traiteur prestations montpellier",
    "traiteur entreprise montpellier",
    "traiteur événement privé montpellier",
    "catering foires salons montpellier",
    "cocktail dînatoire montpellier",
    "plateaux repas montpellier",
    "séminaire traiteur montpellier",
  ],
  openGraph: {
    title: "Nos Prestations | Traiteur Montpellier",
    description:
      "Événements d'entreprise, foires et salons, célébrations privées. Des prestations culinaires sur mesure à Montpellier.",
    url: "https://www.traiteurmontpellier.com/entreprises",
    siteName: "Traiteur Montpellier",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://www.traiteurmontpellier.com/entreprises",
  },
};

export default async function EntreprisesPage() {
  const pageContent = await getPageData("entreprises", {});
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://www.traiteurmontpellier.com" },
          {
            name: "Traiteur entreprise",
            url: "https://www.traiteurmontpellier.com/entreprises",
          },
        ]}
      />
      <ServiceJsonLd
        id="entreprises"
        name="Traiteur entreprise à Montpellier"
        description="Prestations traiteur pour séminaires, conférences, repas d'affaires, inaugurations et cocktails professionnels."
        serviceType="Traiteur événementiel d'entreprise"
        url="https://www.traiteurmontpellier.com/entreprises"
      />
      <FaqJsonLd id="entreprises" items={serviceFaqSchemas.entreprises} />
      <EntreprisesContent data={pageContent} />
    </>
  );
}
