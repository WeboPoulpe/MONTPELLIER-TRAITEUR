import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const eventLabels: Record<string, string> = {
  mariage: "Mariage",
  entreprise: "Événement d'entreprise",
  reception: "Réception privée",
  autre: "Autre",
};

const eventEmojis: Record<string, string> = {
  mariage: "💒",
  entreprise: "🏢",
  reception: "🥂",
  autre: "✨",
};

const serviceLabels: Record<string, string> = {
  livraison: "🚚 Livraison",
  emporter: "🛍️ À emporter",
  service: "🍽️ Avec service complet",
};

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

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const date = data.eventDate
      ? new Date(data.eventDate).toLocaleDateString("fr-FR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Non précisée";

    const budgetUnit = data.budgetType === "par-personne" ? "/ pers." : "total";
    const eventEmoji = eventEmojis[data.eventType] || "📋";
    const eventLabel = eventLabels[data.eventType] || data.eventType;

    // Tracking
    const tracking: string[] = [];
    if (data.utmSource) tracking.push(`Source: ${data.utmSource}`);
    if (data.utmMedium) tracking.push(`Medium: ${data.utmMedium}`);
    if (data.utmCampaign) tracking.push(`Campaign: ${data.utmCampaign}`);
    if (data.utmContent) tracking.push(`Content: ${data.utmContent}`);
    if (data.utmTerm) tracking.push(`Term: ${data.utmTerm}`);
    if (data.gclid) tracking.push(`GCLID: ${data.gclid}`);

    const dietBadges = data.dietaryNeeds?.length > 0
      ? data.dietaryNeeds.map((d: string) => badge(d)).join("")
      : "";

    const html = `
<!DOCTYPE html>
<html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width"/></head>
<body style="margin:0;padding:0;background:#f0eeeb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

<!-- Wrapper -->
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0eeeb;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <!-- Header -->
  <tr><td style="background:#0f0f0f;padding:40px 32px;border-radius:16px 16px 0 0;text-align:center;">
    <div style="font-size:11px;font-weight:700;letter-spacing:4px;color:#a78bfa;text-transform:uppercase;margin-bottom:16px;">Traiteur Montpellier</div>
    <div style="font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;line-height:1.2;">Nouvelle demande de devis</div>
    <div style="margin-top:20px;display:inline-block;padding:8px 24px;background:linear-gradient(135deg,#7c3aed,#a78bfa);border-radius:100px;color:#fff;font-size:13px;font-weight:600;">${eventEmoji} ${eventLabel}</div>
  </td></tr>

  <!-- Quick Stats -->
  <tr><td style="background:#ffffff;padding:0;border-left:1px solid #e8e5e1;border-right:1px solid #e8e5e1;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td width="33%" style="text-align:center;padding:24px 8px;border-bottom:1px solid #f0eeeb;">
          <div style="font-size:11px;color:#8b8b8b;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Date</div>
          <div style="font-size:15px;font-weight:700;color:#1a1a1a;margin-top:6px;">${date}</div>
        </td>
        <td width="33%" style="text-align:center;padding:24px 8px;border-bottom:1px solid #f0eeeb;border-left:1px solid #f0eeeb;border-right:1px solid #f0eeeb;">
          <div style="font-size:11px;color:#8b8b8b;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Convives</div>
          <div style="font-size:28px;font-weight:800;color:#7c3aed;margin-top:4px;">${data.guestCount || "-"}</div>
        </td>
        <td width="33%" style="text-align:center;padding:24px 8px;border-bottom:1px solid #f0eeeb;">
          <div style="font-size:11px;color:#8b8b8b;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Budget</div>
          <div style="font-size:22px;font-weight:800;color:#1a1a1a;margin-top:4px;">${data.budgetAmount}€</div>
          <div style="font-size:11px;color:#8b8b8b;">${budgetUnit}</div>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- Details -->
  <tr><td style="background:#ffffff;padding:0 16px;border-left:1px solid #e8e5e1;border-right:1px solid #e8e5e1;">
    <table width="100%" cellpadding="0" cellspacing="0">

      ${sectionHeader("Lieu & Service", "📍")}
      ${data.address ? row("Adresse", `${data.address}, ${data.postalCode} ${data.city}`) : ""}
      ${row("Service", serviceLabels[data.serviceOption] || data.serviceOption || "Non précisé", true)}
      ${row("Boissons", data.drinks === "avec" ? "✅ Avec boissons" : data.drinks === "sans" ? "❌ Sans boissons" : "Non précisé")}

      ${sectionHeader("Précisions", "📝")}
      ${dietBadges ? row("Régimes", dietBadges) : ""}
      ${data.specialRequest ? row("Message", `<em style="color:#555;">"${data.specialRequest}"</em>`) : ""}
      ${!dietBadges && !data.specialRequest ? row("", "<span style='color:#bbb;'>Aucune précision</span>") : ""}

      ${sectionHeader("Contact", "👤")}
      ${row("", `<span style="font-size:18px;font-weight:800;color:#1a1a1a;">${data.firstName} ${data.lastName}</span>${data.company ? `<br/><span style="color:#7c3aed;font-size:13px;font-weight:600;">${data.company}</span>` : ""}<br/><span style="display:inline-block;margin-top:4px;padding:3px 10px;background:${data.clientType === "professionnel" ? "#e0f2fe;color:#0369a1" : "#fef3c7;color:#92400e"};border-radius:20px;font-size:11px;font-weight:600;">${data.clientType === "professionnel" ? "PRO" : "PARTICULIER"}</span>`)}

    </table>
  </td></tr>

  <!-- CTA Buttons -->
  <tr><td style="background:#ffffff;padding:24px 32px;border-left:1px solid #e8e5e1;border-right:1px solid #e8e5e1;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td width="50%" style="padding-right:6px;">
          <a href="mailto:${data.email}" style="display:block;text-align:center;padding:14px 8px;background:#7c3aed;color:#ffffff;text-decoration:none;border-radius:10px;font-size:13px;font-weight:700;">✉️ Répondre par email</a>
        </td>
        <td width="50%" style="padding-left:6px;">
          <a href="tel:${data.phone}" style="display:block;text-align:center;padding:14px 8px;background:#0f0f0f;color:#ffffff;text-decoration:none;border-radius:10px;font-size:13px;font-weight:700;">📞 Appeler ${data.firstName}</a>
        </td>
      </tr>
    </table>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">
      <tr>
        <td style="text-align:center;padding:10px;background:#f8f7f5;border-radius:8px;">
          <span style="color:#8b8b8b;font-size:12px;">📧</span>
          <a href="mailto:${data.email}" style="color:#1a1a1a;font-size:13px;text-decoration:none;font-weight:500;margin-left:4px;">${data.email}</a>
          <span style="color:#ddd;margin:0 8px;">|</span>
          <span style="color:#8b8b8b;font-size:12px;">📱</span>
          <a href="tel:${data.phone}" style="color:#1a1a1a;font-size:13px;text-decoration:none;font-weight:500;margin-left:4px;">${data.phone}</a>
        </td>
      </tr>
    </table>
  </td></tr>

  ${data.differentBilling && data.billingAddress ? `
  <!-- Billing -->
  <tr><td style="background:#ffffff;padding:16px 32px;border-left:1px solid #e8e5e1;border-right:1px solid #e8e5e1;">
    <div style="padding:16px;background:#fef3c7;border-radius:10px;border:1px solid #fde68a;">
      <div style="font-size:12px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:1px;">📄 Adresse de facturation</div>
      <div style="font-size:14px;color:#1a1a1a;margin-top:8px;">${data.billingAddress}, ${data.billingPostalCode} ${data.billingCity}</div>
    </div>
  </td></tr>
  ` : ""}

  ${tracking.length > 0 ? `
  <!-- Tracking -->
  <tr><td style="background:#ffffff;padding:16px 32px;border-left:1px solid #e8e5e1;border-right:1px solid #e8e5e1;">
    <div style="padding:12px 16px;background:#f8f7f5;border-radius:8px;font-size:11px;color:#aaa;">
      🔗 ${tracking.join(" &nbsp;•&nbsp; ")}
    </div>
  </td></tr>
  ` : ""}

  <!-- Footer -->
  <tr><td style="background:#0f0f0f;padding:24px 32px;border-radius:0 0 16px 16px;text-align:center;">
    <div style="font-size:11px;color:#666;">Reçu via <span style="color:#a78bfa;font-weight:600;">traiteurmontpellier.com</span> — ${new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })} à ${new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</div>
  </td></tr>

</table>
</td></tr>
</table>

</body></html>`;

    // Envoi email via Resend
    const emailPromise = resend.emails.send({
      from: "Traiteur Montpellier <onboarding@resend.dev>",
      to: ["inesreception@gmail.com"],
      subject: `${eventEmoji} Nouveau devis — ${eventLabel} — ${data.firstName} ${data.lastName} (${data.guestCount} pers.)`,
      html,
      replyTo: data.email,
    });

    // Envoi vers Digifactory CRM (formulaire externe)
    const serviceLabel = serviceLabels[data.serviceOption] || data.serviceOption;
    const message = [
      `Type: ${eventLabel}`,
      `Date: ${date}`,
      `Convives: ${data.guestCount}`,
      `Service: ${serviceLabel}`,
      `Boissons: ${data.drinks === "avec" ? "Avec" : data.drinks === "sans" ? "Sans" : "Non précisé"}`,
      `Budget: ${data.budgetAmount}€ ${data.budgetType === "par-personne" ? "/pers." : "total"}`,
      data.dietaryNeeds?.length > 0 ? `Régimes: ${data.dietaryNeeds.join(", ")}` : "",
      data.specialRequest ? `Souhait: ${data.specialRequest}` : "",
      data.address ? `Lieu: ${data.address}, ${data.postalCode} ${data.city}` : "",
      tracking.length > 0 ? `Tracking: ${tracking.join(" | ")}` : "",
    ].filter(Boolean).join("\n");

    const digiParams = new URLSearchParams({
      f: "dmd_devis",
      prenom: data.firstName || "",
      nom: data.lastName || "",
      email: data.email || "",
      telephone: data.phone || "",
      societe: data.company || "",
      message: message,
    });

    const digiPromise = fetch(
      `https://ines-reception.digifactory.fr/inc/extForm.php?${digiParams.toString()}`,
      { method: "GET", signal: AbortSignal.timeout(5000) }
    ).catch((e) => {
      console.warn("Digifactory submit failed (non-blocking):", e);
    });

    // Envoyer les deux en parallèle
    await Promise.all([emailPromise, digiPromise]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur envoi devis:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi" },
      { status: 500 }
    );
  }
}
