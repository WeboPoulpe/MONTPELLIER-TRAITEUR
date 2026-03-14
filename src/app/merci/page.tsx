import type { Metadata } from "next";
import MerciContent from "./MerciContent";

export const metadata: Metadata = {
  title: "Merci pour votre demande",
  description: "Votre demande de devis a bien été envoyée. Notre équipe vous recontacte sous 24h.",
  robots: "noindex, nofollow",
};

export default function MerciPage() {
  return <MerciContent />;
}
