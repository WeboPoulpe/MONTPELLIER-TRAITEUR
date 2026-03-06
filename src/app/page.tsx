import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Concept from "@/components/Concept";
import PageTransition from "@/components/PageTransition";

// Lazy load below-the-fold components
const Services = dynamic(() => import("@/components/Services"));
const Gallery = dynamic(() => import("@/components/Gallery"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const QuoteForm = dynamic(() => import("@/components/QuoteForm"));
const HomeFAQ = dynamic(() => import("@/components/HomeFAQ"));

export default function Home() {
  return (
    <PageTransition>
      <main>
        <Hero />
        <Concept />
        <Services />
        <Gallery />
        <Testimonials />
        <QuoteForm />
        <HomeFAQ />
      </main>
    </PageTransition>
  );
}
