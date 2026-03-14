import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

    // Build provenance string for Digifactory
    const provenance: string[] = [];
    if (data.utmSource) provenance.push(`UTM_SOURCE: ${data.utmSource}`);
    if (data.utmMedium) provenance.push(`UTM_MEDIUM: ${data.utmMedium}`);
    if (data.utmCampaign) provenance.push(`UTM_CAMPAIGN: ${data.utmCampaign}`);
    if (data.utmContent) provenance.push(`UTM_CONTENT: ${data.utmContent}`);
    if (data.utmTerm) provenance.push(`UTM_TERM: ${data.utmTerm}`);
    if (data.gclid) provenance.push(`GCLID: ${data.gclid}`);
    const provenanceStr = provenance.length > 0 ? `[PROVENANCE: ${provenance.join(" / ")}]\n\n` : "";

    // Build email HTML
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #7c3aed; color: white; padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 22px;">Nouvelle demande de devis</h1>
          <p style="margin: 8px 0 0; opacity: 0.8;">traiteurmontpellier.com</p>
        </div>

        <div style="border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 12px 12px;">
          <h2 style="color: #7c3aed; font-size: 16px; margin-top: 0;">Événement</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b7280; width: 140px;">Type</td><td style="padding: 8px 0; font-weight: 600;">${eventLabels[data.eventType] || data.eventType}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Date</td><td style="padding: 8px 0; font-weight: 600;">${data.eventDate || "-"}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Convives</td><td style="padding: 8px 0; font-weight: 600;">${data.guestCount}</td></tr>
          </table>

          <h2 style="color: #7c3aed; font-size: 16px; margin-top: 20px;">Lieu & Service</h2>
          <table style="width: 100%; border-collapse: collapse;">
            ${data.address ? `<tr><td style="padding: 8px 0; color: #6b7280; width: 140px;">Lieu</td><td style="padding: 8px 0; font-weight: 600;">${data.address}, ${data.postalCode} ${data.city}</td></tr>` : ""}
            <tr><td style="padding: 8px 0; color: #6b7280;">Service</td><td style="padding: 8px 0; font-weight: 600;">${serviceLabels[data.serviceOption] || data.serviceOption}</td></tr>
            ${data.drinks ? `<tr><td style="padding: 8px 0; color: #6b7280;">Boissons</td><td style="padding: 8px 0; font-weight: 600;">${data.drinks === "avec" ? "Avec boissons" : "Sans boissons"}</td></tr>` : ""}
          </table>

          <h2 style="color: #7c3aed; font-size: 16px; margin-top: 20px;">Budget</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b7280; width: 140px;">Budget</td><td style="padding: 8px 0; font-weight: 600;">${data.budgetAmount}€ ${data.budgetType === "par-personne" ? "/ personne" : "total"}</td></tr>
            ${data.dietaryNeeds?.length ? `<tr><td style="padding: 8px 0; color: #6b7280;">Régimes</td><td style="padding: 8px 0; font-weight: 600;">${data.dietaryNeeds.join(", ")}</td></tr>` : ""}
            ${data.specialRequest ? `<tr><td style="padding: 8px 0; color: #6b7280;">Message</td><td style="padding: 8px 0; font-weight: 600;">${data.specialRequest}</td></tr>` : ""}
          </table>

          <h2 style="color: #7c3aed; font-size: 16px; margin-top: 20px;">Contact</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b7280; width: 140px;">Type</td><td style="padding: 8px 0; font-weight: 600;">${data.clientType === "professionnel" ? "Professionnel" : "Particulier"}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Nom</td><td style="padding: 8px 0; font-weight: 600;">${data.firstName} ${data.lastName}</td></tr>
            ${data.company ? `<tr><td style="padding: 8px 0; color: #6b7280;">Société</td><td style="padding: 8px 0; font-weight: 600;">${data.company}</td></tr>` : ""}
            <tr><td style="padding: 8px 0; color: #6b7280;">Email</td><td style="padding: 8px 0; font-weight: 600;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Téléphone</td><td style="padding: 8px 0; font-weight: 600;"><a href="tel:${data.phone}">${data.phone}</a></td></tr>
          </table>

          ${data.differentBilling && data.billingAddress ? `
          <h2 style="color: #7c3aed; font-size: 16px; margin-top: 20px;">Facturation</h2>
          <p style="margin: 0;">${data.billingAddress}, ${data.billingPostalCode} ${data.billingCity}</p>
          ` : ""}

          ${provenanceStr ? `
          <div style="margin-top: 20px; padding: 12px; background: #f3f4f6; border-radius: 8px; font-size: 12px; color: #6b7280;">
            <strong>Tracking:</strong><br/>${provenanceStr.replace(/\n/g, "<br/>")}
          </div>
          ` : ""}
        </div>
      </div>
    `;

    // Send email via SMTP (Gmail)
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: smtpUser, pass: smtpPass },
      });

      await transporter.sendMail({
        from: `"Traiteur Montpellier" <${smtpUser}>`,
        to: "inesreception@gmail.com",
        replyTo: data.email,
        subject: `Nouveau devis - ${eventLabels[data.eventType] || data.eventType} - ${data.firstName} ${data.lastName}`,
        html,
      });
    } else {
      // Fallback: log the data if SMTP not configured
      console.log("SMTP not configured. Devis data:", JSON.stringify(data, null, 2));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending devis:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
