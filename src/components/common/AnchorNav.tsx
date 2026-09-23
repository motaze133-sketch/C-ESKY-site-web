'use client';

import React, { useEffect, useState } from 'react';

export interface AnchorItem {
  id: string;
  label: string;
}

interface AnchorNavProps {
  items: AnchorItem[];
  className?: string;
}

export const AnchorNav: React.FC<AnchorNavProps> = ({ items, className = '' }) => {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || '');

  useEffect(() => {
    if (typeof window === 'undefined' || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0.1,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
    setActiveId(id);
  };

  if (!items || items.length === 0) return null;

  return (
    <div
      className={`sticky top-20 z-30 py-3 bg-[#0B0B0C]/90 backdrop-blur-md border-y border-[#27272A] my-8 overflow-x-auto no-scrollbar ${className}`}
      role="navigation"
      aria-label="Navigation rapide de la page"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 sm:gap-3 min-w-max">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37] mr-2 shrink-0 hidden sm:inline-block">
          Aller à :
        </span>
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToAnchor(item.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 shrink-0 focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                isActive
                  ? 'bg-[#D4AF37] text-black shadow-md font-bold'
                  : 'bg-[#141416] text-[#A1A1AA] border border-[#27272A] hover:text-[#F4F4F0] hover:border-[#D4AF37]'
              }`}
              aria-current={isActive ? 'true' : undefined}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
