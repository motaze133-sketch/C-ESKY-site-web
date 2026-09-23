'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export const CartFloatingButton: React.FC = () => {
  const { totalItemsCount, totalAmountFormatted, openCart } = useCart();

  if (totalItemsCount === 0) return null;

  return (
    <div className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-40 animate-fade-in pointer-events-auto">
      <button
        type="button"
        onClick={openCart}
        className="flex items-center gap-3 py-2.5 px-4 sm:py-3 sm:px-5 rounded-full bg-[#141416]/95 border border-[#D4AF37] text-[#F4F4F0] shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_4px_35px_rgba(212,175,55,0.55)] hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-md group"
        aria-label={`Ouvrir mon panier (${totalItemsCount} articles, total ${totalAmountFormatted})`}
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-black flex items-center justify-center font-bold">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow">
            {totalItemsCount}
          </span>
        </div>

        <div className="text-left hidden sm:block">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">
            Votre Commande
          </span>
          <span className="block text-xs font-bold text-[#F4F4F0] font-mono">
            {totalAmountFormatted}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs font-bold text-[#D4AF37] group-hover:translate-x-1 transition-transform pl-1">
          <span className="hidden sm:inline">Voir</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </button>
    </div>
  );
};
