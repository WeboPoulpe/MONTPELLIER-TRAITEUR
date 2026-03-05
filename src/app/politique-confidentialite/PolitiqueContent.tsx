"use client";

import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";

const sections = [
  {
    title: "1. Introduction",
    content: `Traiteur Montpellier s'engage a proteger la vie privee des utilisateurs de son site internet traiteurmontpellier.com. La presente politique de confidentialite explique comment nous collectons, utilisons, stockons et protegeons vos donnees personnelles, conformement au Reglement General sur la Protection des Donnees (RGPD - Reglement UE 2016/679) et a la loi francaise Informatique et Libertes.`,
  },
  {
    title: "2. Responsable du traitement",
    content: `Le responsable du traitement des donnees personnelles est :

Traiteur Montpellier
Adresse : Montpellier, France
Email : contact@traiteurmontpellier.com
Telephone : 06 60 13 05 96`,
  },
  {
    title: "3. Donnees collectees",
    content: `Nous collectons les donnees personnelles suivantes uniquement lorsque vous nous les transmettez volontairement via notre formulaire de contact ou de devis :

- Nom et prenom
- Adresse email
- Numero de telephone
- Type d'evenement et nombre de convives
- Toute information complementaire que vous choisissez de nous communiquer

Nous ne collectons aucune donnee de maniere automatique a des fins de profilage ou de publicite ciblee.`,
  },
  {
    title: "4. Finalites du traitement",
    content: `Vos donnees personnelles sont collectees et traitees pour les finalites suivantes :

- Repondre a vos demandes de devis et de renseignements
- Assurer le suivi de votre evenement et de votre commande
- Vous contacter par telephone ou email dans le cadre de votre demande
- Ameliorer nos services et l'experience utilisateur de notre site

Base legale : le traitement de vos donnees repose sur votre consentement (article 6.1.a du RGPD) et sur l'execution de mesures precontractuelles (article 6.1.b du RGPD).`,
  },
  {
    title: "5. Duree de conservation",
    content: `Vos donnees personnelles sont conservees pendant une duree maximale de 3 ans a compter de votre dernier contact avec nous. Au-dela de cette duree, vos donnees sont supprimees ou anonymisees.

Les donnees liees a une commande ou une prestation realisee sont conservees conformement aux obligations legales et comptables en vigueur (10 ans pour les pieces comptables).`,
  },
  {
    title: "6. Destinataires des donnees",
    content: `Vos donnees personnelles sont strictement confidentielles et ne sont en aucun cas vendues, echangees ou louees a des tiers.

Seuls les membres de l'equipe Traiteur Montpellier habilites a traiter votre demande ont acces a vos informations. Nos sous-traitants techniques (hebergeur, service email) sont soumis aux memes obligations de protection des donnees.`,
  },
  {
    title: "7. Cookies",
    content: `Notre site utilise uniquement des cookies strictement necessaires au bon fonctionnement technique du site. Ces cookies ne necessitent pas votre consentement prealable conformement a la reglementation en vigueur.

Nous n'utilisons pas de cookies de mesure d'audience, de cookies publicitaires ou de cookies de reseaux sociaux. Aucun traceur tiers n'est depose sur votre terminal lors de votre navigation.`,
  },
  {
    title: "8. Vos droits",
    content: `Conformement au RGPD et a la loi Informatique et Libertes, vous disposez des droits suivants :

- Droit d'acces : obtenir la confirmation que vos donnees sont traitees et en obtenir une copie
- Droit de rectification : demander la correction de donnees inexactes ou incompletes
- Droit a l'effacement : demander la suppression de vos donnees personnelles
- Droit a la portabilite : recevoir vos donnees dans un format structure et lisible
- Droit d'opposition : vous opposer a tout moment au traitement de vos donnees
- Droit a la limitation : demander la limitation du traitement dans certains cas

Pour exercer ces droits, adressez votre demande a : contact@traiteurmontpellier.com

Nous nous engageons a repondre dans un delai maximum de 30 jours.`,
  },
  {
    title: "9. Securite des donnees",
    content: `Traiteur Montpellier met en oeuvre toutes les mesures techniques et organisationnelles appropriees pour assurer la securite et la confidentialite de vos donnees personnelles, et les proteger contre tout acces non autorise, toute perte, alteration ou divulgation.

Le site utilise le protocole HTTPS pour securiser les echanges de donnees entre votre navigateur et notre serveur.`,
  },
  {
    title: "10. Reclamation",
    content: `Si vous estimez que le traitement de vos donnees personnelles constitue une violation du RGPD, vous avez le droit d'introduire une reclamation aupres de la Commission Nationale de l'Informatique et des Libertes (CNIL) :

CNIL - Commission Nationale de l'Informatique et des Libertes
3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07
Site web : www.cnil.fr

Derniere mise a jour : Mars 2026`,
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
              Politique de <span className="text-purple-light">confidentialite</span>
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
