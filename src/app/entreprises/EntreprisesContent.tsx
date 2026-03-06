"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Building2,
  UtensilsCrossed,
  PartyPopper,
  GlassWater,
  Cake,
  Users,
  Check,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import PageTransition from "@/components/PageTransition";
import Carousel from "@/components/Carousel";
import FAQ from "@/components/FAQ";

const faqItems = [
  {
    question: "Quel type d'événements d'entreprise couvrez-vous ?",
    answer: "Nous couvrons tous les types d'événements professionnels : séminaires, conférences, lancements de produit, repas d'affaires, inaugurations, soirées de gala, team buildings et afterworks. Chaque prestation est adaptée a votre format et a votre image de marque.",
  },
  {
    question: "Pouvez-vous adapter les menus aux régimes alimentaires de nos collaborateurs ?",
    answer: "Absolument. Nous proposons systématiquement des options végétariennes, vegan, sans gluten et halal. Lors de la commande, indiquez-nous les restrictions alimentaires et nous adapterons chaque plateau en conséquence, sans supplément.",
  },
  {
    question: "Quel est le délai de commande pour un événement professionnel ?",
    answer: "Nous recommandons un délai de 10 jours ouvrés pour les événements de moins de 50 personnes, et 3 semaines pour les événements plus importants. En cas d'urgence, contactez-nous directement par téléphone.",
  },
  {
    question: "Proposez-vous des forfaits récurrents pour les entreprises ?",
    answer: "Oui, nous proposons des contrats cadre pour les entreprises ayant des besoins réguliers : pauses déjeuner hebdomadaires, petits déjeuners mensuels, etc. Ces forfaits bénéficient de tarifs préférentiels.",
  },
  {
    question: "Le service et le matériel sont-ils inclus dans le prix ?",
    answer: "Oui, nos prestations incluent la livraison, la mise en place, la vaisselle, les couverts et le débarrassage. Pour les événements nécessitant un service a table, nous mettons a disposition notre équipe de serveurs.",
  },
  {
    question: "Intervenez-vous dans nos locaux ou uniquement dans des lieux de réception ?",
    answer: "Nous intervenons partout : dans vos bureaux, salles de réunion, espaces de coworking, lieux de réception ou en extérieur. Notre équipe s'adapte a toutes les configurations et contraintes logistiques.",
  },
];

const prestations = [
  {
    icon: Building2,
    title: "Événement Entreprise",
    subtitle: "Séminaires & Conférences",
    description:
      "Organisez vos événements d'entreprise avec l'assurance d'une prestation culinaire soignée et sur mesure. Traiteur Montpellier accompagne vos séminaires, repas d'affaires, conférences et lancements en apportant une attention toute particulière aux détails et à l'expérience gustative. Faites de chaque rencontre professionnelle un moment mémorable, empreint de saveurs raffinées et d'élégance naturelle.",
    longDescription:
      "De la réunion de direction intime au congrès de grande envergure, nous concevons des menus qui reflètent l'image de votre entreprise. Nos chefs sélectionnent des produits de saison auprès de producteurs locaux pour créer des plateaux repas équilibrés, des cocktails dînatoires sophistiqués et des pauses gourmandes qui dynamiseront vos journées professionnelles. Chaque détail logistique est anticipé pour que vous puissiez vous concentrer sur l'essentiel : vos collaborateurs et vos objectifs.",
    image: "/photos site/cocktail-service-traiteur-montpellier.jpg",
    features: ["Accueil & pause café", "Pack café & thé", "Cocktail déjeunatoire & dînatoire", "Cocktail d'entreprise", "Séminaires & conférences", "Arbre de Noël & fête de fin d'année", "Vœux du nouvel an", "Déjeuner ou dîner d'affaire", "Inauguration & lancement de produit", "Réception institutionnelle", "Soirée networking", "Brunch d'entreprise"],
  },
  {
    icon: UtensilsCrossed,
    title: "Foires & Salons",
    subtitle: "Stands & Expositions",
    description:
      "Confiez à Traiteur Montpellier le catering de vos foires et salons pour sublimer vos participations professionnelles. Paniers de fruits frais, plateaux petits déjeuners, grazing tables, plateaux salés chauds ou froids, mignardises, boissons softs bio et vins de région.",
    longDescription:
      "Packs viennoiserie, location de verrerie et cocktails VIP pour vos événements prestigieux. Nous comprenons les contraintes spécifiques des salons professionnels : timing serré, logistique complexe, besoin de flexibilité. Notre équipe s'adapte à votre planning et livre directement sur votre stand, avec un matériel de présentation élégant qui valorise votre image de marque. Des paniers individuels aux grazing tables spectaculaires, chaque formule est pensée pour impressionner vos visiteurs et renforcer votre présence.",
    image: "/photos site/table-amuse-bouche-apero-traiteur-montpellier.jpg",
    features: ["Cocktail VIP", "Ateliers culinaires en direct", "Bar à dégustation", "Packs viennoiserie", "Pack soft", "Location de verrerie", "Grazing table", "Plateaux pièces cocktail chaud/froid", "Panier repas staff", "Catering"],
  },
  {
    icon: PartyPopper,
    title: "Événement Privé",
    subtitle: "Célébrations & Réceptions",
    description:
      "Célébrez vos moments précieux avec une cuisine qui conjugue générosité, authenticité et délicatesse. Traiteur Montpellier imagine pour vos événements privés des prestations personnalisées, où chaque détail est pensé pour refléter votre sens de l'accueil et votre goût de l'excellence discrète.",
    longDescription:
      "Possibilité de prestation sur mesure, avec un concept créé spécialement pour l'événement. Que ce soit pour un anniversaire intime, une garden-party estivale, un baptême ou toute autre célébration, nous composons un menu qui raconte votre histoire. Notre cuisine d'inspiration méditerranéenne et caribéenne apporte une touche d'originalité à chaque assiette, tandis que notre engagement éco-responsable garantit des événements aussi savoureux que respectueux. Du premier contact au dernier service, nous sommes à vos côtés.",
    image: "/photos site/apero-dinatoire-canape-traiteur-montpellier.jpg",
    features: ["Cocktail dînatoire de fête", "Baptême, anniversaire, fête de famille", "Garden party", "Brunch privé", "Cheffe à domicile", "Cheffe à demeure"],
  },
];

