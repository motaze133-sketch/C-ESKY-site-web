import React from 'react';
import Link from 'next/link';
import { SectionTitle } from '@/components/common/SectionTitle';
import { ShoppingBag, Sparkles, Clock, MessageSquare, Calendar } from 'lucide-react';

export const metadata = {
  title: 'Loisirs, Billard & Shopping — C’ESKY',
  description: 'Divertissez-vous dans notre espace billard convivial et visitez la boutique officielle C’ESKY (ouverte de 09h00 à 20h00).',
};

export default function LoisirsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <SectionTitle
        badge="Divertissement & Shopping"
        subtitle="Expérience Complémentaire"
        title="Billard & Boutique C’ESKY"
        description="Découvrez des espaces ludiques et élégants intégrés au sein de notre complexe pour enrichir vos moments de détente."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Billard Section */}
        <div id="billard" className="bg-[#141416] rounded-2xl border border-[#27272A] overflow-hidden flex flex-col justify-between shadow-xl">
          <div className="relative h-60 w-full overflow-hidden">
            <img
              src="/images/espace-billard.jpg"
              alt="Espace billard américain au complexe C’ESKY"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-transparent to-transparent" />
            <span className="absolute top-4 left-4 bg-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded">
              Loisirs & Détente
            </span>
          </div>
          <div className="p-8 space-y-4">
            <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#F4F4F0]">Espace Billard Américain</h2>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              Profitez d’une véritable table de billard américain installée dans un cadre convivial avec banquettes en cuir et service boisson. Idéal pour vos parties entre amis ou moments de détente.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#D4AF37] flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>Accessible 24h/24 selon disponibilité</span>
            </div>
          </div>
        </div>

        {/* Shopping Section */}
        <div id="shopping" className="bg-[#141416] rounded-2xl border border-[#27272A] overflow-hidden flex flex-col justify-between shadow-xl">
          <div className="relative h-60 w-full overflow-hidden">
            <img
              src="/images/boutique-mode-1.jpg"
              alt="Boutique de prêt-à-porter au complexe C’ESKY"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-transparent to-transparent" />
            <span className="absolute top-4 left-4 bg-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded">
              Mode & Prêt-à-Porter
            </span>
          </div>
          <div className="p-8 space-y-4">
            <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#F4F4F0]">Boutique & Shopping</h2>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              La boutique de prêt-à-porter C’ESKY vous propose une sélection exclusive d’articles de mode : robes de créateurs, sacs à main de marque, talons hauts et accessoires tendance.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#D4AF37] flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>Horaire Officiel : 09h00 – 20h00</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link
          href="/contact#whatsapp"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 font-semibold text-xs hover:bg-[#25D366]/20 transition-all"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Contacter la boutique ou réserver une table de billard</span>
        </Link>
      </div>
    </div>
  );
}
