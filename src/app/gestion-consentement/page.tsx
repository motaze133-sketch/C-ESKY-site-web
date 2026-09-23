'use client';

import React, { useState, useEffect } from 'react';
import { SectionTitle } from '@/components/common/SectionTitle';
import {
  getCookiePreferences,
  saveCookiePreferences,
  acceptAllCookies,
  rejectNonEssentialCookies,
  CookiePreferences
} from '@/lib/cookie-manager';
import { ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';

export default function GestionConsentementPage() {
  const [prefs, setPrefs] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    updatedAt: '',
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = getCookiePreferences();
    if (stored) {
      setPrefs(stored);
    }
  }, []);

  const handleSave = () => {
    saveCookiePreferences(prefs);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleAcceptAll = () => {
    const updated = acceptAllCookies();
    setPrefs(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleRejectAll = () => {
    const updated = rejectNonEssentialCookies();
    setPrefs(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 font-sans">
      <SectionTitle
        badge="Centre de Gestion de la Vie Privée"
        subtitle="Contrôle Total"
        title="Gestion de Vos Consentements"
        description="Vous pouvez à tout moment modifier ou retirer vos choix concernant le dépôt de cookies et de traceurs."
      />

      {saved && (
        <div className="p-4 bg-[#25D366]/10 border border-[#25D366]/40 rounded-xl flex items-center gap-3 text-[#25D366] text-xs font-semibold">
          <CheckCircle2 className="w-5 h-5" />
          <span>Vos préférences ont bien été mises à jour !</span>
        </div>
      )}

      <div className="bg-[#141416] p-8 rounded-2xl border border-[#27272A] space-y-6">
        {/* Necessary Cookies */}
        <div className="p-5 bg-[#0B0B0C] rounded-xl border border-[#27272A] flex items-start justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-[#F4F4F0] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Cookies Strictement Nécessaires</span>
            </h3>
            <p className="text-xs text-[#A1A1AA] mt-1 leading-relaxed">
              Ces cookies garantissent le fonctionnement fondamental du site (sécurité, mémorisation du choix de confidentialité). Ils ne peuvent pas être désactivés.
            </p>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] px-3 py-1 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30 shrink-0">
            Toujours Actifs
          </span>
        </div>

        {/* Analytics Cookies */}
        <div className="p-5 bg-[#0B0B0C] rounded-xl border border-[#27272A] flex items-start justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-[#F4F4F0]">Cookies de Mesure d’Audience & Statistiques</h3>
            <p className="text-xs text-[#A1A1AA] mt-1 leading-relaxed">
              Permettent d’analyser la fréquentation du site de manière strictement anonyme afin d’en améliorer les performances et l’ergonomie.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={prefs.analytics}
              onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#27272A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
          </label>
        </div>

        {/* Marketing Cookies */}
        <div className="p-5 bg-[#0B0B0C] rounded-xl border border-[#27272A] flex items-start justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-[#F4F4F0]">Cookies Marketing & Contenus Tiers</h3>
            <p className="text-xs text-[#A1A1AA] mt-1 leading-relaxed">
              Permettent d’intégrer des contenus interactifs enrichis (cartes, réseaux sociaux) et de proposer des offres adaptées à vos centres d’intérêt.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={prefs.marketing}
              onChange={(e) => setPrefs({ ...prefs, marketing: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#27272A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
          </label>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-[#27272A]">
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={handleAcceptAll}
              className="py-2.5 px-4 rounded-md bg-[#27272A] text-[#F4F4F0] text-xs font-semibold hover:bg-[#3F3F46] active:scale-95 text-center"
            >
              Tout Accepter
            </button>

            <button
              type="button"
              onClick={handleRejectAll}
              className="py-2.5 px-4 rounded-md bg-[#27272A] text-[#F4F4F0] text-xs font-semibold hover:bg-[#3F3F46] active:scale-95 text-center"
            >
              Tout Refuser
            </button>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="py-2.5 px-6 rounded-md bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#C5A059] transition-all active:scale-95 text-center"
          >
            Enregistrer mes Choix
          </button>
        </div>
      </div>
    </div>
  );
}
