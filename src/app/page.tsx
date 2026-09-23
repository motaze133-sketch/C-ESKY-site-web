import React from 'react';
import Link from 'next/link';
import {
  Calendar,
  MessageSquare,
  ChevronRight,
  Clock,
  Shield,
  Utensils,
  Waves,
  Bed,
  ArrowUpRight
} from 'lucide-react';
import { SectionTitle } from '@/components/common/SectionTitle';
import { AnchorNav } from '@/components/common/AnchorNav';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { SERVICES_DATA } from '@/lib/data/services';
import { OFFICIAL_HOURS } from '@/lib/data/hours';
import { GALLERY_ITEMS } from '@/lib/data/gallery';
import { ReviewsSection } from '@/components/reviews/ReviewsSection';
import { MapSection } from '@/components/common/MapSection';
import { SITE_CONFIG } from '@/lib/data/siteConfig';

export default function HomePage() {
  const homeAnchors = [
    { id: 'experience', label: 'L’Expérience' },
    { id: 'services-overview', label: '12 Services' },
    { id: 'horaires', label: 'Horaires' },
    { id: 'galerie', label: 'Galerie' },
    { id: 'avis', label: 'Avis Clients' },
    { id: 'contact-rapide', label: 'Contact' },
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION IMMERSIVE */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-[#27272A]">
        {/* Hero Background Image with Balanced Overlay & Responsive Positioning */}
        <div className="absolute inset-0 z-0 bg-[#0B0B0C]">
          <img
            src="/images/complexe-vue-d-ensemble.jpg"
            alt="Vue immersive et panoramique de la terrasse restaurant et de la piscine du complexe C’ESKY à Yaoundé"
            className="w-full h-full object-cover object-[center_35%] sm:object-[center_45%] lg:object-[center_50%] transition-all duration-500"
          />
          {/* Translucent overlay maintaining clear visibility of pool, terrace, and decorations */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/45 to-black/35" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12 pb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/50 mb-6 backdrop-blur-md shadow-xl">
            Complexe Multi-Services Premium — Yaoundé
          </span>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#F4F4F0] tracking-tight leading-tight mb-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            C’ESKY
          </h1>

          <p className="text-xl sm:text-2xl lg:text-3xl font-serif italic text-[#D4AF37] mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            « Bien plus qu’un lieu, une expérience. »
          </p>

          <p className="text-base sm:text-lg text-[#F4F4F0]/90 max-w-3xl mx-auto mb-10 leading-relaxed font-sans font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
            Le point de rencontre privilégié au Quartier Éleveur (Yaoundé) réunissant Gastronomie haute couture, Bar Lounge feutré, Piscine & Espace VIP, Hébergement de standing, Billard, Shopping et Services du quotidien.
          </p>

          {/* 3 Main Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
            <Link
              href="#services-overview"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-[#1C1C20] text-[#F4F4F0] border border-[#3F3F46] font-semibold text-sm hover:bg-[#27272A] hover:border-[#D4AF37] transition-all"
            >
              <span>Découvrir C’ESKY</span>
              <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
            </Link>

            <Link
              href="/reservation"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-[#D4AF37] text-black font-bold text-sm uppercase tracking-wider hover:bg-[#C5A059] transition-all shadow-lg shadow-[#D4AF37]/20"
            >
              <Calendar className="w-4 h-4" />
              <span>Réserver</span>
            </Link>

            <a
              href={SITE_CONFIG.whatsappMessages.general.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 font-semibold text-sm hover:bg-[#25D366]/20 transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </section>

      {/* Navigation Rapide par Ancres */}
      <AnchorNav items={homeAnchors} />


      {/* 2. L'EXPÉRIENCE C'ESKY (NARRATION VISUELLE) */}
      <section id="experience" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <ScrollReveal>
          <SectionTitle
            badge="Univers de Marque"
            subtitle="Hospitality & Art de Vivre"
            title="Une Harmonie Parfaite Entre Détente, Gastronomie et Prestige"
            description="C’ESKY réinvente le complexe urbain moderne. Chaque espace a été pensé pour offrir une parenthèse d’exception aux VIP, professionnels, familles et passionnés d’expériences de qualité."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <ScrollReveal delay={100}>
            <div className="bg-[#141416] p-8 rounded-xl border border-[#27272A] hover:border-[#D4AF37]/50 transition-all group h-full">
              <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#F4F4F0] mb-3">
                Gastronomie & Nuit
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Du restaurant gastronomique à la pizzeria artisanale et au snack-bar convivial, dégustez une offre culinaire diversifiée servie 24h/24.
              </p>
              <Link
                href="/restaurant#menu-complet"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] hover:underline mt-4 group-hover:translate-x-0.5 transition-transform"
              >
                <span>Consulter la carte & tarifs</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="bg-[#141416] p-8 rounded-xl border border-[#27272A] hover:border-[#D4AF37]/50 transition-all group h-full">
              <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Waves className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#F4F4F0] mb-3">
                Piscine & Espace VIP
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Un cadre aquatique d’exception surveillé de 10h à 19h avec maître-nageur et carré VIP réservé pour une intimité préservée.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="bg-[#141416] p-8 rounded-xl border border-[#27272A] hover:border-[#D4AF37]/50 transition-all group h-full">
              <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bed className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#F4F4F0] mb-3">
                Hébergement & Sérénité
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Des espaces de séjour contemporains et impeccablement entretenus pour des nuits paisibles et un service attentionné jour et nuit.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. VUE D'ENSEMBLE DES SERVICES (12 SERVICES) */}
      <section id="services-overview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <ScrollReveal>
          <SectionTitle
            badge="Nos 12 Prestations"
            subtitle="Une Palette Complète"
            title="Tous les Services du Complexe C’ESKY"
            description="Une organisation fluide et des espaces indépendants pour répondre à toutes vos envies à toute heure."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {SERVICES_DATA.map((service, index) => (
            <ScrollReveal key={service.id} delay={(index % 3) * 100}>
              <div className="bg-[#141416] rounded-xl border border-[#27272A] overflow-hidden hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col justify-between group h-full">
                <div>
                  <div className="relative h-72 sm:h-80 overflow-hidden bg-[#0B0B0C] flex items-center justify-center">
                    {/* Ambient blurred backdrop so there are no harsh empty borders */}
                    <img
                      src={service.image}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-110"
                    />
                    {/* Full sharp uncropped image */}
                    <img
                      src={service.image}
                      alt={service.altText}
                      className="relative z-10 w-full h-full object-contain p-2 group-hover:scale-[1.02] transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#141416] via-transparent to-transparent opacity-60 pointer-events-none" />

                    {service.badge && (
                      <span className="absolute top-3 left-3 z-20 bg-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-md">
                        {service.badge}
                      </span>
                    )}

                    <span className="absolute bottom-3 right-3 z-20 bg-black/85 backdrop-blur-md text-[#F4F4F0] text-xs font-semibold px-2.5 py-1 rounded border border-[#3F3F46] flex items-center gap-1 shadow-md">
                      <Clock className="w-3 h-3 text-[#D4AF37]" />
                      {service.hours}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-[#F4F4F0] mb-2 group-hover:text-[#D4AF37] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">
                      {service.shortDescription}
                    </p>

                    <ul className="space-y-1.5 mb-6 text-xs text-[#71717A]">
                      {service.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <Link
                    href={service.ctaLink}
                    className="w-full inline-flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#F4F4F0] group-hover:text-[#D4AF37] py-2 border-t border-[#27272A] pt-4 transition-colors"
                  >
                    <span>{service.ctaText}</span>
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 4. SECTION HORAIRES OFFICIELS CONFIRMÉS */}
      <section id="horaires" className="bg-[#141416] border-y border-[#27272A] py-16 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] border-b border-[#D4AF37] pb-1">
                  Disponibilité & Réglementation
                </span>
                <h2 className="text-3xl font-serif font-bold text-[#F4F4F0]">
                  Des Horaires Adaptés à Vos Exigences
                </h2>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  Le complexe C’ESKY adapte les horaires d’ouverture de chaque pôle pour assurer votre sécurité, le confort de vos proches et un service irréprochable.
                </p>
                <div className="p-4 bg-[#0B0B0C] rounded-lg border border-[#27272A] text-xs space-y-2">
                  <p className="font-semibold text-[#D4AF37] flex items-center gap-1.5">
                    <Shield className="w-4 h-4" />
                    Sécurité Piscine
                  </p>
                  <p className="text-[#A1A1AA]">
                    Un maître-nageur professionnel est présent en permanence pendant toute l’ouverture du bassin (10h00 - 19h00). L’accès requiert obligatoirement une tenue de bain réglementaire.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {OFFICIAL_HOURS.map((h) => (
                  <div
                    key={h.id}
                    className="bg-[#0B0B0C] p-5 rounded-lg border border-[#27272A] flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-sm font-semibold text-[#F4F4F0] mb-1">{h.name}</h3>
                      <p className="text-xl font-serif font-bold text-[#D4AF37] mb-2">{h.hours}</p>
                    </div>
                    {h.notes && <p className="text-[11px] text-[#71717A] italic">{h.notes}</p>}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. APERÇU GALERIE PHOTOS */}
      <section id="galerie" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                Galerie Immersive
              </span>
              <h2 className="text-3xl font-serif font-bold text-[#F4F4F0] mt-1">
                Plongez dans le Cadre C’ESKY
              </h2>
            </div>
            <Link
              href="/galerie"
              className="mt-4 md:mt-0 text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:underline flex items-center gap-1"
            >
              <span>Voir toute la galerie</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.slice(0, 6).map((item, index) => (
            <ScrollReveal key={item.id} delay={(index % 3) * 100}>
              <div className="relative h-64 rounded-xl overflow-hidden group border border-[#27272A]">
                <img
                  src={item.image}
                  alt={item.altText}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4 text-[#F4F4F0]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">
                    {item.categoryLabel}
                  </span>
                  <h3 className="text-base font-serif font-bold">{item.title}</h3>
                  <p className="text-xs text-[#A1A1AA] line-clamp-1">{item.caption}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 6. SECTION AVIS CLIENTS (CAROUSEL & FORMULAIRE CONFORME) */}
      <div id="avis" className="scroll-mt-28">
        <ScrollReveal>
          <ReviewsSection />
        </ScrollReveal>
      </div>

      {/* 6.5. MAP & ACCES GPS */}
      <section id="plan-acces" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <ScrollReveal>
          <MapSection />
        </ScrollReveal>
      </section>

      {/* 7. CTA ET CONVERSION FINALE */}
      <section id="contact-rapide" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <ScrollReveal>
          <div className="bg-gradient-to-r from-[#141416] via-[#1A1A20] to-[#141416] rounded-2xl p-8 sm:p-12 border border-[#D4AF37]/30 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[#D4AF37]/20 text-[#D4AF37] mb-4">
                Une Question ? Une Réservation ?
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F4F4F0] mb-4">
                Vivez l’Expérience C’ESKY Dès Aujourd’hui
              </h2>
              <p className="text-sm text-[#A1A1AA] mb-8 leading-relaxed">
                Que ce soit pour une table au restaurant, une journée à la piscine VIP, un hébergement ou l’organisation d’un événement privé, nos équipes sont à votre entière disposition.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/reservation"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-md bg-[#D4AF37] text-black font-bold uppercase text-xs tracking-wider hover:bg-[#C5A059] transition-all shadow-lg active:scale-95"
                >
                  Effectuer une demande de réservation
                </Link>
                <a
                  href={SITE_CONFIG.whatsappMessages.general.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-md bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/40 font-semibold text-xs transition-all hover:bg-[#25D366]/25 active:scale-95 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 fill-current text-[#25D366]" />
                  <span>Parler avec un conseiller sur WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

