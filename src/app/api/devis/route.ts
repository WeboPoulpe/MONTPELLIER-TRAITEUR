import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const eventLabels: Record<string, string> = {
  mariage: "Mariage",
  entreprise: "Événement d'entreprise",
  reception: "Réception privée",
  autre: "Autre",
};

const serviceLabels: Record<string, string> = {
  livraison: "Livraison",
  emporter: "À emporter",
  service: "Avec service",
};

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

    const budgetLabel =
      data.budgetType === "par-personne" ? "€ / personne" : "€ total";

    // Tracking info
    const tracking: string[] = [];
    if (data.utmSource) tracking.push(`Source: ${data.utmSource}`);
    if (data.utmMedium) tracking.push(`Medium: ${data.utmMedium}`);
    if (data.utmCampaign) tracking.push(`Campaign: ${data.utmCampaign}`);
    if (data.utmContent) tracking.push(`Content: ${data.utmContent}`);
    if (data.utmTerm) tracking.push(`Term: ${data.utmTerm}`);
    if (data.gclid) tracking.push(`GCLID: ${data.gclid}`);

    const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fafafa; border-radius: 12px; overflow: hidden;">
      <div style="background: #1a1a1a; padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; font-size: 24px; margin: 0;">Nouvelle demande de devis</h1>
        <p style="color: #a78bfa; font-size: 14px; margin-top: 8px;">traiteurmontpellier.com</p>
      </div>

      <div style="padding: 30px;">
        <h2 style="color: #1a1a1a; font-size: 18px; border-bottom: 2px solid #a78bfa; padding-bottom: 8px;">Événement</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 12px;">
          <tr><td style="padding: 8px 0; color: #666; width: 140px;">Type</td><td style="padding: 8px 0; font-weight: 600;">${eventLabels[data.eventType] || data.eventType}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Date</td><td style="padding: 8px 0; font-weight: 600;">${date}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Convives</td><td style="padding: 8px 0; font-weight: 600;">${data.guestCount || "-"}</td></tr>
        </table>

        <h2 style="color: #1a1a1a; font-size: 18px; border-bottom: 2px solid #a78bfa; padding-bottom: 8px; margin-top: 24px;">Lieu & Service</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 12px;">
          ${data.address ? `<tr><td style="padding: 8px 0; color: #666; width: 140px;">Lieu</td><td style="padding: 8px 0;">${data.address}, ${data.postalCode} ${data.city}</td></tr>` : ""}
          <tr><td style="padding: 8px 0; color: #666;">Service</td><td style="padding: 8px 0; font-weight: 600;">${serviceLabels[data.serviceOption] || data.serviceOption}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Boissons</td><td style="padding: 8px 0;">${data.drinks === "avec" ? "Avec boissons" : data.drinks === "sans" ? "Sans boissons" : "Non précisé"}</td></tr>
        </table>

        <h2 style="color: #1a1a1a; font-size: 18px; border-bottom: 2px solid #a78bfa; padding-bottom: 8px; margin-top: 24px;">Budget</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 12px;">
          <tr><td style="padding: 8px 0; color: #666; width: 140px;">Montant</td><td style="padding: 8px 0; font-weight: 600; font-size: 18px; color: #7c3aed;">${data.budgetAmount}${budgetLabel}</td></tr>
          ${data.dietaryNeeds?.length > 0 ? `<tr><td style="padding: 8px 0; color: #666;">Régimes</td><td style="padding: 8px 0;">${data.dietaryNeeds.join(", ")}</td></tr>` : ""}
          ${data.specialRequest ? `<tr><td style="padding: 8px 0; color: #666;">Message</td><td style="padding: 8px 0; font-style: italic;">${data.specialRequest}</td></tr>` : ""}
        </table>

        <h2 style="color: #1a1a1a; font-size: 18px; border-bottom: 2px solid #a78bfa; padding-bottom: 8px; margin-top: 24px;">Contact</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 12px;">
          <tr><td style="padding: 8px 0; color: #666; width: 140px;">Type</td><td style="padding: 8px 0;">${data.clientType === "professionnel" ? "Professionnel" : "Particulier"}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Nom</td><td style="padding: 8px 0; font-weight: 600;">${data.firstName} ${data.lastName}</td></tr>
          ${data.company ? `<tr><td style="padding: 8px 0; color: #666;">Société</td><td style="padding: 8px 0;">${data.company}</td></tr>` : ""}
          <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #7c3aed;">${data.email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Téléphone</td><td style="padding: 8px 0;"><a href="tel:${data.phone}" style="color: #7c3aed;">${data.phone}</a></td></tr>
        </table>

        ${data.differentBilling && data.billingAddress ? `
        <h2 style="color: #1a1a1a; font-size: 18px; border-bottom: 2px solid #a78bfa; padding-bottom: 8px; margin-top: 24px;">Facturation</h2>
        <p style="margin-top: 12px;">${data.billingAddress}, ${data.billingPostalCode} ${data.billingCity}</p>
        ` : ""}

        ${tracking.length > 0 ? `
        <div style="margin-top: 24px; padding: 16px; background: #f3f4f6; border-radius: 8px; font-size: 12px; color: #999;">
          <strong>Tracking :</strong> ${tracking.join(" | ")}
        </div>
        ` : ""}
      </div>
    </div>
    `;

    await resend.emails.send({
      from: "Traiteur Montpellier <onboarding@resend.dev>",
      to: ["inesreception@gmail.com"],
      subject: `Nouveau devis — ${eventLabels[data.eventType] || data.eventType} — ${data.firstName} ${data.lastName}`,
      html,
      replyTo: data.email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur envoi devis:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi" },
      { status: 500 }
    );
  }
}
