"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import AnimatedLayout from "./AnimatedLayout";
import Header from "./Header";
import Footer from "./Footer";
import TrackingEvents from "./TrackingEvents";
import { captureAttribution } from "@/lib/tracking";

function UtmCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    captureAttribution();
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
      <TrackingEvents />
      <AnimatedLayout>
        <Header />
        {children}
        <Footer />

      </AnimatedLayout>
    </>
  );
}
