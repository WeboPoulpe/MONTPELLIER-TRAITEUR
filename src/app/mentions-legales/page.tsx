import type { Metadata } from "next";
import MentionsLegalesContent from "./MentionsLegalesContent";

export const metadata: Metadata = {
  title: "Mentions Legales | Traiteur Montpellier",
  description: "Mentions legales du site Traiteur Montpellier. Informations sur l'editeur, l'hebergeur et les conditions d'utilisation.",
  robots: { index: false, follow: false },
};

export default function MentionsLegalesPage() {
  return <MentionsLegalesContent />;
}