const carouselSlides = [
  { src: "/photos site/cocktail-dinatoire-traiteur-montpellier-1.jpg", alt: "Cocktail dinatoire" },
  { src: "/photos site/plat-haut-de-gamme-traiteur-montpellier.jpg", alt: "Plat haut de gamme" },
  { src: "/photos site/assiette-dressage-salon-traiteur-montpellier.jpg", alt: "Dressage salon" },
  { src: "/photos site/macarons-traiteur-montpellier.jpg", alt: "Macarons" },
  { src: "/photos site/minis-burgers-boeuf-traiteur-montpellier.jpg", alt: "Mini burgers boeuf" },
  { src: "/photos site/canapes-mousse-lavande-traiteur-montpellier.jpg", alt: "Canapés mousse lavande" },
];

const offerings = [
  { icon: GlassWater, label: "Cocktails & Boissons" },
  { icon: Cake, label: "Mignardises & Desserts" },
  { icon: Users, label: "Service & Personnel" },
];

export default function EntreprisesContent() {
  return (
    <PageTransition>
      <main>
        <PageHero
          subtitle="Nos Prestations"
          title="Des expériences"
          titleAccent="culinaires d'exception"
          description="Sublimez vos réceptions grâce a notre savoir-faire et a notre passion pour une cuisine généreuse, raffinée et éco-responsable."
          image="/photos site/cocktail-service-traiteur-montpellier.jpg"
        />

        {/* Prestations */}
        {prestations.map((prestation, index) => (
          <PrestationSection key={prestation.title} prestation={prestation} index={index} reversed={index % 2 === 1} />
        ))}

        {/* Carousel */}
        <section className="bg-neutral-50 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="mb-12 text-center"
            >
              <span className="text-xs font-semibold tracking-[0.3em] text-purple uppercase">
                En images
              </span>
              <h2
                className="mt-4 text-3xl font-bold tracking-tight text-black md:text-4xl"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Nos <span className="text-purple">réalisations</span>
              </h2>
            </motion.div>
            <Carousel slides={carouselSlides} autoplayDelay={5000} />
          </div>
        </section>

        {/* Offerings bar */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-8 lg:gap-16"
            >
              {offerings.map((item) => (
                <div key={item.label} className="flex items-center gap-3 text-neutral-400">
                  <item.icon className="h-5 w-5" />
                  <span className="text-sm font-medium tracking-wide">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-purple-dark py-24">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2
                className="text-3xl font-bold text-white md:text-5xl"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Un projet ? Une idée ?
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
                Parlez-nous de votre événement et recevez une proposition personnalisée sous 24h. Devis gratuit et sans engagement.
              </p>
              <Link
                href="/a-propos#devis"
                className="group relative mt-10 inline-block overflow-hidden rounded-full border border-white/30 bg-white/10 px-10 py-4 text-sm font-semibold tracking-widest text-white uppercase backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/20"
              >
                <span className="relative z-10">Demander un devis gratuit</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <FAQ items={faqItems} title="Questions sur nos prestations entreprise" />
      </main>
    </PageTransition>
  );
}

function PrestationSection({
  prestation,
  index,
  reversed,
}: {
  prestation: (typeof prestations)[number];
  index: number;
  reversed: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const Icon = prestation.icon;

  return (
    <section
      ref={scrollRef}
      className={`py-24 lg:py-32 ${index % 2 === 0 ? "bg-white" : "bg-neutral-50"}`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8" ref={ref}>
        <div className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${reversed ? "lg:[direction:rtl]" : ""}`}>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? 60 : -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative lg:[direction:ltr]"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <motion.div style={{ y: imageY }} className="relative aspect-[4/3]">
                <Image
                  src={prestation.image}
                  alt={prestation.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            {/* Decorative */}
            <div className="absolute -top-4 -right-4 -z-10 h-full w-full rounded-2xl border-2 border-purple/15" />
            <div className="absolute -bottom-4 -left-4 -z-10 h-24 w-24 rounded-full bg-purple/10 blur-[40px]" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? -60 : 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="lg:[direction:ltr]"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple/5">
                <Icon className="h-5 w-5 text-purple" />
              </div>
              <span className="text-xs font-semibold tracking-[0.25em] text-purple uppercase">
                {prestation.subtitle}
              </span>
            </div>

            <h2
              className="mt-6 text-3xl font-bold tracking-tight text-black md:text-4xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {prestation.title}
            </h2>

            <p className="mt-5 text-base leading-relaxed text-neutral-600">
              {prestation.description}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-500">
              {prestation.longDescription}
            </p>

            {/* Features */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {prestation.features.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.07 }}
                  className="flex items-center gap-2"
                >
                  <Check className="h-4 w-4 shrink-0 text-purple" />
                  <span className="text-sm text-neutral-600">{feature}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8"
            >
              <Link
                href="/a-propos#devis"
                className="group inline-flex items-center gap-2 rounded-full bg-purple px-8 py-3 text-sm font-semibold tracking-wide text-white uppercase transition-all duration-300 hover:bg-purple-dark hover:shadow-lg hover:shadow-purple/20"
              >
                Demander un devis
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
