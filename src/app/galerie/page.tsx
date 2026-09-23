'use client';

import React, { useState } from 'react';
import { SectionTitle } from '@/components/common/SectionTitle';
import { GALLERY_ITEMS } from '@/lib/data/gallery';

const CATEGORIES = [
  { key: 'all', label: 'Tout' },
  { key: 'restaurant', label: 'Restaurant & Bar' },
  { key: 'piscine', label: 'Piscine & VIP' },
  { key: 'hebergement', label: 'Hébergement' },
  { key: 'loisirs', label: 'Loisirs & Boutique' },
  { key: 'evenements', label: 'Événements' },
];

export default function GaleriePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeImage, setActiveImage] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  const filteredItems =
    activeCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <SectionTitle
        badge="Galerie Photographique"
        subtitle="Immersion Visuelle"
        title="L’Atmosphère C’ESKY en Images"
        description="Découvrez l’élégance de nos infrastructures à travers notre sélection de photographies."
      />

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 font-sans" role="tablist" aria-label="Filtres de galerie">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            type="button"
            role="tab"
            aria-selected={activeCategory === cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
              activeCategory === cat.key
                ? 'bg-[#D4AF37] text-black font-bold shadow-md'
                : 'bg-[#141416] text-[#A1A1AA] hover:text-[#F4F4F0] border border-[#27272A]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveImage(item)}
            className="relative h-72 rounded-xl overflow-hidden cursor-pointer group border border-[#27272A] hover:border-[#D4AF37]/50 transition-all focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setActiveImage(item);
            }}
            aria-label={`Agrandir la photo : ${item.title}`}
          >
            <img
              src={item.image}
              alt={item.altText}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
            <div className="absolute bottom-4 left-4 right-4 text-[#F4F4F0]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">
                {item.categoryLabel}
              </span>
              <h3 className="text-lg font-serif font-bold">{item.title}</h3>
              <p className="text-xs text-[#A1A1AA]">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Accessible Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.title}
        >
          <div className="relative max-w-4xl w-full bg-[#141416] border border-[#27272A] rounded-2xl overflow-hidden">
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 text-white hover:text-[#D4AF37] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              aria-label="Fermer la vue agrandie"
            >
              ✕
            </button>
            <div className="max-h-[70vh] overflow-hidden">
              <img
                src={activeImage.image}
                alt={activeImage.altText}
                className="w-full h-full object-contain max-h-[70vh]"
              />
            </div>
            <div className="p-6 bg-[#141416] border-t border-[#27272A] text-[#F4F4F0]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                {activeImage.categoryLabel}
              </span>
              <h3 className="text-xl font-serif font-bold mt-1">{activeImage.title}</h3>
              <p className="text-sm text-[#A1A1AA] mt-1">{activeImage.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
