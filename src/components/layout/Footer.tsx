import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ShieldCheck, ExternalLink } from 'lucide-react';
import { OFFICIAL_HOURS } from '@/lib/data/hours';
import { OFFICIAL_CONTACT_INFO, OFFICIAL_SOCIAL_LINKS } from '@/lib/data/legal';
import { SITE_CONFIG } from '@/lib/data/siteConfig';
import { FacebookIcon, TikTokIcon, WhatsAppIcon, GoogleMapsIcon, FindGlocalIcon } from '@/components/common/BrandIcons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B0B0C] border-t border-[#27272A] text-[#A1A1AA] pt-16 pb-12 font-sans" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#27272A]">
          {/* Col 1: Brand & Identity & Social networks */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-[#D4AF37]/30 bg-black group-hover:border-[#D4AF37] transition-colors shrink-0 shadow-lg flex items-center justify-center p-0.5">
                <img
                  src={SITE_CONFIG.logo}
                  alt="Logo Complexe C’ESKY"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-serif text-3xl font-bold tracking-widest text-[#F4F4F0] group-hover:text-[#D4AF37] transition-colors">
                C’ESKY
              </span>
            </Link>
            <p className="text-sm text-[#D4AF37] italic font-serif">
              « Bien plus qu’un lieu, une expérience. »
            </p>
            <p className="text-xs text-[#71717A] leading-relaxed">
              Complexe d’exception à Yaoundé réunissant gastronomie, piscine VIP, hébergement de prestige, loisirs et événements dans une atmosphère contemporaine et raffinée.
            </p>

            {/* Official Social Links */}
            <div className="pt-2 space-y-2">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-[#D4AF37]">
                Réseaux Officiels & Communauté
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={OFFICIAL_SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Rejoindre C’ESKY sur Facebook"
                  title="Consulter la page Facebook officielle C’ESKY"
                  className="px-3 py-1.5 rounded bg-[#1877F2]/10 border border-[#1877F2]/30 text-[#1877F2] hover:bg-[#1877F2]/20 hover:scale-105 text-xs font-semibold flex items-center gap-2 transition-all group"
                >
                  <FacebookIcon size={14} className="group-hover:rotate-6 transition-transform" />
                  <span>Facebook</span>
                </a>

                <a
                  href={OFFICIAL_SOCIAL_LINKS.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Suivre C’ESKY sur TikTok"
                  title="Regarder les vidéos TikTok officielles C’ESKY"
                  className="px-3 py-1.5 rounded bg-[#FE2C55]/10 border border-[#FE2C55]/30 text-[#FE2C55] hover:bg-[#FE2C55]/20 hover:scale-105 text-xs font-semibold flex items-center gap-2 transition-all group"
                >
                  <TikTokIcon size={14} className="group-hover:rotate-6 transition-transform" />
                  <span>TikTok</span>
                </a>

                <a
                  href={OFFICIAL_SOCIAL_LINKS.findglocal}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Découvrir C’ESKY sur FindGlocal"
                  title="Voir la fiche FindGlocal C’ESKY"
                  className="px-3 py-1.5 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/20 hover:scale-105 text-xs font-semibold flex items-center gap-2 transition-all group"
                >
                  <FindGlocalIcon size={14} className="group-hover:rotate-6 transition-transform" />
                  <span>FindGlocal</span>
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={OFFICIAL_CONTACT_INFO.whatsAppDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Contacter le secrétariat sur WhatsApp"
                className="inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366]/20 hover:border-[#25D366]/60 transition-all group"
              >
                <WhatsAppIcon size={16} className="group-hover:scale-110 transition-transform" />
                <span>WhatsApp Direct ({OFFICIAL_CONTACT_INFO.officialWhatsApp})</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation rapide */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#F4F4F0] mb-4 border-l-2 border-[#D4AF37] pl-2">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-[#D4AF37] transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#D4AF37] transition-colors">
                  Tous les Services (12)
                </Link>
              </li>
              <li>
                <Link href="/restaurant" className="hover:text-[#D4AF37] transition-colors">
                  Restaurant, Bar & Pizzeria
                </Link>
              </li>
              <li>
                <Link href="/piscine" className="hover:text-[#D4AF37] transition-colors">
                  Piscine & Espace VIP
                </Link>
              </li>
              <li>
                <Link href="/hebergement" className="hover:text-[#D4AF37] transition-colors">
                  Hébergement & Séjour
                </Link>
              </li>
              <li>
                <Link href="/loisirs" className="hover:text-[#D4AF37] transition-colors">
                  Billard & Shopping
                </Link>
              </li>
              <li>
                <Link href="/evenements" className="hover:text-[#D4AF37] transition-colors">
                  Événements & Privatisation
                </Link>
              </li>
              <li>
                <Link href="/galerie" className="hover:text-[#D4AF37] transition-colors">
                  Galerie Photos
                </Link>
              </li>
              <li>
                <Link href="/reservation" className="hover:text-[#D4AF37] transition-colors">
                  Demande de Réservation
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Horaires Officiels */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#F4F4F0] mb-4 border-l-2 border-[#D4AF37] pl-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Horaires Officiels</span>
            </h3>
            <ul className="space-y-2 text-xs">
              {OFFICIAL_HOURS.map((h) => (
                <li key={h.id} className="flex justify-between border-b border-[#1C1C20] pb-1.5">
                  <span className="text-[#A1A1AA]">{h.name}</span>
                  <span className="text-[#F4F4F0] font-semibold">{h.hours}</span>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-[#71717A] mt-3 italic">
              * Maître-nageur présent à la piscine. Tenue de bain réglementaire obligatoire.
            </p>
          </div>

          {/* Col 4: Contact & Localisation Réelle Google Maps */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#F4F4F0] mb-4 border-l-2 border-[#D4AF37] pl-2">
              Coordonnées & Accès
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[#F4F4F0] font-medium">Adresse Officielle</span>
                  <span className="text-[#A1A1AA]">{OFFICIAL_CONTACT_INFO.fullAddress}</span>
                  <a
                    href={OFFICIAL_CONTACT_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ouvrir la fiche Google Maps officielle C'ESKY"
                    title="Ouvrir dans Google Maps"
                    className="inline-flex items-center gap-1.5 text-[11px] text-[#D4AF37] hover:underline mt-1 transition-colors group"
                  >
                    <GoogleMapsIcon size={14} className="group-hover:scale-110 transition-transform" />
                    <span>Fiche Google Maps Officielle</span>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[#F4F4F0] font-medium">Téléphones</span>
                  <span className="text-[#A1A1AA]">{OFFICIAL_CONTACT_INFO.officialPhone1}</span>
                  <span className="block text-[#71717A] text-[11px]">{OFFICIAL_CONTACT_INFO.officialPhone2}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[#F4F4F0] font-medium">Email Officiel</span>
                  <span className="text-[#71717A] break-all">{OFFICIAL_CONTACT_INFO.officialEmail}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#1C1C20] flex items-center gap-1.5 text-[11px] text-[#D4AF37]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Protection des Données (Loi N°2024/017 Cameroun)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Legal Sub-bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#71717A] gap-4">
          <p>© {new Date().getFullYear()} Complexe C’ESKY Officiel. Tous droits réservés.</p>

          <nav className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs" aria-label="Liens légaux">
            <Link href="/mentions-legales" className="hover:text-[#D4AF37] transition-colors">
              Mentions Légales
            </Link>
            <Link href="/politique-confidentialite" className="hover:text-[#D4AF37] transition-colors">
              Politique de Confidentialité
            </Link>
            <Link href="/conditions-utilisation" className="hover:text-[#D4AF37] transition-colors">
              Conditions d’Utilisation
            </Link>
            <Link href="/politique-cookies" className="hover:text-[#D4AF37] transition-colors">
              Politique de Cookies
            </Link>
            <Link href="/gestion-consentement" className="hover:text-[#D4AF37] transition-colors">
              Gérer mes Cookies
            </Link>
            <Link href="/politique-remboursement" className="hover:text-[#D4AF37] transition-colors">
              Remboursement
            </Link>
          </nav>
        </div>

        {/* Credit line — Réalisé par M&N */}
        <div className="pt-4 flex justify-center">
          <a
            href="https://wa.me/237653260268?text=Bonjour%20M%26N%2C%20je%20vous%20contacte%20depuis%20le%20site%20web%20Complexe%20C%E2%80%99ESKY."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] text-[#52525B] hover:text-[#25D366] transition-colors group"
            aria-label="Contacter M&N sur WhatsApp"
          >
            <span>Réalisé par</span>
            <span className="font-semibold text-[#71717A] group-hover:text-[#25D366] transition-colors">M&amp;N</span>
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3.5 h-3.5 text-[#52525B] group-hover:text-[#25D366] transition-colors"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};
