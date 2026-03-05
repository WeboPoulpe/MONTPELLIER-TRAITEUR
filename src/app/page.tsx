import Hero from "@/components/Hero";
import Concept from "@/components/Concept";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import QuoteForm from "@/components/QuoteForm";
import PageTransition from "@/components/PageTransition";

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
      </main>
    </PageTransition>
  );
}
