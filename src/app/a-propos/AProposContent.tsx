"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import {
  Leaf,
  MapPin,
  Heart,
  Phone,
  Mail,
  Clock,
  Send,
  Check,
  Instagram,
  Linkedin,
  Facebook,
  Calendar,
  Users,
  PartyPopper,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Monitor,
  Palette,
  Recycle,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import PageTransition from "@/components/PageTransition";
import FAQ from "@/components/FAQ";

const aproposFaq = [
  {
    question: "Depuis quand Traiteur Montpellier existe-t-il ?",
    answer: "Traiteur Montpellier a été fondé en 2008. Nous cumulons plus de 15 ans d'expérience dans la restauration événementielle à Montpellier et dans tout l'Hérault, avec plus de 500 événements réalisés et 50 000 convives servis.",
  },
  {
    question: "Quelle est votre zone d'intervention ?",
    answer: "Nous sommes basés à Montpellier et intervenons dans tout le département de l'Hérault (34). Pour les événements d'envergure, nous pouvons nous déplacer dans toute la région Occitanie. Contactez-nous pour vérifier la faisabilité.",
  },
  {
    question: "Que signifie votre engagement éco-responsable concrètement ?",
    answer: "Notre démarche RSE repose sur trois piliers : le zéro déchet (compostage, valorisation des déchets en huiles aromatisées et soupes), les circuits courts (partenariats avec les producteurs locaux) et la solidarité (redistribution des surplus à une association humanitaire de Montpellier).",
  },
  {
    question: "Comment obtenir un devis ?",
    answer: "Remplissez notre formulaire de devis en ligne en quelques clics, ou appelez-nous directement au 06 60 13 05 96. Nous vous répondons sous 24h avec une proposition personnalisée et sans engagement.",
  },
  {
    question: "Quelle est votre spécialité culinaire ?",
    answer: "Notre cuisine s'inspire des traditions méditerranéennes enrichies de touches caribéennes. Nous proposons une gastronomie métissée, généreuse et raffinée, préparée à partir de produits frais et de saison issus de producteurs locaux.",
  },
  {
    question: "Proposez-vous des dégustations avant de finaliser la commande ?",
    answer: "Oui, pour les événements de plus de 50 personnes, nous organisons une dégustation sur rendez-vous. C'est l'occasion de valider ensemble les saveurs, les présentations et d'ajuster le menu selon vos retours.",
  },
];

const values = [
  {
    icon: Recycle,
    title: "Zéro Déchet",
    description:
      "Engagés dans une démarche zéro déchet, nous mettons en oeuvre des actions concrètes : valorisation des déchets par compostage, création d'huiles aromatisées, de soupes gourmandes et de poudres de décoration issues de matières premières récupérées.",
  },
  {
    icon: MapPin,
    title: "Circuits Courts",
    description:
      "Nous favorisons les circuits courts, en collaborant étroitement avec des producteurs de la région, afin de garantir la fraîcheur de nos produits tout en soutenant l'économie locale.",
  },
  {
    icon: Heart,
    title: "Solidarité",
    description:
      "Les surplus de production sont soigneusement redistribués à une association humanitaire de Montpellier, renforçant ainsi notre engagement solidaire.",
  },
  {
    icon: Monitor,
    title: "Interface Minimaliste",
    description:
      "Une interface épurée pour réduire la consommation d'énergie lors de votre navigation. Chaque choix de design est pensé pour limiter notre empreinte numérique.",
  },
  {
    icon: Palette,
    title: "Logo Éco-Conçu",
    description:
      "Un logo en noir et blanc, pour un chargement plus rapide et une impression plus sobre et respectueuse de l'environnement.",
  },
];

const timeline = [
  { year: "2008", event: "Création de Traiteur Montpellier" },
  { year: "2012", event: "Lancement de la démarche zéro déchet" },
  { year: "2015", event: "Partenariat avec les producteurs locaux" },
  { year: "2018", event: "500ème événement célébré" },
  { year: "2020", event: "Adaptation et innovation pendant la crise" },
  { year: "2024", event: "50 000 convives servis, engagement renforcé" },
];


