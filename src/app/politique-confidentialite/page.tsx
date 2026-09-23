import React from 'react';
import Link from 'next/link';
import { SectionTitle } from '@/components/common/SectionTitle';
import { CAMEROON_LAW_DATA_MAPPING, OFFICIAL_CONTACT_INFO } from '@/lib/data/legal';
import { ShieldCheck, FileText, Lock, UserCheck, AlertTriangle } from 'lucide-react';

export const metadata = {
  title: 'Politique de Confidentialité — Protection des Données au Cameroun',
  description: 'Conformité à la Loi Camerounaise n°2024/017 du 23 décembre 2024 relative à la protection des données à caractère personnel. Traitements, durées de conservation et droits des personnes.',
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 font-sans">
      <SectionTitle
        badge="Conformité Légale Cameroun"
        subtitle="Transparence & Privacy-by-Design"
        title="Politique de Protection des Données Personnelles"
        description="Cette politique détaille les engagements du complexe C’ESKY conformément à la Loi n°2024/017 du 23 décembre 2024 relative à la protection des données à caractère personnel au Cameroun."
      />

      <div className="bg-[#141416] p-6 rounded-xl border border-[#D4AF37]/30 flex items-start gap-4">
        <ShieldCheck className="w-8 h-8 text-[#D4AF37] shrink-0 mt-1" />
        <div className="text-xs text-[#A1A1AA] leading-relaxed space-y-2">
          <p className="font-semibold text-[#F4F4F0]">
            Cadre de Référence Central : {OFFICIAL_CONTACT_INFO.cameroonianLawRef}
          </p>
          <p>
            C’ESKY applique le principe de minimisation des données (Data Minimization by Design). Aucune donnée n’est collectée à votre insu ni cédée à des tiers à des fins commerciales sans votre consentement explicite.
          </p>
        </div>
      </div>

      {/* 1. Responsable du Traitement */}
      <section className="bg-[#141416] p-8 rounded-xl border border-[#27272A] space-y-4">
        <h2 className="text-lg font-serif font-bold text-[#F4F4F0] border-b border-[#27272A] pb-3">
          1. Identité du Responsable du Traitement
        </h2>
        <div className="text-xs text-[#A1A1AA] space-y-2 leading-relaxed">
          <p><strong>Entité :</strong> {OFFICIAL_CONTACT_INFO.companyName} ({OFFICIAL_CONTACT_INFO.legalForm})</p>
          <p><strong>Responsable désigné :</strong> {OFFICIAL_CONTACT_INFO.dataControllerName}</p>
          <p><strong>Siège social :</strong> {OFFICIAL_CONTACT_INFO.fullAddress}</p>
          <p><strong>Email de contact Vie Privée :</strong> {OFFICIAL_CONTACT_INFO.dataProtectionOfficerEmail}</p>
        </div>
      </section>

      {/* 2. Tableau Réel des Traitements de Données */}
      <section className="space-y-6">
        <h2 className="text-xl font-serif font-bold text-[#F4F4F0] flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#D4AF37]" />
          <span>2. Registre Synthétique des Traitements du Site</span>
        </h2>

        <div className="space-y-6">
          {CAMEROON_LAW_DATA_MAPPING.map((item, idx) => (
            <div key={idx} className="bg-[#141416] p-6 rounded-xl border border-[#27272A] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#27272A] pb-3">
                <h3 className="text-sm font-bold text-[#D4AF37]">{item.treatmentName}</h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#27272A] text-[#F4F4F0]">
                  Consentement requis : {item.requiresConsent ? 'OUI' : 'NON (Obligation légale / Intérêt légitime)'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#A1A1AA]">
                <div>
                  <span className="block font-semibold text-[#F4F4F0]">Finalité :</span>
                  <p>{item.purpose}</p>
                </div>

                <div>
                  <span className="block font-semibold text-[#F4F4F0]">Données collectées :</span>
                  <p>{item.dataCollected.join(', ')}</p>
                </div>

                <div>
                  <span className="block font-semibold text-[#F4F4F0]">Base Juridique :</span>
                  <p>{item.legalBasis}</p>
                </div>

                <div>
                  <span className="block font-semibold text-[#F4F4F0]">Durée de Conservation :</span>
                  <p>{item.retentionPeriod}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#1C1C20] text-[11px] text-[#71717A]">
                <strong>Mesures de sécurité :</strong> {item.securityMeasures}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Droits des Personnes Concernées (Loi 2024/017) */}
      <section className="bg-[#141416] p-8 rounded-xl border border-[#27272A] space-y-4">
        <h2 className="text-lg font-serif font-bold text-[#F4F4F0] flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-[#D4AF37]" />
          <span>3. Exercice des Droits des Utilisateurs</span>
        </h2>
        <p className="text-xs text-[#A1A1AA] leading-relaxed">
          Conformément au cadre réglementaire camerounais, tout utilisateur dispose des droits suivants sur ses données personnelles :
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#F4F4F0]">
          <li className="p-3 bg-[#0B0B0C] rounded border border-[#27272A]">
            <strong>Droit d’Accès & d’Information :</strong> Obtenir la confirmation et la communication des données traitées.
          </li>
          <li className="p-3 bg-[#0B0B0C] rounded border border-[#27272A]">
            <strong>Droit de Rectification :</strong> Corriger toute donnée inexact ou incomplète.
          </li>
          <li className="p-3 bg-[#0B0B0C] rounded border border-[#27272A]">
            <strong>Droit à l’Effacement (Oubli) :</strong> Demander la suppression des données non requises par la loi.
          </li>
          <li className="p-3 bg-[#0B0B0C] rounded border border-[#27272A]">
            <strong>Retrait du Consentement :</strong> Révoker à tout moment votre accord pour les communications commerciales.
          </li>
        </ul>
        <p className="text-xs text-[#A1A1AA] pt-2">
          Pour exercer vos droits, adressez votre demande à : <span className="text-[#D4AF37]">{OFFICIAL_CONTACT_INFO.dataProtectionOfficerEmail}</span>
        </p>
      </section>

      {/* Date de mise à jour */}
      <div className="text-xs text-[#71717A] text-center border-t border-[#27272A] pt-6">
        Dernière mise à jour : {OFFICIAL_CONTACT_INFO.lastUpdated}
      </div>
    </div>
  );
}
