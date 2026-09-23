'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, Menu, Search } from 'lucide-react';
import { MobileMenu } from './MobileMenu';
import { SITE_CONFIG } from '@/lib/data/siteConfig';
import { WhatsAppIcon } from '@/components/common/BrandIcons';

interface HeaderProps {
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/services', label: 'Services' },
    { href: '/restaurant', label: 'Restaurant & Bar' },
    { href: '/piscine', label: 'Piscine' },
    { href: '/hebergement', label: 'Hébergement' },
    { href: '/loisirs', label: 'Loisirs' },
    { href: '/evenements', label: 'Événements' },
    { href: '/galerie', label: 'Galerie' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-header py-3 border-b border-[#27272A] shadow-2xl bg-[#0B0B0C]/85 backdrop-blur-md'
            : 'bg-gradient-to-b from-black/95 via-black/60 to-transparent py-5'
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 text-2xl font-serif tracking-widest text-[#F4F4F0] hover:text-[#D4AF37] transition-colors focus-visible:ring-2 focus-visible:ring-[#D4AF37] shrink-0 group"
            aria-label="Complexe C’ESKY Officiel - Accueil"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden border border-[#D4AF37]/30 bg-black group-hover:border-[#D4AF37] transition-colors shrink-0 shadow-md flex items-center justify-center p-0.5">
              <img
                src={SITE_CONFIG.logo}
                alt="Logo Complexe C’ESKY"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[#D4AF37] text-xl sm:text-2xl leading-none">C’ESKY</span>
              <span className="text-[9px] font-sans tracking-widest uppercase text-[#A1A1AA] hidden sm:inline-block mt-0.5">
                Resort & Lounge
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav
            className="hidden lg:flex items-center space-x-4 xl:space-x-6 text-xs font-semibold tracking-wide"
            aria-label="Navigation principale"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`transition-all relative py-1.5 px-0.5 ${
                    isActive
                      ? 'text-[#D4AF37] font-bold'
                      : 'text-[#A1A1AA] hover:text-[#F4F4F0]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37] rounded-full shadow-[0_0_8px_#D4AF37]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs & Search Trigger */}
          <div className="flex items-center space-x-2.5">
            {/* Search Trigger Button */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="p-2 sm:px-3 sm:py-2 rounded-md bg-[#1C1C20] border border-[#27272A] text-[#A1A1AA] hover:text-[#F4F4F0] hover:border-[#D4AF37] transition-all flex items-center gap-2 text-xs focus-visible:ring-2 focus-visible:ring-[#D4AF37] active:scale-95"
              aria-label="Ouvrir la recherche globale (Raccourci ⌘K ou Ctrl+K)"
            >
              <Search className="w-4 h-4 text-[#D4AF37]" />
              <span className="hidden xl:inline text-[#71717A]">Rechercher...</span>
              <kbd className="hidden xl:inline-block px-1.5 py-0.5 rounded bg-[#0B0B0C] text-[10px] text-[#A1A1AA] font-mono border border-[#27272A]">
                ⌘K
              </kbd>
            </button>

            {/* Direct WhatsApp CTA */}
            <a
              href={SITE_CONFIG.whatsappMessages.general.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-md bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-all shrink-0 active:scale-95 group"
              aria-label={`Écrire à C'ESKY sur WhatsApp au ${SITE_CONFIG.whatsappNumber}`}
              title="Discuter directement sur WhatsApp"
            >
              <WhatsAppIcon size={15} className="group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline">WhatsApp</span>
            </a>

            {/* Reservation CTA */}
            <Link
              href="/reservation"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-md bg-[#D4AF37] text-black hover:bg-[#C5A059] transition-all shrink-0 shadow-lg hover:shadow-[#D4AF37]/25 active:scale-95"
              aria-label="Réserver un service au complexe C'ESKY"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Réserver</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              className="lg:hidden p-2 text-[#F4F4F0] hover:text-[#D4AF37] rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] active:scale-95"
              onClick={() => setIsMobileOpen(true)}
              aria-expanded={isMobileOpen}
              aria-label="Ouvrir le menu mobile"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        onOpenSearch={() => {
          setIsMobileOpen(false);
          if (onOpenSearch) onOpenSearch();
        }}
      />
    </>
  );
};

