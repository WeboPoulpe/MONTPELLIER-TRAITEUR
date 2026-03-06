import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import AnimatedLayout from "@/components/AnimatedLayout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
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
  metadataBase: new URL("https://traiteurmontpellier.com"),
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
    url: "https://traiteurmontpellier.com",
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
    canonical: "https://traiteurmontpellier.com",
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
      </head>
      <body
        className={`${geistSans.variable} ${playfair.variable} font-sans antialiased`}
      >
        <JsonLd />
        <AnimatedLayout>
          <Header />
          {children}
          <Footer />
          <CookieBanner />
        </AnimatedLayout>
      </body>
    </html>
  );
}
