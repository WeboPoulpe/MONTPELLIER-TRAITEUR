"use client";

import { useEffect } from "react";
import { pushTrackingEvent } from "@/lib/tracking";

export default function TrackingEvents() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest("a");
      if (!link) return;

      const href = link.getAttribute("href") || "";

      if (href.startsWith("tel:")) {
        pushTrackingEvent("click_phone", {
          phone_number: href.replace("tel:", ""),
          page_path: window.location.pathname,
        });
      }

      if (href.startsWith("/devis")) {
        pushTrackingEvent("begin_quote", {
          page_path: window.location.pathname,
          link_text: link.textContent?.trim() || "Demander un devis",
        });
      }

      if (href.includes("wa.me/") || href.includes("whatsapp.com/")) {
        pushTrackingEvent("click_whatsapp", {
          page_path: window.location.pathname,
        });
      }

      if (href.includes("google.com/maps") || href.includes("maps.app.goo.gl")) {
        pushTrackingEvent("click_directions", {
          page_path: window.location.pathname,
        });
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
