'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Cookie, X, Check } from 'lucide-react';
import {
  getCookiePreferences,
  acceptAllCookies,
  rejectNonEssentialCookies,
  CookiePreferences
} from '@/lib/cookie-manager';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    updatedAt: '',
  });

  useEffect(() => {
    const existing = getCookiePreferences();
    if (!existing) {
      // Show banner after short delay for optimal UX
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    acceptAllCookies();
    setIsVisible(false);
  };

  const handleReject = () => {
    rejectNonEssentialCookies();
    setIsVisible(false);
  };

  const handleSaveCustom = () => {
    // Save state
    rejectNonEssentialCookies(); // updates state base
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-lg z-50 bg-[#141416] border border-[#27272A] rounded-xl shadow-2xl p-5 sm:p-6 text-[#F4F4F0] font-sans"
      role="dialog"
      aria-live="polite"
      aria-label="Gestion des cookies et vie privée"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Cookie className="w-5 h-5 text-[#D4AF37]" />
          <h3 className="text-sm font-bold tracking-wide">Gestion de la vie privée & Cookies</h3>
        </div>
        <button
          onClick={handleReject}
          className="text-[#71717A] hover:text-[#F4F4F0] p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded"
          aria-label="Fermer et refuser les cookies non essentiels"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-[#A1A1AA] leading-relaxed mb-4">
        C’ESKY respecte la{' '}
        <span className="text-[#F4F4F0] underline font-medium">
          Loi Camerounaise n°2024/017
        </span>{' '}
        relative à la protection des données. Nous utilisons des cookies essentiels pour assurer le bon fonctionnement du site. Aucun tracker non essentiel n’est activé sans votre consentement libre et éclairé.
      </p>

      {/* Buttons Container with Strict Non-Dark-Pattern Equality */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
        <button
          type="button"
          onClick={handleAcceptAll}
          className="flex-1 py-2.5 px-4 rounded-md bg-[#D4AF37] text-black font-bold text-xs hover:bg-[#C5A059] transition-colors text-center focus-visible:ring-2 focus-visible:ring-white active:scale-95"
        >
          Tout Accepter
        </button>

        <button
          type="button"
          onClick={handleReject}
          className="flex-1 py-2.5 px-4 rounded-md bg-[#27272A] text-[#F4F4F0] border border-[#3F3F46] font-semibold text-xs hover:bg-[#3F3F46] transition-colors text-center focus-visible:ring-2 focus-visible:ring-[#D4AF37] active:scale-95"
        >
          Refuser Tout
        </button>

        <Link
          href="/gestion-consentement"
          onClick={() => setIsVisible(false)}
          className="w-full sm:w-auto text-center text-xs text-[#D4AF37] hover:underline py-2 px-2"
        >
          Personnaliser mes choix
        </Link>
      </div>
    </div>
  );
};
