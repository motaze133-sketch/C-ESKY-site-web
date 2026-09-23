import React from 'react';
import Link from 'next/link';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Calendar, MessageSquare, Users, Sparkles, Building, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Location d’Espaces & Événements — C’ESKY',
  description: 'Privatisation d’espaces d’exception pour vos événements privés, réceptions, mariages et réunions professionnelles à C’ESKY.',
};

export default function EvenementsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <SectionTitle
        badge="Privatisation & Événements"
        subtitle="Sur Mesure"
        title="Organisez Vos Moments D’Exception à C’ESKY"
        description="Nos espaces élégants et modulables s’adaptent à la réussite de tous vos rassemblements familiaux, mariages, anniversaires et événements d’entreprise."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#141416] p-8 rounded-xl border border-[#27272A] space-y-4">
          <Sparkles className="w-8 h-8 text-[#D4AF37]" />
          <h2 className="text-xl font-serif font-bold text-[#F4F4F0]">Événements Privés</h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            Mariages, anniversaires, banquets familiaux, soirées VIP au bord de la piscine. Nos équipes élaborent avec vous un service traiteur et un aménagement sur mesure.
          </p>
          <ul className="space-y-2 text-xs text-[#71717A]">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Espace Piscine VIP privatisable
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Service traiteur gastronomique dédié
            </li>
          </ul>
        </div>

        <div className="bg-[#141416] p-8 rounded-xl border border-[#27272A] space-y-4">
          <Building className="w-8 h-8 text-[#D4AF37]" />
          <h2 className="text-xl font-serif font-bold text-[#F4F4F0]">Rencontres Professionnelles</h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            Cocktails d’entreprise, déjeuners d’affaires, séminaires et lancements de produits dans un cadre contemporain et valorisant pour votre image.
          </p>
          <ul className="space-y-2 text-xs text-[#71717A]">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Cadre feutré et sécurisé
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Restauration 24h/24 et hébergement sur place
            </li>
          </ul>
        </div>
      </div>

      {/* Strict Placeholder Notice for Event Capacities */}
      <div className="bg-[#141416] border border-[#27272A] rounded-2xl p-8 sm:p-10 space-y-4">
        <h3 className="text-lg font-serif font-bold text-[#F4F4F0]">
          Capacités & Devis Sur Mesure
        </h3>
        <p className="text-sm text-[#A1A1AA] leading-relaxed">
          Chaque événement faisant l’objet d’une étude personnalisée, les jauges de capacité exacte et les grilles tarifaires de privatisation vous seront communiquées sur demande.
        </p>

        <div className="font-mono text-xs text-[#D4AF37] bg-[#0B0B0C] p-4 rounded border border-[#27272A]">
          [CAPACITÉS MAXIMALES ET DEVIS ÉVÉNEMENTIEL À CONFIRMER PAR LA DIRECTION]
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <Link
            href="/reservation"
            className="w-full sm:w-auto px-6 py-3.5 rounded-md bg-[#D4AF37] text-black font-bold uppercase text-xs tracking-wider hover:bg-[#C5A059] transition-all flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Organiser mon événement</span>
          </Link>

          <Link
            href="/contact#whatsapp"
            className="w-full sm:w-auto px-6 py-3.5 rounded-md bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 font-semibold text-xs hover:bg-[#25D366]/20 transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Discuter avec le responsable événements</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
