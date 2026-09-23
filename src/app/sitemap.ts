import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cesky.com'; // [DOMAINE OFFICIEL À CONFIRMER]

  const routes = [
    '',
    '/services',
    '/restaurant',
    '/piscine',
    '/hebergement',
    '/loisirs',
    '/evenements',
    '/galerie',
    '/contact',
    '/reservation',
    '/politique-confidentialite',
    '/conditions-utilisation',
    '/politique-cookies',
    '/gestion-consentement',
    '/politique-remboursement',
    '/mentions-legales',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
