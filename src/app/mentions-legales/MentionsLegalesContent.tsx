"use client";

import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";

const sections = [
  {
    title: "1. Editeur du site",
    content: `Le site traiteurmontpellier.com est edite par :

Traiteur Montpellier
Forme juridique : Micro-entreprise / Entreprise individuelle
Siege social : 81 rue de Padirac, 34070 Montpellier
Telephone : 06 60 13 05 96
Email : contact@traiteurmontpellier.com
Directeur de la publication : Omar — Gerant`,
  },
  {
    title: "2. Hebergeur",
    content: `Le site est heberge par :

Vercel Inc.
Adresse : 440 N Barranca Ave #4133, Covina, CA 91723, USA
Site web : vercel.com`,
  },
  {
    title: "3. Propriete intellectuelle",
    content: `L'ensemble des contenus presents sur le site traiteurmontpellier.com (textes, images, photographies, logos, graphismes, icones, etc.) est la propriete exclusive de Traiteur Montpellier ou fait l'objet d'une autorisation d'utilisation.

Toute reproduction, representation, modification, publication, transmission ou denaturation, totale ou partielle, du site ou de son contenu, par quelque procede que ce soit et sur quelque support que ce soit est interdite sans l'autorisation ecrite prealable de Traiteur Montpellier.

Toute exploitation non autorisee du site ou de son contenu sera consideree comme constitutive d'une contrefacon et poursuivie conformement aux dispositions des articles L.335-2 et suivants du Code de la propriete intellectuelle.`,
  },
  {
    title: "4. Limitation de responsabilite",
    content: `Traiteur Montpellier s'efforce de fournir sur le site des informations aussi precises que possible. Toutefois, Traiteur Montpellier ne pourra etre tenue responsable des omissions, inexactitudes et carences dans la mise a jour, qu'elles soient de son fait ou du fait de tiers partenaires qui lui fournissent ces informations.

Toutes les informations indiquees sur le site sont donnees a titre indicatif et sont susceptibles d'evoluer. Par ailleurs, les renseignements figurant sur le site ne sont pas exhaustifs. Ils sont donnes sous reserve de modifications ayant ete apportees depuis leur mise en ligne.`,
  },
  {
    title: "5. Liens hypertextes",
    content: `Le site traiteurmontpellier.com peut contenir des liens hypertextes vers d'autres sites internet. Traiteur Montpellier ne dispose d'aucun moyen pour controler le contenu des sites tiers et n'assume aucune responsabilite de ce fait.

La mise en place de liens hypertextes vers le site traiteurmontpellier.com est soumise a l'accord prealable et ecrit de Traiteur Montpellier.`,
  },
  {
    title: "6. Donnees personnelles",
    content: `Le traitement des donnees personnelles collectees sur ce site est decrit dans notre Politique de confidentialite. Conformement au Reglement General sur la Protection des Donnees (RGPD) et a la loi Informatique et Libertes, vous disposez de droits sur vos donnees personnelles (acces, rectification, suppression, portabilite, opposition).

Pour exercer vos droits, contactez-nous a : contact@traiteurmontpellier.com`,
  },
  {
    title: "7. Cookies",
    content: `Le site traiteurmontpellier.com utilise des cookies strictement necessaires au bon fonctionnement du site. Pour plus d'informations sur l'utilisation des cookies, consultez notre Politique de confidentialite.`,
  },
  {
    title: "8. Droit applicable",
    content: `Les presentes mentions legales sont regies par le droit francais. En cas de litige, et apres tentative de recherche d'une solution amiable, competence est donnee aux tribunaux francais competents.

Derniere mise a jour : Mars 2026`,
  },
];

export default function MentionsLegalesContent() {
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
              Mentions <span className="text-purple-light">legales</span>
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
