import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { pageContents } from "../src/lib/db/schema";

const pages = [
  {
    pageKey: "home",
    data: {
      hero: {
        badge: "Depuis 2008 — Montpellier",
        titleLine1: "L'Art de la",
        titleLine2: "Gastronomie",
        titleLine3: "sur mesure",
        description: "Inspirés par les grandes traditions méditerranéennes, sublimées par des touches caribéennes, nous imaginons des expériences culinaires alliant authenticité, créativité et engagement écoresponsable, portées par le savoir-faire de notre cheffe formée à l'École Ducasse.",
        image: "/photos site/cocktail-service-traiteur-montpellier.jpg",
      },
      concept: {
        subtitle: "Notre engagement",
        titleLine1: "Une vision",
        titleLine2: "gastronomique",
        titleLine3: "engagée",
        description1: "Traiteur Montpellier incarne depuis 2008 une vision gastronomique qui célèbre la richesse des cultures méditerranéennes dans leur diversité, tout en y insufflant des inspirations caribéennes délicates.",
        description2: "Chez Traiteur Montpellier, l'art de recevoir s'accompagne d'un profond respect pour la planète. Un engagement sincère pour des événements aussi savoureux que responsables.",
        badgeNumber: "15+",
        badgeLabel: "Années d'excellence",
        image: "/photos site/rse-traiteur-montpellier-768x763.jpg",
        features: [
          { title: "Zéro Déchet", description: "Valorisation des déchets par compostage, création d'huiles aromatisées, de soupes gourmandes et de poudres de décoration issues de matières premières récupérées." },
          { title: "Circuits Courts", description: "Collaboration étroite avec des producteurs de la région pour garantir la fraîcheur de nos produits tout en soutenant l'économie locale." },
          { title: "Solidarité", description: "Les surplus de production sont soigneusement redistribués à une association humanitaire de Montpellier." },
        ],
      },
      services: {
        subtitle: "Nos prestations",
        titleLine1: "Des expériences culinaires",
        titleLine2: "d'exception",
        description: "Sublimez vos réceptions grâce à notre savoir-faire et à notre passion pour une cuisine généreuse et raffinée.",
        cards: [
          { title: "Événement Entreprise", subtitle: "Séminaires & Conférences", description: "Organisez vos événements d'entreprise avec l'assurance d'une prestation culinaire soignée et sur mesure.", features: ["Cocktail déjeunatoire & dînatoire", "Séminaires & conférences", "Arbre de Noël"] },
          { title: "Foires & Salons", subtitle: "Stands & Expositions", description: "Confiez à Traiteur Montpellier le catering de vos foires et salons pour sublimer vos participations professionnelles.", features: ["Cocktail VIP", "Grazing table", "Catering sur stand"] },
          { title: "Événement Privé", subtitle: "Célébrations & Réceptions", description: "Célébrez vos moments précieux avec une cuisine qui conjugue générosité, authenticité et délicatesse.", features: ["Cheffe à domicile", "Brunch privé", "Garden party"] },
        ],
        offerings: ["Cocktails & Boissons", "Mignardises & Desserts", "Service & Personnel"],
      },
    },
  },
  {
    pageKey: "entreprises",
    data: {
      hero: { subtitle: "Nos Prestations", title: "Des expériences", titleAccent: "culinaires d'exception", description: "Sublimez vos réceptions grâce a notre savoir-faire et a notre passion pour une cuisine généreuse, raffinée et éco-responsable.", image: "/photos site/cocktail-service-traiteur-montpellier.jpg" },
      offerings: ["Cocktails & Boissons", "Mignardises & Desserts", "Service & Personnel"],
      cta: { title: "Un projet ? Une idée ?", description: "Parlez-nous de votre événement et recevez une proposition personnalisée sous 24h. Devis gratuit et sans engagement.", buttonText: "Demander un devis gratuit" },
      prestations: [
        { title: "Événement Entreprise", subtitle: "Séminaires & Conférences", description: "Organisez vos événements d'entreprise avec l'assurance d'une prestation culinaire soignée et sur mesure.", longDescription: "De la réunion de direction intime au congrès de grande envergure, nous concevons des menus qui reflètent l'image de votre entreprise.", features: ["Accueil & pause café", "Pack café & thé", "Cocktail déjeunatoire & dînatoire", "Cocktail d'entreprise", "Séminaires & conférences", "Arbre de Noël & fête de fin d'année", "Vœux du nouvel an", "Déjeuner ou dîner d'affaire", "Inauguration & lancement de produit", "Réception institutionnelle", "Soirée networking", "Brunch d'entreprise"] },
        { title: "Foires & Salons", subtitle: "Stands & Expositions", description: "Confiez à Traiteur Montpellier le catering de vos foires et salons.", longDescription: "Packs viennoiserie, location de verrerie et cocktails VIP pour vos événements prestigieux.", features: ["Cocktail VIP", "Ateliers culinaires en direct", "Bar à dégustation", "Packs viennoiserie", "Pack soft", "Location de verrerie", "Grazing table", "Plateaux pièces cocktail chaud/froid", "Panier repas staff", "Catering"] },
        { title: "Événement Privé", subtitle: "Célébrations & Réceptions", description: "Célébrez vos moments précieux avec une cuisine qui conjugue générosité, authenticité et délicatesse.", longDescription: "Possibilité de prestation sur mesure, avec un concept créé spécialement pour l'événement.", features: ["Cocktail dînatoire de fête", "Baptême, anniversaire, fête de famille", "Garden party", "Brunch privé", "Cheffe à domicile", "Cheffe à demeure"] },
      ],
      faq: [
        { question: "Quel type d'événements d'entreprise couvrez-vous ?", answer: "Nous couvrons tous les types d'événements professionnels : séminaires, conférences, lancements de produit, repas d'affaires, inaugurations, soirées de gala, team buildings et afterworks." },
        { question: "Pouvez-vous adapter les menus aux régimes alimentaires ?", answer: "Absolument. Nous proposons des options végétariennes, vegan, sans gluten et halal." },
        { question: "Quel est le délai de commande ?", answer: "10 jours ouvrés pour les événements de moins de 50 personnes, 3 semaines pour les plus importants." },
        { question: "Proposez-vous des forfaits récurrents ?", answer: "Oui, nous proposons des contrats cadre avec tarifs préférentiels." },
        { question: "Le service et le matériel sont-ils inclus ?", answer: "Oui, livraison, mise en place, vaisselle, couverts et débarrassage inclus." },
        { question: "Intervenez-vous dans nos locaux ?", answer: "Nous intervenons partout : bureaux, salles de réunion, espaces de coworking, lieux de réception." },
      ],
    },
  },
  {
    pageKey: "foires-salons",
    data: {
      hero: { subtitle: "Foires & Salons", title: "Catering professionnel", titleAccent: "pour vos salons", description: "Faites la différence avec un service culinaire fluide, raffiné et respectueux de votre image de marque.", image: "/photos site/cocktail-service-traiteur-montpellier.jpg" },
      intro: { subtitle: "Pourquoi nous choisir", titleLine1: "Sublimez vos participations", titleLine2: "professionnelles", description1: "Confiez à Traiteur Montpellier le catering de vos foires et salons pour sublimer vos participations professionnelles avec une prestation sur mesure.", description2: "Notre équipe s'adapte à votre planning et livre directement sur votre stand, avec un matériel de présentation élégant.", checklist: ["Livraison sur stand", "Matériel fourni", "Menus variés", "Éco-responsable"] },
      services: [
        { title: "Grazing Tables", description: "Tables d'abondance spectaculaires composées de fromages, charcuteries, fruits frais, crudités et pains artisanaux." },
        { title: "Packs Café & Thé", description: "Prêt de machine à capsules, sélection de thés et infusions bio, mignardises d'accompagnement." },
        { title: "Cocktails VIP", description: "Cocktails dînatoires haut de gamme avec canapés raffinés, mignardises et vins de région." },
        { title: "Logistique Complète", description: "Livraison directe sur stand, installation du matériel de présentation, vaisselle élégante et débarrassage." },
        { title: "Plateaux Repas", description: "Plateaux salés chauds ou froids, paniers individuels, formules déjeuner équilibrées." },
        { title: "Boissons Bio", description: "Sélection de boissons softs bio, jus de fruits pressés, eaux aromatisées maison et vins de la région." },
      ],
      steps: [
        { step: "01", title: "Premier contact", description: "Vous nous décrivez votre salon, le nombre de jours, l'affluence prévue et vos attentes." },
        { step: "02", title: "Proposition sur mesure", description: "Nous élaborons un menu et un planning de livraison adaptés." },
        { step: "03", title: "Livraison & Installation", description: "Notre équipe livre et installe directement sur votre stand." },
        { step: "04", title: "Jour J & Suivi", description: "Service fluide, réapprovisionnement si besoin, débarrassage complet." },
      ],
      cta: { title: "Un salon à venir ?", description: "Parlez-nous de votre participation et recevez une proposition adaptée. Devis gratuit sous 24h.", buttonText: "Demander un devis gratuit" },
      faq: [
        { question: "Dans quel rayon intervenez-vous ?", answer: "Montpellier et tout l'Hérault. Pour les grands salons, toute l'Occitanie." },
        { question: "Quel est le délai minimum ?", answer: "2 semaines recommandées. 3-4 semaines pour les grands événements." },
        { question: "Proposez-vous des options pour régimes spécifiques ?", answer: "Oui : végétarien, vegan, sans gluten, sans lactose." },
        { question: "La vaisselle est-elle incluse ?", answer: "Oui, vaisselle, couverts, nappes et matériel de présentation inclus." },
        { question: "Pouvez-vous livrer sur plusieurs jours ?", answer: "Oui, forfaits multi-journées avec menus variés." },
        { question: "Comment fonctionne la livraison sur stand ?", answer: "Livraison directe, installation, brief, débarrassage. Aucune manutention de votre côté." },
      ],
    },
  },
  {
    pageKey: "evenements-prives",
    data: {
      hero: { subtitle: "Événements Privés", title: "Célébrez vos", titleAccent: "moments précieux", description: "Une cuisine qui conjugue générosité, authenticité et délicatesse.", image: "/photos site/cocktail-service-traiteur-montpellier.jpg" },
      intro: { subtitle: "Votre événement, notre passion", titleLine1: "Créez des souvenirs", titleLine2: "gourmands", description1: "Traiteur Montpellier imagine pour vos événements privés des prestations personnalisées.", description2: "Que ce soit pour un anniversaire intime, une garden-party estivale, un baptême ou toute autre célébration, nous composons un menu qui raconte votre histoire." },
      celebrations: [
        { title: "Cocktail Dînatoire de Fête", description: "Sublimez vos soirées avec un cocktail dînatoire élégant et convivial." },
        { title: "Baptême, Anniversaire & Fête de Famille", description: "Célébrez vos moments précieux en famille avec des buffets généreux et personnalisés." },
        { title: "Garden Party", description: "Profitez du climat méditerranéen avec une réception en plein air." },
        { title: "Brunch Privé", description: "Un brunch gourmand et raffiné pour vos matinées entre proches." },
        { title: "Cheffe à Domicile", description: "Notre cheffe se déplace chez vous pour créer un menu sur mesure." },
        { title: "Cheffe à Demeure", description: "Pour vos séjours prolongés, profitez d'une cheffe qui compose vos repas au quotidien." },
      ],
      whyUs: [
        "Menu 100% personnalisé selon vos goûts",
        "Produits frais et de saison",
        "Cuisine méditerranéenne et caribéenne",
        "Engagement éco-responsable",
        "Service discret et professionnel",
        "Livraison et installation incluses",
      ],
      cta: { title: "Un événement à célébrer ?", description: "Racontez-nous votre projet et recevez une proposition gourmande. Devis gratuit sous 24h.", buttonText: "Demander un devis gratuit" },
      faq: [
        { question: "Combien de temps à l'avance réserver ?", answer: "3 semaines minimum. 1-2 mois pour 100+ convives." },
        { question: "Proposez-vous une dégustation ?", answer: "Oui, pour les événements de plus de 50 convives." },
        { question: "Gérez-vous le service sur place ?", answer: "Oui, livraison simple ou service complet avec équipe." },
        { question: "Peut-on mixer les cuisines ?", answer: "Oui, c'est notre spécialité : méditerranéenne et caribéenne." },
        { question: "Fournissez-vous la vaisselle ?", answer: "Oui, vaisselle et couverts inclus. Partenaires décorateurs disponibles." },
        { question: "Nombre minimum de convives ?", answer: "À partir de 10 convives." },
      ],
    },
  },
  {
    pageKey: "a-propos",
    data: {
      hero: { subtitle: "Depuis 2008 - Montpellier", title: "A Propos de", titleAccent: "Traiteur Montpellier", description: "Traiteur Montpellier incarne depuis 2008 une vision gastronomique qui célèbre la richesse des cultures méditerranéennes." },
      story: {
        subtitle: "Qui sommes-nous",
        titleLine1: "Une vision",
        titleLine2: "gastronomique",
        titleLine3: "engagée",
        description1: "Traiteur Montpellier incarne depuis 2008 une vision gastronomique qui célèbre la richesse des cultures méditerranéennes dans leur diversité, tout en y insufflant des inspirations caribéennes délicates.",
        description2: "Chaque création reflète l'esprit de partage, la générosité et la subtilité des cuisines du Sud.",
        description3: "Nos prestations, pensées pour les professionnels et les institutions, sont façonnées sur mesure.",
        badgeNumber: "15+",
        badgeLabel: "Années d'excellence",
      },
      timeline: [
        { year: "2008", title: "L'envie de partager l'héritage culinaire", event: "Inès créé son entreprise de cheffe à domicile" },
        { year: "2010", title: "Premiers Mariages", event: "Début de l'aventure Mariage et organisation de grandes réceptions" },
        { year: "2018", title: "Retour à une entreprise individuelle", event: "L'entreprise revient à un concept plus familiale et authentique" },
        { year: "2020", title: "Repositionnement", event: "Produits bio en circuit court, respectueux de l'environnement" },
        { year: "2023", title: "Diplômée de DUCASSE CAMPUS, Paris", event: "Obtenue avec les félicitations du Jury" },
        { year: "2024", title: "Prix de l'Innovation numérique et Label 0 Déchets", event: "Obtenu par la CMA de l'Hérault" },
        { year: "2025", title: "Ines réception devient Traiteur Montpellier", event: "L'entreprise se concentre sur les événements B2B" },
        { year: "2026", title: "18 ans de savoir-faire", event: "18 ans de passion et d'engagement" },
      ],
      contact: {
        address: "81 rue de Padirac, 34070 Montpellier",
        addressLine2: "Intervention dans tout l'Hérault",
        phone: "+33 (6) 60 13 05 96",
        email: "contact@traiteurmontpellier.com",
        hoursLine1: "Mar - Sam : 9h - 18h",
        hoursLine2: "Prestation sur réservation",
      },
      faq: [
        { question: "Depuis quand Traiteur Montpellier existe-t-il ?", answer: "Fondé en 2008. Plus de 15 ans d'expérience, 500+ événements réalisés." },
        { question: "Quelle est votre zone d'intervention ?", answer: "Montpellier et tout l'Hérault. Occitanie pour les grands événements." },
        { question: "Que signifie votre engagement éco-responsable ?", answer: "Zéro déchet, circuits courts et solidarité." },
        { question: "Comment obtenir un devis ?", answer: "Formulaire en ligne ou appel au 06 60 13 05 96. Réponse sous 24h." },
        { question: "Quelle est votre spécialité culinaire ?", answer: "Cuisine méditerranéenne enrichie de touches caribéennes." },
        { question: "Proposez-vous des dégustations ?", answer: "Oui, pour les événements de plus de 50 personnes." },
      ],
    },
  },
];

async function seedPages() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  console.log("Seeding page contents...");

  for (const page of pages) {
    await db
      .insert(pageContents)
      .values({ pageKey: page.pageKey, data: page.data })
      .onConflictDoUpdate({
        target: pageContents.pageKey,
        set: { data: page.data, updatedAt: new Date() },
      });
    console.log(`  ✓ ${page.pageKey}`);
  }

  console.log("Done!");
}

seedPages().catch(console.error);