export default function AProposContent() {
  const storyRef = useRef(null);
  const storyInView = useInView(storyRef, { once: true, margin: "-100px" });
  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const mapRef = useRef(null);
  const mapInView = useInView(mapRef, { once: true, margin: "-100px" });
  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const scripts = [
      "https://ines-reception.digifactory.fr/inc/js/jquery.js",
      "https://ines-reception.digifactory.fr/admin/inc/js/jdigi.js",
      "https://ines-reception.digifactory.fr/inc/js/site.js",
      "https://ines-reception.digifactory.fr/admin/inc/js/moment.min.js",
      "https://ines-reception.digifactory.fr/admin/inc/js/moment-fr.js",
      "https://ines-reception.digifactory.fr/admin/inc/js/jdigiTraits.js",
    ];

    let loaded = 0;
    const loadNext = () => {
      if (loaded < scripts.length) {
        const s = document.createElement("script");
        s.src = scripts[loaded];
        s.onload = () => { loaded++; loadNext(); };
        document.body.appendChild(s);
      } else {
        const asyncScript = document.createElement("script");
        asyncScript.src = "https://ines-reception.digifactory.fr/inc/js/extForm.js?f=dmd_devis&id=ines-devis-form";
        asyncScript.async = true;
        document.body.appendChild(asyncScript);
      }
    };
    loadNext();
  }, []);

  return (
    <PageTransition>
      <main>
        <PageHero
          subtitle="Depuis 2008 - Montpellier"
          title="A Propos de"
          titleAccent="Traiteur Montpellier"
          description="Traiteur Montpellier incarne depuis 2008 une vision gastronomique qui célèbre la richesse des cultures méditerranéennes dans leur diversité, tout en y insufflant des inspirations caribéennes délicates."
          image="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
          ctaLabel="Nous contacter"
          ctaHref="#devis"
        />

        {/* Notre Histoire */}
        <section className="bg-white py-28 lg:py-36" ref={storyRef}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={storyInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <span className="text-xs font-semibold tracking-[0.3em] text-purple uppercase">
                  Qui sommes-nous
                </span>
                <h2
                  className="mt-4 text-4xl font-bold tracking-tight text-black md:text-5xl"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Une vision
                  <br />
                  <span className="text-purple">gastronomique</span>
                  <br />
                  engagée
                </h2>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-neutral-600">
                  Traiteur Montpellier incarne depuis 2008 une vision gastronomique qui célèbre
                  la richesse des cultures méditerranéennes dans leur diversité, tout en y
                  insufflant des inspirations caribéennes délicates.
                </p>
                <p className="mt-4 max-w-lg text-lg leading-relaxed text-neutral-600">
                  Chaque création reflète l&apos;esprit de partage, la générosité et la subtilité
                  des cuisines du Sud, magnifiées par notre sens du détail et notre exigence de qualité.
                </p>
                <p className="mt-4 max-w-lg text-lg leading-relaxed text-neutral-600">
                  Nos prestations, pensées pour les professionnels et les institutions, sont
                  façonnées sur mesure pour traduire vos valeurs et votre image à travers une
                  cuisine aussi élégante qu&apos;engagée.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={storyInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <div
                    className="aspect-[4/5] bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop')",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="absolute -bottom-6 -left-6 rounded-2xl bg-purple p-6 text-white shadow-2xl shadow-purple/30">
                  <p className="text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
                    15+
                  </p>
                  <p className="mt-1 text-xs font-medium tracking-wider uppercase opacity-80">
                    Années d&apos;excellence
                  </p>
                </div>
                <div className="absolute -top-4 -right-4 -z-10 h-full w-full rounded-2xl border-2 border-purple/20" />
              </motion.div>
            </div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={storyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-24 overflow-x-auto"
            >
              <div className="flex min-w-max items-center gap-0">
                {timeline.map((item, i) => (
                  <div key={item.year} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <span
                        className="text-2xl font-bold text-purple"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {item.year}
                      </span>
                      <div className="my-3 h-4 w-4 rounded-full bg-purple" />
                      <span className="max-w-[140px] text-center text-xs text-neutral-500">
                        {item.event}
                      </span>
                    </div>
                    {i < timeline.length - 1 && (
                      <div className="mx-2 h-[2px] w-16 bg-purple/20 lg:w-24" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* RSE / Nos Valeurs */}
        <section className="bg-neutral-50 py-28 lg:py-36" ref={valuesRef}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="mx-auto max-w-3xl text-center"
            >
              <span className="text-xs font-semibold tracking-[0.3em] text-purple uppercase">
                RSE & Engagement
              </span>
              <h2
                className="mt-4 text-4xl font-bold tracking-tight text-black md:text-5xl"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                L&apos;excellence culinaire dans une
                <br />
                <span className="text-purple">démarche éthique</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-neutral-500">
                Chez Traiteur Montpellier, l&apos;art de recevoir s&apos;accompagne d&apos;un profond
                respect pour la planète. Un engagement sincère pour des événements aussi
                savoureux que responsables.
              </p>
            </motion.div>

            <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {values.slice(0, 3).map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                  className="group text-center"
                >
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-purple/5 transition-all duration-300 group-hover:bg-purple/10 group-hover:shadow-lg group-hover:shadow-purple/10">
                    <value.icon className="h-8 w-8 text-purple" />
                  </div>
                  <h3 className="mt-6 text-lg font-bold text-black">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Design engagements */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mx-auto mt-16 max-w-3xl"
            >
              <p className="text-center text-sm leading-relaxed text-neutral-500">
                Que ce soit à travers notre pratique de la cuisine ou par le design de notre
                identité graphique et de notre site, tout est pensé pour répondre à ces valeurs :
              </p>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {values.slice(3).map((value, i) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 + i * 0.15 }}
                    className="group flex gap-4 rounded-2xl border border-neutral-100 bg-white p-6 transition-all duration-300 hover:border-purple/20 hover:shadow-lg hover:shadow-purple/5"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple/5 transition-colors group-hover:bg-purple/10">
                      <value.icon className="h-5 w-5 text-purple" />
                    </div>
                    <div>
                      <h4 className="font-bold text-black">{value.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-neutral-500">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Carte + Contact Info */}
        <section className="bg-black py-28 lg:py-36" ref={mapRef}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={mapInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-center"
            >
              <span className="text-xs font-semibold tracking-[0.3em] text-purple-light uppercase">
                Nous trouver
              </span>
              <h2
                className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Basés à
                <br />
                <span className="text-purple-light">Montpellier</span>
              </h2>
            </motion.div>

            <div className="mt-16 grid gap-8 lg:grid-cols-5">
              {/* Map */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={mapInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="overflow-hidden rounded-2xl lg:col-span-3"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2888.5!2d3.8367!3d43.6048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b6af0725dd1db1%3A0xad8756742c40250!2s81+Rue+de+Padirac%2C+34070+Montpellier!5e0!3m2!1sfr!2sfr!4v1"
                  width="100%"
                  height="450"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Traiteur Montpellier - Localisation"
                  className="rounded-2xl"
                />
              </motion.div>

              {/* Contact info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={mapInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex flex-col justify-center space-y-8 lg:col-span-2"
              >
                <div className="group flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple/10 transition-colors group-hover:bg-purple/20">
                    <MapPin className="h-5 w-5 text-purple-light" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Adresse</h4>
                    <p className="mt-1 text-sm text-white/50">
                      81 rue de Padirac, 34070 Montpellier
                      <br />
                      Intervention dans tout l&apos;Hérault
                    </p>
                  </div>
                </div>

                <div className="group flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple/10 transition-colors group-hover:bg-purple/20">
                    <Phone className="h-5 w-5 text-purple-light" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Téléphone</h4>
                    <a href="tel:+33660130596" className="mt-1 block text-sm text-white/50 transition-colors hover:text-purple-light">
                      +33 (6) 60 13 05 96
                    </a>
                  </div>
                </div>

                <div className="group flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple/10 transition-colors group-hover:bg-purple/20">
                    <Mail className="h-5 w-5 text-purple-light" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Email</h4>
                    <a href="mailto:contact@traiteurmontpellier.com" className="mt-1 block text-sm text-white/50 transition-colors hover:text-purple-light">
                      contact@traiteurmontpellier.com
                    </a>
                  </div>
                </div>

                <div className="group flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple/10 transition-colors group-hover:bg-purple/20">
                    <Clock className="h-5 w-5 text-purple-light" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Horaires</h4>
                    <p className="mt-1 text-sm text-white/50">
                      Mar - Sam : 9h - 18h
                      <br />
                      Prestation sur réservation
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <a
                    href="https://www.instagram.com/traiteurmontpellier"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all hover:border-purple hover:text-purple"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/traiteur-montpellier"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all hover:border-purple hover:text-purple"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.facebook.com/ines.reception"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all hover:border-purple hover:text-purple"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Formulaire de devis Digifactory */}
        <section id="devis" className="relative bg-white py-28 lg:py-36" ref={formRef}>
          <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-purple-muted blur-[150px]" />

          <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-center"
            >
              <span className="text-xs font-semibold tracking-[0.3em] text-purple uppercase">
                Votre projet
              </span>
              <h2
                className="mt-4 text-4xl font-bold tracking-tight text-black md:text-5xl"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Demandez votre
                <br />
                <span className="text-purple">devis gratuit</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-500">
                Décrivez-nous votre événement et recevez une proposition personnalisée
                sous 24 heures.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 rounded-3xl border border-neutral-100 bg-white p-8 shadow-xl shadow-black/[0.03] md:p-12"
            >
              <div
                id="ines-devis-form"
                style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}
              />
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <FAQ items={aproposFaq} title="Questions générales" />
      </main>
    </PageTransition>
  );
}
