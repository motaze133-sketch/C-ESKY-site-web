import React from 'react';
import Link from 'next/link';
import { Compass, Home, MessageSquare, ChevronRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 font-sans text-center">
      <div className="max-w-md w-full bg-[#141416] p-8 sm:p-10 rounded-2xl border border-[#27272A] space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8 animate-spin duration-10000" />
        </div>

        <span className="text-4xl font-serif font-bold text-[#D4AF37]">404</span>

        <h1 className="text-2xl font-serif font-bold text-[#F4F4F0]">
          Page Introuvable
        </h1>

        <p className="text-xs text-[#A1A1AA] leading-relaxed">
          La page que vous recherchez semble avoir été déplacée ou n’existe pas sur la plateforme C’ESKY.
        </p>

        <div className="space-y-2 pt-2">
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#C5A059] transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Retourner à l’Accueil</span>
          </Link>

          <Link
            href="/services"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-[#1C1C20] border border-[#3F3F46] text-[#F4F4F0] text-xs font-semibold hover:border-[#D4AF37] transition-all"
          >
            <span>Découvrir tous les services</span>
            <ChevronRight className="w-4 h-4" />
          </Link>

          <Link
            href="/contact#whatsapp"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 text-xs font-semibold hover:bg-[#25D366]/20 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Assistance WhatsApp</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
