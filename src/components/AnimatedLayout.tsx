"use client";

import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import BackgroundPattern from "./BackgroundPattern";

export default function AnimatedLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <BackgroundPattern />
      <AnimatePresence mode="wait">
        <div key={pathname} className="relative z-10">
          {children}
        </div>
      </AnimatePresence>
    </>
  );
}
