import { NextRequest, NextResponse } from 'next/server';
import { sendReservationEmails, ReservationEmailPayload } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      email,
      service,
      date,
      arrivalTime,
      departureTime,
      guests,
      notes,
      consentRequired,
    } = body;

    // Strict validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Le nom complet est obligatoire.' },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== 'string' || !phone.trim()) {
      return NextResponse.json(
        { success: false, error: 'Le numéro de téléphone est obligatoire.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Une adresse e-mail valide est obligatoire pour recevoir la confirmation.' },
        { status: 400 }
      );
    }

    if (!date || typeof date !== 'string') {
      return NextResponse.json(
        { success: false, error: 'La date de réservation est obligatoire.' },
        { status: 400 }
      );
    }

    if (!consentRequired) {
      return NextResponse.json(
        { success: false, error: 'Le consentement de traitement des données est requis.' },
        { status: 400 }
      );
    }

    const payload: ReservationEmailPayload = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      service: service || 'restaurant',
      date: date.trim(),
      arrivalTime: arrivalTime?.trim() || undefined,
      departureTime: departureTime?.trim() || undefined,
      guests: guests || 1,
      notes: notes?.trim() || undefined,
    };

    // Execute automated dispatch
    const result = await sendReservationEmails(payload);

    return NextResponse.json({
      success: true,
      message: 'Votre réservation a été enregistrée avec succès. Un e-mail de confirmation vous a été adressé.',
      details: result,
    });
  } catch (error) {
    console.error('Erreur API Réservation:', error);
    return NextResponse.json(
      { success: false, error: 'Une erreur technique est survenue lors de l’envoi de votre réservation.' },
      { status: 500 }
    );
  }
}
