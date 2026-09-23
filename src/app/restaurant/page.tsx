import React from 'react';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Utensils, Wine, Pizza, Truck, Clock } from 'lucide-react';
import { RestaurantMenu } from '@/components/restaurant/RestaurantMenu';

export const metadata = {
  title: 'Restaurant, Bar, Snack-Bar & Pizzeria — Menu & Carte C’ESKY',
  description: 'Découvrez la carte complète et les tarifs en FCFA du restaurant C’ESKY à Yaoundé : Pizzas artisanales, cuisine du terroir camerounais, grillades, volailles, poissons et sandwichs.',
};

export default function RestaurantPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <SectionTitle
        badge="Art Culinaire 24h/24"
        subtitle="Restauration, Pizzeria & Bar Lounge"
        title="Une Expérience Gastronomique d’Exception"
        description="Le complexe C’ESKY vous propose une sélection de saveurs raffinées préparées à partir d’ingrédients frais. Découvrez notre carte complète ci-dessous, disponible sur place, à emporter ou en livraison 24h/24."
      />

      {/* Authentic Photo Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative h-64 md:h-72 rounded-2xl overflow-hidden border border-[#27272A] group shadow-xl">
          <img
            src="/images/restaurant-terrasse-orange.jpg"
            alt="Terrasse panoramique du restaurant C’ESKY"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">Terrasse Panoramique</span>
            <p className="text-base font-serif font-bold text-[#F4F4F0]">Cadre Raffiné & Vue Dégagée</p>
            <p className="text-xs text-[#A1A1AA]">Chaises design, tables nappées et suspensions en osier</p>
          </div>
        </div>

        <div className="relative h-64 md:h-72 rounded-2xl overflow-hidden border border-[#27272A] group shadow-xl">
          <img
            src="/images/restaurant-terrasse-piscine.jpg"
            alt="Terrasse lounge au bord de la piscine C’ESKY"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">Espace Piscine Lounge</span>
            <p className="text-base font-serif font-bold text-[#F4F4F0]">Banquettes & Dîners au Bord de l’Eau</p>
            <p className="text-xs text-[#A1A1AA]">Plafond végétal, ambiance intimiste et service à table</p>
          </div>
        </div>
      </div>

      {/* Overview Grid of Culinary Offerings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#141416] p-6 rounded-xl border border-[#27272A] hover:border-[#D4AF37]/40 transition-colors">
          <Utensils className="w-8 h-8 text-[#D4AF37] mb-4" />
          <h2 className="text-lg font-serif font-bold text-[#F4F4F0] mb-2">Restaurant</h2>
          <p className="text-xs text-[#A1A1AA] leading-relaxed mb-4">
            Cuisine gastronomique afropolitaine, grillades de bœuf, porc et poissons frais.
          </p>
          <span className="text-[11px] font-semibold text-[#D4AF37] flex items-center gap-1">
            <Clock className="w-3 h-3" /> Service 24h/24
          </span>
        </div>

        <div className="bg-[#141416] p-6 rounded-xl border border-[#27272A] hover:border-[#D4AF37]/40 transition-colors">
          <Wine className="w-8 h-8 text-[#D4AF37] mb-4" />
          <h2 className="text-lg font-serif font-bold text-[#F4F4F0] mb-2">Bar & Lounge</h2>
          <p className="text-xs text-[#A1A1AA] leading-relaxed mb-4">
            Cocktails signature créatifs, spiritueux d’exception et ambiance musicale feutrée.
          </p>
          <span className="text-[11px] font-semibold text-[#D4AF37] flex items-center gap-1">
            <Clock className="w-3 h-3" /> Service 24h/24
          </span>
        </div>

        <div className="bg-[#141416] p-6 rounded-xl border border-[#27272A] hover:border-[#D4AF37]/40 transition-colors">
          <Pizza className="w-8 h-8 text-[#D4AF37] mb-4" />
          <h2 className="text-lg font-serif font-bold text-[#F4F4F0] mb-2">Pizzeria</h2>
          <p className="text-xs text-[#A1A1AA] leading-relaxed mb-4">
            9 recettes de pizzas artisanales pétries sur place et garnies généreusement.
          </p>
          <span className="text-[11px] font-semibold text-[#D4AF37] flex items-center gap-1">
            <Clock className="w-3 h-3" /> Service 24h/24
          </span>
        </div>

        <div className="bg-[#141416] p-6 rounded-xl border border-[#27272A] hover:border-[#D4AF37]/40 transition-colors">
          <Truck className="w-8 h-8 text-[#D4AF37] mb-4" />
          <h2 className="text-lg font-serif font-bold text-[#F4F4F0] mb-2">Livraison & Takeaway</h2>
          <p className="text-xs text-[#A1A1AA] leading-relaxed mb-4">
            Commandez vos plats et pizzas par WhatsApp pour livraison rapide ou à emporter.
          </p>
          <span className="text-[11px] font-semibold text-[#D4AF37] flex items-center gap-1">
            <Clock className="w-3 h-3" /> Service 24h/24
          </span>
        </div>
      </div>

      {/* Complete Interactive Menu Section */}
      <RestaurantMenu />
    </div>
  );
}
