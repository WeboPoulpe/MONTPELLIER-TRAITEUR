"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6"
        >
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 rounded-2xl border border-purple/10 bg-white/95 px-6 py-5 shadow-2xl shadow-black/10 backdrop-blur-md sm:flex-row sm:gap-6">
            <p className="flex-1 text-sm leading-relaxed text-neutral-600">
              Ce site utilise uniquement des cookies essentiels au bon fonctionnement. Aucun cookie publicitaire ou de suivi n&apos;est utilise.{" "}
              <Link href="/politique-confidentialite" className="font-medium text-purple underline underline-offset-2 transition-colors hover:text-purple-dark">
                En savoir plus
              </Link>
            </p>
            <button
              onClick={accept}
              className="shrink-0 rounded-full bg-purple px-6 py-2.5 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-purple-dark hover:shadow-lg hover:shadow-purple/20"
            >
              Compris
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
