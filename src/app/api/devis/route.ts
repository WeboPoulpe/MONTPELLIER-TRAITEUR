import { NextResponse } from "next/server";
import { Resend } from "resend";

/* ─── Config ─── */
const DEBUG = process.env.DEBUG_DEVIS === "true";

/* ─── Mappings ─── */
const eventLabels: Record<string, string> = {
  mariage: "Mariage",
  entreprise: "Événement d'entreprise",
  reception: "Réception privée",
  autre: "Autre",
};

const eventEmojis: Record<string, string> = {
  mariage: "\u{1F492}",
  entreprise: "\u{1F3E2}",
  reception: "\u{1F942}",
  autre: "\u2728",
};

const serviceLabels: Record<string, string> = {
  livraison: "\u{1F69A} Livraison",
  emporter: "\u{1F6CD}\uFE0F \u00C0 emporter",
  service: "\u{1F37D}\uFE0F Avec service complet",
};

const eventToDigiNature: Record<string, string> = {
  mariage: "10",
  entreprise: "3",
  reception: "4",
  autre: "12",
};

const serviceToDigiOption: Record<string, string> = {
  livraison: "37",
  emporter: "36",
  service: "38",
};

const dietToDigiReg: Record<string, string> = {
  "Végétarien": "8",
  "Vegan": "9",
  "Sans Gluten": "10",
  "Sans Lactose": "11",
  "Halal": "12",
  "Casher": "14",
  "Sans Fruits de Mer": "14",
};

const drinksToDigiBss: Record<string, string> = {
  avec: "22",
  sans: "25",
};

/* ─── Email helpers ─── */
function row(label: string, value: string, bold = false) {
  return `<tr>
    <td style="padding:14px 16px;color:#8b8b8b;font-size:13px;white-space:nowrap;vertical-align:top;">${label}</td>
    <td style="padding:14px 16px;color:#1a1a1a;font-size:14px;${bold ? "font-weight:700;" : ""}">${value}</td>
  </tr>`;
}

function sectionHeader(title: string, emoji: string) {
  return `<tr><td colspan="2" style="padding:28px 16px 8px;">
    <div style="display:flex;align-items:center;gap:8px;">
      <span style="font-size:16px;">${emoji}</span>
      <span style="font-size:15px;font-weight:700;color:#1a1a1a;letter-spacing:-0.3px;">${title}</span>
    </div>
    <div style="margin-top:8px;height:1px;background:linear-gradient(to right,#7c3aed33,transparent);"></div>
  </td></tr>`;
}

function badge(text: string) {
  return `<span style="display:inline-block;padding:4px 12px;background:#f3f0ff;color:#7c3aed;border-radius:20px;font-size:12px;font-weight:600;margin:2px 4px 2px 0;">${text}</span>`;
}

/* ─── Safe string helper ─── */
function safe(val: unknown, fallback = ""): string {
  if (val === undefined || val === null) return fallback;
  const s = String(val).trim();
  return s || fallback;
}

