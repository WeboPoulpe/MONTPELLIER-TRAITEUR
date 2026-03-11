import type { Metadata } from "next";
import AdminPanel from "./AdminPanel";

export const metadata: Metadata = {
  title: "Admin - Traiteur Montpellier",
  robots: "noindex, nofollow",
};

export default function AdminPage() {
  return <AdminPanel />;
}
