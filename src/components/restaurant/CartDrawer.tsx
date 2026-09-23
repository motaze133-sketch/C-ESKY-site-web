'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart, formatPrice } from '@/context/CartContext';
import { OFFICIAL_CONTACT_INFO } from '@/lib/data/legal';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  MessageSquare,
  Send,
  User,
  CheckCircle2,
  Clock,
  Ban,
  AlertTriangle,
  RefreshCw,
  ArrowRight,
} from 'lucide-react';
import { WhatsAppIcon } from '@/components/common/BrandIcons';

export interface PlacedOrder {
  orderId: string;
  customerName: string;
  phone: string;
  email?: string;
  deliveryMode: 'sur-place' | 'a-emporter' | 'livraison';
  address?: string;
  notes?: string;
  totalAmountFormatted: string;
  itemsCount: number;
  itemsSummary: string;
  status: 'en-attente' | 'confirmee' | 'en-preparation' | 'terminee' | 'annulee';
  createdAt: string;
}

export const CartDrawer: React.FC = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalItemsCount,
    totalAmount,
    totalAmountFormatted,
    isCartOpen,
    closeCart,
  } = useCart();

  const [deliveryMode, setDeliveryMode] = useState<'sur-place' | 'a-emporter' | 'livraison'>('sur-place');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Placed Order & Cancellation States
  const [currentOrder, setCurrentOrder] = useState<PlacedOrder | null>(null);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [isCancelling, setIsCancelling] = useState<boolean>(false);
  const [cancellationMessage, setCancellationMessage] = useState<string>('');

  // Load last order from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cesky_last_order');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.orderId) {
          setCurrentOrder(parsed);
        }
      }
    } catch (e) {
      console.warn('Impossible de charger la dernière commande:', e);
    }
  }, []);

  // Save last order to LocalStorage whenever updated
  useEffect(() => {
    if (!currentOrder) return;
    try {
      localStorage.setItem('cesky_last_order', JSON.stringify(currentOrder));
    } catch (e) {
      console.warn('Impossible de sauvegarder la commande:', e);
    }
  }, [currentOrder]);

  // Lock background scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        if (showCancelModal) {
          setShowCancelModal(false);
        } else {
          closeCart();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart, showCancelModal]);

  if (!isCartOpen) return null;

  const modeLabels = {
    'sur-place': 'Sur place (au restaurant)',
    'a-emporter': 'À emporter (retrait)',
    livraison: 'Livraison à domicile / bureau',
  };

  const statusBadge = (ordStatus: PlacedOrder['status']) => {
    switch (ordStatus) {
      case 'en-attente':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-[11px] font-bold uppercase">
            <Clock className="w-3 h-3" />
            <span>En attente de prise en charge</span>
          </span>
        );
      case 'confirmee':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-500/15 border border-blue-500/40 text-blue-400 text-[11px] font-bold uppercase">
            <CheckCircle2 className="w-3 h-3" />
            <span>Confirmée par la cuisine</span>
          </span>
        );
      case 'en-preparation':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-orange-500/15 border border-orange-500/40 text-orange-400 text-[11px] font-bold uppercase">
            <RefreshCw className="w-3 h-3 animate-spin" />
            <span>En cours de préparation</span>
          </span>
        );
      case 'terminee':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] text-[11px] font-bold uppercase">
            <CheckCircle2 className="w-3 h-3" />
            <span>Terminée & Servie</span>
          </span>
        );
      case 'annulee':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-red-500/15 border border-red-500/40 text-red-400 text-[11px] font-bold uppercase">
            <Ban className="w-3 h-3" />
            <span>Commande Annulée</span>
          </span>
        );
      default:
        return null;
    }
  };

  const generateWhatsAppMessage = () => {
    const lines = [
      'Bonjour Complexe C’ESKY, je souhaite passer une commande au restaurant :',
      '',
      '📋 DÉTAIL DE LA COMMANDE :',
      ...items.map(
        (item) =>
          `• ${item.quantity}x ${item.name}${item.variantLabel ? ` (${item.variantLabel})` : ''} — ${formatPrice(item.unitPrice * item.quantity)} (${item.unitPriceFormatted}/u)`
      ),
      '',
      `💰 MONTANT TOTAL : ${totalAmountFormatted}`,
      `🍽️ Mode : ${modeLabels[deliveryMode]}`,
    ];

    if (customerName.trim()) lines.push(`👤 Client : ${customerName.trim()}`);
    if (phone.trim()) lines.push(`📞 Téléphone : ${phone.trim()}`);
    if (deliveryMode === 'livraison' && address.trim()) {
      lines.push(`📍 Lieu / Adresse de livraison : ${address.trim()}`);
    }
    if (notes.trim()) lines.push(`📝 Instructions : ${notes.trim()}`);

    return lines.join('\n');
  };

  const handleWhatsAppOrder = () => {
    const text = generateWhatsAppMessage();
    const cleanPhone = OFFICIAL_CONTACT_INFO.officialWhatsApp.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleOnlineOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customerName.trim() || !phone.trim()) {
      setStatus('error');
      setErrorMessage('Veuillez renseigner votre nom et votre numéro de téléphone.');
      return;
    }

    if (deliveryMode === 'livraison' && !address.trim()) {
      setStatus('error');
      setErrorMessage('Veuillez indiquer l’adresse ou le quartier de livraison.');
      return;
    }

    setStatus('submitting');

    try {
      const generatedOrderId = `CSK-CMD-${Math.floor(100000 + Math.random() * 900000)}`;

      const res = await fetch('/api/commande', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: generatedOrderId,
          customerName: customerName.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          deliveryMode,
          address: address.trim() || undefined,
          notes: notes.trim() || undefined,
          items,
          totalAmount,
          totalAmountFormatted,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Erreur lors de l’envoi de votre commande.');
      }

      const newPlacedOrder: PlacedOrder = {
        orderId: data.orderId || generatedOrderId,
        customerName: customerName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        deliveryMode,
        address: address.trim() || undefined,
        notes: notes.trim() || undefined,
        totalAmountFormatted,
        itemsCount: totalItemsCount,
        itemsSummary: items.map((i) => `${i.quantity}x ${i.name}`).join(', '),
        status: 'en-attente',
        createdAt: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      };

      setCurrentOrder(newPlacedOrder);
      setCancellationMessage('');
      setStatus('success');
      clearCart();
    } catch (err: any) {
      console.error('Erreur commande:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Une erreur est survenue. Vous pouvez commander directement via WhatsApp.');
    }
  };

  const handleConfirmCancellation = async () => {
    if (!currentOrder) return;

    setIsCancelling(true);
    setCancellationMessage('');

    try {
      const res = await fetch('/api/commande', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'cancel',
          orderId: currentOrder.orderId,
          customerName: currentOrder.customerName,
          phone: currentOrder.phone,
          email: currentOrder.email,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Impossible d’annuler la commande.');
      }

      const updatedOrder: PlacedOrder = {
        ...currentOrder,
        status: 'annulee',
      };

      setCurrentOrder(updatedOrder);
      setShowCancelModal(false);
      setCancellationMessage('Votre commande a été annulée avec succès. Les équipes en cuisine ont été notifiées.');
    } catch (err: any) {
      console.error('Erreur lors de l’annulation:', err);
      setCancellationMessage(`⚠️ Erreur : ${err.message || 'Une erreur est survenue lors de l’annulation.'}`);
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="Mon Panier C’ESKY"
    >
      <div className="relative w-full max-w-lg bg-[#141416] border-l border-[#27272A] h-full flex flex-col justify-between shadow-2xl overflow-hidden font-sans text-[#F4F4F0]">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#27272A] flex items-center justify-between bg-[#101012]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-serif font-bold text-[#F4F4F0] tracking-wide">
                Votre Panier Restaurant
              </h2>
              <span className="text-xs text-[#A1A1AA]">
                {totalItemsCount > 0
                  ? `${totalItemsCount} article${totalItemsCount > 1 ? 's' : ''} sélectionné${totalItemsCount > 1 ? 's' : ''}`
                  : currentOrder
                  ? `Suivi de commande (${currentOrder.orderId})`
                  : 'Panier vide'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={closeCart}
            className="p-2 text-[#A1A1AA] hover:text-[#F4F4F0] hover:bg-[#1C1C20] rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            aria-label="Fermer le panier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Order Confirmation / Tracking Screen */}
          {status === 'success' && currentOrder ? (
            <div className="py-6 space-y-6">
              <div className="text-center space-y-3">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
                  currentOrder.status === 'annulee'
                    ? 'bg-red-500/15 border border-red-500/40 text-red-500'
                    : 'bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366]'
                }`}>
                  {currentOrder.status === 'annulee' ? (
                    <Ban className="w-10 h-10" />
                  ) : (
                    <CheckCircle2 className="w-10 h-10" />
                  )}
                </div>

                <h3 className="text-2xl font-serif font-bold text-[#F4F4F0]">
                  {currentOrder.status === 'annulee' ? 'Commande Annulée' : 'Commande Transmise !'}
                </h3>

                <div className="flex justify-center">
                  {statusBadge(currentOrder.status)}
                </div>

                <p className="text-xs text-[#A1A1AA] max-w-sm mx-auto leading-relaxed">
                  {currentOrder.status === 'annulee'
                    ? 'Cette commande a bien été annulée et verrouillée. Aucune préparation n’est en cours.'
                    : `Votre commande a été transmise à la cuisine. Réf. : ${currentOrder.orderId}`}
                </p>
              </div>

              {cancellationMessage && (
                <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
                  currentOrder.status === 'annulee'
                    ? 'bg-red-500/10 border-red-500/30 text-red-400'
                    : 'bg-[#D4AF37]/10 border-[#D4AF37]/30 text-[#D4AF37]'
                }`}>
                  {cancellationMessage}
                </div>
              )}

              {/* Order Recap Details */}
              <div className="bg-[#0B0B0C] border border-[#27272A] rounded-xl p-4 text-xs space-y-2.5">
                <div className="flex items-center justify-between border-b border-[#1C1C20] pb-2">
                  <span className="text-[#F4F4F0] font-bold">Récapitulatif de commande</span>
                  <span className="font-mono text-[#D4AF37] font-bold">{currentOrder.orderId}</span>
                </div>
                <p className="text-[#A1A1AA]">• Client : <strong className="text-[#F4F4F0]">{currentOrder.customerName}</strong></p>
                <p className="text-[#A1A1AA]">• Téléphone : <strong className="text-[#F4F4F0]">{currentOrder.phone}</strong></p>
                <p className="text-[#A1A1AA]">• Mode : <strong className="text-[#D4AF37]">{modeLabels[currentOrder.deliveryMode]}</strong></p>
                {currentOrder.address && <p className="text-[#A1A1AA]">• Lieu / Adresse : {currentOrder.address}</p>}
                <p className="text-[#A1A1AA]">• Articles : <span className="text-[#F4F4F0]">{currentOrder.itemsSummary}</span></p>
                <p className="text-[#A1A1AA]">• Montant Total : <strong className="text-[#D4AF37] font-mono">{currentOrder.totalAmountFormatted}</strong></p>
              </div>

              {/* Cancellation Action or Status Explanation */}
              <div className="pt-2 space-y-3">
                {currentOrder.status === 'en-attente' && (
                  <button
                    type="button"
                    onClick={() => setShowCancelModal(true)}
                    className="w-full py-2.5 px-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 font-semibold text-xs transition-all flex items-center justify-center gap-2"
                  >
                    <Ban className="w-4 h-4" />
                    <span>Annuler la commande</span>
                  </button>
                )}

                {currentOrder.status !== 'en-attente' && currentOrder.status !== 'annulee' && (
                  <div className="p-3 bg-[#0B0B0C] border border-[#27272A] rounded-lg text-center text-[11px] text-[#A1A1AA]">
                    ℹ️ Cette commande est déjà prise en charge par la cuisine et ne peut plus être annulée en ligne.
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setStatus('idle');
                      setCurrentOrder(null);
                      closeCart();
                    }}
                    className="w-full py-3 px-4 rounded-md bg-[#27272A] text-[#F4F4F0] font-semibold text-xs hover:bg-[#3F3F46] transition-all text-center"
                  >
                    Fermer
                  </button>

                  <a
                    href={`https://wa.me/${OFFICIAL_CONTACT_INFO.officialWhatsApp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Bonjour C’ESKY, je souhaite échanger concernant ma commande ${currentOrder.orderId} (${currentOrder.customerName}).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/30 font-semibold text-xs hover:bg-[#25D366]/25 transition-all text-center"
                  >
                    <WhatsAppIcon size={16} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#1C1C20] border border-[#27272A] flex items-center justify-center mx-auto text-[#71717A]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#F4F4F0]">
                Votre panier est vide
              </h3>
              <p className="text-xs text-[#A1A1AA] max-w-xs mx-auto leading-relaxed">
                Parcourez la carte pour composer librement votre repas en ajoutant pizzas, grillades, spécialités du terroir et boissons.
              </p>

              {currentOrder && (
                <div className="pt-4 border-t border-[#27272A] text-left">
                  <div className="bg-[#0B0B0C] p-4 rounded-xl border border-[#27272A] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#F4F4F0]">Dernière commande passée</span>
                      {statusBadge(currentOrder.status)}
                    </div>
                    <p className="text-[11px] text-[#A1A1AA]">Réf : <strong className="text-[#D4AF37] font-mono">{currentOrder.orderId}</strong> ({currentOrder.totalAmountFormatted})</p>
                    <button
                      type="button"
                      onClick={() => setStatus('success')}
                      className="text-xs text-[#D4AF37] font-semibold hover:underline block pt-1"
                    >
                      Voir le récapitulatif & suivi →
                    </button>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={closeCart}
                className="mt-2 px-6 py-2.5 rounded-md bg-[#D4AF37] text-black font-bold uppercase text-xs tracking-wider hover:bg-[#C5A059] transition-all"
              >
                Découvrir la carte du restaurant
              </button>
            </div>
          ) : (
            <>
              {/* Itemized Cart List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#A1A1AA] border-b border-[#27272A] pb-2">
                  <span>Plats sélectionnés ({items.length})</span>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-[#71717A] hover:text-red-400 transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Vider le panier</span>
                  </button>
                </div>

                <div className="divide-y divide-[#27272A] space-y-1">
                  {items.map((item) => (
                    <div key={item.cartItemId} className="pt-3 pb-3 flex items-start justify-between gap-3 group">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-serif font-bold text-[#F4F4F0] truncate">
                          {item.name}
                        </h4>
                        {item.variantLabel && (
                          <span className="inline-block text-[11px] font-semibold text-[#D4AF37]">
                            Option : {item.variantLabel}
                          </span>
                        )}
                        <div className="text-xs text-[#71717A] mt-0.5">
                          {item.unitPriceFormatted} / unité
                        </div>
                      </div>

                      {/* Quantity + / - Controls */}
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <div className="flex items-center bg-[#0B0B0C] border border-[#27272A] rounded-lg p-0.5">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartItemId, -1)}
                            className="p-1.5 text-[#A1A1AA] hover:text-[#F4F4F0] hover:bg-[#1C1C20] rounded transition-colors"
                            aria-label={`Diminuer la quantité de ${item.name}`}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-[#F4F4F0] min-w-[20px] text-center font-mono">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartItemId, 1)}
                            className="p-1.5 text-[#A1A1AA] hover:text-[#F4F4F0] hover:bg-[#1C1C20] rounded transition-colors"
                            aria-label={`Augmenter la quantité de ${item.name}`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Subtotal */}
                        <div className="text-xs font-bold text-[#D4AF37] font-mono">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.cartItemId)}
                        className="p-1 text-[#71717A] hover:text-red-400 transition-colors mt-0.5"
                        aria-label={`Supprimer ${item.name}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Options Form */}
              <form onSubmit={handleOnlineOrder} className="space-y-4 pt-4 border-t border-[#27272A]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                  Informations de Commande
                </h3>

                {/* Delivery Mode Choice */}
                <div className="grid grid-cols-3 gap-2">
                  {(['sur-place', 'a-emporter', 'livraison'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setDeliveryMode(mode)}
                      className={`p-2.5 rounded-lg border text-xs font-semibold text-center transition-all ${
                        deliveryMode === mode
                          ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37]'
                          : 'bg-[#0B0B0C] border-[#27272A] text-[#A1A1AA] hover:border-[#3F3F46]'
                      }`}
                    >
                      <span className="block capitalize">
                        {mode === 'sur-place' ? 'Sur place' : mode === 'a-emporter' ? 'À emporter' : 'Livraison'}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Contact Inputs */}
                <div className="space-y-3">
                  <div>
                    <label htmlFor="cart-name" className="block text-xs font-semibold text-[#F4F4F0] mb-1">
                      Votre Nom <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="text"
                      id="cart-name"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="M. Jean Dupont"
                      className="w-full px-3.5 py-2 rounded-lg bg-[#0B0B0C] border border-[#27272A] text-xs text-[#F4F4F0] focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="cart-phone" className="block text-xs font-semibold text-[#F4F4F0] mb-1">
                      Téléphone / WhatsApp <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="tel"
                      id="cart-phone"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ex: +237 690 836 746"
                      className="w-full px-3.5 py-2 rounded-lg bg-[#0B0B0C] border border-[#27272A] text-xs text-[#F4F4F0] focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="cart-email" className="block text-xs font-semibold text-[#F4F4F0] mb-1">
                      Adresse E-mail (Optionnel, pour accusé)
                    </label>
                    <input
                      type="email"
                      id="cart-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className="w-full px-3.5 py-2 rounded-lg bg-[#0B0B0C] border border-[#27272A] text-xs text-[#F4F4F0] focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  {deliveryMode === 'livraison' && (
                    <div>
                      <label htmlFor="cart-address" className="block text-xs font-semibold text-[#F4F4F0] mb-1">
                        Adresse / Quartier de livraison <span className="text-[#D4AF37]">*</span>
                      </label>
                      <input
                        type="text"
                        id="cart-address"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Ex : Quartier Éleveur, face Tradex..."
                        className="w-full px-3.5 py-2 rounded-lg bg-[#0B0B0C] border border-[#27272A] text-xs text-[#F4F4F0] focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  )}

                  {deliveryMode === 'sur-place' && (
                    <div>
                      <label htmlFor="cart-table" className="block text-xs font-semibold text-[#F4F4F0] mb-1">
                        Numéro de table ou espace (Optionnel)
                      </label>
                      <input
                        type="text"
                        id="cart-table"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Ex : Table 4, Terrasse Piscine VIP..."
                        className="w-full px-3.5 py-2 rounded-lg bg-[#0B0B0C] border border-[#27272A] text-xs text-[#F4F4F0] focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  )}

                  <div>
                    <label htmlFor="cart-notes" className="block text-xs font-semibold text-[#F4F4F0] mb-1">
                      Précisions culinaires & instructions
                    </label>
                    <textarea
                      id="cart-notes"
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Ex : Piment à part, cuisson bien cuite, sans oignon..."
                      className="w-full px-3.5 py-2 rounded-lg bg-[#0B0B0C] border border-[#27272A] text-xs text-[#F4F4F0] focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg">
                    ⚠️ {errorMessage}
                  </div>
                )}
              </form>
            </>
          )}
        </div>

        {/* Drawer Footer: Totals & Validation CTAs */}
        {items.length > 0 && status !== 'success' && (
          <div className="p-5 border-t border-[#27272A] bg-[#0B0B0C] space-y-4">
            {/* Grand Total Recap */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-[#A1A1AA] uppercase tracking-wider block">
                  Montant Total de la Commande
                </span>
                <span className="text-[11px] text-[#71717A]">
                  ({totalItemsCount} article{totalItemsCount > 1 ? 's' : ''} au menu)
                </span>
              </div>
              <div className="text-2xl font-serif font-bold text-[#D4AF37] font-mono">
                {totalAmountFormatted}
              </div>
            </div>

            {/* Validation Buttons: WhatsApp & Online */}
            <div className="space-y-2.5">
              {/* Option 1: WhatsApp Immediate Order */}
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full py-3.5 px-4 rounded-lg bg-[#25D366] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 active:scale-95"
              >
                <WhatsAppIcon size={18} />
                <span>Valider et Commander sur WhatsApp (Immédiat)</span>
              </button>

              {/* Option 2: Online Submission with Email notification */}
              <button
                type="button"
                onClick={handleOnlineOrder}
                disabled={status === 'submitting'}
                className="w-full py-3 px-4 rounded-lg bg-[#1C1C20] border border-[#3F3F46] hover:border-[#D4AF37] text-[#F4F4F0] font-semibold text-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
              >
                {status === 'submitting' ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Enregistrer la commande en ligne</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal for Order Cancellation */}
      {showCancelModal && currentOrder && (
        <div
          className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Confirmation d'annulation de commande"
        >
          <div className="bg-[#141416] border border-[#27272A] rounded-2xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl font-sans text-[#F4F4F0]">
            <div className="flex items-center gap-3 border-b border-[#27272A] pb-4">
              <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 text-red-500 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-[#F4F4F0]">
                  Annulation de Commande
                </h3>
                <span className="text-xs text-[#A1A1AA] font-mono">
                  Réf. : {currentOrder.orderId}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-[#F4F4F0]">
                Êtes-vous sûr de vouloir annuler cette commande ?
              </p>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Une fois annulée, cette commande ne pourra plus être modifiée et une alerte sera immédiatement transmise au complexe C’ESKY.
              </p>
            </div>

            <div className="bg-[#0B0B0C] p-3 rounded-lg border border-[#27272A] text-xs text-[#71717A] space-y-1">
              <p>• Client : <strong className="text-[#F4F4F0]">{currentOrder.customerName}</strong></p>
              <p>• Montant : <strong className="text-[#D4AF37] font-mono">{currentOrder.totalAmountFormatted}</strong></p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                disabled={isCancelling}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#27272A] text-[#F4F4F0] hover:bg-[#3F3F46] font-semibold text-xs transition-all text-center"
              >
                Conserver la commande
              </button>

              <button
                type="button"
                onClick={handleConfirmCancellation}
                disabled={isCancelling}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 disabled:opacity-50"
              >
                {isCancelling ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Annulation...</span>
                  </>
                ) : (
                  <>
                    <Ban className="w-4 h-4" />
                    <span>Confirmer l’annulation</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
