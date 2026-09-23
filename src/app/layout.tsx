import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ClientLayout } from '@/components/layout/ClientLayout';
import { OFFICIAL_CONTACT_INFO, OFFICIAL_SOCIAL_LINKS } from '@/lib/data/legal';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: 'Complexe C’ESKY Officiel — Yaoundé | Restaurant, Piscine VIP, Hébergement & Loisirs',
    template: '%s | Complexe C’ESKY Officiel',
  },
  description:
    'Bien plus qu’un lieu, une expérience. Découvrez C’ESKY à Yaoundé (Quartier Éleveur) : restaurant gastronomique, bar lounge, piscine & VIP, hébergement de prestige, billard, pressing et événementiel.',
  keywords: [
    'Complexe C’ESKY',
    'C’ESKY Yaoundé',
    'C’ESKY Éleveur',
    'Restaurant C’ESKY',
    'Piscine VIP Yaoundé',
    'Hébergement de luxe Yaoundé',
    'Complexe multi-services Cameroun',
    'Loisirs et Billard Yaoundé',
    'Pizzeria 24h/24 Yaoundé',
    'Pressing et Laverie Éleveur',
    'Location espaces événements Yaoundé',
  ],
  authors: [{ name: 'Complexe C’ESKY Officiel' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Complexe C’ESKY Officiel — Yaoundé, Cameroun',
    description: '« Bien plus qu’un lieu, une expérience. » Gastronomie, piscine VIP, hébergement et détente haut de gamme au Quartier Éleveur.',
    url: 'https://cesky.com',
    siteName: 'Complexe C’ESKY Officiel',
    locale: 'fr_FR',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/images/logo.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <head>
        {/* Favicon & Apple Touch Icon officiels avec le logo C'ESKY */}
        <link rel="icon" type="image/png" href="/images/logo.png" />
        <link rel="shortcut icon" href="/images/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo.png" />

        {/* Schema.org LocalBusiness & Hospitality JSON-LD avec réseaux sociaux officiels */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': ['LocalBusiness', 'Restaurant', 'Hotel'],
              name: OFFICIAL_CONTACT_INFO.companyName,
              description: 'Complexe multi-services haut de gamme à Yaoundé : Restaurant, Bar, Piscine & Espace VIP, Hébergement, Billard, Shopping, Pressing, Pizzeria.',
              slogan: 'Bien plus qu’un lieu, une expérience.',
              telephone: OFFICIAL_CONTACT_INFO.officialPhone1,
              hasMap: OFFICIAL_CONTACT_INFO.googleMapsUrl,
              sameAs: [
                OFFICIAL_SOCIAL_LINKS.facebook,
                OFFICIAL_SOCIAL_LINKS.tiktok,
                OFFICIAL_SOCIAL_LINKS.findglocal,
                OFFICIAL_SOCIAL_LINKS.googleMaps,
              ],
              address: {
                '@type': 'PostalAddress',
                streetAddress: OFFICIAL_CONTACT_INFO.landmark,
                addressLocality: OFFICIAL_CONTACT_INFO.city,
                addressRegion: 'Centre',
                addressCountry: 'CM',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: OFFICIAL_CONTACT_INFO.geoCoordinates.latitude,
                longitude: OFFICIAL_CONTACT_INFO.geoCoordinates.longitude,
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                  opens: '00:00',
                  closes: '23:59',
                },
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Services du complexe C’ESKY',
                itemListElement: [
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Restaurant Gastronomique & Bar Lounge' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Piscine & Espace Piscine VIP (10h-19h)' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Hébergement & Séjour 24h/24' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pizzeria & Delivery 24h/24' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pressing & Laverie (09h-19h)' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Shopping & Boutique (09h-20h)' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Location d’Espaces Événementiels' } },
                ],
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#0B0B0C] text-[#F4F4F0] selection:bg-[#D4AF37] selection:text-black">
        {/* Accessible Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#D4AF37] focus:text-black focus:font-bold focus:rounded-md"
        >
          Aller au contenu principal
        </a>

        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

