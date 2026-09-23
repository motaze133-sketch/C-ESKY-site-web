import React from 'react';
import { SectionTitle } from '@/components/common/SectionTitle';
import { LEGAL_PLACEHOLDERS } from '@/lib/data/legal';

export const metadata = {
  title: 'Conditions Générales d’Utilisation — C’ESKY',
  description: 'Conditions d’utilisation du site web du complexe C’ESKY. Propriété intellectuelle, responsabilités et règles d’accès.',
};

export default function ConditionsUtilisationPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 font-sans text-xs text-[#A1A1AA] leading-relaxed">
      <SectionTitle
        badge="Conditions d’Accès"
        subtitle="Cadre Contractuel"
        title="Conditions Générales d’Utilisation (CGU)"
      />

      <div className="bg-[#141416] p-8 rounded-xl border border-[#27272A] space-y-6">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#F4F4F0] uppercase tracking-wider">1. Objet du Site</h2>
          <p>
            Le site web C’ESKY a pour objet de présenter les activités du complexe multi-services (Restaurant, Bar, Piscine VIP, Hébergement, Billard, Shopping, Pressing, Événements) et de faciliter les demandes de contact et de réservation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#F4F4F0] uppercase tracking-wider">2. Propriété Intellectuelle</h2>
          <p>
            L’ensemble des contenus présents sur le site (textes, photographies, éléments graphiques, logo, univers visuel) sont la propriété exclusive de C’ESKY ou de ses ayants droit. Toute reproduction sans autorisation préalable est strictement interdite.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#F4F4F0] uppercase tracking-wider">3. Responsabilité & Disponibilité</h2>
          <p>
            C’ESKY s’efforce de maintenir le site accessible 24h/24. Toutefois, l’accès peut être temporairement interrompu pour des raisons de maintenance ou d’amélioration technique sans préavis.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#F4F4F0] uppercase tracking-wider">4. Droit Applicable & Juridiction</h2>
          <p>
            Les présentes CGU sont régies par le droit en vigueur en République du Cameroun. En cas de différend non résolu à l’amiable, les tribunaux camerounais compétents seront seuls saisis.
          </p>
        </section>
      </div>
    </div>
  );
}
