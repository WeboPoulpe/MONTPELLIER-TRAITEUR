import type { Metadata } from "next";
import { getPublishedArticles } from "@/lib/articles";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Blog | Conseils & Actualités Traiteur",
  description:
    "Découvrez nos articles sur la gastronomie événementielle, les tendances traiteur, notre engagement RSE et nos conseils pour réussir vos événements à Montpellier.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const articles = await getPublishedArticles();
  return <BlogContent articles={articles} />;
}
