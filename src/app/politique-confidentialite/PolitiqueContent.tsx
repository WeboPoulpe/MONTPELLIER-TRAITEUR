"use client";

import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";

const sections = [
  {
    title: "1. Introduction",
    content: `Traiteur Montpellier s'engage à protéger la vie privée des utilisateurs de son site internet traiteurmontpellier.com. La présente politique de confidentialité explique comment nous collectons, utilisons, stockons et protégeons vos données personnelles, conformément au Règlement Général sur la Protection des Données (RGPD - Règlement UE 2016/679) et à la loi française Informatique et Libertés.`,
  },
  {
    title: "2. Responsable du traitement",
    content: `Le responsable du traitement des données personnelles est :

Traiteur Montpellier
Adresse : 81 rue de Padirac, 34070 Montpellier
Email : contact@traiteurmontpellier.com
Téléphone : 06 60 13 05 96`,
  },
  {
    title: "3. Données collectées",
    content: `Nous collectons les données personnelles suivantes uniquement lorsque vous nous les transmettez volontairement via notre formulaire de contact ou de devis :

- Nom et prénom
- Adresse email
- Numéro de téléphone
- Type d'événement et nombre de convives
- Toute information complémentaire que vous choisissez de nous communiquer

Nous ne collectons aucune donnée de manière automatique à des fins de profilage ou de publicité ciblée.`,
  },
  {
    title: "4. Finalités du traitement",
    content: `Vos données personnelles sont collectées et traitées pour les finalités suivantes :

- Répondre à vos demandes de devis et de renseignements
- Assurer le suivi de votre événement et de votre commande
- Vous contacter par téléphone ou email dans le cadre de votre demande
- Améliorer nos services et l'expérience utilisateur de notre site

Base légale : le traitement de vos données repose sur votre consentement (article 6.1.a du RGPD) et sur l'exécution de mesures précontractuelles (article 6.1.b du RGPD).`,
  },
  {
    title: "5. Durée de conservation",
    content: `Vos données personnelles sont conservées pendant une durée maximale de 3 ans à compter de votre dernier contact avec nous. Au-delà de cette durée, vos données sont supprimées ou anonymisées.

Les données liées à une commande ou une prestation réalisée sont conservées conformément aux obligations légales et comptables en vigueur (10 ans pour les pièces comptables).`,
  },
  {
    title: "6. Destinataires des données",
    content: `Vos données personnelles sont strictement confidentielles et ne sont en aucun cas vendues, échangées ou louées à des tiers.

Seuls les membres de l'équipe Traiteur Montpellier habilités à traiter votre demande ont accès à vos informations. Nos sous-traitants techniques (hébergeur, service email et, avec votre consentement, services de mesure Google) sont soumis à leurs obligations contractuelles et réglementaires de protection des données.`,
  },
  {
    title: "7. Cookies",
    content: `Notre site utilise des cookies strictement nécessaires à son fonctionnement technique. Ces cookies ne nécessitent pas votre consentement préalable conformément à la réglementation en vigueur.

Avec votre accord, Google Tag Manager peut également déclencher des cookies de mesure d'audience et de mesure publicitaire afin d'analyser les visites et d'évaluer les performances de nos campagnes Google Ads. Ces cookies optionnels restent désactivés tant que vous ne les avez pas acceptés depuis la bannière de consentement.`,
  },
  {
    title: "8. Vos droits",
    content: `Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants :

- Droit d'accès : obtenir la confirmation que vos données sont traitées et en obtenir une copie
- Droit de rectification : demander la correction de données inexactes ou incomplètes
- Droit à l'effacement : demander la suppression de vos données personnelles
- Droit à la portabilité : recevoir vos données dans un format structuré et lisible
- Droit d'opposition : vous opposer à tout moment au traitement de vos données
- Droit à la limitation : demander la limitation du traitement dans certains cas

Pour exercer ces droits, adressez votre demande à : contact@traiteurmontpellier.com

Nous nous engageons à répondre dans un délai maximum de 30 jours.`,
  },
  {
    title: "9. Sécurité des données",
    content: `Traiteur Montpellier met en œuvre toutes les mesures techniques et organisationnelles appropriées pour assurer la sécurité et la confidentialité de vos données personnelles, et les protéger contre tout accès non autorisé, toute perte, altération ou divulgation.

Le site utilise le protocole HTTPS pour sécuriser les échanges de données entre votre navigateur et notre serveur.`,
  },
  {
    title: "10. Réclamation",
    content: `Si vous estimez que le traitement de vos données personnelles constitue une violation du RGPD, vous avez le droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) :

CNIL - Commission Nationale de l'Informatique et des Libertés
3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07
Site web : www.cnil.fr

Dernière mise à jour : Mars 2026`,
  },
];

export default function PolitiqueContent() {
  return (
    <PageTransition>
      <main>
        {/* Hero */}
        <section className="bg-purple-dark pt-32 pb-20">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl font-bold text-white md:text-5xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Politique de <span className="text-purple-light">confidentialité</span>
            </motion.h1>
          </div>
        </section>

        {/* Content */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="mb-12"
              >
                <h2
                  className="text-xl font-bold text-black"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {section.title}
                </h2>
                <div className="mt-4 whitespace-pre-line text-sm leading-relaxed text-neutral-600">
                  {section.content}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
