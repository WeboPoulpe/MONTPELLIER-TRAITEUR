import type { Metadata } from "next";
import { getPublishedArticles } from "@/lib/articles";
import BlogContent from "./BlogContent";
import { BreadcrumbJsonLd } from "@/components/SeoJsonLd";

export const metadata: Metadata = {
  title: "Conseils Traiteur et Événementiel",
  description:
    "Découvrez nos articles sur la gastronomie événementielle, les tendances traiteur, notre engagement RSE et nos conseils pour réussir vos événements à Montpellier.",
  alternates: {
    canonical: "https://www.traiteurmontpellier.com/blog",
  },
};

export const dynamic = "force-static";

export default async function BlogPage() {
  const articles = await getPublishedArticles();
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://www.traiteurmontpellier.com" },
          { name: "Blog", url: "https://www.traiteurmontpellier.com/blog" },
        ]}
      />
      <BlogContent articles={articles} />
    </>
  );
}
