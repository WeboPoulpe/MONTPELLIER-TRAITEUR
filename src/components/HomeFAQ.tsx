"use client";

import FAQ from "@/components/FAQ";
import { homeFaqSchema } from "@/data/seo";

const homeFaqItems = [
  ...homeFaqSchema,
  {
    question: "Vos produits sont-ils locaux et de saison ?",
    answer: "Oui, nous privilégions les circuits courts en collaborant étroitement avec des producteurs de la région montpelliéraine. Nos menus changent au fil des saisons pour garantir fraîcheur et qualité optimales tout au long de l'année.",
  },
  {
    question: "Que comprend votre démarche éco-responsable ?",
    answer: "Notre engagement RSE repose sur trois piliers : le zéro déchet (compostage, valorisation en huiles aromatisées et soupes), les circuits courts (producteurs locaux) et la solidarité (redistribution des surplus à une association humanitaire de Montpellier).",
  },
  {
    question: "Proposez-vous des options pour les régimes alimentaires spécifiques ?",
    answer: "Absolument. Nous proposons des alternatives végétariennes, vegan, sans gluten, sans lactose et halal. Signalez-nous toute allergie ou restriction lors de votre demande et nous adapterons le menu sans aucun supplément.",
  },
];

export default function HomeFAQ() {
  return <FAQ items={homeFaqItems} title="Questions fréquentes" />;
}
