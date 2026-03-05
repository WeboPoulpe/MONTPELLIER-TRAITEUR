import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import AnimatedLayout from "@/components/AnimatedLayout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

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
  title: "Traiteur Montpellier | Traiteur d'Exception pour vos Événements",
  description:
    "Traiteur Montpellier, votre partenaire culinaire pour des événements d'exception à Montpellier et ses environs. Mariages, entreprises, buffets. Cuisine méditerranéenne raffinée et écoresponsable depuis 2008.",
  keywords: [
    "traiteur montpellier",
    "traiteur mariage montpellier",
    "traiteur entreprise montpellier",
    "traiteur événement montpellier",
    "buffet montpellier",
    "cocktail montpellier",
    "traiteur méditerranéen",
  ],
  openGraph: {
    title: "Traiteur Montpellier | Traiteur d'Exception",
    description:
      "Expériences culinaires sur mesure, alliant authenticité, créativité et engagement écoresponsable.",
    url: "https://traiteurmontpellier.com",
    siteName: "Traiteur Montpellier",
    locale: "fr_FR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
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
      <body
        className={`${geistSans.variable} ${playfair.variable} font-sans antialiased`}
      >
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
