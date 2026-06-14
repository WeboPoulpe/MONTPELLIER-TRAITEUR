import nextDynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Concept from "@/components/Concept";
import PageTransition from "@/components/PageTransition";
import RecentArticles from "@/components/RecentArticles";
import GoogleTestimonials from "@/components/GoogleTestimonials";
import { FaqJsonLd } from "@/components/SeoJsonLd";
import { getRecentArticles } from "@/lib/articles";
import { getPageData } from "@/lib/pageData";
import { homeFaqSchema } from "@/data/seo";

const Services = nextDynamic(() => import("@/components/Services"));
const Gallery = nextDynamic(() => import("@/components/Gallery"));
const HomeFAQ = nextDynamic(() => import("@/components/HomeFAQ"));

export const dynamic = "force-static";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function Home() {
  const [articles, pageContent] = await Promise.all([
    getRecentArticles(3),
    getPageData("home", {}),
  ]);
  const d = pageContent as any;

  return (
    <PageTransition>
      <FaqJsonLd id="accueil" items={homeFaqSchema} />
      <main>
        <Hero data={d.hero} />
        <Concept data={d.concept} />
        <Services data={d.services} />
        <Gallery />
        <GoogleTestimonials />
        <RecentArticles articles={articles} />
        <HomeFAQ />
      </main>
    </PageTransition>
  );
}
