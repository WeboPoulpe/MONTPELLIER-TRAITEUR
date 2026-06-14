interface BreadcrumbItem {
  name: string;
  url: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

const BASE_URL = "https://www.traiteurmontpellier.com";

function JsonLd({
  id,
  data,
}: {
  id: string;
  data: Record<string, unknown>;
}) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  return (
    <JsonLd
      id={`breadcrumb-${items.length}-${items.at(-1)?.name.toLowerCase().replace(/\s+/g, "-")}`}
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

export function FaqJsonLd({
  id,
  items,
}: {
  id: string;
  items: FaqItem[];
}) {
  return (
    <JsonLd
      id={`faq-${id}`}
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }}
    />
  );
}

export function ServiceJsonLd({
  id,
  name,
  description,
  url,
  serviceType,
}: {
  id: string;
  name: string;
  description: string;
  url: string;
  serviceType: string;
}) {
  return (
    <JsonLd
      id={`service-${id}`}
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        serviceType,
        url,
        areaServed: [
          { "@type": "City", name: "Montpellier" },
          { "@type": "AdministrativeArea", name: "Hérault" },
          { "@type": "AdministrativeArea", name: "Occitanie" },
        ],
        provider: {
          "@type": "FoodEstablishment",
          name: "Traiteur Montpellier",
          url: BASE_URL,
          telephone: "+33660130596",
        },
      }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  url,
  image,
  publishedAt,
  updatedAt,
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  updatedAt: string;
}) {
  return (
    <JsonLd
      id="article-schema"
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        image,
        datePublished: publishedAt,
        dateModified: updatedAt,
        mainEntityOfPage: url,
        author: {
          "@type": "Organization",
          name: "Traiteur Montpellier",
          url: BASE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: "Traiteur Montpellier",
          url: BASE_URL,
        },
      }}
    />
  );
}
