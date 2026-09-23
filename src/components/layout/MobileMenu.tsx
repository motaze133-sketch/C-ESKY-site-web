'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Calendar, Search, Clock } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/data/siteConfig';
import { WhatsAppIcon } from '@/components/common/BrandIcons';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch?: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onOpenSearch,
}) => {
  const pathname = usePathname();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;


  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/services', label: 'Services (12)' },
    { href: '/restaurant', label: 'Restaurant, Bar & Pizzeria' },
    { href: '/piscine', label: 'Piscine & Espace VIP (10h-19h)' },
    { href: '/hebergement', label: 'Hébergement' },
    { href: '/loisirs', label: 'Loisirs & Billard' },
    { href: '/evenements', label: 'Événements & Privatisation' },
    { href: '/galerie', label: 'Galerie Photos' },
    { href: '/contact', label: 'Contact & Accès' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden flex justify-end bg-black/80 backdrop-blur-md transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navigation mobile"
    >
      <div className="w-full max-w-xs sm:max-w-sm bg-[#141416] border-l border-[#27272A] h-full flex flex-col justify-between p-6 overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#27272A]">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-[#D4AF37]/30 bg-black shrink-0 flex items-center justify-center p-0.5">
                <img
                  src={SITE_CONFIG.logo}
                  alt="Logo C’ESKY"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-serif text-xl font-bold tracking-wider text-[#D4AF37]">
                C’ESKY
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#A1A1AA] hover:text-[#F4F4F0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-md"
              aria-label="Fermer le menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Quick Search Trigger */}
          <div className="mt-4">
            <button
              type="button"
              onClick={onOpenSearch}
              className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0B0B0C] border border-[#27272A] text-xs text-[#A1A1AA] hover:border-[#D4AF37] hover:text-[#F4F4F0] transition-colors"
            >
              <Search className="w-4 h-4 text-[#D4AF37]" />
              <span>Rechercher un service, une chambre...</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 flex flex-col space-y-3" aria-label="Menu mobile">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`text-sm font-medium py-1.5 transition-colors flex items-center justify-between ${
                    isActive
                      ? 'text-[#D4AF37] font-bold border-l-2 border-[#D4AF37] pl-3'
                      : 'text-[#A1A1AA] hover:text-[#F4F4F0]'
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* CTAs and Info Footer */}
        <div className="pt-6 border-t border-[#27272A] flex flex-col space-y-3">
          <Link
            href="/reservation"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-[#D4AF37] text-black font-bold uppercase text-xs tracking-wider hover:bg-[#C5A059] transition-all text-center"
          >
            <Calendar className="w-4 h-4" />
            <span>Réserver un service</span>
          </Link>

          <a
            href={SITE_CONFIG.whatsappMessages.general.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            aria-label={`Contacter C'ESKY sur WhatsApp au ${SITE_CONFIG.whatsappNumber}`}
            title="Ouvrir une discussion WhatsApp"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 font-semibold text-xs transition-all text-center group"
          >
            <WhatsAppIcon size={16} className="group-hover:scale-110 transition-transform" />
            <span>WhatsApp ({SITE_CONFIG.whatsappNumber})</span>
          </a>

          <div className="pt-2 text-[11px] text-[#71717A] flex items-center justify-between border-t border-[#1C1C20] pt-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#D4AF37]" /> Piscine 10h-19h
            </span>
            <span>Yaoundé, Cameroun</span>
          </div>
        </div>
      </div>
    </div>
  );
};
