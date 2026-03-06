"use client";

import FAQ from "@/components/FAQ";

const homeFaqItems = [
  {
    question: "Quels types d'événements prenez-vous en charge ?",
    answer: "Nous prenons en charge tous types d'événements : séminaires et conférences d'entreprise, foires et salons professionnels, anniversaires, baptêmes, garden-parties, cocktails VIP et toute autre célébration privée. Chaque prestation est conçue sur mesure.",
  },
  {
    question: "Quelle est votre zone d'intervention autour de Montpellier ?",
    answer: "Nous sommes basés à Montpellier et intervenons dans tout le département de l'Hérault (34). Pour les événements d'envergure, nous pouvons couvrir l'ensemble de la région Occitanie. N'hésitez pas à nous contacter pour vérifier la faisabilité.",
  },
  {
    question: "Comment fonctionne la demande de devis ?",
    answer: "C'est simple et gratuit : remplissez notre formulaire en ligne en indiquant le type d'événement, le nombre de convives et la date souhaitée. Vous pouvez aussi nous appeler au 06 60 13 05 96. Nous vous répondons sous 24h avec une proposition personnalisée.",
  },
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
