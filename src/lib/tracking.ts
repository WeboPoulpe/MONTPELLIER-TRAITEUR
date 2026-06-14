type DataLayerValue = Record<string, unknown> | unknown[];
const ATTRIBUTION_KEY = "lead_attribution";
const CAMPAIGN_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
] as const;

export interface AttributionData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  fbclid?: string;
  referrer?: string;
  landing_page?: string;
}

declare global {
  interface Window {
    dataLayer?: DataLayerValue[];
  }
}

export function pushTrackingEvent(
  event: string,
  parameters: Record<string, unknown> = {}
) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...parameters });
}

export function updateGoogleConsent(granted: boolean) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push([
    "consent",
    "update",
    {
      ad_storage: granted ? "granted" : "denied",
      analytics_storage: granted ? "granted" : "denied",
      ad_user_data: granted ? "granted" : "denied",
      ad_personalization: granted ? "granted" : "denied",
    },
  ]);
}

export function captureAttribution() {
  if (typeof window === "undefined") return;

  let stored: AttributionData = {};
  try {
    stored = JSON.parse(sessionStorage.getItem(ATTRIBUTION_KEY) || "{}");
  } catch {
    stored = {};
  }

  const searchParams = new URLSearchParams(window.location.search);
  const campaign: AttributionData = {};
  CAMPAIGN_KEYS.forEach((key) => {
    const value = searchParams.get(key);
    if (value) campaign[key] = value;
  });

  const attribution: AttributionData = {
    ...stored,
    ...campaign,
    landing_page:
      stored.landing_page ||
      `${window.location.pathname}${window.location.search}`,
    referrer: stored.referrer || document.referrer || "",
  };

  sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
  sessionStorage.setItem("lead_utm", JSON.stringify(attribution));
}

export function getAttribution(): AttributionData {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(ATTRIBUTION_KEY) || "{}");
  } catch {
    return {};
  }
}