/* ─── Main handler ─── */
export async function POST(request: Request) {
  const debugId = `DV-${Date.now().toString(36).toUpperCase()}`;
  const log = (label: string, ...args: unknown[]) => {
    console.log(`[${debugId}] ${label}`, ...args);
  };
  const logErr = (label: string, ...args: unknown[]) => {
    console.error(`[${debugId}] ${label}`, ...args);
  };

  // Result tracking
  let successEmail = false;
  let successCRM = false;
  let crmStatus: number | null = null;
  let crmError: string | null = null;
  let crmResponseSnippet: string | null = null;

  try {
    /* ══════════════════════════════════════
       1. Parse & log raw payload
    ══════════════════════════════════════ */
    const data = await request.json();
    log("RAW_PAYLOAD", JSON.stringify(data));

    /* ══════════════════════════════════════
       2. Normalize + validate all fields
    ══════════════════════════════════════ */
    const firstName = safe(data.firstName);
    const lastName = safe(data.lastName);
    const company = safe(data.company);
    const phone = safe(data.phone);
    const email = safe(data.email);
    const eventType = safe(data.eventType, "autre");
    const eventDate = safe(data.eventDate);
    const guestCount = safe(data.guestCount);
    const address = safe(data.address);
    const postalCode = safe(data.postalCode);
    const city = safe(data.city, "Non précisé");
    const serviceOption = safe(data.serviceOption);
    const drinks = safe(data.drinks);
    const budgetType = safe(data.budgetType, "global");
    const budgetAmount = safe(data.budgetAmount, "0");
    const clientType = safe(data.clientType, "particulier");
    const specialRequest = safe(data.specialRequest);
    const differentBilling = !!data.differentBilling;
    const billingAddress = safe(data.billingAddress);
    const billingPostalCode = safe(data.billingPostalCode);
    const billingCity = safe(data.billingCity);
    const dietaryNeeds: string[] = Array.isArray(data.dietaryNeeds)
      ? data.dietaryNeeds.filter((d: unknown) => typeof d === "string" && d.trim())
      : [];
    const utmSource = safe(data.utmSource);
    const utmMedium = safe(data.utmMedium);
    const utmCampaign = safe(data.utmCampaign);
    const utmContent = safe(data.utmContent);
    const utmTerm = safe(data.utmTerm);
    const gclid = safe(data.gclid);
    const fbclid = safe(data.fbclid);
    const referrer = safe(data.referrer);
    const landingPage = safe(data.landingPage);

    // Field validation report
    const fieldReport = {
      firstName: firstName || "MISSING",
      lastName: lastName || "MISSING",
      email: email || "MISSING",
      phone: phone || "MISSING",
      eventType,
      eventDate: eventDate || "empty",
      guestCount: guestCount || "empty",
      city,
      budgetType,
      budgetAmount,
      serviceOption: serviceOption || "empty",
      drinks: drinks || "empty",
      dietaryNeeds: dietaryNeeds.length > 0 ? dietaryNeeds.join(", ") : "none",
      differentBilling,
      billingAddress: differentBilling ? (billingAddress || "MISSING") : "N/A",
      utmSource: utmSource || "none",
      utmMedium: utmMedium || "none",
      gclid: gclid || "none",
      fbclid: fbclid || "none",
      landingPage: landingPage || "none",
    };
    log("NORMALIZED_FIELDS", JSON.stringify(fieldReport));

    // Derived values
    const eventEmoji = eventEmojis[eventType] || "\u{1F4CB}";
    const eventLabel = eventLabels[eventType] || eventType;
    const budgetUnit = budgetType === "par-personne" ? "/ pers." : "total";
    const serviceLabel = serviceLabels[serviceOption] || serviceOption || "Non précisé";
    const date = eventDate
      ? new Date(eventDate).toLocaleDateString("fr-FR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Non précisée";

    // Tracking
    const tracking: string[] = [];
    if (utmSource) tracking.push(`Source: ${utmSource}`);
    if (utmMedium) tracking.push(`Medium: ${utmMedium}`);
    if (utmCampaign) tracking.push(`Campaign: ${utmCampaign}`);
    if (utmContent) tracking.push(`Content: ${utmContent}`);
    if (utmTerm) tracking.push(`Term: ${utmTerm}`);
    if (gclid) tracking.push(`GCLID: ${gclid}`);
    if (fbclid) tracking.push(`FBCLID: ${fbclid}`);
    if (landingPage) tracking.push(`Landing: ${landingPage}`);
    if (referrer) tracking.push(`Referrer: ${referrer}`);

    /* ══════════════════════════════════════
       3. Build email HTML (unchanged design)
    ══════════════════════════════════════ */
    const dietBadges = dietaryNeeds.length > 0
      ? dietaryNeeds.map((d) => badge(d)).join("")
      : "";

    const html = `
<!DOCTYPE html>
<html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width"/></head>
<body style="margin:0;padding:0;background:#f0eeeb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0eeeb;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
  <tr><td style="background:#0f0f0f;padding:40px 32px;border-radius:16px 16px 0 0;text-align:center;">
    <div style="font-size:11px;font-weight:700;letter-spacing:4px;color:#a78bfa;text-transform:uppercase;margin-bottom:16px;">Traiteur Montpellier</div>
    <div style="font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;line-height:1.2;">Nouvelle demande de devis</div>
    <div style="margin-top:20px;display:inline-block;padding:8px 24px;background:linear-gradient(135deg,#7c3aed,#a78bfa);border-radius:100px;color:#fff;font-size:13px;font-weight:600;">${eventEmoji} ${eventLabel}</div>
  </td></tr>
  <tr><td style="background:#ffffff;padding:0;border-left:1px solid #e8e5e1;border-right:1px solid #e8e5e1;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td width="33%" style="text-align:center;padding:24px 8px;border-bottom:1px solid #f0eeeb;">
          <div style="font-size:11px;color:#8b8b8b;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Date</div>
          <div style="font-size:15px;font-weight:700;color:#1a1a1a;margin-top:6px;">${date}</div>
        </td>
        <td width="33%" style="text-align:center;padding:24px 8px;border-bottom:1px solid #f0eeeb;border-left:1px solid #f0eeeb;border-right:1px solid #f0eeeb;">
          <div style="font-size:11px;color:#8b8b8b;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Convives</div>
          <div style="font-size:28px;font-weight:800;color:#7c3aed;margin-top:4px;">${guestCount || "-"}</div>
        </td>
        <td width="33%" style="text-align:center;padding:24px 8px;border-bottom:1px solid #f0eeeb;">
          <div style="font-size:11px;color:#8b8b8b;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Budget</div>
          <div style="font-size:22px;font-weight:800;color:#1a1a1a;margin-top:4px;">${budgetAmount}\u20AC</div>
          <div style="font-size:11px;color:#8b8b8b;">${budgetUnit}</div>
        </td>
      </tr>
    </table>
  </td></tr>
  <tr><td style="background:#ffffff;padding:0 16px;border-left:1px solid #e8e5e1;border-right:1px solid #e8e5e1;">
    <table width="100%" cellpadding="0" cellspacing="0">
      ${sectionHeader("Lieu & Service", "\u{1F4CD}")}
      ${address ? row("Adresse", `${address}, ${postalCode} ${city}`) : ""}
      ${row("Service", serviceLabel, true)}
      ${row("Boissons", drinks === "avec" ? "\u2705 Avec boissons" : drinks === "sans" ? "\u274C Sans boissons" : "Non pr\u00E9cis\u00E9")}
      ${sectionHeader("Pr\u00E9cisions", "\u{1F4DD}")}
      ${dietBadges ? row("R\u00E9gimes", dietBadges) : ""}
      ${specialRequest ? row("Message", `<em style="color:#555;">"${specialRequest}"</em>`) : ""}
      ${!dietBadges && !specialRequest ? row("", "<span style='color:#bbb;'>Aucune pr\u00E9cision</span>") : ""}
      ${sectionHeader("Contact", "\u{1F464}")}
      ${row("", `<span style="font-size:18px;font-weight:800;color:#1a1a1a;">${firstName} ${lastName}</span>${company ? `<br/><span style="color:#7c3aed;font-size:13px;font-weight:600;">${company}</span>` : ""}<br/><span style="display:inline-block;margin-top:4px;padding:3px 10px;background:${clientType === "professionnel" ? "#e0f2fe;color:#0369a1" : "#fef3c7;color:#92400e"};border-radius:20px;font-size:11px;font-weight:600;">${clientType === "professionnel" ? "PRO" : "PARTICULIER"}</span>`)}
    </table>
  </td></tr>
  <tr><td style="background:#ffffff;padding:24px 32px;border-left:1px solid #e8e5e1;border-right:1px solid #e8e5e1;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td width="50%" style="padding-right:6px;">
          <a href="mailto:${email}" style="display:block;text-align:center;padding:14px 8px;background:#7c3aed;color:#ffffff;text-decoration:none;border-radius:10px;font-size:13px;font-weight:700;">\u2709\uFE0F R\u00E9pondre par email</a>
        </td>
        <td width="50%" style="padding-left:6px;">
          <a href="tel:${phone}" style="display:block;text-align:center;padding:14px 8px;background:#0f0f0f;color:#ffffff;text-decoration:none;border-radius:10px;font-size:13px;font-weight:700;">\u{1F4DE} Appeler ${firstName}</a>
        </td>
      </tr>
    </table>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">
      <tr>
        <td style="text-align:center;padding:10px;background:#f8f7f5;border-radius:8px;">
          <span style="color:#8b8b8b;font-size:12px;">\u{1F4E7}</span>
          <a href="mailto:${email}" style="color:#1a1a1a;font-size:13px;text-decoration:none;font-weight:500;margin-left:4px;">${email}</a>
          <span style="color:#ddd;margin:0 8px;">|</span>
          <span style="color:#8b8b8b;font-size:12px;">\u{1F4F1}</span>
          <a href="tel:${phone}" style="color:#1a1a1a;font-size:13px;text-decoration:none;font-weight:500;margin-left:4px;">${phone}</a>
        </td>
      </tr>
    </table>
  </td></tr>
  ${differentBilling && billingAddress ? `
  <tr><td style="background:#ffffff;padding:16px 32px;border-left:1px solid #e8e5e1;border-right:1px solid #e8e5e1;">
    <div style="padding:16px;background:#fef3c7;border-radius:10px;border:1px solid #fde68a;">
      <div style="font-size:12px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:1px;">\u{1F4C4} Adresse de facturation</div>
      <div style="font-size:14px;color:#1a1a1a;margin-top:8px;">${billingAddress}, ${billingPostalCode} ${billingCity}</div>
    </div>
  </td></tr>
  ` : ""}
  ${tracking.length > 0 ? `
  <tr><td style="background:#ffffff;padding:16px 32px;border-left:1px solid #e8e5e1;border-right:1px solid #e8e5e1;">
    <div style="padding:12px 16px;background:#f8f7f5;border-radius:8px;font-size:11px;color:#aaa;">
      \u{1F517} ${tracking.join(" &nbsp;\u2022&nbsp; ")}
    </div>
  </td></tr>
  ` : ""}
  <tr><td style="background:#0f0f0f;padding:24px 32px;border-radius:0 0 16px 16px;text-align:center;">
    <div style="font-size:11px;color:#666;">Re\u00E7u via <span style="color:#a78bfa;font-weight:600;">traiteurmontpellier.com</span> \u2014 ${new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })} \u00E0 ${new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</div>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;

    /* ══════════════════════════════════════
       4. Send email via Resend
    ══════════════════════════════════════ */
    log("EMAIL_ATTEMPT", `to: inesreception@gmail.com, subject: ${eventLabel} ${firstName} ${lastName}`);
    let emailResult: unknown = null;
    try {
      if (!process.env.RESEND_API_KEY) {
        throw new Error("RESEND_API_KEY is not configured");
      }
      const resend = new Resend(process.env.RESEND_API_KEY);
      emailResult = await resend.emails.send({
        from: "Traiteur Montpellier <onboarding@resend.dev>",
        to: ["inesreception@gmail.com"],
        subject: `${eventEmoji} Nouveau devis \u2014 ${eventLabel} \u2014 ${firstName} ${lastName} (${guestCount} pers.)`,
        html,
        replyTo: email,
      });
      successEmail = true;
      log("EMAIL_OK", JSON.stringify(emailResult));
    } catch (emailErr) {
      logErr("EMAIL_FAIL", emailErr);
    }

    /* ══════════════════════════════════════
       5. Build Digifactory payload — DEFENSIVE
    ══════════════════════════════════════ */

    // UTM tag for description
    const utmParts = [utmSource, utmMedium].filter(Boolean).join("/");
    const gclidTag = gclid ? ` [GCLID: ${gclid}]` : "";
    const utmLine = utmParts || gclid
      ? `[UTM: ${utmParts || "direct"}]${gclidTag}`
      : "[UTM: direct]";

    // Description — safe, no undefined/null
    const descriptionParts = [
      utmLine,
      `Budget: ${budgetAmount}E ${budgetType === "par-personne" ? "/pers." : "total"}`,
      `Service: ${serviceLabel}`,
      specialRequest ? `Souhait: ${specialRequest}` : null,
      dietaryNeeds.length > 0 ? `Regimes: ${dietaryNeeds.join(", ")}` : null,
      tracking.length > 0 ? `Tracking: ${tracking.join(" | ")}` : null,
      `Source: traiteurmontpellier.com (formulaire tunnel)`,
    ];
    const description = descriptionParts.filter((p): p is string => p !== null).join("\n");

    // Build FormData fields map (all strings, no undefined/null)
    const digiFields: Record<string, string> = {
      passage: "1",
      f: "dmd_devis",
      __referrerUrl: "https://www.traiteurmontpellier.com/devis",
      withCss: "1",
      FirstName: firstName,
      LastName: lastName,
      CompanyOpen: company,
      Phone: phone,
      Email: email,
      OpportunityNature: eventToDigiNature[eventType] || "12",
      OpportunityDeliveryStart: eventDate,
      OpportunityNbPax: guestCount,
      OpportunityDescription: description,
      OpportunityBudget: `${budgetAmount}E ${budgetType === "par-personne" ? "/pers." : "total"}`,
      OpportunityName: `Devis ${eventLabel} - ${firstName} ${lastName}`,
      OSpec_TYP: "7",
      OSpec_VNC: "16",
      OSpec_place_address: address,
      OSpec_place_postal: postalCode,
      OSpec_place_city: city, // Already has "Non précisé" fallback from safe()
      OSpec_place_country: "41",
    };

    // Optional fields — only add if present
    if (serviceOption && serviceToDigiOption[serviceOption]) {
      digiFields["OSpec_option_wish"] = serviceToDigiOption[serviceOption];
    }
    if (dietaryNeeds.length > 0) {
      digiFields["OSpec_Reg"] = dietToDigiReg[dietaryNeeds[0]] || "14";
    }
    if (drinks && drinksToDigiBss[drinks]) {
      digiFields["OSpec_BSS"] = drinksToDigiBss[drinks];
    }
    if (differentBilling && billingAddress) {
      digiFields["SecAddress"] = billingAddress;
      digiFields["SecZip"] = billingPostalCode;
      digiFields["SecCity"] = billingCity;
      digiFields["SecCountry"] = "74";
    }

    // Extra message
    const extraParts = [
      dietaryNeeds.length > 1 ? `Regimes: ${dietaryNeeds.join(", ")}` : null,
      specialRequest || null,
    ].filter((p): p is string => p !== null);
    if (extraParts.length > 0) {
      digiFields["OSpec_Demande"] = extraParts.join("\n");
    }

    // Build URLSearchParams — final sanitization pass
    const formBody = new URLSearchParams();
    const validationIssues: string[] = [];

    for (const [key, val] of Object.entries(digiFields)) {
      if (val === undefined || val === null) {
        validationIssues.push(`${key}: was undefined/null, skipped`);
        continue;
      }
      formBody.append(key, val);
    }

    // Check required fields
    const requiredFields = ["FirstName", "Phone", "Email", "OpportunityNature", "OSpec_TYP", "OSpec_place_city", "OpportunityName"];
    for (const rf of requiredFields) {
      const v = digiFields[rf];
      if (!v) {
        validationIssues.push(`REQUIRED_MISSING: ${rf} is empty`);
      }
    }

    log("CRM_VALIDATION", validationIssues.length > 0 ? validationIssues.join("; ") : "ALL_OK");
    log("CRM_PAYLOAD_FIELDS", JSON.stringify(digiFields));
    if (DEBUG) {
      log("CRM_PAYLOAD_ENCODED", formBody.toString());
    }

    /* ══════════════════════════════════════
       6. Send to Digifactory CRM — EXPLICIT await
    ══════════════════════════════════════ */
    log("CRM_ATTEMPT", "POST https://ines-reception.digifactory.fr/inc/ajax/extForm.php");

    try {
      const digiResponse = await fetch(
        "https://ines-reception.digifactory.fr/inc/ajax/extForm.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formBody.toString(),
          signal: AbortSignal.timeout(15000),
        }
      );

      crmStatus = digiResponse.status;
      const digiBody = await digiResponse.text();
      crmResponseSnippet = digiBody.substring(0, 500);

      log("CRM_HTTP_STATUS", digiResponse.status, digiResponse.statusText);
      log("CRM_RESPONSE_BODY", crmResponseSnippet);

      if (digiBody.includes("formOk")) {
        successCRM = true;
        log("CRM_RESULT", "SUCCESS — lead created in Digifactory");
      } else if (digiBody.includes("errors")) {
        // Extract error messages
        const errorMatch = digiBody.match(/<li>(.*?)<\/li>/g);
        const errors = errorMatch
          ? errorMatch.map((e) => e.replace(/<\/?li>/g, "")).join("; ")
          : "unknown validation error";
        crmError = errors;
        logErr("CRM_RESULT", `VALIDATION_ERROR — ${errors}`);
      } else {
        crmError = `Unexpected response (no formOk, no errors tag)`;
        logErr("CRM_RESULT", `UNEXPECTED_RESPONSE — ${crmResponseSnippet}`);
      }
    } catch (fetchErr) {
      crmError = fetchErr instanceof Error ? fetchErr.message : String(fetchErr);
      logErr("CRM_NETWORK_ERROR", crmError);
    }

    /* ══════════════════════════════════════
       7. Return detailed response
    ══════════════════════════════════════ */
    const response = {
      successGlobal: successEmail || successCRM,
      successEmail,
      successCRM,
      crmStatus,
      crmError,
      debugId,
      normalizedFields: {
        budgetType,
        budgetValue: budgetAmount,
        city,
        serviceOption: serviceOption || null,
        drinks: drinks || null,
        billingAddressDifferent: differentBilling,
        dietaryNeeds: dietaryNeeds.length > 0 ? dietaryNeeds : null,
        utmSource: utmSource || null,
        utmMedium: utmMedium || null,
        gclid: gclid || null,
        fbclid: fbclid || null,
        referrer: referrer || null,
        landingPage: landingPage || null,
      },
    };

    log("FINAL_RESULT", JSON.stringify(response));

    return NextResponse.json(response);
  } catch (error) {
    logErr("FATAL_ERROR", error);
    return NextResponse.json(
      {
        successGlobal: false,
        successEmail,
        successCRM,
        crmStatus,
        crmError: crmError || "fatal error in handler",
        debugId,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
