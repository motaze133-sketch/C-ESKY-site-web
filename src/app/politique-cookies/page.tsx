import React from 'react';
import Link from 'next/link';
import { SectionTitle } from '@/components/common/SectionTitle';
import { COOKIE_INVENTORY } from '@/lib/data/legal';
import { Cookie, CheckCircle2, XCircle } from 'lucide-react';

export const metadata = {
  title: 'Politique de Cookies — Inventaire Technique C’ESKY',
  description: 'Inventaire réel des cookies et traceurs utilisés sur le site C’ESKY. Catégories, durées et paramétrage conforme Loi Cameroun 2024/017.',
};

export default function PolitiqueCookiesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 font-sans">
      <SectionTitle
        badge="Audit Technique des Traceurs"
        subtitle="Inventaire Réel"
        title="Politique d’Utilisation des Cookies"
        description="Transparence intégrale sur le fonctionnement des cookies présents sur notre plateforme."
      />

      <div className="bg-[#141416] p-8 rounded-xl border border-[#27272A] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#27272A] pb-4">
          <div className="flex items-center gap-2">
            <Cookie className="w-6 h-6 text-[#D4AF37] shrink-0" />
            <h2 className="text-lg font-serif font-bold text-[#F4F4F0]">Principe d’Opt-in Strict</h2>
          </div>
          <Link
            href="/gestion-consentement"
            className="w-full sm:w-auto text-center px-4 py-2 rounded-md bg-[#D4AF37] text-black font-bold text-xs hover:bg-[#C5A059] transition-all shrink-0"
          >
            Modifier mes préférences
          </Link>
        </div>

        <p className="text-xs text-[#A1A1AA] leading-relaxed">
          Le site C’ESKY n’active aucun tracker tiers à des fins publicitaires ou de profilage sans votre accord explicite préalable.
        </p>

        {/* Real Cookie Inventory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#27272A] text-[#F4F4F0] bg-[#0B0B0C]">
                <th className="p-3 font-semibold">Nom du Cookie</th>
                <th className="p-3 font-semibold">Domaine</th>
                <th className="p-3 font-semibold">Durée</th>
                <th className="p-3 font-semibold">Catégorie</th>
                <th className="p-3 font-semibold">Finalité</th>
                <th className="p-3 font-semibold">Consentement ?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272A] text-[#A1A1AA]">
              {COOKIE_INVENTORY.map((c, i) => (
                <tr key={i} className="hover:bg-[#1C1C20]">
                  <td className="p-3 font-mono font-bold text-[#D4AF37]">{c.name}</td>
                  <td className="p-3">{c.domain}</td>
                  <td className="p-3">{c.duration}</td>
                  <td className="p-3 uppercase text-[10px] font-semibold">{c.category}</td>
                  <td className="p-3">{c.purpose}</td>
                  <td className="p-3">
                    {c.requiresConsent ? (
                      <span className="inline-flex items-center gap-1 text-amber-400">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Requis
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-emerald-400">
                        <XCircle className="w-3.5 h-3.5" /> Exempté (Essentiel)
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
