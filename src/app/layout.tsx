import type { Metadata } from "next";
import Script from "next/script";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";
import JsonLd from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.traiteurmontpellier.com"),
  title: {
    default: "Traiteur Montpellier | Traiteur d'Exception pour vos Événements",
    template: "%s | Traiteur Montpellier",
  },
  description:
    "Traiteur Montpellier, votre partenaire culinaire pour des événements d'exception à Montpellier et ses environs. Entreprises, cocktails, événements privés. Cuisine méditerranéenne raffinée et écoresponsable depuis 2008.",
  keywords: [
    "traiteur montpellier",
    "traiteur entreprise montpellier",
    "traiteur événement montpellier",
    "cocktail dînatoire montpellier",
    "buffet montpellier",
    "traiteur écoresponsable",
    "traiteur méditerranéen",
    "traiteur hérault",
    "plateaux repas montpellier",
    "catering montpellier",
  ],
  openGraph: {
    title: "Traiteur Montpellier | Traiteur d'Exception",
    description:
      "Expériences culinaires sur mesure pour vos événements à Montpellier. Cuisine méditerranéenne raffinée et engagement écoresponsable depuis 2008.",
    url: "https://www.traiteurmontpellier.com",
    siteName: "Traiteur Montpellier",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Traiteur Montpellier | Traiteur d'Exception",
    description:
      "Expériences culinaires sur mesure pour vos événements à Montpellier depuis 2008.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.traiteurmontpellier.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <Script id="gtm-head" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W6786J2W');`}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${playfair.variable} font-sans antialiased`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W6786J2W"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <JsonLd />
        <LayoutShell>
          {children}
        </LayoutShell>
      </body>
    </html>
  );
}
