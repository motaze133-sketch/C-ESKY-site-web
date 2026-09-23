import { NextRequest, NextResponse } from 'next/server';
import { sendOrderEmails, sendOrderCancellationEmail, OrderEmailPayload } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Handle Order Cancellation Request
    if (body.action === 'cancel') {
      const { orderId, customerName, phone, email, reason } = body;

      if (!orderId || !customerName || !phone) {
        return NextResponse.json(
          { success: false, error: 'Informations de commande manquantes pour l’annulation.' },
          { status: 400 }
        );
      }

      const cancelResult = await sendOrderCancellationEmail({
        orderId: String(orderId),
        customerName: String(customerName).trim(),
        phone: String(phone).trim(),
        email: email ? String(email).trim() : undefined,
        reason: reason ? String(reason).trim() : undefined,
      });

      return NextResponse.json({
        success: true,
        message: `La commande ${orderId} a été annulée avec succès.`,
        details: cancelResult,
      });
    }

    // 2. Handle Order Placement Request
    const {
      customerName,
      phone,
      email,
      deliveryMode,
      address,
      notes,
      items,
      totalAmount,
      totalAmountFormatted,
      orderId,
    } = body;

    // Strict validation
    if (!customerName || typeof customerName !== 'string' || !customerName.trim()) {
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

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Votre panier est vide.' },
        { status: 400 }
      );
    }

    if (deliveryMode === 'livraison' && (!address || !address.trim())) {
      return NextResponse.json(
        { success: false, error: 'L’adresse ou le lieu de livraison est obligatoire pour le mode Livraison.' },
        { status: 400 }
      );
    }

    const payload: OrderEmailPayload = {
      customerName: customerName.trim(),
      phone: phone.trim(),
      email: email?.trim() || undefined,
      deliveryMode: deliveryMode || 'sur-place',
      address: address?.trim() || undefined,
      notes: notes?.trim() || undefined,
      items: items.map((i: any) => ({
        name: i.name,
        variantLabel: i.variantLabel,
        quantity: Number(i.quantity) || 1,
        unitPrice: Number(i.unitPrice) || 0,
        unitPriceFormatted: i.unitPriceFormatted,
        subtotal: (Number(i.unitPrice) || 0) * (Number(i.quantity) || 1),
        subtotalFormatted: `${((Number(i.unitPrice) || 0) * (Number(i.quantity) || 1)).toLocaleString('fr-FR')} F`,
      })),
      totalAmount: Number(totalAmount) || 0,
      totalAmountFormatted: totalAmountFormatted || `${(Number(totalAmount) || 0).toLocaleString('fr-FR')} F`,
    };

    const result = await sendOrderEmails(payload);

    return NextResponse.json({
      success: true,
      message: 'Votre commande a été transmise avec succès au restaurant C’ESKY.',
      orderId: orderId || `CSK-CMD-${Math.floor(100000 + Math.random() * 900000)}`,
      details: result,
    });
  } catch (error) {
    console.error('Erreur API Commande:', error);
    return NextResponse.json(
      { success: false, error: 'Une erreur technique est survenue lors du traitement de votre commande.' },
      { status: 500 }
    );
  }
}
