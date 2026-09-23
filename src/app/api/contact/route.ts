import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmails, ContactEmailPayload } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, subject, message, consentRequired } = body;

    // Strict validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Votre nom complet est obligatoire.' },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== 'string' || !phone.trim()) {
      return NextResponse.json(
        { success: false, error: 'Un numéro de téléphone ou WhatsApp est obligatoire.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { success: false, error: 'Votre message ne peut pas être vide.' },
        { status: 400 }
      );
    }

    if (!consentRequired) {
      return NextResponse.json(
        { success: false, error: 'Le consentement de traitement des données est requis.' },
        { status: 400 }
      );
    }

    const payload: ContactEmailPayload = {
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim() || undefined,
      subject: subject?.trim() || 'Renseignements généraux',
      message: message.trim(),
    };

    const result = await sendContactEmails(payload);

    return NextResponse.json({
      success: true,
      message: 'Votre message a été transmis avec succès à l’équipe du Complexe C’ESKY.',
      details: result,
    });
  } catch (error) {
    console.error('Erreur API Contact:', error);
    return NextResponse.json(
      { success: false, error: 'Une erreur technique est survenue lors de l’envoi de votre message.' },
      { status: 500 }
    );
  }
}
