import type { Metadata } from "next";
import FoiresSalonsContent from "./FoiresSalonsContent";
import { getPageData } from "@/lib/pageData";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Traiteur Foires & Salons Montpellier - Catering Professionnel",
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
  return <FoiresSalonsContent data={pageContent} />;
}
