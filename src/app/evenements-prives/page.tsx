import type { Metadata } from "next";
import EvenementsPrivesContent from "./EvenementsPrivesContent";
import { getPageData } from "@/lib/pageData";
import {
  BreadcrumbJsonLd,
  FaqJsonLd,
  ServiceJsonLd,
} from "@/components/SeoJsonLd";
import { serviceFaqSchemas } from "@/data/seo";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Traiteur Événement Privé Montpellier",
  description:
    "Traiteur pour vos événements privés à Montpellier : anniversaires, baptêmes, garden-parties, célébrations. Cuisine méditerranéenne sur mesure et éco-responsable.",
  keywords: [
    "traiteur événement privé montpellier",
    "traiteur anniversaire montpellier",
    "traiteur baptême montpellier",
    "traiteur garden party montpellier",
    "traiteur réception privée montpellier",
    "buffet anniversaire montpellier",
    "cocktail privé montpellier",
  ],
  openGraph: {
    title: "Traiteur Événements Privés | Traiteur Montpellier",
    description:
      "Célébrez vos moments précieux avec une cuisine sur mesure. Anniversaires, baptêmes, garden-parties à Montpellier.",
    url: "https://www.traiteurmontpellier.com/evenements-prives",
    siteName: "Traiteur Montpellier",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://www.traiteurmontpellier.com/evenements-prives",
  },
};

export default async function EvenementsPrivesPage() {
  const pageContent = await getPageData("evenements-prives", {});
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://www.traiteurmontpellier.com" },
          {
            name: "Événements privés",
            url: "https://www.traiteurmontpellier.com/evenements-prives",
          },
        ]}
      />
      <ServiceJsonLd
        id="evenements-prives"
        name="Traiteur pour événement privé à Montpellier"
        description="Cocktails, buffets et menus sur mesure pour anniversaires, baptêmes, garden-parties et fêtes de famille."
        serviceType="Traiteur pour réception privée"
        url="https://www.traiteurmontpellier.com/evenements-prives"
      />
      <FaqJsonLd id="evenements-prives" items={serviceFaqSchemas.prives} />
      <EvenementsPrivesContent data={pageContent} />
    </>
  );
}
