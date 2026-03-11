import type { Metadata } from "next";
import AdminPanel from "./AdminPanel";

export const metadata: Metadata = {
  title: "Admin - Blog",
  robots: "noindex, nofollow",
};

export default function AdminPage() {
  return <AdminPanel />;
}
