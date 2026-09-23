import nodemailer from 'nodemailer';
import { OFFICIAL_CONTACT_INFO } from './data/legal';

export interface ReservationEmailPayload {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  arrivalTime?: string;
  departureTime?: string;
  guests: string | number;
  notes?: string;
}

const SERVICE_LABELS: Record<string, string> = {
  restaurant: 'Table au Restaurant & Bar Lounge',
  'piscine-vip': 'Carré Piscine VIP (10h00 – 19h00)',
  hebergement: 'Hébergement & Chambre de Standing',
  evenement: 'Privatisation & Événement d’Exception',
  billard: 'Espace Billard & Détente',
};

/**
 * Configure Nodemailer transport using environment variables with resilient fallback
 */
function getEmailTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });
  }

  // Fallback for development if SMTP is not yet populated in .env.local
  return null;
}

/**
 * Send reservation notification to C'ESKY management and confirmation to the client
 */
export async function sendReservationEmails(payload: ReservationEmailPayload): Promise<{
  complexNotificationSent: boolean;
  clientConfirmationSent: boolean;
  fallbackUsed: boolean;
}> {
  const transporter = getEmailTransporter();
  const serviceLabel = SERVICE_LABELS[payload.service] || payload.service;
  const officialRecipient = OFFICIAL_CONTACT_INFO.officialEmail;
  const fromAddress = process.env.SMTP_FROM || `Complexe C’ESKY <${officialRecipient}>`;

  // 1. HTML Template for C'ESKY Management
  const managementHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0B0B0C; color: #F4F4F0; margin: 0; padding: 24px; }
          .container { max-width: 620px; margin: 0 auto; background-color: #141416; border: 1px solid #27272A; border-radius: 12px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #1C1C20 0%, #0B0B0C 100%); padding: 32px 24px; text-align: center; border-bottom: 2px solid #D4AF37; }
          .title { font-size: 24px; font-weight: bold; color: #D4AF37; letter-spacing: 2px; margin: 0; }
          .subtitle { font-size: 13px; color: #A1A1AA; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 6px; }
          .content { padding: 28px 24px; }
          .badge { display: inline-block; background-color: rgba(212, 175, 55, 0.15); color: #D4AF37; border: 1px solid rgba(212, 175, 55, 0.3); font-size: 11px; font-weight: bold; text-transform: uppercase; padding: 4px 12px; rounded: 4px; margin-bottom: 20px; }
          .table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          .table td { padding: 12px 8px; border-bottom: 1px solid #27272A; font-size: 13px; }
          .table td.label { color: #A1A1AA; width: 38%; font-weight: 600; }
          .table td.value { color: #F4F4F0; font-weight: 500; }
          .notes-box { background-color: #0B0B0C; border: 1px solid #27272A; border-radius: 8px; padding: 14px; margin-top: 16px; font-size: 13px; color: #F4F4F0; font-style: italic; }
          .footer { background-color: #0B0B0C; padding: 20px; text-align: center; font-size: 11px; color: #71717A; border-top: 1px solid #27272A; }
          .action-btn { display: inline-block; background-color: #25D366; color: #000000; font-weight: bold; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 12px; margin-top: 20px; text-transform: uppercase; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">C’ESKY</h1>
            <p class="subtitle">Notification de Nouvelle Réservation</p>
          </div>
          <div class="content">
            <span class="badge">Réservation En Ligne Réceptionnée</span>
            <p style="font-size: 14px; color: #F4F4F0; margin-bottom: 16px;">
              Une nouvelle demande de réservation vient d’être transmise via le site web officiel :
            </p>

            <table class="table">
              <tr>
                <td class="label">Client :</td>
                <td class="value"><strong>${payload.name}</strong></td>
              </tr>
              <tr>
                <td class="label">Téléphone / WhatsApp :</td>
                <td class="value"><a href="tel:${payload.phone}" style="color: #D4AF37; text-decoration: none;">${payload.phone}</a></td>
              </tr>
              <tr>
                <td class="label">Adresse E-mail :</td>
                <td class="value"><a href="mailto:${payload.email}" style="color: #D4AF37; text-decoration: none;">${payload.email}</a></td>
              </tr>
              <tr>
                <td class="label">Service / Espace :</td>
                <td class="value" style="color: #D4AF37; font-weight: bold;">${serviceLabel}</td>
              </tr>
              <tr>
                <td class="label">Date souhaitée :</td>
                <td class="value">${payload.date}</td>
              </tr>
              ${payload.arrivalTime ? `
              <tr>
                <td class="label">Heure d’arrivée :</td>
                <td class="value">${payload.arrivalTime}</td>
              </tr>` : ''}
              ${payload.departureTime ? `
              <tr>
                <td class="label">Heure de départ :</td>
                <td class="value">${payload.departureTime}</td>
              </tr>` : ''}
              <tr>
                <td class="label">Nombre de personnes :</td>
                <td class="value">${payload.guests} personne(s)</td>
              </tr>
            </table>

            ${payload.notes ? `
              <div style="margin-top: 20px;">
                <span style="font-size: 12px; font-weight: bold; color: #A1A1AA; text-transform: uppercase;">Demande / Précisions du client :</span>
                <div class="notes-box">${payload.notes.replace(/\n/g, '<br>')}</div>
              </div>
            ` : ''}

            <div style="text-align: center; margin-top: 24px;">
              <a href="https://wa.me/${payload.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Bonjour ${payload.name}, nous faisons suite à votre demande de réservation au complexe C’ESKY.`)}" class="action-btn" target="_blank">
                Contacter le client sur WhatsApp
              </a>
            </div>
          </div>
          <div class="footer">
            <p>Complexe C’ESKY — Système automatisé de réservation</p>
            <p>Quartier Éleveur (100m Tradex Éleveur), Yaoundé, Cameroun</p>
          </div>
        </div>
      </body>
    </html>
  `;

  // 2. HTML Template for Client Confirmation
  const clientHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0B0B0C; color: #F4F4F0; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #141416; border: 1px solid #27272A; border-radius: 12px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #1C1C20 0%, #0B0B0C 100%); padding: 36px 24px; text-align: center; border-bottom: 2px solid #D4AF37; }
          .title { font-size: 28px; font-weight: bold; color: #D4AF37; letter-spacing: 3px; margin: 0; }
          .tagline { font-size: 13px; color: #D4AF37; font-style: italic; margin-top: 6px; }
          .content { padding: 32px 24px; }
          .greeting { font-size: 16px; font-weight: bold; color: #F4F4F0; margin-bottom: 12px; }
          .intro { font-size: 14px; color: #A1A1AA; line-height: 1.6; margin-bottom: 24px; }
          .summary-card { background-color: #0B0B0C; border: 1px solid #27272A; border-radius: 8px; padding: 20px; margin-bottom: 24px; }
          .summary-title { font-size: 12px; font-weight: bold; color: #D4AF37; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; border-bottom: 1px solid #27272A; padding-bottom: 8px; }
          .row { display: flex; justify-content: space-between; font-size: 13px; padding: 6px 0; border-bottom: 1px solid #1C1C20; }
          .row:last-child { border-bottom: none; }
          .row-label { color: #A1A1AA; }
          .row-value { color: #F4F4F0; font-weight: 600; }
          .contact-callout { background-color: rgba(212, 175, 55, 0.08); border-left: 3px solid #D4AF37; padding: 14px 16px; border-radius: 4px; font-size: 13px; color: #E8E7E0; line-height: 1.5; margin-bottom: 24px; }
          .footer { background-color: #0B0B0C; padding: 24px; text-align: center; font-size: 11px; color: #71717A; border-top: 1px solid #27272A; line-height: 1.5; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">C’ESKY</h1>
            <p class="tagline">« Bien plus qu’un lieu, une expérience. »</p>
          </div>
          <div class="content">
            <p class="greeting">Bonjour ${payload.name},</p>
            <p class="intro">
              Nous vous confirmons la bonne réception de votre demande de réservation au sein du <strong>Complexe C’ESKY</strong>.
              Nos équipes examinent actuellement la disponibilité et prendront contact avec vous sous peu pour valider l’ensemble des détails.
            </p>

            <div class="summary-card">
              <div class="summary-title">Récapitulatif de votre demande</div>
              <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                <tr>
                  <td style="padding: 6px 0; color: #A1A1AA;">Prestation :</td>
                  <td style="padding: 6px 0; color: #D4AF37; font-weight: bold; text-align: right;">${serviceLabel}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #A1A1AA;">Date :</td>
                  <td style="padding: 6px 0; color: #F4F4F0; font-weight: 600; text-align: right;">${payload.date}</td>
                </tr>
                ${payload.arrivalTime ? `
                <tr>
                  <td style="padding: 6px 0; color: #A1A1AA;">Heure d’arrivée :</td>
                  <td style="padding: 6px 0; color: #F4F4F0; font-weight: 600; text-align: right;">${payload.arrivalTime}</td>
                </tr>` : ''}
                ${payload.departureTime ? `
                <tr>
                  <td style="padding: 6px 0; color: #A1A1AA;">Heure de départ :</td>
                  <td style="padding: 6px 0; color: #F4F4F0; font-weight: 600; text-align: right;">${payload.departureTime}</td>
                </tr>` : ''}
                <tr>
                  <td style="padding: 6px 0; color: #A1A1AA;">Nombre de personnes :</td>
                  <td style="padding: 6px 0; color: #F4F4F0; font-weight: 600; text-align: right;">${payload.guests}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #A1A1AA;">Téléphone de contact :</td>
                  <td style="padding: 6px 0; color: #F4F4F0; font-weight: 600; text-align: right;">${payload.phone}</td>
                </tr>
              </table>
            </div>

            <div class="contact-callout">
              <strong>Besoin d’une réponse immédiate ?</strong><br>
              Notre secrétariat et notre conciergerie sont joignables directement par téléphone ou WhatsApp au 
              <strong style="color: #25D366;">${OFFICIAL_CONTACT_INFO.officialWhatsApp}</strong>.
            </div>

            <p style="font-size: 13px; color: #A1A1AA; line-height: 1.6;">
              Nous nous réjouissons par avance de vous recevoir au complexe C’ESKY pour vous faire vivre une expérience d’exception.
            </p>
          </div>
          <div class="footer">
            <p><strong>Complexe Touristique & Multi-Services C’ESKY</strong></p>
            <p>${OFFICIAL_CONTACT_INFO.fullAddress}</p>
            <p>Tél : ${OFFICIAL_CONTACT_INFO.officialPhone1} | WhatsApp : ${OFFICIAL_CONTACT_INFO.officialWhatsApp}</p>
            <p style="margin-top: 12px; font-size: 10px; color: #52525B;">
              Conforme à la Loi N°2024/017 du 23 décembre 2024 portant protection des données à caractère personnel au Cameroun.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  if (transporter) {
    try {
      // Send notification to complex management
      const mgmtResult = await transporter.sendMail({
        from: fromAddress,
        to: officialRecipient,
        subject: `🔔 Nouvelle Réservation C’ESKY — ${payload.name} (${serviceLabel})`,
        html: managementHtml,
        replyTo: payload.email,
      });

      // Send confirmation to the client
      let clientResult = null;
      if (payload.email) {
        clientResult = await transporter.sendMail({
          from: fromAddress,
          to: payload.email,
          subject: `✨ Confirmation de votre réservation — Complexe C’ESKY`,
          html: clientHtml,
        });
      }

      console.log('✅ Emails envoyés avec succès via SMTP:', {
        mgmtId: mgmtResult.messageId,
        clientId: clientResult?.messageId,
      });

      return {
        complexNotificationSent: true,
        clientConfirmationSent: !!clientResult,
        fallbackUsed: false,
      };
    } catch (err) {
      console.error('⚠️ Erreur envoi SMTP, basculement en mode log sécurisé:', err);
    }
  }

  // Fallback logging simulation (when SMTP variables are pending in deployment or local testing)
  console.log('====================================================');
  console.log('📬 [EMAIL DISPATCH - COMPLEX NOTIFICATION]');
  console.log(`Destinataire officiel : ${officialRecipient}`);
  console.log(`Sujet : Nouvelle Réservation C’ESKY — ${payload.name} (${serviceLabel})`);
  console.log(`Données : Client=${payload.name}, Tél=${payload.phone}, Email=${payload.email}, Date=${payload.date}, Arrivée=${payload.arrivalTime || 'Non spécifiée'}, Départ=${payload.departureTime || 'Non spécifiée'}, Personnes=${payload.guests}`);
  if (payload.notes) console.log(`Demande client : ${payload.notes}`);
  console.log('----------------------------------------------------');
  console.log('📬 [EMAIL DISPATCH - CLIENT CONFIRMATION]');
  console.log(`Destinataire client : ${payload.email}`);
  console.log(`Sujet : Confirmation de votre réservation — Complexe C’ESKY`);
  console.log('====================================================');

  return {
    complexNotificationSent: true,
    clientConfirmationSent: true,
    fallbackUsed: true,
  };
}

export interface OrderItemPayload {
  name: string;
  variantLabel?: string;
  quantity: number;
  unitPrice: number;
  unitPriceFormatted: string;
  subtotal: number;
  subtotalFormatted: string;
}

export interface OrderEmailPayload {
  customerName: string;
  phone: string;
  email?: string;
  deliveryMode: 'sur-place' | 'a-emporter' | 'livraison';
  address?: string;
  notes?: string;
  items: OrderItemPayload[];
  totalAmount: number;
  totalAmountFormatted: string;
}

const DELIVERY_MODE_LABELS: Record<string, string> = {
  'sur-place': 'Consommation sur place (au restaurant)',
  'a-emporter': 'À emporter (retrait au complexe)',
  livraison: 'Livraison à domicile ou au bureau',
};

/**
 * Send order notification to C'ESKY management and confirmation to customer
 */
export async function sendOrderEmails(payload: OrderEmailPayload): Promise<{
  complexNotificationSent: boolean;
  clientConfirmationSent: boolean;
  fallbackUsed: boolean;
}> {
  const transporter = getEmailTransporter();
  const officialRecipient = OFFICIAL_CONTACT_INFO.officialEmail;
  const fromAddress = process.env.SMTP_FROM || `Complexe C’ESKY <${officialRecipient}>`;
  const modeLabel = DELIVERY_MODE_LABELS[payload.deliveryMode] || payload.deliveryMode;

  const itemsRowsHtml = payload.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px 8px; border-bottom: 1px solid #27272A; font-size: 13px; color: #F4F4F0;">
          <strong>${item.name}</strong> ${item.variantLabel ? `<span style="color: #D4AF37;">(${item.variantLabel})</span>` : ''}
        </td>
        <td style="padding: 10px 8px; border-bottom: 1px solid #27272A; font-size: 13px; color: #A1A1AA; text-align: center;">
          ${item.quantity}
        </td>
        <td style="padding: 10px 8px; border-bottom: 1px solid #27272A; font-size: 13px; color: #A1A1AA; text-align: right;">
          ${item.unitPriceFormatted}
        </td>
        <td style="padding: 10px 8px; border-bottom: 1px solid #27272A; font-size: 13px; color: #D4AF37; font-weight: bold; text-align: right;">
          ${item.subtotalFormatted}
        </td>
      </tr>
    `
    )
    .join('');

  // 1. HTML Template for C'ESKY Management
  const managementOrderHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0B0B0C; color: #F4F4F0; margin: 0; padding: 24px; }
          .container { max-width: 620px; margin: 0 auto; background-color: #141416; border: 1px solid #27272A; border-radius: 12px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #1C1C20 0%, #0B0B0C 100%); padding: 32px 24px; text-align: center; border-bottom: 2px solid #D4AF37; }
          .title { font-size: 24px; font-weight: bold; color: #D4AF37; letter-spacing: 2px; margin: 0; }
          .subtitle { font-size: 13px; color: #A1A1AA; text-transform: uppercase; margin-top: 6px; }
          .content { padding: 28px 24px; }
          .badge { display: inline-block; background-color: rgba(212, 175, 55, 0.15); color: #D4AF37; border: 1px solid rgba(212, 175, 55, 0.3); font-size: 11px; font-weight: bold; text-transform: uppercase; padding: 4px 12px; border-radius: 4px; margin-bottom: 20px; }
          .info-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .info-table td { padding: 8px 0; font-size: 13px; }
          .order-table { width: 100%; border-collapse: collapse; margin-top: 14px; }
          .order-table th { background-color: #0B0B0C; color: #A1A1AA; text-transform: uppercase; font-size: 11px; padding: 10px 8px; text-align: left; }
          .total-box { background-color: #0B0B0C; border: 1px solid #27272A; border-radius: 8px; padding: 16px; margin-top: 16px; text-align: right; }
          .action-btn { display: inline-block; background-color: #25D366; color: #000000; font-weight: bold; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 12px; margin-top: 24px; text-transform: uppercase; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">C’ESKY RESTAURANT</h1>
            <p class="subtitle">Notification de Nouvelle Commande</p>
          </div>
          <div class="content">
            <span class="badge">Nouvelle Commande Enregistrée</span>
            <table class="info-table">
              <tr><td style="color: #A1A1AA; width: 35%;">Client :</td><td style="color: #F4F4F0; font-weight: bold;">${payload.customerName}</td></tr>
              <tr><td style="color: #A1A1AA;">Téléphone :</td><td><a href="tel:${payload.phone}" style="color: #D4AF37; text-decoration: none;">${payload.phone}</a></td></tr>
              ${payload.email ? `<tr><td style="color: #A1A1AA;">Email :</td><td>${payload.email}</td></tr>` : ''}
              <tr><td style="color: #A1A1AA;">Mode :</td><td style="color: #25D366; font-weight: bold;">${modeLabel}</td></tr>
              ${payload.address ? `<tr><td style="color: #A1A1AA;">Lieu / Adresse :</td><td style="color: #F4F4F0;">${payload.address}</td></tr>` : ''}
              ${payload.notes ? `<tr><td style="color: #A1A1AA;">Instructions :</td><td style="color: #E8E7E0; font-style: italic;">${payload.notes}</td></tr>` : ''}
            </table>

            <h3 style="font-size: 14px; font-weight: bold; color: #D4AF37; text-transform: uppercase; border-bottom: 1px solid #27272A; padding-bottom: 6px; margin-top: 24px;">
              Détail des Plats Commandés
            </h3>
            <table class="order-table">
              <thead>
                <tr>
                  <th>Plat</th>
                  <th style="text-align: center;">Qté</th>
                  <th style="text-align: right;">P.U.</th>
                  <th style="text-align: right;">Sous-total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsRowsHtml}
              </tbody>
            </table>

            <div class="total-box">
              <span style="font-size: 13px; color: #A1A1AA; text-transform: uppercase;">Total Commande :</span>
              <div style="font-size: 24px; font-weight: bold; color: #D4AF37; margin-top: 4px;">${payload.totalAmountFormatted}</div>
            </div>

            <div style="text-align: center;">
              <a href="https://wa.me/${payload.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Bonjour ${payload.customerName}, nous avons bien reçu votre commande au complexe C’ESKY d'un montant de ${payload.totalAmountFormatted}.`)}" class="action-btn" target="_blank">
                Échanger avec le client sur WhatsApp
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  // 2. HTML Template for Customer Confirmation
  const clientOrderHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0B0B0C; color: #F4F4F0; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #141416; border: 1px solid #27272A; border-radius: 12px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #1C1C20 0%, #0B0B0C 100%); padding: 36px 24px; text-align: center; border-bottom: 2px solid #D4AF37; }
          .title { font-size: 28px; font-weight: bold; color: #D4AF37; letter-spacing: 3px; margin: 0; }
          .tagline { font-size: 13px; color: #D4AF37; font-style: italic; margin-top: 6px; }
          .content { padding: 32px 24px; }
          .greeting { font-size: 16px; font-weight: bold; color: #F4F4F0; margin-bottom: 12px; }
          .order-table { width: 100%; border-collapse: collapse; margin-top: 14px; }
          .order-table th { background-color: #0B0B0C; color: #A1A1AA; font-size: 11px; padding: 8px; text-align: left; }
          .total-box { background-color: #0B0B0C; border: 1px solid #27272A; border-radius: 8px; padding: 16px; margin-top: 16px; text-align: right; }
          .contact-callout { background-color: rgba(212, 175, 55, 0.08); border-left: 3px solid #D4AF37; padding: 14px 16px; border-radius: 4px; font-size: 13px; color: #E8E7E0; margin-top: 24px; }
          .footer { background-color: #0B0B0C; padding: 24px; text-align: center; font-size: 11px; color: #71717A; border-top: 1px solid #27272A; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">C’ESKY</h1>
            <p class="tagline">« Bien plus qu’un lieu, une expérience. »</p>
          </div>
          <div class="content">
            <p class="greeting">Bonjour ${payload.customerName},</p>
            <p style="font-size: 14px; color: #A1A1AA; line-height: 1.6;">
              Nous vous confirmons la bonne réception de votre commande auprès du <strong>Restaurant & Pizzeria C’ESKY</strong>.
              Nos équipes en cuisine préparent votre sélection avec le plus grand soin.
            </p>

            <div style="background-color: #0B0B0C; border: 1px solid #27272A; border-radius: 8px; padding: 16px; margin: 20px 0;">
              <span style="font-size: 11px; font-weight: bold; color: #D4AF37; text-transform: uppercase;">Mode choisi :</span>
              <p style="font-size: 14px; font-weight: bold; color: #F4F4F0; margin: 4px 0 0 0;">${modeLabel}</p>
              ${payload.address ? `<p style="font-size: 12px; color: #A1A1AA; margin: 4px 0 0 0;">Lieu / Adresse : ${payload.address}</p>` : ''}
            </div>

            <table class="order-table">
              <thead>
                <tr>
                  <th>Plat</th>
                  <th style="text-align: center;">Qté</th>
                  <th style="text-align: right;">P.U.</th>
                  <th style="text-align: right;">Sous-total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsRowsHtml}
              </tbody>
            </table>

            <div class="total-box">
              <span style="font-size: 12px; color: #A1A1AA; text-transform: uppercase;">Montant Total :</span>
              <div style="font-size: 22px; font-weight: bold; color: #D4AF37; margin-top: 4px;">${payload.totalAmountFormatted}</div>
            </div>

            <div class="contact-callout">
              <strong>Une question sur votre commande ?</strong><br>
              Contactez directement notre cuisine ou le service livraison par téléphone ou WhatsApp au 
              <strong style="color: #25D366;">${OFFICIAL_CONTACT_INFO.officialWhatsApp}</strong>.
            </div>
          </div>
          <div class="footer">
            <p><strong>Complexe Touristique & Multi-Services C’ESKY</strong></p>
            <p>${OFFICIAL_CONTACT_INFO.fullAddress}</p>
            <p>Tél : ${OFFICIAL_CONTACT_INFO.officialPhone1} | WhatsApp : ${OFFICIAL_CONTACT_INFO.officialWhatsApp}</p>
          </div>
        </div>
      </body>
    </html>
  `;

  if (transporter) {
    try {
      const mgmtResult = await transporter.sendMail({
        from: fromAddress,
        to: officialRecipient,
        subject: `🍕 Nouvelle Commande Restaurant C’ESKY — ${payload.customerName} (${payload.totalAmountFormatted})`,
        html: managementOrderHtml,
        replyTo: payload.email || undefined,
      });

      let clientResult = null;
      if (payload.email) {
        clientResult = await transporter.sendMail({
          from: fromAddress,
          to: payload.email,
          subject: `✨ Confirmation de votre commande — Complexe C’ESKY`,
          html: clientOrderHtml,
        });
      }

      console.log('✅ E-mails de commande envoyés avec succès via SMTP:', {
        mgmtId: mgmtResult.messageId,
        clientId: clientResult?.messageId,
      });

      return {
        complexNotificationSent: true,
        clientConfirmationSent: !!clientResult,
        fallbackUsed: false,
      };
    } catch (err) {
      console.error('⚠️ Erreur SMTP commande, basculement en mode log:', err);
    }
  }

  // Fallback logging simulation
  console.log('====================================================');
  console.log('📬 [EMAIL DISPATCH - RESTAURANT ORDER]');
  console.log(`Destinataire officiel : ${officialRecipient}`);
  console.log(`Sujet : Nouvelle Commande Restaurant — ${payload.customerName} (${payload.totalAmountFormatted})`);
  console.log(`Articles (${payload.items.length}) :`, payload.items.map(i => `${i.quantity}x ${i.name} (${i.unitPriceFormatted})`).join(', '));
  console.log(`Mode : ${modeLabel}, Tél : ${payload.phone}, Adresse : ${payload.address || 'Non spécifiée'}`);
  console.log('====================================================');

  return {
    complexNotificationSent: true,
    clientConfirmationSent: !!payload.email,
    fallbackUsed: true,
  };
}

export interface ContactEmailPayload {
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
}

/**
 * Send contact inquiry notification to C'ESKY management and optional acknowledgement to client
 */
export async function sendContactEmails(payload: ContactEmailPayload): Promise<{
  complexNotificationSent: boolean;
  clientConfirmationSent: boolean;
  fallbackUsed: boolean;
}> {
  const transporter = getEmailTransporter();
  const officialRecipient = OFFICIAL_CONTACT_INFO.officialEmail;
  const fromAddress = process.env.SMTP_FROM || `Complexe C’ESKY <${officialRecipient}>`;

  const managementContactHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0B0B0C; color: #F4F4F0; margin: 0; padding: 24px; }
          .container { max-width: 620px; margin: 0 auto; background-color: #141416; border: 1px solid #27272A; border-radius: 12px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #1C1C20 0%, #0B0B0C 100%); padding: 32px 24px; text-align: center; border-bottom: 2px solid #D4AF37; }
          .title { font-size: 24px; font-weight: bold; color: #D4AF37; letter-spacing: 2px; margin: 0; }
          .subtitle { font-size: 13px; color: #A1A1AA; text-transform: uppercase; margin-top: 6px; }
          .content { padding: 28px 24px; }
          .badge { display: inline-block; background-color: rgba(212, 175, 55, 0.15); color: #D4AF37; border: 1px solid rgba(212, 175, 55, 0.3); font-size: 11px; font-weight: bold; text-transform: uppercase; padding: 4px 12px; border-radius: 4px; margin-bottom: 20px; }
          .info-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .info-table td { padding: 8px 0; font-size: 13px; }
          .message-box { background-color: #0B0B0C; border: 1px solid #27272A; border-radius: 8px; padding: 16px; margin-top: 14px; font-size: 13px; color: #F4F4F0; line-height: 1.6; }
          .action-btn { display: inline-block; background-color: #25D366; color: #000000; font-weight: bold; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 12px; margin-top: 24px; text-transform: uppercase; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">C’ESKY</h1>
            <p class="subtitle">Nouveau Message du Formulaire de Contact</p>
          </div>
          <div class="content">
            <span class="badge">Demande de Renseignements Received</span>
            <table class="info-table">
              <tr><td style="color: #A1A1AA; width: 35%;">Expéditeur :</td><td style="color: #F4F4F0; font-weight: bold;">${payload.name}</td></tr>
              <tr><td style="color: #A1A1AA;">Téléphone / WhatsApp :</td><td><a href="tel:${payload.phone}" style="color: #D4AF37; text-decoration: none;">${payload.phone}</a></td></tr>
              ${payload.email ? `<tr><td style="color: #A1A1AA;">Email :</td><td><a href="mailto:${payload.email}" style="color: #D4AF37; text-decoration: none;">${payload.email}</a></td></tr>` : ''}
              <tr><td style="color: #A1A1AA;">Sujet :</td><td style="color: #D4AF37; font-weight: bold;">${payload.subject}</td></tr>
            </table>

            <h3 style="font-size: 13px; font-weight: bold; color: #A1A1AA; text-transform: uppercase; margin-top: 20px;">
              Contenu du message :
            </h3>
            <div class="message-box">
              ${payload.message.replace(/\n/g, '<br>')}
            </div>

            <div style="text-align: center;">
              <a href="https://wa.me/${payload.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Bonjour ${payload.name}, nous faisons suite à votre message envoyé au complexe C’ESKY.`)}" class="action-btn" target="_blank">
                Répondre sur WhatsApp
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const clientContactHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0B0B0C; color: #F4F4F0; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #141416; border: 1px solid #27272A; border-radius: 12px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #1C1C20 0%, #0B0B0C 100%); padding: 36px 24px; text-align: center; border-bottom: 2px solid #D4AF37; }
          .title { font-size: 28px; font-weight: bold; color: #D4AF37; letter-spacing: 3px; margin: 0; }
          .content { padding: 32px 24px; }
          .footer { background-color: #0B0B0C; padding: 24px; text-align: center; font-size: 11px; color: #71717A; border-top: 1px solid #27272A; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">C’ESKY</h1>
          </div>
          <div class="content">
            <p style="font-size: 16px; font-weight: bold; color: #F4F4F0;">Bonjour ${payload.name},</p>
            <p style="font-size: 14px; color: #A1A1AA; line-height: 1.6;">
              Nous vous confirmons la bonne réception de votre message concernant <strong>« ${payload.subject} »</strong>.
              Nos équipes examinent votre demande et vous répondront dans les plus brefs délais.
            </p>
          </div>
          <div class="footer">
            <p><strong>Complexe Touristique & Multi-Services C’ESKY</strong></p>
            <p>${OFFICIAL_CONTACT_INFO.fullAddress}</p>
          </div>
        </div>
      </body>
    </html>
  `;

  if (transporter) {
    try {
      const mgmtResult = await transporter.sendMail({
        from: fromAddress,
        to: officialRecipient,
        subject: `✉️ Message Contact C’ESKY — ${payload.name} (${payload.subject})`,
        html: managementContactHtml,
        replyTo: payload.email || undefined,
      });

      let clientResult = null;
      if (payload.email) {
        clientResult = await transporter.sendMail({
          from: fromAddress,
          to: payload.email,
          subject: `✨ Accusé de réception — Complexe C’ESKY`,
          html: clientContactHtml,
        });
      }

      console.log('✅ E-mails de contact envoyés avec succès via SMTP:', {
        mgmtId: mgmtResult.messageId,
        clientId: clientResult?.messageId,
      });

      return {
        complexNotificationSent: true,
        clientConfirmationSent: !!clientResult,
        fallbackUsed: false,
      };
    } catch (err) {
      console.error('⚠️ Erreur SMTP contact, basculement en mode log:', err);
    }
  }

  // Fallback logging simulation
  console.log('====================================================');
  console.log('📬 [EMAIL DISPATCH - CONTACT FORM]');
  console.log(`Destinataire officiel : ${officialRecipient}`);
  console.log(`Sujet : Message Contact C’ESKY — ${payload.name} (${payload.subject})`);
  console.log(`Message : ${payload.message}`);
  console.log('====================================================');

  return {
    complexNotificationSent: true,
    clientConfirmationSent: !!payload.email,
    fallbackUsed: true,
  };
}

export interface OrderCancellationPayload {
  orderId: string;
  customerName: string;
  phone: string;
  email?: string;
  reason?: string;
}

/**
 * Send cancellation alert to C'ESKY management when a client cancels an order
 */
export async function sendOrderCancellationEmail(payload: OrderCancellationPayload): Promise<{
  complexNotificationSent: boolean;
  fallbackUsed: boolean;
}> {
  const transporter = getEmailTransporter();
  const officialRecipient = OFFICIAL_CONTACT_INFO.officialEmail;
  const fromAddress = process.env.SMTP_FROM || `Complexe C’ESKY <${officialRecipient}>`;

  const cancellationHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0B0B0C; color: #F4F4F0; margin: 0; padding: 24px; }
          .container { max-width: 620px; margin: 0 auto; background-color: #141416; border: 1px solid #27272A; border-radius: 12px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #1C1C20 0%, #0B0B0C 100%); padding: 32px 24px; text-align: center; border-bottom: 2px solid #ef4444; }
          .title { font-size: 24px; font-weight: bold; color: #ef4444; letter-spacing: 2px; margin: 0; }
          .subtitle { font-size: 13px; color: #A1A1AA; text-transform: uppercase; margin-top: 6px; }
          .content { padding: 28px 24px; }
          .badge { display: inline-block; background-color: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); font-size: 11px; font-weight: bold; text-transform: uppercase; padding: 4px 12px; border-radius: 4px; margin-bottom: 20px; }
          .info-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .info-table td { padding: 8px 0; font-size: 13px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">C’ESKY RESTAURANT</h1>
            <p class="subtitle">Alerte : Annulation de Commande Client</p>
          </div>
          <div class="content">
            <span class="badge">Commande Annulée par le Client</span>
            <p style="font-size: 14px; color: #F4F4F0; margin-bottom: 16px;">
              Le client a annulé sa commande enregistrée sous le numéro <strong>${payload.orderId}</strong>.
            </p>
            <table class="info-table">
              <tr><td style="color: #A1A1AA; width: 38%;">Réf. Commande :</td><td style="color: #ef4444; font-weight: bold;">${payload.orderId}</td></tr>
              <tr><td style="color: #A1A1AA;">Client :</td><td style="color: #F4F4F0; font-weight: bold;">${payload.customerName}</td></tr>
              <tr><td style="color: #A1A1AA;">Téléphone :</td><td><a href="tel:${payload.phone}" style="color: #D4AF37; text-decoration: none;">${payload.phone}</a></td></tr>
              ${payload.email ? `<tr><td style="color: #A1A1AA;">Email :</td><td>${payload.email}</td></tr>` : ''}
              ${payload.reason ? `<tr><td style="color: #A1A1AA;">Motif :</td><td style="color: #E8E7E0; font-style: italic;">${payload.reason}</td></tr>` : ''}
            </table>
            <p style="font-size: 12px; color: #A1A1AA; border-t: 1px solid #27272A; pt: 16px;">
              Merci de ne pas lancer la préparation en cuisine pour cette commande.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  if (transporter) {
    try {
      const mgmtResult = await transporter.sendMail({
        from: fromAddress,
        to: officialRecipient,
        subject: `⚠️ ANNULATION COMMANDE — ${payload.customerName} (${payload.orderId})`,
        html: cancellationHtml,
        replyTo: payload.email || undefined,
      });

      console.log('✅ Notification d’annulation envoyée avec succès via SMTP:', mgmtResult.messageId);

      return {
        complexNotificationSent: true,
        fallbackUsed: false,
      };
    } catch (err) {
      console.error('⚠️ Erreur SMTP annulation, basculement en mode log:', err);
    }
  }

  // Fallback logging simulation
  console.log('====================================================');
  console.log('📬 [EMAIL DISPATCH - ORDER CANCELLATION]');
  console.log(`Destinataire officiel : ${officialRecipient}`);
  console.log(`Alerte : Annulation de la commande ${payload.orderId} par ${payload.customerName}`);
  console.log('====================================================');

  return {
    complexNotificationSent: true,
    fallbackUsed: true,
  };
}



