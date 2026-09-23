import React from 'react';
import { SectionTitle } from '@/components/common/SectionTitle';

export const metadata = {
  title: 'Politique de Remboursement & Annulation — C’ESKY',
  description: 'Modalités d’annulation et d’acompte relatives aux réservations et prestations du complexe C’ESKY.',
};

export default function PolitiqueRemboursementPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 font-sans text-xs text-[#A1A1AA] leading-relaxed">
      <SectionTitle
        badge="Politique Commerciale"
        subtitle="Réservations & Acomptes"
        title="Politique de Remboursement & Annulation"
      />

      <div className="bg-[#141416] p-8 rounded-xl border border-[#27272A] space-y-6">
        <div className="bg-[#0B0B0C] p-4 rounded border border-[#27272A] font-mono text-xs text-[#D4AF37]">
          [CETTE SECTION SERA PUBLIÉE LORSQUE LES CONDITIONS COMMERCIALES OFFICIELLES ET CONDITIONS D’ACOMPTE AURONT ÉTÉ VALIDÉES PAR LA DIRECTION DE C’ESKY]
        </div>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#F4F4F0] uppercase tracking-wider">Demandes de Modification de Réservation</h2>
          <p>
            Pour toute demande d’annulation, de report ou de modification de votre demande de réservation (Hébergement, Espace Piscine VIP ou Privatisation Événementielle), nous vous invitons à contacter directement notre service clientèle par téléphone ou WhatsApp.
          </p>
        </section>
      </div>
    </div>
  );
}
