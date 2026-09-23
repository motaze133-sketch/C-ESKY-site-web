import React from 'react';
import Link from 'next/link';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Waves, ShieldCheck, Clock, AlertTriangle, Calendar, MessageSquare, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Piscine & Espace VIP (10h00 – 19h00) — C’ESKY',
  description: 'Détendez-vous au bord de la piscine C’ESKY et du Carré VIP. Bassin sécurisé avec maître-nageur de 10h00 à 19h00. Tenue de bain obligatoire.',
};

export default function PiscinePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <SectionTitle
        badge="Espace Aquatique & VIP"
        subtitle="Détente & Sérénité"
        title="Piscine Extérieure & Carré VIP C’ESKY"
        description="Profitez d’une expérience rafraîchissante et privilégiée dans un cadre sécurisé et verdoyant."
      />

      {/* Authentic Photo Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative h-64 md:h-72 rounded-2xl overflow-hidden border border-[#27272A] group shadow-xl">
          <img
            src="/images/complexe-vue-d-ensemble.jpg"
            alt="Vue panoramique de la terrasse couverte et de la piscine C’ESKY"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">Vue en Journée</span>
            <p className="text-sm font-serif font-bold text-[#F4F4F0]">Bassin Cristallin & Terrasse Couverte</p>
          </div>
        </div>

        <div className="relative h-64 md:h-72 rounded-2xl overflow-hidden border border-[#27272A] group shadow-xl">
          <img
            src="/images/piscine-nuit.jpg"
            alt="Bassin de la piscine C’ESKY illuminé de nuit"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">Ambiance Nocturne</span>
            <p className="text-sm font-serif font-bold text-[#F4F4F0]">Piscine Illuminée & Enseigne Restaurant</p>
          </div>
        </div>

        <div className="relative h-64 md:h-72 rounded-2xl overflow-hidden border border-[#27272A] group shadow-xl">
          <img
            src="/images/restaurant-terrasse-piscine.jpg"
            alt="Carré VIP et salon lounge au bord de la piscine C’ESKY"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">Espace VIP Bord de l’Eau</span>
            <p className="text-sm font-serif font-bold text-[#F4F4F0]">Banquettes Lounge & Détente Ombragée</p>
          </div>
        </div>
      </div>

      {/* Official Opening Hours & Safety Banner */}
      <div className="bg-[#141416] border border-[#27272A] rounded-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs uppercase font-semibold text-[#A1A1AA]">Horaires d’Ouverture</span>
            <p className="text-2xl font-serif font-bold text-[#D4AF37]">10h00 – 19h00</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs uppercase font-semibold text-[#A1A1AA]">Sécurité Assurée</span>
            <p className="text-sm font-semibold text-[#F4F4F0]">Maître-Nageur qualifié sur place</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs uppercase font-semibold text-[#A1A1AA]">Espace Privilégié</span>
            <p className="text-sm font-semibold text-[#F4F4F0]">Carré VIP réservable</p>
          </div>
        </div>
      </div>

      {/* Regulations & Swimwear Rules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#141416] p-8 rounded-xl border border-[#27272A] space-y-4">
          <h2 className="text-xl font-serif font-bold text-[#F4F4F0] flex items-center gap-2">
            <Waves className="w-5 h-5 text-[#D4AF37]" />
            <span>Règlement Intérieur de la Piscine</span>
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            Afin d’assurer la sécurité, l’hygiène et la sérénité de l’ensemble de nos visiteurs, le respect strict des consignes est exigé :
          </p>
          <ul className="space-y-3 text-xs text-[#F4F4F0]">
            <li className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] mt-1.5 shrink-0" />
              <span><strong>Tenue de bain réglementaire obligatoire</strong> (maillot de bain adapté). Accès strictement refusé sans tenue conforme.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] mt-1.5 shrink-0" />
              <span>Douche obligatoire avant toute immersion dans le bassin.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] mt-1.5 shrink-0" />
              <span>Surveillance obligatoire des enfants par leurs parents ou accompagnateurs majeurs.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] mt-1.5 shrink-0" />
              <span>Respect du calme et de l’espace détente des autres usagers.</span>
            </li>
          </ul>
        </div>

        <div className="bg-[#141416] p-8 rounded-xl border border-[#27272A] space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-serif font-bold text-[#F4F4F0] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              <span>Espace Piscine VIP & Tarifs</span>
            </h2>
            <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">
              Pour vos événements intimes, anniversaires ou moments de détente exclusive, privatisez le carré VIP piscine avec service de boissons et encas dédiés.
            </p>

            <div className="bg-[#0B0B0C] p-4 rounded border border-[#27272A] text-xs font-mono text-[#D4AF37]">
              [TARIFS ET MODALITÉS VIP À FOURNIR PAR LA DIRECTION]
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <Link
              href="/reservation"
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#C5A059] transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Réserver l’Espace VIP</span>
            </Link>

            <Link
              href="/contact#whatsapp"
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 font-semibold text-xs transition-all hover:bg-[#25D366]/20"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Renseignements Piscine</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
