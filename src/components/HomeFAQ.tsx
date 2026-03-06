"use client";

import FAQ from "@/components/FAQ";

const homeFaqItems = [
  {
    question: "Quels types d'evenements prenez-vous en charge ?",
    answer: "Nous prenons en charge tous types d'evenements : seminaires et conferences d'entreprise, foires et salons professionnels, anniversaires, baptemes, garden-parties, cocktails VIP et toute autre celebration privee. Chaque prestation est concue sur mesure.",
  },
  {
    question: "Quelle est votre zone d'intervention autour de Montpellier ?",
    answer: "Nous sommes bases a Montpellier et intervenons dans tout le departement de l'Herault (34). Pour les evenements d'envergure, nous pouvons couvrir l'ensemble de la region Occitanie. N'hesitez pas a nous contacter pour verifier la faisabilite.",
  },
  {
    question: "Comment fonctionne la demande de devis ?",
    answer: "C'est simple et gratuit : remplissez notre formulaire en ligne en indiquant le type d'evenement, le nombre de convives et la date souhaitee. Vous pouvez aussi nous appeler au 06 60 13 05 96. Nous vous repondons sous 24h avec une proposition personnalisee.",
  },
  {
    question: "Vos produits sont-ils locaux et de saison ?",
    answer: "Oui, nous privilegions les circuits courts en collaborant etroitement avec des producteurs de la region montpellieraine. Nos menus changent au fil des saisons pour garantir fraicheur et qualite optimales tout au long de l'annee.",
  },
  {
    question: "Que comprend votre demarche eco-responsable ?",
    answer: "Notre engagement RSE repose sur trois piliers : le zero dechet (compostage, valorisation en huiles aromatisees et soupes), les circuits courts (producteurs locaux) et la solidarite (redistribution des surplus a une association humanitaire de Montpellier).",
  },
  {
    question: "Proposez-vous des options pour les regimes alimentaires specifiques ?",
    answer: "Absolument. Nous proposons des alternatives vegetariennes, vegan, sans gluten, sans lactose et halal. Signalez-nous toute allergie ou restriction lors de votre demande et nous adapterons le menu sans aucun supplement.",
  },
];

export default function HomeFAQ() {
  return <FAQ items={homeFaqItems} title="Questions frequentes" />;
}
