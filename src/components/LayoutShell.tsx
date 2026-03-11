"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import AnimatedLayout from "./AnimatedLayout";
import Header from "./Header";
import Footer from "./Footer";
import CookieBanner from "./CookieBanner";

export default function LayoutShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <AnimatedLayout>
      <Header />
      {children}
      <Footer />
      <CookieBanner />
    </AnimatedLayout>
  );
}
