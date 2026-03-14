"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import AnimatedLayout from "./AnimatedLayout";
import Header from "./Header";
import Footer from "./Footer";
import CookieBanner from "./CookieBanner";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid"];

function UtmCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const params: Record<string, string> = {};
    let hasUtm = false;
    UTM_KEYS.forEach((key) => {
      const val = searchParams.get(key);
      if (val) {
        params[key] = val;
        hasUtm = true;
      }
    });
    if (hasUtm) {
      sessionStorage.setItem("lead_utm", JSON.stringify(params));
    }
  }, [searchParams]);

  return null;
}

export default function LayoutShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Suspense fallback={null}>
        <UtmCapture />
      </Suspense>
      <AnimatedLayout>
        <Header />
        {children}
        <Footer />
        <CookieBanner />
      </AnimatedLayout>
    </>
  );
}
