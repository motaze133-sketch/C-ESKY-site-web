'use client';

import React from 'react';
import { SITE_CONFIG } from '@/lib/data/siteConfig';
import { WhatsAppIcon } from '@/components/common/BrandIcons';

export const WhatsAppFloating: React.FC = () => {
  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center gap-3 pointer-events-auto">
      {/* Tooltip text for high conversion */}
      <span className="hidden md:inline-block bg-[#141416]/95 backdrop-blur-md text-[#F4F4F0] text-xs px-3.5 py-2 rounded-lg border border-[#27272A] shadow-2xl font-medium tracking-wide">
        Une question ? Écrivez-nous (<span className="text-[#25D366] font-semibold">{SITE_CONFIG.whatsappNumber}</span>)
      </span>

      <a
        href={SITE_CONFIG.whatsappMessages.general.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Contacter le complexe C’ESKY directement sur WhatsApp au ${SITE_CONFIG.whatsappNumber}`}
        title="Démarrer un chat WhatsApp direct"
        className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-black shadow-[0_0_25px_rgba(37,211,102,0.35)] hover:shadow-[0_0_35px_rgba(37,211,102,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 focus-visible:ring-4 focus-visible:ring-[#25D366]/50 group"
      >
        <WhatsAppIcon size={24} className="group-hover:rotate-6 transition-transform" />
      </a>
    </div>
  );
};

