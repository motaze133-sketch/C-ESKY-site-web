'use client';

import React from 'react';
import { MapPin, Navigation, Compass, ExternalLink } from 'lucide-react';
import { OFFICIAL_CONTACT_INFO } from '@/lib/data/legal';
import { GoogleMapsIcon } from '@/components/common/BrandIcons';
import { SectionTitle } from '@/components/common/SectionTitle';

interface MapSectionProps {
  className?: string;
  showSectionTitle?: boolean;
}

export const MapSection: React.FC<MapSectionProps> = ({
  className = '',
  showSectionTitle = true,
}) => {
  return (
    <section className={`space-y-8 font-sans ${className}`} id="localisation">
      {showSectionTitle && (
        <SectionTitle
          badge="Localisation & Plan d’Accès GPS"
          subtitle="Rendez-nous Visite au Quartier Éleveur"
          title="Où se Trouve le Complexe C’ESKY ?"
          description="Accédez facilement au complexe C’ESKY à Yaoundé. Utilisez la carte interactive ci-dessous ou ouvrez l’itinéraire direct dans Google Maps."
        />
      )}

      <div className="bg-[#141416] border border-[#27272A] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Info Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#27272A]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#F4F4F0]">
                Complexe C’ESKY Officiel
              </h3>
            </div>
            <p className="text-xs text-[#A1A1AA] flex items-center gap-1.5 pl-1">
              <span>{OFFICIAL_CONTACT_INFO.landmark}</span>
            </p>
            <p className="text-xs text-[#71717A] pl-1">
              📍 {OFFICIAL_CONTACT_INFO.fullAddress}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <a
              href={OFFICIAL_CONTACT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lancer l'itinéraire vers Complexe C'ESKY dans Google Maps"
              title="Ouvrir le GPS Google Maps"
              className="px-6 py-3 rounded-lg bg-[#D4AF37] text-black font-bold uppercase text-xs tracking-wider hover:bg-[#C5A059] hover:scale-105 transition-all shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2 group"
            >
              <GoogleMapsIcon size={16} className="group-hover:rotate-12 transition-transform" />
              <span>Ouvrir dans Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Embedded Interactive Map Canvas */}
        <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[450px] rounded-xl overflow-hidden border border-[#27272A] bg-[#0B0B0C] shadow-inner">
          <iframe
            title="Carte de géolocalisation GPS du Complexe C'ESKY à Yaoundé"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15922.9559388319!2d11.5587342!3d3.9016611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x108bcf7c3b28b6d3%3A0x6b63d7eb387bd520!2sComplexe%20Cesky!5e0!3m2!1sfr!2scm!4v1711000000000!5m2!1sfr!2scm"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />

          {/* Quick Floating Directions Badge */}
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-[#0B0B0C]/90 backdrop-blur-md border border-[#27272A] p-3 rounded-lg text-xs space-y-1 shadow-xl">
            <div className="flex items-center gap-1.5 font-semibold text-[#D4AF37]">
              <Navigation className="w-3.5 h-3.5" />
              <span>Accès Facile & Repères</span>
            </div>
            <p className="text-[11px] text-[#A1A1AA] leading-snug">
              À 100m de la station Tradex Éleveur (lieu-dit Dépôt de sable Éleveur). Parking sécurisé gratuit sur place.
            </p>
          </div>
        </div>

        {/* Repères complémentaires */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="bg-[#0B0B0C] p-3.5 rounded-lg border border-[#27272A] space-y-1">
            <span className="font-semibold text-[#F4F4F0] block">🚗 En Voiture / Taxi</span>
            <span className="text-[#A1A1AA] text-[11px] block">Indiquer « Tradex Éleveur » au chauffeur. Entrée à 100m sur la droite.</span>
          </div>

          <div className="bg-[#0B0B0C] p-3.5 rounded-lg border border-[#27272A] space-y-1">
            <span className="font-semibold text-[#F4F4F0] block">🅿️ Parking V.I.P</span>
            <span className="text-[#A1A1AA] text-[11px] block">Espace de stationnement surveillé 24h/24 réservé aux clients du complexe.</span>
          </div>

          <div className="bg-[#0B0B0C] p-3.5 rounded-lg border border-[#27272A] space-y-1">
            <span className="font-semibold text-[#F4F4F0] block">📞 Assistance Accès</span>
            <span className="text-[#A1A1AA] text-[11px] block">Un souci pour trouver ? Appelez la conciergerie au <strong className="text-[#D4AF37]">{OFFICIAL_CONTACT_INFO.officialPhone1}</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
};
