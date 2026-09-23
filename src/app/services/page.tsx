import React from 'react';
import Link from 'next/link';
import { SectionTitle } from '@/components/common/SectionTitle';
import { SERVICES_DATA } from '@/lib/data/services';
import { Clock, ArrowUpRight, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Tous les Services — C’ESKY Complexe Multi-Services',
  description: 'Découvrez nos 12 prestations d’exception : Restaurant, Bar, Snack, Pizzeria, Piscine & VIP, Hébergement, Billard, Shopping, Pressing, Laverie, Livraison et Événements.',
};

export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <SectionTitle
        badge="Catalogue Complète"
        subtitle="Diversité & Cohérence"
        title="L’Écosystème de Services C’ESKY"
        description="Chaque pôle de notre complexe vous accueille avec le même niveau d’exigence, de sécurité et d’authenticité afropolitaine."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES_DATA.map((service) => (
          <div
            key={service.id}
            id={service.slug}
            className="bg-[#141416] rounded-xl border border-[#27272A] overflow-hidden hover:border-[#D4AF37]/60 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.altText}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-transparent to-transparent opacity-80" />

                {service.badge && (
                  <span className="absolute top-3 left-3 bg-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                    {service.badge}
                  </span>
                )}

                <span className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-[#F4F4F0] text-xs font-semibold px-2.5 py-1 rounded border border-[#3F3F46] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {service.hours}
                </span>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-serif font-bold text-[#F4F4F0] mb-2 group-hover:text-[#D4AF37] transition-colors">
                  {service.title}
                </h2>
                <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">
                  {service.fullDescription}
                </p>

                <div className="border-t border-[#27272A] pt-4 mt-4">
                  <h3 className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
                    Points forts
                  </h3>
                  <ul className="space-y-1.5 text-xs text-[#71717A]">
                    {service.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 pt-0">
              <Link
                href={service.ctaLink}
                className="w-full inline-flex items-center justify-between py-3 px-4 rounded-md bg-[#1C1C20] border border-[#3F3F46] text-xs font-bold text-[#F4F4F0] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
              >
                <span>{service.ctaText}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
