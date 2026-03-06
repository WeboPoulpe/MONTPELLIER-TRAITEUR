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
    question: "Quel type d'evenements d'entreprise couvrez-vous ?",
    answer: "Nous couvrons tous les types d'evenements professionnels : seminaires, conferences, lancements de produit, repas d'affaires, inaugurations, soirees de gala, team buildings et afterworks. Chaque prestation est adaptee a votre format et a votre image de marque.",
  },
  {
    question: "Pouvez-vous adapter les menus aux regimes alimentaires de nos collaborateurs ?",
    answer: "Absolument. Nous proposons systematiquement des options vegetariennes, vegan, sans gluten et halal. Lors de la commande, indiquez-nous les restrictions alimentaires et nous adapterons chaque plateau en consequence, sans supplement.",
  },
  {
    question: "Quel est le delai de commande pour un evenement professionnel ?",
    answer: "Nous recommandons un delai de 10 jours ouvres pour les evenements de moins de 50 personnes, et 3 semaines pour les evenements plus importants. En cas d'urgence, contactez-nous directement par telephone.",
  },
  {
    question: "Proposez-vous des forfaits recurrents pour les entreprises ?",
    answer: "Oui, nous proposons des contrats cadre pour les entreprises ayant des besoins reguliers : pauses dejeuner hebdomadaires, petits dejeuners mensuels, etc. Ces forfaits beneficient de tarifs preferentiels.",
  },
  {
    question: "Le service et le materiel sont-ils inclus dans le prix ?",
    answer: "Oui, nos prestations incluent la livraison, la mise en place, la vaisselle, les couverts et le debarrassage. Pour les evenements necessitant un service a table, nous mettons a disposition notre equipe de serveurs.",
  },
  {
    question: "Intervenez-vous dans nos locaux ou uniquement dans des lieux de reception ?",
    answer: "Nous intervenons partout : dans vos bureaux, salles de reunion, espaces de coworking, lieux de reception ou en exterieur. Notre equipe s'adapte a toutes les configurations et contraintes logistiques.",
  },
];

const prestations = [
  {
    icon: Building2,
    title: "Evenement Entreprise",
    subtitle: "Seminaires & Conferences",
    description:
      "Organisez vos evenements d'entreprise avec l'assurance d'une prestation culinaire soignee et sur mesure. Traiteur Montpellier accompagne vos seminaires, repas d'affaires, conferences et lancements en apportant une attention toute particuliere aux details et a l'experience gustative. Faites de chaque rencontre professionnelle un moment memorable, empreint de saveurs raffinees et d'elegance naturelle.",
    longDescription:
      "De la reunion de direction intime au congres de grande envergure, nous concevons des menus qui refletent l'image de votre entreprise. Nos chefs selectionnent des produits de saison aupres de producteurs locaux pour creer des plateaux repas equilibres, des cocktails dinatoires sophistiques et des pauses gourmandes qui dynamiseront vos journees professionnelles. Chaque detail logistique est anticipe pour que vous puissiez vous concentrer sur l'essentiel : vos collaborateurs et vos objectifs.",
    image: "/photos site/cocktail-service-traiteur-montpellier-150x150.jpg",
    features: ["Cocktails VIP", "Plateaux dejeuners", "Pack cafe & the", "Seminaires", "Inaugurations", "Repas d'affaires"],
  },
  {
    icon: UtensilsCrossed,
    title: "Foires & Salons",
    subtitle: "Stands & Expositions",
    description:
      "Confiez a Traiteur Montpellier le catering de vos foires et salons pour sublimer vos participations professionnelles. Paniers de fruits frais, plateaux petits dejeuners, grazing tables, plateaux sales chauds ou froids, mignardises, boissons softs bio et vins de region.",
    longDescription:
      "Packs cafe, location de materiel et cocktails VIP pour vos evenements prestigieux. Nous comprenons les contraintes specifiques des salons professionnels : timing serre, logistique complexe, besoin de flexibilite. Notre equipe s'adapte a votre planning et livre directement sur votre stand, avec un materiel de presentation elegant qui valorise votre image de marque. Des paniers individuels aux grazing tables spectaculaires, chaque formule est pensee pour impressionner vos visiteurs et renforcer votre presence.",
    image: "/photos site/table-amuse-bouche-apero-traiteur-montpellier-150x150.jpg",
    features: ["Paniers repas staff", "Grazing tables", "Logistique complete", "Plateaux chauds/froids", "Boissons bio", "Vins de region"],
  },
  {
    icon: PartyPopper,
    title: "Evenement Prive",
    subtitle: "Celebrations & Receptions",
    description:
      "Celebrez vos moments precieux avec une cuisine qui conjugue generosite, authenticite et delicatesse. Traiteur Montpellier imagine pour vos evenements prives des prestations personnalisees, ou chaque detail est pense pour refleter votre sens de l'accueil et votre gout de l'excellence discrete.",
    longDescription:
      "Creez des souvenirs gourmands, portes par une approche sincere et soignee. Que ce soit pour un anniversaire intime, une garden-party estivale, un bapteme ou toute autre celebration, nous composons un menu qui raconte votre histoire. Notre cuisine d'inspiration mediterraneenne et caribeenne apporte une touche d'originalite a chaque assiette, tandis que notre engagement eco-responsable garantit des evenements aussi savoureux que respectueux. Du premier contact au dernier service, nous sommes a vos cotes.",
    image: "/photos site/apero-dinatoire-canape-traiteur-montpellier-150x150.jpg",
    features: ["Menu sur mesure", "Decoration culinaire", "Service complet", "Anniversaires", "Baptemes", "Garden-parties"],
  },
];

const carouselSlides = [
  { src: "/photos site/cocktail-dinatoire-traiteur-montpellier-1-150x150.jpg", alt: "Cocktail dinatoire" },
  { src: "/photos site/plat-haut-de-gamme-traiteur-montpellier-150x150.jpg", alt: "Plat haut de gamme" },
  { src: "/photos site/assiette-dressage-salon-traiteur-montpellier-150x150.jpg", alt: "Dressage salon" },
  { src: "/photos site/macarons-traiteur-montpellier-150x150.jpg", alt: "Macarons" },
  { src: "/photos site/minis-burgers-boeuf-traiteur-montpellier-150x150.jpg", alt: "Mini burgers boeuf" },
  { src: "/photos site/canapes-mousse-lavande-traiteur-montpellier-150x150.jpg", alt: "Canapes mousse lavande" },
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
          title="Des experiences"
          titleAccent="culinaires d'exception"
          description="Sublimez vos receptions grace a notre savoir-faire et a notre passion pour une cuisine genereuse, raffinee et eco-responsable."
          image="/photos site/cocktail-service-traiteur-montpellier-150x150.jpg"
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
                Nos <span className="text-purple">realisations</span>
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
                Un projet ? Une idee ?
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
                Parlez-nous de votre evenement et recevez une proposition personnalisee sous 24h. Devis gratuit et sans engagement.
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
