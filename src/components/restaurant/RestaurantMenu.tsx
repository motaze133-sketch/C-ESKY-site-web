'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  RESTAURANT_MENU,
  ALL_MENU_ITEMS,
  MenuCategory,
  MenuItem,
} from '@/lib/data/menu';
import { useCart } from '@/context/CartContext';
import { SITE_CONFIG } from '@/lib/data/siteConfig';
import { OFFICIAL_CONTACT_INFO } from '@/lib/data/legal';
import {
  Search,
  Pizza,
  Utensils,
  Sparkles,
  Flame,
  Soup,
  Coffee,
  Clock,
  MessageSquare,
  Calendar,
  X,
  Plus,
  Minus,
  ShoppingBag,
  ChefHat,
  Info,
  Check,
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'pizzas-sandwichs': Pizza,
  restaurant: Utensils,
  terroir: Sparkles,
  'plats-composes': Flame,
  sauces: Soup,
  'boissons-chaudes': Coffee,
};

export const RestaurantMenu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const {
    addItem,
    updateQuantity,
    getItemQuantity,
    totalItemsCount,
    totalAmountFormatted,
    openCart,
  } = useCart();

  // Filtered menu logic
  const filteredData = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return RESTAURANT_MENU.map((cat) => {
      // Check if category matches active filter
      if (activeCategory !== 'all' && cat.id !== activeCategory) {
        return null;
      }

      // Filter subcategories and items
      const matchingSubcategories = cat.subcategories
        .map((sub) => {
          const matchingItems = sub.items.filter((item) => {
            if (!query) return true;
            const matchName = item.name.toLowerCase().includes(query);
            const matchIng = item.ingredients?.toLowerCase().includes(query) || false;
            const matchSub = item.subcategory.toLowerCase().includes(query);
            return matchName || matchIng || matchSub;
          });

          if (matchingItems.length === 0) return null;

          return {
            ...sub,
            items: matchingItems,
          };
        })
        .filter(Boolean) as typeof cat.subcategories;

      if (matchingSubcategories.length === 0) return null;

      return {
        ...cat,
        subcategories: matchingSubcategories,
      };
    }).filter(Boolean) as MenuCategory[];
  }, [activeCategory, searchQuery]);

  const totalResultsCount = useMemo(() => {
    return filteredData.reduce(
      (acc, cat) =>
        acc + cat.subcategories.reduce((subAcc, sub) => subAcc + sub.items.length, 0),
      0
    );
  }, [filteredData]);

  const buildWhatsAppOrderLink = (item: MenuItem) => {
    const message = `Bonjour C’ESKY, je souhaiterais des informations ou commander : ${item.name} (${item.price}) au restaurant.`;
    const cleanPhone = OFFICIAL_CONTACT_INFO.officialWhatsApp.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="menu-complet" className="space-y-10 scroll-mt-24 relative">
      {/* 1. Category Navigation & Search Bar Header */}
      <div className="bg-[#141416] p-6 sm:p-8 rounded-2xl border border-[#27272A] space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-bold uppercase tracking-wider mb-2">
              <ChefHat className="w-3.5 h-3.5" />
              <span>Carte Officielle — Composition Libre de Commande</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F4F4F0]">
              La Carte & Le Menu C’ESKY
            </h2>
            <p className="text-xs text-[#A1A1AA] mt-1">
              Sélectionnez vos plats, ajustez vos quantités et validez votre commande en ligne ou directement via WhatsApp.
            </p>
          </div>

          {/* Direct CTA on Top with Cart Button */}
          <div className="flex flex-wrap items-center gap-3">
            {totalItemsCount > 0 && (
              <button
                type="button"
                onClick={openCart}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#25D366] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#20bd5a] transition-all shadow-md active:scale-95 animate-pulse"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Panier ({totalItemsCount}) — {totalAmountFormatted}</span>
              </button>
            )}

            <Link
              href="/reservation"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#C5A059] transition-all shadow-md active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Réserver une table</span>
            </Link>

            <a
              href={SITE_CONFIG.whatsappMessages.restaurant.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/40 font-semibold text-xs hover:bg-[#25D366]/25 transition-all active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>

        {/* Real-time Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un plat, une pizza, un bouillon, un ingrédient..."
            className="w-full pl-11 pr-10 py-3 rounded-xl bg-[#0B0B0C] border border-[#27272A] text-sm text-[#F4F4F0] placeholder-[#71717A] focus:border-[#D4AF37] focus:outline-none transition-colors"
            aria-label="Rechercher dans le menu"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#71717A] hover:text-[#F4F4F0]"
              aria-label="Effacer la recherche"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Pills (Fluid & Scrollable on Mobile) */}
        <div
          className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 pt-1"
          role="tablist"
          aria-label="Catégories du menu"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'all'}
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide shrink-0 transition-all ${
              activeCategory === 'all'
                ? 'bg-[#D4AF37] text-black font-bold shadow-md'
                : 'bg-[#0B0B0C] text-[#A1A1AA] hover:text-[#F4F4F0] border border-[#27272A]'
            }`}
          >
            Tout le Menu ({ALL_MENU_ITEMS.length})
          </button>

          {RESTAURANT_MENU.map((cat) => {
            const IconComponent = CATEGORY_ICONS[cat.id] || Utensils;
            const isActive = activeCategory === cat.id;
            const itemsCount = cat.subcategories.reduce(
              (acc, sub) => acc + sub.items.length,
              0
            );

            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide shrink-0 transition-all ${
                  isActive
                    ? 'bg-[#D4AF37] text-black font-bold shadow-md'
                    : 'bg-[#0B0B0C] text-[#A1A1AA] hover:text-[#F4F4F0] border border-[#27272A]'
                }`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{cat.title}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-black/20 text-black' : 'bg-[#1C1C20] text-[#71717A]'
                  }`}
                >
                  {itemsCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Counter if searching or filtered */}
      {(searchQuery || activeCategory !== 'all') && (
        <div className="flex items-center justify-between text-xs text-[#A1A1AA] px-1">
          <span>
            {totalResultsCount} plat{totalResultsCount > 1 ? 's' : ''} trouvé{totalResultsCount > 1 ? 's' : ''}
            {searchQuery && ` pour « ${searchQuery} »`}
          </span>
          {(searchQuery || activeCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="text-[#D4AF37] hover:underline"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>
      )}

      {/* 2. Menu Sections Rendering */}
      {filteredData.length === 0 ? (
        <div className="bg-[#141416] border border-[#27272A] rounded-2xl p-12 text-center space-y-4">
          <Utensils className="w-12 h-12 text-[#71717A] mx-auto" />
          <h3 className="text-lg font-serif font-bold text-[#F4F4F0]">
            Aucun plat ne correspond à votre recherche
          </h3>
          <p className="text-xs text-[#A1A1AA] max-w-md mx-auto">
            Essayez un autre mot-clé (ex: « poulet », « pizza », « bar », « ndolet ») ou réinitialisez les filtres.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="px-5 py-2 rounded-md bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#C5A059] transition-all"
          >
            Voir tout le menu
          </button>
        </div>
      ) : (
        filteredData.map((category) => {
          const IconComponent = CATEGORY_ICONS[category.id] || Utensils;

          return (
            <div key={category.id} className="space-y-8">
              {/* Category Header */}
              <div className="flex items-center gap-3 border-b border-[#27272A] pb-3">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center shrink-0">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#F4F4F0] tracking-wide">
                    {category.title}
                  </h3>
                  <p className="text-xs text-[#A1A1AA]">{category.subtitle}</p>
                </div>
              </div>

              {/* Subcategories */}
              {category.subcategories.map((subcategory) => (
                <div key={subcategory.id} className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-base font-serif font-semibold text-[#D4AF37] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                      <span>{subcategory.title}</span>
                    </h4>
                    {subcategory.note && (
                      <span className="text-[11px] text-[#A1A1AA] italic bg-[#0B0B0C] px-2.5 py-1 rounded border border-[#27272A] flex items-center gap-1">
                        <Info className="w-3 h-3 text-[#D4AF37]" />
                        <span>{subcategory.note}</span>
                      </span>
                    )}
                  </div>

                  {/* Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {subcategory.items.map((item) => {
                      const hasPriceVariants = item.priceDetails && item.priceDetails.length > 0;
                      const singleQty = !hasPriceVariants ? getItemQuantity(item.id) : 0;

                      return (
                        <div
                          key={item.id}
                          className={`bg-[#141416] p-5 rounded-xl border transition-all duration-300 flex flex-col justify-between group h-full relative ${
                            singleQty > 0
                              ? 'border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                              : 'border-[#27272A] hover:border-[#D4AF37]/50'
                          }`}
                        >
                          <div>
                            {/* Card Top: Name & Badges */}
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h5 className="text-base font-serif font-bold text-[#F4F4F0] group-hover:text-[#D4AF37] transition-colors">
                                {item.name}
                              </h5>

                              {item.isOrderOnly ? (
                                <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/30">
                                  Sur commande
                                </span>
                              ) : item.badge ? (
                                <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
                                  {item.badge}
                                </span>
                              ) : null}
                            </div>

                            {/* Ingredients / Description */}
                            {item.ingredients && (
                              <p className="text-xs text-[#A1A1AA] leading-relaxed mb-4">
                                {item.ingredients}
                              </p>
                            )}
                          </div>

                          {/* Card Bottom: Price and Actions */}
                          <div className="pt-4 border-t border-[#27272A] space-y-3">
                            {/* Price Display */}
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] text-[#71717A] uppercase font-semibold">
                                Prix (FCFA)
                              </span>
                              <span className="text-base font-serif font-bold text-[#D4AF37]">
                                {item.price}
                              </span>
                            </div>

                            {/* Multiple Price Variants Selector with Direct Quantity Buttons */}
                            {hasPriceVariants ? (
                              <div className="space-y-2 pt-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A1A1AA] block">
                                  Choisir la taille / portion :
                                </span>
                                {item.priceDetails!.map((variant, idx) => {
                                  const variantCartId = `${item.id}-${variant.label.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
                                  const vQty = getItemQuantity(item.id, variant.label);

                                  return (
                                    <div
                                      key={idx}
                                      className="flex items-center justify-between bg-[#0B0B0C] p-2 rounded-lg border border-[#27272A] gap-2"
                                    >
                                      <div>
                                        <span className="text-xs font-bold text-[#F4F4F0]">{variant.label}</span>
                                        <span className="text-xs text-[#D4AF37] font-mono ml-2 font-semibold">
                                          {variant.amount}
                                        </span>
                                      </div>

                                      {vQty > 0 ? (
                                        <div className="flex items-center bg-[#141416] border border-[#D4AF37] rounded-md p-0.5">
                                          <button
                                            type="button"
                                            onClick={() => updateQuantity(variantCartId, -1)}
                                            className="p-1 hover:text-[#D4AF37] text-xs text-[#A1A1AA]"
                                            aria-label={`Diminuer ${item.name} (${variant.label})`}
                                          >
                                            <Minus className="w-3 h-3" />
                                          </button>
                                          <span className="px-2 text-xs font-bold font-mono text-[#D4AF37]">
                                            {vQty}
                                          </span>
                                          <button
                                            type="button"
                                            onClick={() => addItem(item, variant)}
                                            className="p-1 hover:text-[#D4AF37] text-xs text-[#A1A1AA]"
                                            aria-label={`Augmenter ${item.name} (${variant.label})`}
                                          >
                                            <Plus className="w-3 h-3" />
                                          </button>
                                        </div>
                                      ) : (
                                        <button
                                          type="button"
                                          onClick={() => addItem(item, variant)}
                                          className="px-2.5 py-1 rounded bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black font-bold text-[11px] transition-all flex items-center gap-1 active:scale-95"
                                        >
                                          <Plus className="w-3 h-3" />
                                          <span>Ajouter</span>
                                        </button>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              /* Single Price Dish Actions */
                              <div className="pt-1">
                                {singleQty > 0 ? (
                                  <div className="flex items-center justify-between bg-[#0B0B0C] p-2 rounded-lg border border-[#D4AF37]">
                                    <span className="text-xs font-semibold text-[#25D366] flex items-center gap-1">
                                      <Check className="w-3.5 h-3.5" />
                                      <span>Dans le panier ({singleQty})</span>
                                    </span>
                                    <div className="flex items-center bg-[#141416] border border-[#3F3F46] rounded-md p-0.5">
                                      <button
                                        type="button"
                                        onClick={() => updateQuantity(item.id, -1)}
                                        className="p-1.5 hover:text-[#D4AF37] text-[#A1A1AA] transition-colors"
                                        aria-label={`Diminuer la quantité de ${item.name}`}
                                      >
                                        <Minus className="w-3.5 h-3.5" />
                                      </button>
                                      <span className="px-2.5 text-xs font-bold font-mono text-[#D4AF37]">
                                        {singleQty}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => addItem(item)}
                                        className="p-1.5 hover:text-[#D4AF37] text-[#A1A1AA] transition-colors"
                                        aria-label={`Augmenter la quantité de ${item.name}`}
                                      >
                                        <Plus className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => addItem(item)}
                                    className="w-full py-2.5 px-3 rounded-lg bg-[#D4AF37] hover:bg-[#C5A059] text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-md"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>Ajouter au panier</span>
                                  </button>
                                )}
                              </div>
                            )}

                            {/* Direct WhatsApp Info Link */}
                            <a
                              href={buildWhatsAppOrderLink(item)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 text-[11px] text-[#A1A1AA] hover:text-[#25D366] transition-colors"
                            >
                              <MessageSquare className="w-3 h-3" />
                              <span>Renseignements WhatsApp</span>
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          );
        })
      )}

      {/* 3. Bottom Information & Direct Booking Banner */}
      <div className="bg-gradient-to-r from-[#141416] via-[#1A1A20] to-[#141416] border border-[#D4AF37]/30 rounded-2xl p-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
          <Clock className="w-3.5 h-3.5" />
          <span>Service Restaurant Continu 24h/24</span>
        </div>
        <h3 className="text-2xl font-serif font-bold text-[#F4F4F0]">
          Envie d’une table ou d’une commande personnalisée ?
        </h3>
        <p className="text-xs text-[#A1A1AA] max-w-xl mx-auto leading-relaxed">
          Nos chefs cuisiniers et serveurs vous accueillent à toute heure au Quartier Éleveur à Yaoundé. Vous pouvez réserver votre table en ligne ou commander directement par WhatsApp pour une préparation à emporter ou sur place.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {totalItemsCount > 0 && (
            <button
              type="button"
              onClick={openCart}
              className="w-full sm:w-auto px-6 py-3 rounded-md bg-[#25D366] text-black font-bold uppercase text-xs tracking-wider hover:bg-[#20bd5a] transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Finaliser ma commande ({totalItemsCount} plats — {totalAmountFormatted})</span>
            </button>
          )}

          <Link
            href="/reservation"
            className="w-full sm:w-auto px-6 py-3 rounded-md bg-[#D4AF37] text-black font-bold uppercase text-xs tracking-wider hover:bg-[#C5A059] transition-all shadow-md active:scale-95"
          >
            Faire une réservation de table
          </Link>
          <a
            href={SITE_CONFIG.whatsappMessages.restaurant.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-md bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/40 font-bold text-xs uppercase tracking-wider hover:bg-[#25D366]/25 transition-all active:scale-95 inline-flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Commander au restaurant (+237 690 836 746)</span>
          </a>
        </div>
      </div>
    </section>
  );
};
