"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { updateGoogleConsent } from "@/lib/tracking";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
    updateGoogleConsent(consent === "accepted");
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    updateGoogleConsent(true);
    setVisible(false);
  };

  const refuse = () => {
    localStorage.setItem("cookie-consent", "refused");
    updateGoogleConsent(false);
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
              Avec votre accord, nous utilisons des cookies de mesure et publicitaires
              pour analyser les visites et mesurer nos campagnes Google Ads.{" "}
              <Link href="/politique-confidentialite" className="font-medium text-purple underline underline-offset-2 transition-colors hover:text-purple-dark">
                En savoir plus
              </Link>
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={refuse}
                className="rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-semibold text-neutral-600 transition-colors hover:border-neutral-400 hover:text-black"
              >
                Refuser
              </button>
              <button
                onClick={accept}
                className="rounded-full bg-purple px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-purple-dark hover:shadow-lg hover:shadow-purple/20"
              >
                Accepter
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
