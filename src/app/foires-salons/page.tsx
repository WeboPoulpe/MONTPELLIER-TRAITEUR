import type { Metadata } from "next";
import FoiresSalonsContent from "./FoiresSalonsContent";
import { getPageData } from "@/lib/pageData";
import {
  BreadcrumbJsonLd,
  FaqJsonLd,
  ServiceJsonLd,
} from "@/components/SeoJsonLd";
import { serviceFaqSchemas } from "@/data/seo";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Traiteur Foires et Salons Montpellier",
  description:
    "Catering sur mesure pour vos foires et salons à Montpellier. Grazing tables, plateaux repas, cocktails VIP, paniers staff. Traiteur éco-responsable depuis 2008.",
  keywords: [
    "traiteur foire montpellier",
    "catering salon professionnel montpellier",
    "traiteur salon exposition montpellier",
    "grazing table montpellier",
    "plateaux repas salon montpellier",
    "cocktail VIP foire montpellier",
    "traiteur stand exposition",
  ],
  openGraph: {
    title: "Traiteur Foires & Salons | Traiteur Montpellier",
    description:
      "Catering professionnel pour foires et salons à Montpellier. Grazing tables, plateaux repas, cocktails VIP.",
    url: "https://www.traiteurmontpellier.com/foires-salons",
    siteName: "Traiteur Montpellier",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://www.traiteurmontpellier.com/foires-salons",
  },
};

export default async function FoiresSalonsPage() {
  const pageContent = await getPageData("foires-salons", {});
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://www.traiteurmontpellier.com" },
          {
            name: "Foires et salons",
            url: "https://www.traiteurmontpellier.com/foires-salons",
          },
        ]}
      />
      <ServiceJsonLd
        id="foires-salons"
        name="Catering pour foires et salons à Montpellier"
        description="Livraison sur stand, grazing tables, paniers staff, plateaux repas, packs café et cocktails VIP."
        serviceType="Catering pour salon professionnel"
        url="https://www.traiteurmontpellier.com/foires-salons"
      />
      <FaqJsonLd id="foires-salons" items={serviceFaqSchemas.salons} />
      <FoiresSalonsContent data={pageContent} />
    </>
  );
}
