'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Calendar, Clock, MessageSquare, CheckCircle2, ShieldCheck, Mail, Users, ArrowRight } from 'lucide-react';
import { OFFICIAL_CONTACT_INFO } from '@/lib/data/legal';

export default function ReservationPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'restaurant',
    date: '',
    arrivalTime: '',
    departureTime: '',
    guests: '2',
    notes: '',
    consentRequired: false,
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name || !formData.phone || !formData.email || !formData.date || !formData.consentRequired) {
      setStatus('error');
      setErrorMessage('Veuillez renseigner tous les champs obligatoires (*) et accepter le consentement.');
      return;
    }

    setStatus('submitting');

    try {
      const res = await fetch('/api/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Erreur lors de l’envoi de votre réservation.');
      }

      setStatus('success');
    } catch (err: any) {
      console.error('Erreur réservation:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Une erreur est survenue lors de l’envoi. Veuillez réessayer ou nous contacter sur WhatsApp.');
    }
  };

  const getServiceLabel = (srv: string) => {
    switch (srv) {
      case 'restaurant':
        return 'Table au Restaurant & Bar';
      case 'piscine-vip':
        return 'Carré Piscine VIP (10h-19h)';
      case 'hebergement':
        return 'Hébergement & Chambre';
      case 'evenement':
        return 'Location d’Espace & Événement';
      case 'billard':
        return 'Table de Billard';
      default:
        return srv;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <SectionTitle
        badge="Système de Réservation Directe"
        subtitle="Notification & Confirmation Immédiates"
        title="Formuler une Demande de Réservation"
        description="Remplissez ce formulaire pour recevoir automatiquement votre confirmation par e-mail. Notre conciergerie reçoit simultanément votre demande pour prise en charge immédiate."
      />

      <div className="bg-[#141416] p-6 sm:p-10 rounded-2xl border border-[#27272A] shadow-xl">
        {status === 'success' ? (
          <div className="bg-[#25D366]/10 border border-[#25D366]/40 p-8 sm:p-10 rounded-xl text-center space-y-6">
            <CheckCircle2 className="w-16 h-16 text-[#25D366] mx-auto animate-bounce" />
            
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F4F4F0] mb-2">
                Demande de Réservation Enregistrée !
              </h2>
              <p className="text-sm text-[#A1A1AA] max-w-lg mx-auto leading-relaxed">
                Votre demande a été traitée et les notifications automatiques ont été déclenchées immédiatement.
              </p>
            </div>

            {/* Email confirmations badge list */}
            <div className="bg-[#0B0B0C] border border-[#27272A] rounded-xl p-5 max-w-lg mx-auto text-left space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#F4F4F0]">Notification Complexe :</span>
                  <p className="text-[#A1A1AA]">Transmise à la direction officielle (<span className="text-[#D4AF37]">{OFFICIAL_CONTACT_INFO.officialEmail}</span>).</p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-[#1C1C20] pt-3">
                <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#F4F4F0]">Confirmation Client :</span>
                  <p className="text-[#A1A1AA]">Un e-mail récapitulatif a été expédié à <strong className="text-[#F4F4F0]">{formData.email}</strong>.</p>
                </div>
              </div>

              <div className="border-t border-[#1C1C20] pt-3 text-[11px] text-[#71717A] space-y-1 font-mono">
                <p>• Service : {getServiceLabel(formData.service)}</p>
                <p>• Date : {formData.date}</p>
                {formData.arrivalTime && <p>• Heure d’arrivée : {formData.arrivalTime}</p>}
                {formData.departureTime && <p>• Heure de départ : {formData.departureTime}</p>}
                <p>• Invités : {formData.guests} personne(s)</p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setStatus('idle');
                  setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    service: 'restaurant',
                    date: '',
                    arrivalTime: '',
                    departureTime: '',
                    guests: '2',
                    notes: '',
                    consentRequired: false,
                  });
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-md bg-[#27272A] text-[#F4F4F0] font-semibold text-xs hover:bg-[#3F3F46] transition-all"
              >
                Nouvelle réservation
              </button>

              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3 rounded-md bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#C5A059] transition-all"
              >
                Retour à l’Accueil
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 font-sans">
            {status === 'error' && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg flex items-start gap-2">
                <span>⚠️ {errorMessage || 'Veuillez remplir tous les champs obligatoires (*).'}</span>
              </div>
            )}

            {/* Client Identity & Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-[#F4F4F0] mb-1">
                  Nom & Prénom <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded bg-[#0B0B0C] border border-[#27272A] text-sm text-[#F4F4F0] focus:border-[#D4AF37] focus:outline-none"
                  placeholder="Ex : M. Jean Dupont"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-semibold text-[#F4F4F0] mb-1">
                  Téléphone / WhatsApp <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded bg-[#0B0B0C] border border-[#27272A] text-sm text-[#F4F4F0] focus:border-[#D4AF37] focus:outline-none"
                  placeholder="Ex: +237 690 836 746"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-[#F4F4F0] mb-1">
                  Adresse E-mail <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded bg-[#0B0B0C] border border-[#27272A] text-sm text-[#F4F4F0] focus:border-[#D4AF37] focus:outline-none"
                  placeholder="client@exemple.com"
                />
              </div>
            </div>

            {/* Service & Date Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="service" className="block text-xs font-semibold text-[#F4F4F0] mb-1">
                  Service / Espace Réservé <span className="text-[#D4AF37]">*</span>
                </label>
                <select
                  id="service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-2.5 rounded bg-[#0B0B0C] border border-[#27272A] text-sm text-[#F4F4F0] focus:border-[#D4AF37] focus:outline-none"
                >
                  <option value="restaurant">Table au Restaurant & Bar</option>
                  <option value="piscine-vip">Carré Piscine VIP (10h-19h)</option>
                  <option value="hebergement">Hébergement & Chambre de Standing</option>
                  <option value="evenement">Privatisation & Événement d’Exception</option>
                  <option value="billard">Table de Billard & Détente</option>
                </select>
              </div>

              <div>
                <label htmlFor="date" className="block text-xs font-semibold text-[#F4F4F0] mb-1">
                  Date de Réservation <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  type="date"
                  id="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2.5 rounded bg-[#0B0B0C] border border-[#27272A] text-sm text-[#F4F4F0] focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="guests" className="block text-xs font-semibold text-[#F4F4F0] mb-1">
                  Nombre de Personnes <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  type="number"
                  id="guests"
                  min="1"
                  max="150"
                  required
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full px-4 py-2.5 rounded bg-[#0B0B0C] border border-[#27272A] text-sm text-[#F4F4F0] focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
            </div>

            {/* Arrival & Departure Hours (Requested in requirements) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#0B0B0C] p-4 rounded-xl border border-[#27272A]">
              <div>
                <label htmlFor="arrivalTime" className="block text-xs font-semibold text-[#D4AF37] mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Heure d’Arrivée Souhaitée (Optionnel)</span>
                </label>
                <input
                  type="time"
                  id="arrivalTime"
                  value={formData.arrivalTime}
                  onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })}
                  className="w-full px-4 py-2.5 rounded bg-[#141416] border border-[#27272A] text-sm text-[#F4F4F0] focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="departureTime" className="block text-xs font-semibold text-[#D4AF37] mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Heure de Départ Souhaitée (Optionnel)</span>
                </label>
                <input
                  type="time"
                  id="departureTime"
                  value={formData.departureTime}
                  onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
                  className="w-full px-4 py-2.5 rounded bg-[#141416] border border-[#27272A] text-sm text-[#F4F4F0] focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
            </div>

            {/* Additional notes & wishes */}
            <div>
              <label htmlFor="notes" className="block text-xs font-semibold text-[#F4F4F0] mb-1">
                Toute information ou demande supplémentaire
              </label>
              <textarea
                id="notes"
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-2.5 rounded bg-[#0B0B0C] border border-[#27272A] text-sm text-[#F4F4F0] focus:border-[#D4AF37] focus:outline-none"
                placeholder="Précisez ici vos souhaits : menu particulier, aménagement de table VIP, chambre avec vue, anniversaire, etc."
              />
            </div>

            {/* Privacy consent */}
            <div className="pt-2 text-xs text-[#A1A1AA]">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.consentRequired}
                  onChange={(e) => setFormData({ ...formData, consentRequired: e.target.checked })}
                  className="mt-0.5 accent-[#D4AF37] rounded"
                />
                <span>
                  J’accepte que mes données soient traitées par le complexe C’ESKY pour la gestion et la confirmation de ma réservation (Loi Camerounaise N°2024/017). <span className="text-[#D4AF37]">*</span>
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-4 px-6 rounded-md bg-[#D4AF37] text-black font-bold uppercase text-xs tracking-wider hover:bg-[#C5A059] transition-all disabled:opacity-50 shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              {status === 'submitting' ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Envoi et déclenchement des e-mails en cours...</span>
                </>
              ) : (
                <>
                  <span>Confirmer ma réservation et envoyer les notifications</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="pt-4 border-t border-[#27272A] text-center space-y-3">
              <span className="text-xs text-[#71717A] block font-semibold uppercase tracking-wider">
                — Ou —
              </span>
              <a
                href={`https://wa.me/237690836746?text=${encodeURIComponent(
                  `Bonjour C’ESKY, je souhaiterais effectuer une réservation.\nService : ${getServiceLabel(formData.service)}\nDate : ${formData.date || 'A confirmer'}\nNombre de personnes : ${formData.guests}\nPrécisions : ${formData.notes || 'Aucune'}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-md bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/40 font-bold text-xs uppercase tracking-wider hover:bg-[#25D366]/25 transition-all active:scale-95"
              >
                <MessageSquare className="w-4 h-4 fill-current text-[#25D366]" />
                <span>Réserver directement via WhatsApp (+237 690 836 746)</span>
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
