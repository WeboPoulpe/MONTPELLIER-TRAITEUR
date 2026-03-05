export default function JsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: "Traiteur Montpellier",
    description:
      "Traiteur d'exception a Montpellier. Cuisine mediterraneenne raffinee pour vos evenements d'entreprise, cocktails dinatoires et celebrations privees. Engagement ecoresponsable depuis 2008.",
    url: "https://traiteurmontpellier.com",
    telephone: "+33660130596",
    email: "contact@traiteurmontpellier.com",
    foundingDate: "2008",
    priceRange: "$$",
    servesCuisine: ["Mediterraneenne", "Caribeenne", "Francaise"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Montpellier",
      addressRegion: "Occitanie",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.6108,
      longitude: 3.8767,
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 43.6108,
        longitude: 3.8767,
      },
      geoRadius: "50000",
    },
    sameAs: [
      "https://www.instagram.com/traiteurmontpellier",
      "https://www.facebook.com/ines.reception",
      "https://www.linkedin.com/company/traiteur-montpellier",
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "19:00",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Prestations traiteur",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Evenement Entreprise",
            description: "Seminaires, conferences, repas d'affaires, cocktails VIP et lancements.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Foires & Salons",
            description: "Catering pour foires et salons professionnels. Paniers repas, grazing tables, plateaux.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Evenement Prive",
            description: "Anniversaires, baptemes, garden-parties. Menus sur mesure et service complet.",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
    />
  );
}
