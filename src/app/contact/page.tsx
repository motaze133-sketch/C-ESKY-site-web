'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Phone, Mail, MapPin, Clock, Shield, CheckCircle2, Share2 } from 'lucide-react';
import { OFFICIAL_CONTACT_INFO, OFFICIAL_SOCIAL_LINKS } from '@/lib/data/legal';
import { FacebookIcon, TikTokIcon, WhatsAppIcon, GoogleMapsIcon, FindGlocalIcon } from '@/components/common/BrandIcons';
import { MapSection } from '@/components/common/MapSection';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Renseignements généraux',
    message: '',
    consentRequired: false,
    consentMarketing: false,
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name || !formData.phone || !formData.message || !formData.consentRequired) {
      setStatus('error');
      setErrorMessage('Veuillez remplir tous les champs obligatoires (*) et accepter les conditions de traitement.');
      return;
    }

    setStatus('submitting');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Erreur lors de l’envoi de votre message.');
      }

      setStatus('success');
    } catch (err: any) {
      console.error('Erreur contact:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Une erreur est survenue lors de l’envoi. Veuillez réessayer.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <SectionTitle
        badge="Contact & Plan d’Accès"
        subtitle="Une Question ? Parlons-nous."
        title="Contactez le Complexe C’ESKY à Yaoundé"
        description="Nos équipes sont à votre entière disposition pour répondre à vos demandes de renseignements, réservations et privatisations."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Col Left: Coordonnées & Réseaux Sociaux */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-[#141416] p-8 rounded-2xl border border-[#27272A] space-y-6">
            <h2 className="text-xl font-serif font-bold text-[#F4F4F0] border-b border-[#27272A] pb-4">
              Coordonnées Officiels
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-[#F4F4F0]">Adresse Officielle</h3>
                  <p className="text-xs text-[#A1A1AA] mt-0.5">{OFFICIAL_CONTACT_INFO.fullAddress}</p>
                  <a
                    href={OFFICIAL_CONTACT_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ouvrir la localisation C'ESKY dans Google Maps"
                    title="Ouvrir la fiche Google Maps officielle"
                    className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] hover:underline mt-1 font-semibold transition-colors group"
                  >
                    <GoogleMapsIcon size={14} className="group-hover:scale-110 transition-transform" />
                    <span>Ouvrir dans Google Maps</span>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#D4AF37] shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-[#F4F4F0]">Téléphones Directs</h3>
                  <p className="text-xs text-[#F4F4F0] font-mono mt-0.5">{OFFICIAL_CONTACT_INFO.officialPhone1}</p>
                  <p className="text-xs text-[#A1A1AA] font-mono">{OFFICIAL_CONTACT_INFO.officialPhone2}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#D4AF37] shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-[#F4F4F0]">Email Officiel</h3>
                  <p className="text-xs text-[#A1A1AA] mt-0.5 break-all">{OFFICIAL_CONTACT_INFO.officialEmail}</p>
                </div>
              </div>
            </div>

            {/* Social Networks Callout Card */}
            <div className="pt-4 border-t border-[#27272A] space-y-3">
              <h3 className="text-sm font-bold text-[#F4F4F0] flex items-center gap-2">
                <Share2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Nos Réseaux Officiels</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <a
                  href={OFFICIAL_SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Rejoindre C’ESKY sur Facebook"
                  title="Visiter la page Facebook officielle C'ESKY"
                  className="px-3 py-2 rounded bg-[#1877F2]/10 border border-[#1877F2]/30 text-[#1877F2] hover:bg-[#1877F2]/20 hover:scale-105 text-xs font-semibold text-center flex items-center justify-center gap-2 transition-all group"
                >
                  <FacebookIcon size={14} className="group-hover:rotate-6 transition-transform" />
                  <span>Facebook</span>
                </a>

                <a
                  href={OFFICIAL_SOCIAL_LINKS.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Suivre C’ESKY sur TikTok"
                  title="Voir le compte TikTok officiel C'ESKY"
                  className="px-3 py-2 rounded bg-[#FE2C55]/10 border border-[#FE2C55]/30 text-[#FE2C55] hover:bg-[#FE2C55]/20 hover:scale-105 text-xs font-semibold text-center flex items-center justify-center gap-2 transition-all group"
                >
                  <TikTokIcon size={14} className="group-hover:rotate-6 transition-transform" />
                  <span>TikTok</span>
                </a>

                <a
                  href={OFFICIAL_SOCIAL_LINKS.findglocal}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Découvrir C’ESKY sur FindGlocal"
                  title="Consulter C'ESKY sur FindGlocal"
                  className="px-3 py-2 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/20 hover:scale-105 text-xs font-semibold text-center flex items-center justify-center gap-2 transition-all group"
                >
                  <FindGlocalIcon size={14} className="group-hover:rotate-6 transition-transform" />
                  <span>FindGlocal</span>
                </a>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div id="whatsapp" className="pt-2 border-t border-[#27272A]">
              <div className="bg-[#25D366]/10 p-5 rounded-xl border border-[#25D366]/30 space-y-3">
                <h3 className="text-sm font-bold text-[#25D366] flex items-center gap-2">
                  <WhatsAppIcon size={18} />
                  <span>Canal WhatsApp Privilégié</span>
                </h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  Échangez directement avec notre secrétariat via WhatsApp pour toute réservation ou question.
                </p>
                <a
                  href={OFFICIAL_CONTACT_INFO.whatsAppDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ouvrir une discussion WhatsApp avec C'ESKY au ${OFFICIAL_CONTACT_INFO.officialWhatsApp}`}
                  title="Démarrer une conversation sur WhatsApp"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-[#25D366] text-black font-bold text-xs hover:bg-[#20bd5a] hover:scale-[1.02] transition-all group"
                >
                  <WhatsAppIcon size={16} className="group-hover:scale-110 transition-transform" />
                  <span>Discuter sur WhatsApp ({OFFICIAL_CONTACT_INFO.officialWhatsApp})</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Col Right: Formulaire Minimisé Data Minimization */}
        <div className="lg:col-span-7">
          <div className="bg-[#141416] p-8 sm:p-10 rounded-2xl border border-[#27272A]">
            <h2 className="text-xl font-serif font-bold text-[#F4F4F0] mb-2">
              Envoyer un Message
            </h2>
            <p className="text-xs text-[#A1A1AA] mb-6">
              Ce formulaire est conçu selon le principe de minimisation des données (Loi Camerounaise n°2024/017).
            </p>

            {status === 'success' ? (
              <div className="bg-[#25D366]/10 border border-[#25D366]/40 p-6 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#25D366] mx-auto" />
                <h3 className="text-lg font-bold text-[#F4F4F0]">Demande Transmise</h3>
                <p className="text-xs text-[#A1A1AA]">
                  Votre message a bien été envoyé. Nos équipes prendront contact avec vous dans les plus brefs délais.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-sans">
                {status === 'error' && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded">
                    ⚠️ {errorMessage || 'Veuillez remplir tous les champs obligatoires (*) et accepter les conditions de traitement.'}
                  </div>
                )}

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
                    placeholder="Votre nom complet"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      Adresse Email (Optionnel)
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded bg-[#0B0B0C] border border-[#27272A] text-sm text-[#F4F4F0] focus:border-[#D4AF37] focus:outline-none"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-[#F4F4F0] mb-1">
                    Type de Demande
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded bg-[#0B0B0C] border border-[#27272A] text-sm text-[#F4F4F0] focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="Renseignements généraux">Renseignements généraux</option>
                    <option value="Restaurant & Bar">Restaurant & Bar</option>
                    <option value="Piscine & Espace VIP">Piscine & Espace VIP (10h-19h)</option>
                    <option value="Hébergement">Hébergement</option>
                    <option value="Événements & Privatisation">Événements & Privatisation</option>
                    <option value="Pressing / Laverie / Shopping">Pressing / Laverie / Shopping</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-[#F4F4F0] mb-1">
                    Message <span className="text-[#D4AF37]">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded bg-[#0B0B0C] border border-[#27272A] text-sm text-[#F4F4F0] focus:border-[#D4AF37] focus:outline-none"
                    placeholder="Précisez votre demande..."
                  />
                </div>

                {/* Explicit Opt-in Checkboxes under Law No. 2024/017 */}
                <div className="space-y-3 pt-2 text-xs text-[#A1A1AA]">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.consentRequired}
                      onChange={(e) => setFormData({ ...formData, consentRequired: e.target.checked })}
                      className="mt-0.5 accent-[#D4AF37] rounded"
                    />
                    <span>
                      J’accepte que mes données soient transmises à C’ESKY uniquement pour traiter ma demande. <span className="text-[#D4AF37]">*</span>
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.consentMarketing}
                      onChange={(e) => setFormData({ ...formData, consentMarketing: e.target.checked })}
                      className="mt-0.5 accent-[#D4AF37] rounded"
                    />
                    <span>Je souhaite recevoir les actualités et offres privilégiées de C’ESKY. (Facultatif)</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3.5 px-6 rounded-md bg-[#D4AF37] text-black font-bold uppercase text-xs tracking-wider hover:bg-[#C5A059] transition-all disabled:opacity-50"
                >
                  {status === 'submitting' ? 'Envoi en cours...' : 'Envoyer ma demande'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Interactive GPS Google Maps Section */}
      <MapSection />
    </div>
  );
}
