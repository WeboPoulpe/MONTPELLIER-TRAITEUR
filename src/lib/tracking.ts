type DataLayerValue = Record<string, unknown> | unknown[];
const ATTRIBUTION_KEY = "lead_attribution";
const CONFIRMED_LEAD_KEY = "confirmed_lead_tracking";
const TRACKED_LEADS_KEY = "tracked_lead_ids";
const CAMPAIGN_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
] as const;

export interface AttributionData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  fbclid?: string;
  referrer?: string;
  landing_page?: string;
}

export interface ConfirmedLeadTracking {
  lead_id: string;
  lead_type?: string;
  event_type?: string;
  event_city?: string;
  guest_count?: number;
  estimated_value?: number;
  value_type?: string;
  currency?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
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

function getTrackedLeadIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(sessionStorage.getItem(TRACKED_LEADS_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.filter((value) => typeof value === "string") : [];
  } catch {
    return [];
  }
}

function setTrackedLeadIds(ids: string[]) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(TRACKED_LEADS_KEY, JSON.stringify([...new Set(ids)].slice(-20)));
}

export function storeConfirmedLeadTracking(payload: ConfirmedLeadTracking) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(CONFIRMED_LEAD_KEY, JSON.stringify(payload));
}

export function pushConfirmedLeadOnce() {
  if (typeof window === "undefined") return false;

  let payload: ConfirmedLeadTracking | null = null;
  try {
    payload = JSON.parse(sessionStorage.getItem(CONFIRMED_LEAD_KEY) || "null");
  } catch {
    payload = null;
  }

  if (!payload?.lead_id) return false;

  const trackedLeadIds = getTrackedLeadIds();
  if (trackedLeadIds.includes(payload.lead_id)) {
    sessionStorage.removeItem(CONFIRMED_LEAD_KEY);
    return false;
  }

  pushTrackingEvent("generate_lead", {
    ...payload,
    event_id: payload.lead_id,
    page_path: window.location.pathname,
  });
  setTrackedLeadIds([...trackedLeadIds, payload.lead_id]);
  sessionStorage.removeItem(CONFIRMED_LEAD_KEY);
  return true;
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
