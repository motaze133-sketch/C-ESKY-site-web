'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, ChevronRight, MessageSquare, Sparkles, Clock } from 'lucide-react';
import { SERVICES_DATA, ServiceItem } from '@/lib/data/services';
import { SITE_CONFIG } from '@/lib/data/siteConfig';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Synonyms map for smart matching
const SYNONYMS: Record<string, string[]> = {
  piscine: ['piscine', 'bassin', 'vip', 'nage', 'baignade', 'transat', 'maître-nageur'],
  manger: ['restaurant', 'bar', 'snack', 'pizzeria', 'repas', 'dîner', 'déjeuner', 'nourriture', 'grillade', 'plat'],
  resto: ['restaurant', 'bar', 'snack', 'pizzeria'],
  dormir: ['hébergement', 'chambre', 'suite', 'séjour', 'nuit', 'hôtel', 'repos'],
  boire: ['bar', 'lounge', 'cocktail', 'boisson', 'spiritueux', 'vin'],
  billard: ['billard', 'jeu', 'loisir', 'table'],
  habits: ['pressing', 'laverie', 'nettoyage', 'linge', 'repassage', 'boutique', 'shopping'],
  fête: ['événements', 'mariage', 'anniversaire', 'privatisation', 'location', 'réunion'],
};

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ServiceItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled externally or trigger
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Intelligent Search Matching Algorithm
  useEffect(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      setResults([]);
      return;
    }

    // Expand query with synonyms
    let searchTerms = [trimmed];
    Object.entries(SYNONYMS).forEach(([key, terms]) => {
      if (key.includes(trimmed) || trimmed.includes(key)) {
        searchTerms = [...searchTerms, ...terms];
      }
    });

    const filtered = SERVICES_DATA.filter((service) => {
      const textToSearch = `${service.title} ${service.shortDescription} ${service.fullDescription} ${service.category} ${service.highlights.join(' ')}`.toLowerCase();
      return searchTerms.some((term) => textToSearch.includes(term));
    });

    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  const quickSuggestions = ['Piscine VIP', 'Restaurant', 'Hébergement', 'Billard', 'Événements', 'Pressing'];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Recherche globale C’ESKY"
    >
      <div className="relative max-w-2xl w-full bg-[#141416] border border-[#27272A] rounded-2xl shadow-2xl overflow-hidden font-sans text-[#F4F4F0]">
        {/* Search Header */}
        <div className="p-4 sm:p-5 border-b border-[#27272A] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#D4AF37] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un service, une piscine, un plat, une chambre..."
            className="w-full bg-transparent text-sm sm:text-base text-[#F4F4F0] placeholder-[#71717A] focus:outline-none"
            aria-label="Champ de recherche"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#71717A] hover:text-[#F4F4F0] rounded"
              aria-label="Effacer la recherche"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-[#71717A] hover:text-[#F4F4F0] rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            aria-label="Fermer la recherche"
          >
            <span className="text-xs uppercase font-bold border border-[#27272A] px-2 py-1 rounded">ESC</span>
          </button>
        </div>

        {/* Quick Suggestions (when query is empty) */}
        {!query && (
          <div className="p-6 space-y-4">
            <span className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider block">
              Suggestions Fréquentes
            </span>
            <div className="flex flex-wrap gap-2">
              {quickSuggestions.map((sug) => (
                <button
                  key={sug}
                  onClick={() => setQuery(sug)}
                  className="px-3 py-1.5 rounded-full bg-[#1C1C20] border border-[#27272A] text-xs text-[#F4F4F0] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  <span>{sug}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        {query && results.length > 0 && (
          <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-[#27272A]">
            <span className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider block mb-3 px-2">
              {results.length} résultat{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}
            </span>
            {results.map((item) => (
              <Link
                key={item.id}
                href={item.ctaLink}
                onClick={onClose}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#1C1C20] transition-colors group"
              >
                <div className="w-14 h-14 rounded-md border border-[#27272A] bg-[#0B0B0C] overflow-hidden shrink-0">
                  <img
                    src={item.image}
                    alt={item.altText}
                    className="w-full h-full object-cover object-[center_50%]"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#F4F4F0] group-hover:text-[#D4AF37] transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-[10px] uppercase font-bold text-[#D4AF37] px-2 py-0.5 rounded bg-[#D4AF37]/10">
                      {item.hours}
                    </span>
                  </div>
                  <p className="text-xs text-[#A1A1AA] line-clamp-1 mt-0.5">
                    {item.shortDescription}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#71717A] group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        )}

        {/* No Results Fallback with WhatsApp option */}
        {query && results.length === 0 && (
          <div className="p-8 text-center space-y-5">
            <p className="text-sm text-[#F4F4F0]">
              Aucun résultat trouvé pour « <span className="text-[#D4AF37] font-semibold">{query}</span> ».
            </p>
            
            <div className="text-xs text-[#A1A1AA] space-y-2">
              <p className="font-medium text-[#F4F4F0]">Essayez par exemple :</p>
              <div className="flex flex-wrap justify-center gap-2 pt-1">
                {['Piscine', 'Restaurant', 'Hébergement', 'Billard', 'Événements', 'Pressing'].map((sug) => (
                  <button
                    key={sug}
                    onClick={() => setQuery(sug)}
                    className="px-2.5 py-1 rounded bg-[#1C1C20] border border-[#27272A] text-xs text-[#D4AF37] hover:bg-[#27272A] transition-colors"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#27272A]">
              <p className="text-xs text-[#A1A1AA] mb-3">
                Vous ne trouvez pas ce que vous cherchez ? Posez directement votre question à notre secrétariat :
              </p>
              <a
                href={SITE_CONFIG.getWhatsAppLink(`Bonjour C’ESKY, je recherchais des informations concernant : ${query}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-[#25D366] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#20bd5a] transition-all shadow-lg hover:shadow-[#25D366]/20 active:scale-95"
              >
                <MessageSquare className="w-4 h-4 fill-current text-black" />
                <span>Contacter C’ESKY sur WhatsApp</span>
              </a>
            </div>
          </div>
        )}

        {/* Keyboard Footer Info */}
        <div className="p-3 bg-[#0B0B0C] border-t border-[#27272A] text-[11px] text-[#71717A] flex items-center justify-between px-5">
          <span>Touche <kbd className="px-1.5 py-0.5 rounded bg-[#1C1C20] text-[#F4F4F0] font-mono">⌘K</kbd> ou <kbd className="px-1.5 py-0.5 rounded bg-[#1C1C20] text-[#F4F4F0] font-mono">Ctrl+K</kbd> pour rechercher</span>
          <span>Complexe C’ESKY Officiel</span>
        </div>
      </div>
    </div>
  );
};
