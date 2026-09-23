'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SearchModal } from '@/components/search/SearchModal';
import { ScrollProgressBar } from '@/components/layout/ScrollProgressBar';
import { WhatsAppFloating } from '@/components/common/WhatsAppFloating';
import { CookieBanner } from '@/components/privacy/CookieBanner';
import { CartDrawer } from '@/components/restaurant/CartDrawer';
import { CartFloatingButton } from '@/components/restaurant/CartFloatingButton';

import { CartProvider } from '@/context/CartContext';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global Keyboard Shortcut: Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <CartProvider>
      <ScrollProgressBar />

      <Header onOpenSearch={() => setIsSearchOpen(true)} />

      <main id="main-content" className="flex-grow pt-20" tabIndex={-1}>
        {children}
      </main>

      <Footer />

      <WhatsAppFloating />
      <CartFloatingButton />
      <CartDrawer />
      <CookieBanner />

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </CartProvider>
  );
};
