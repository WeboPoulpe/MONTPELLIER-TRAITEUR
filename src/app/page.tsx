import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Concept from "@/components/Concept";
import PageTransition from "@/components/PageTransition";
import RecentArticles from "@/components/RecentArticles";
import { getRecentArticles } from "@/lib/articles";
import { getPageData } from "@/lib/pageData";

const Services = dynamic(() => import("@/components/Services"));
const Gallery = dynamic(() => import("@/components/Gallery"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const HomeFAQ = dynamic(() => import("@/components/HomeFAQ"));

export const revalidate = 60;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function Home() {
  const [articles, pageContent] = await Promise.all([
    getRecentArticles(3),
    getPageData("home", {}),
  ]);
  const d = pageContent as any;

  return (
    <PageTransition>
      <main>
        <Hero data={d.hero} />
        <Concept data={d.concept} />
        <Services data={d.services} />
        <Gallery />
        <Testimonials />
        <RecentArticles articles={articles} />
        <HomeFAQ />
      </main>
    </PageTransition>
  );
}
