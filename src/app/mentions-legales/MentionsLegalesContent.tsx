"use client";

import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";

const sections = [
  {
    title: "1. Éditeur du site",
    content: `Le site traiteurmontpellier.com est édité par :

Traiteur Montpellier
Forme juridique : Micro-entreprise / Entreprise individuelle
Siège social : 81 rue de Padirac, 34070 Montpellier
Téléphone : 06 60 13 05 96
Email : contact@traiteurmontpellier.com
Directeur de la publication : Omar — Gérant`,
  },
  {
    title: "2. Hébergeur",
    content: `Le site est hébergé par :

Vercel Inc.
Adresse : 440 N Barranca Ave #4133, Covina, CA 91723, USA
Site web : vercel.com`,
  },
  {
    title: "3. Propriété intellectuelle",
    content: `L'ensemble des contenus présents sur le site traiteurmontpellier.com (textes, images, photographies, logos, graphismes, icônes, etc.) est la propriété exclusive de Traiteur Montpellier ou fait l'objet d'une autorisation d'utilisation.

Toute reproduction, représentation, modification, publication, transmission ou dénaturation, totale ou partielle, du site ou de son contenu, par quelque procédé que ce soit et sur quelque support que ce soit est interdite sans l'autorisation écrite préalable de Traiteur Montpellier.

Toute exploitation non autorisée du site ou de son contenu sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de la propriété intellectuelle.`,
  },
  {
    title: "4. Limitation de responsabilité",
    content: `Traiteur Montpellier s'efforce de fournir sur le site des informations aussi précises que possible. Toutefois, Traiteur Montpellier ne pourra être tenue responsable des omissions, inexactitudes et carences dans la mise à jour, qu'elles soient de son fait ou du fait de tiers partenaires qui lui fournissent ces informations.

Toutes les informations indiquées sur le site sont données à titre indicatif et sont susceptibles d'évoluer. Par ailleurs, les renseignements figurant sur le site ne sont pas exhaustifs. Ils sont donnés sous réserve de modifications ayant été apportées depuis leur mise en ligne.`,
  },
  {
    title: "5. Liens hypertextes",
    content: `Le site traiteurmontpellier.com peut contenir des liens hypertextes vers d'autres sites internet. Traiteur Montpellier ne dispose d'aucun moyen pour contrôler le contenu des sites tiers et n'assume aucune responsabilité de ce fait.

La mise en place de liens hypertextes vers le site traiteurmontpellier.com est soumise à l'accord préalable et écrit de Traiteur Montpellier.`,
  },
  {
    title: "6. Données personnelles",
    content: `Le traitement des données personnelles collectées sur ce site est décrit dans notre Politique de confidentialité. Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez de droits sur vos données personnelles (accès, rectification, suppression, portabilité, opposition).

Pour exercer vos droits, contactez-nous à : contact@traiteurmontpellier.com`,
  },
  {
    title: "7. Cookies",
    content: `Le site traiteurmontpellier.com utilise des cookies strictement nécessaires au bon fonctionnement du site. Pour plus d'informations sur l'utilisation des cookies, consultez notre Politique de confidentialité.`,
  },
  {
    title: "8. Droit applicable",
    content: `Les présentes mentions légales sont régies par le droit français. En cas de litige, et après tentative de recherche d'une solution amiable, compétence est donnée aux tribunaux français compétents.

Dernière mise à jour : Mars 2026`,
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
              Mentions <span className="text-purple-light">légales</span>
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
