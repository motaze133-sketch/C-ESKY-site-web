import React from 'react';
import { SectionTitle } from '@/components/common/SectionTitle';
import { OFFICIAL_CONTACT_INFO } from '@/lib/data/legal';

export const metadata = {
  title: 'Mentions Légales — C’ESKY Complexe Multi-Services',
  description: 'Mentions légales, éditeur du site, hébergeur et propriété intellectuelle du complexe C’ESKY à Yaoundé.',
};

export default function MentionsLegalesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 font-sans text-xs text-[#A1A1AA] leading-relaxed">
      <SectionTitle
        badge="Informations Légales"
        subtitle="Éditeur & Hébergeur"
        title="Mentions Légales du Site C’ESKY"
      />

      <div className="bg-[#141416] p-8 rounded-xl border border-[#27272A] space-y-6">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#F4F4F0] uppercase tracking-wider">1. Éditeur du Site</h2>
          <p><strong>Nom du complexe :</strong> {OFFICIAL_CONTACT_INFO.companyName}</p>
          <p><strong>Forme juridique :</strong> {OFFICIAL_CONTACT_INFO.legalForm}</p>
          <p><strong>Capital Social :</strong> {OFFICIAL_CONTACT_INFO.capital}</p>
          <p><strong>Numéro RCCM :</strong> {OFFICIAL_CONTACT_INFO.rccm}</p>
          <p><strong>Numéro Identifiant Unique (NIU) :</strong> {OFFICIAL_CONTACT_INFO.niu}</p>
          <p><strong>Siège social :</strong> {OFFICIAL_CONTACT_INFO.fullAddress}</p>
          <p><strong>Contact Téléphonique :</strong> {OFFICIAL_CONTACT_INFO.officialPhone1} / {OFFICIAL_CONTACT_INFO.officialPhone2}</p>
          <p><strong>Email Officiel :</strong> {OFFICIAL_CONTACT_INFO.officialEmail}</p>
        </section>

        <section className="space-y-2 border-t border-[#27272A] pt-4">
          <h2 className="text-sm font-bold text-[#F4F4F0] uppercase tracking-wider">2. Directeur de la Publication</h2>
          <p><strong>Directeur de la publication :</strong> {OFFICIAL_CONTACT_INFO.dataControllerName}</p>
        </section>

        <section className="space-y-2 border-t border-[#27272A] pt-4">
          <h2 className="text-sm font-bold text-[#F4F4F0] uppercase tracking-wider">3. Hébergement du Site</h2>
          <p><strong>Prestataire d’hébergement :</strong> {OFFICIAL_CONTACT_INFO.hostingProvider}</p>
        </section>

        <section className="space-y-2 border-t border-[#27272A] pt-4">
          <h2 className="text-sm font-bold text-[#F4F4F0] uppercase tracking-wider">4. Cadre Réglementaire Camerounais</h2>
          <p>
            Ce site est exploité en conformité avec les textes législatifs applicables en République du Cameroun relatifs aux communications électroniques, au commerce électronique, à la cybersécurité et à la protection des données personnelles ({OFFICIAL_CONTACT_INFO.cameroonianLawRef}).
          </p>
        </section>
      </div>
    </div>
  );
}
