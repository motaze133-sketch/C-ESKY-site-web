import React from 'react';
import Link from 'next/link';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Bed, Clock, ShieldCheck, Calendar, MessageSquare, AlertCircle, Wifi, Coffee } from 'lucide-react';

export const metadata = {
  title: 'Hébergement & Séjour 24h/24 — C’ESKY',
  description: 'Des chambres et suites modernes pensées pour le repos, le confort et la sécurité. Réception permanente 24h/24.',
};

export default function HebergementPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <SectionTitle
        badge="Confort & Sérénité"
        subtitle="Séjour 24h/24"
        title="Hébergement de Standing C’ESKY"
        description="Nos chambres sont conçues pour offrir un cadre calme, propre et parfaitement équipé aux professionnels, voyageurs et familles."
      />

      {/* Authentic Room Showcase */}
      <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-[#27272A] group shadow-2xl">
        <img
          src="/images/chambre-hebergement.jpg"
          alt="Chambre climatisée avec lit en bois massif au complexe C’ESKY"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded bg-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-wider mb-2">
              Confort & Intimité
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#F4F4F0]">
              Chambres Climatisées Tout Confort
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-xl mt-1">
              Lit deux places en bois massif, literie soignée, climatisation split, ventilateur de plafond et salle d’eau privative pour un séjour paisible 24h/24.
            </p>
          </div>
          <Link
            href="/reservation"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#C5A059] transition-all shrink-0"
          >
            <Calendar className="w-4 h-4" />
            <span>Réserver une Chambre</span>
          </Link>
        </div>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#141416] p-6 rounded-xl border border-[#27272A]">
          <Clock className="w-8 h-8 text-[#D4AF37] mb-4" />
          <h2 className="text-lg font-serif font-bold text-[#F4F4F0] mb-2">Accueil 24h/24</h2>
          <p className="text-xs text-[#A1A1AA] leading-relaxed">
            Arrivée et enregistrement possibles à toute heure du jour et de la nuit.
          </p>
        </div>

        <div className="bg-[#141416] p-6 rounded-xl border border-[#27272A]">
          <ShieldCheck className="w-8 h-8 text-[#D4AF37] mb-4" />
          <h2 className="text-lg font-serif font-bold text-[#F4F4F0] mb-2">Sécurité & Propreté</h2>
          <p className="text-xs text-[#A1A1AA] leading-relaxed">
            Un protocole d’hygiène rigoureux et un accès sécurisé permanent au complexe.
          </p>
        </div>

        <div className="bg-[#141416] p-6 rounded-xl border border-[#27272A]">
          <Coffee className="w-8 h-8 text-[#D4AF37] mb-4" />
          <h2 className="text-lg font-serif font-bold text-[#F4F4F0] mb-2">Services Associés</h2>
          <p className="text-xs text-[#A1A1AA] leading-relaxed">
            Accès direct au restaurant 24h/24, pressing, laverie, piscine et boutique.
          </p>
        </div>
      </div>

      {/* Room Categories Architecture & Official Placeholders */}
      <div className="bg-[#141416] border border-[#27272A] rounded-2xl p-8 sm:p-10 space-y-6">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-[#D4AF37]" />
          <h2 className="text-xl font-serif font-bold text-[#F4F4F0]">
            Catégories de Chambres & Grille Tarifaire
          </h2>
        </div>

        <p className="text-sm text-[#A1A1AA] leading-relaxed">
          Pour préserver l’intégrité des informations, les détails des équipements spécifiques, typologies de chambres, capacités et tarifs officiels seront mis à jour dès validation par la direction.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#0B0B0C] p-5 rounded-lg border border-[#27272A] space-y-2">
            <h3 className="text-sm font-semibold text-[#F4F4F0]">Chambres Standby / Confort</h3>
            <div className="font-mono text-xs text-[#D4AF37]">
              [DÉTAILS & TARIFS À FOURNIR PAR LA DIRECTION]
            </div>
          </div>

          <div className="bg-[#0B0B0C] p-5 rounded-lg border border-[#27272A] space-y-2">
            <h3 className="text-sm font-semibold text-[#F4F4F0]">Suites VIP / Executives</h3>
            <div className="font-mono text-xs text-[#D4AF37]">
              [DÉTAILS & TARIFS À FOURNIR PAR LA DIRECTION]
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <Link
            href="/reservation"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#C5A059] transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Faire une demande d’Hébergement</span>
          </Link>

          <Link
            href="/contact#whatsapp"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 font-semibold text-xs hover:bg-[#25D366]/20 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Disponibilités sur WhatsApp</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
