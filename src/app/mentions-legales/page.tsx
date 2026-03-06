import type { Metadata } from "next";
import MentionsLegalesContent from "./MentionsLegalesContent";

export const metadata: Metadata = {
  title: "Mentions Légales | Traiteur Montpellier",
  description: "Mentions légales du site Traiteur Montpellier. Informations sur l'éditeur, l'hébergeur et les conditions d'utilisation.",
  robots: { index: false, follow: false },
};

export default function MentionsLegalesPage() {
  return <MentionsLegalesContent />;
}
