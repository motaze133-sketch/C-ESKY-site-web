export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: 'restauration' | 'detente' | 'hebergement' | 'loisirs' | 'services';
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  ctaText: string;
  ctaLink: string;
  image: string;
  hours: string;
  badge?: string;
  altText: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'restaurant',
    slug: 'restaurant',
    title: 'Restaurant Gastronomique',
    category: 'restauration',
    shortDescription: 'Cuisine raffinée contemporaine et saveurs authentiques dans un cadre élégant.',
    fullDescription: 'Le restaurant C’ESKY propose une expérience culinaire de premier ordre alliant tradition afropolitaine et gastronomie internationale contemporaine. Un cadre sophistiqué idéal pour vos déjeuners d’affaires et dîners d’exception sur notre terrasse panoramique.',
    highlights: ['Service continu 24h/24', 'Cadre chic et feutré', 'Ingrédients frais sélectionnés'],
    ctaText: 'Découvrir le Restaurant',
    ctaLink: '/restaurant',
    image: '/images/restaurant-terrasse-orange.jpg',
    hours: '24h/24',
    badge: 'Incontournable',
    altText: 'Terrasse panoramique du restaurant C’ESKY avec suspensions en osier et vue dégagée'
  },
  {
    id: 'bar-lounge',
    slug: 'bar-lounge',
    title: 'Bar & Cabaret VIP Lounge',
    category: 'restauration',
    shortDescription: 'Cocktails créatifs, spiritueux d’exception et ambiance musicale feutrée.',
    fullDescription: 'Un espace lounge et cabaret haut de gamme pour vous détendre ou réseauter autour d’une sélection exigeante de boissons et créations signature sous un éclairage d’ambiance bleu nuit.',
    highlights: ['Cocktails signature', 'Ambiance lounge exclusive', 'Espace cabaret & réseautage VIP'],
    ctaText: 'Explorer le Bar',
    ctaLink: '/restaurant#bar',
    image: '/images/cabaret-vip-1.jpg',
    hours: '24h/24',
    badge: 'Nightlife Élégante',
    altText: 'Cabaret et salon lounge VIP du complexe C’ESKY illuminé de bleu néon'
  },
  {
    id: 'snack-bar',
    slug: 'snack-bar',
    title: 'Snack-Bar & Terrasse Piscine',
    category: 'restauration',
    shortDescription: 'Plats rapides gourmands et encas savoureux à toute heure au bord de l’eau.',
    fullDescription: 'Idéal pour une pause gourmande rapide sans compromis sur la fraîcheur et la qualité des recettes, installé confortablement sur nos banquettes au bord de la piscine.',
    highlights: ['Service rapide', 'Encas savoureux', 'Disponible 24h/24'],
    ctaText: 'Voir les Encas',
    ctaLink: '/restaurant#snack',
    image: '/images/restaurant-terrasse-piscine.jpg',
    hours: '24h/24',
    altText: 'Terrasse lounge et snack-bar au bord de la piscine du complexe C’ESKY'
  },
  {
    id: 'pizzeria',
    slug: 'pizzeria',
    title: 'Pizzeria Artisanale',
    category: 'restauration',
    shortDescription: 'Pizzas artisanales cuites au four avec ingrédients frais de première qualité.',
    fullDescription: 'Une sélection de pizzas gourmandes élaborées avec une pâte pétrie sur place et garnies d’ingrédients soigneusement sélectionnés.',
    highlights: ['Pâte artisanale', 'Cuisson traditionnelle', 'Disponible sur place & livraison'],
    ctaText: 'Commandes Pizzeria',
    ctaLink: '/restaurant#pizzeria',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop',
    hours: '24h/24',
    altText: 'Pizza artisanale fraîchement préparée et dorée au four à C’ESKY'
  },
  {
    id: 'piscine',
    slug: 'piscine',
    title: 'Piscine & Espace Détente',
    category: 'detente',
    shortDescription: 'Bassin rafraîchissant, terrasse spacieuse et ambiance resort urbain.',
    fullDescription: 'Profitez d’un bassin extérieur dans un cadre sécurisé et verdoyant au cœur du complexe. Un lieu de détente privilégié en pleine journée.',
    highlights: ['Maître-nageur qualifié sur place', 'Transats et salon lounge', 'Tenue de bain réglementaire'],
    ctaText: 'Découvrir la Piscine',
    ctaLink: '/piscine',
    image: '/images/complexe-vue-d-ensemble.jpg',
    hours: '10h00 – 19h00',
    badge: 'Relaxation',
    altText: 'Vue panoramique de la piscine cristalline et de la grande terrasse couverte à C’ESKY'
  },
  {
    id: 'piscine-vip',
    slug: 'piscine-vip',
    title: 'Espace Piscine VIP & Nocturne',
    category: 'detente',
    shortDescription: 'Cadre VIP exclusif et bassin illuminé pour moments d’exception en toute confidentialité.',
    fullDescription: 'Pour une expérience sur mesure, l’espace piscine VIP offre un service personnalisé au bord de la piscine illuminée dans une atmosphère féerique et préservée.',
    highlights: ['Espace réservé et intimiste', 'Éclairage nocturne spectaculaire', 'Cadre d’exception'],
    ctaText: 'Réserver l’Espace VIP',
    ctaLink: '/piscine#vip',
    image: '/images/piscine-nuit.jpg',
    hours: '10h00 – 19h00',
    badge: 'Exclusive',
    altText: 'Piscine du complexe C’ESKY illuminée de nuit avec l’enseigne du restaurant'
  },
  {
    id: 'hebergement',
    slug: 'hebergement',
    title: 'Hébergement & Séjour',
    category: 'hebergement',
    shortDescription: 'Chambres et suites élégantes pensées pour le confort, le repos et la sérénité.',
    fullDescription: 'C’ESKY met à disposition des hébergements soigneusement aménagés avec literie haut de gamme et climatisation pour vos séjours professionnels ou de loisirs, garantissant calme, propreté et sécurité.',
    highlights: ['Climatisation & confort optimal', 'Service de chambre permanent', 'Accès direct aux infrastructures'],
    ctaText: 'Découvrir l’Hébergement',
    ctaLink: '/hebergement',
    image: '/images/chambre-hebergement.jpg',
    hours: '24h/24',
    badge: 'Confort Premium',
    altText: 'Chambre climatisée avec lit en bois massif et literie soignée au complexe C’ESKY'
  },
  {
    id: 'billard',
    slug: 'billard',
    title: 'Espace Billard & Jeux',
    category: 'loisirs',
    shortDescription: 'Tables de billard professionnelles dans une ambiance chaleureuse et ludique.',
    fullDescription: 'Pour vos moments d’amusement entre amis ou collègues, profitez d’un espace de jeu convivial équipé de tables d’excellente facture et de salons en cuir confortables.',
    highlights: ['Tables entretenues', 'Salon lounge dédié', 'Service boisson à proximité'],
    ctaText: 'Explorer les Loisirs',
    ctaLink: '/loisirs#billard',
    image: '/images/espace-billard.jpg',
    hours: '24h/24',
    altText: 'Espace billard américain avec salon en cuir au complexe C’ESKY'
  },
  {
    id: 'shopping',
    slug: 'shopping',
    title: 'Boutique & Shopping de Mode',
    category: 'loisirs',
    shortDescription: 'Sélection de vêtements de créateurs, sacs de luxe, chaussures et accessoires.',
    fullDescription: 'La boutique de prêt-à-porter C’ESKY vous propose des articles haut de gamme soigneusement sélectionnés : robes d’apparat, tenues chics, sacs à main et accessoires raffinés.',
    highlights: ['Articles tendance & créateurs', 'Horaires pratiques 09h-20h', 'Accueil personnalisé'],
    ctaText: 'Visiter la Boutique',
    ctaLink: '/loisirs#shopping',
    image: '/images/boutique-mode-1.jpg',
    hours: '09h00 – 20h00',
    altText: 'Boutique de prêt-à-porter et maroquinerie au sein du complexe C’ESKY'
  },
  {
    id: 'pressing-laverie',
    slug: 'pressing-laverie',
    title: 'Atelier de Couture & Confection',
    category: 'services',
    shortDescription: 'Stylisme sur mesure, confection artisanale et retouches professionnelles.',
    fullDescription: 'Notre atelier de couture et confection met à votre service des stylistes et couturières expérimentées pour la confection de vos tenues sur mesure, cérémonies et retouches express.',
    highlights: ['Confection sur mesure', 'Savoir-faire artisanal', 'Horaires 09h-19h'],
    ctaText: 'En savoir plus sur l’Atelier',
    ctaLink: '/services#couture',
    image: '/images/atelier-couture.jpg',
    hours: '09h00 – 19h00',
    altText: 'Atelier de couture et confection avec couturières à l’œuvre au complexe C’ESKY'
  },
  {
    id: 'lavage-auto',
    slug: 'lavage-auto',
    title: 'Lavage Automobile Haute Pression',
    category: 'services',
    shortDescription: 'Nettoyage intérieur et extérieur professionnel pour véhicules légers et 4x4.',
    fullDescription: 'Profitez de votre passage au complexe ou de votre baignade pour confier votre véhicule à notre équipe de lavage haute pression pour un nettoyage impeccable.',
    highlights: ['Lavage haute pression', 'Nettoyage intérieur soigné', 'Service rapide pendant votre séjour'],
    ctaText: 'Découvrir le Lavage',
    ctaLink: '/services#lavage',
    image: '/images/lavage-auto.jpg',
    hours: '08h00 – 19h00',
    badge: 'Nouveau',
    altText: 'Station de lavage automobile haute pression au complexe C’ESKY'
  },
  {
    id: 'livraison',
    slug: 'livraison',
    title: 'Livraison de Repas',
    category: 'restauration',
    shortDescription: 'Vos plats et pizzas préférés livrés rapidement chez vous ou au bureau.',
    fullDescription: 'Savourez la cuisine de C’ESKY où que vous soyez grâce à notre service de livraison réactif.',
    highlights: ['Emballage isotherme de qualité', 'Suivi de commande', 'Service continu'],
    ctaText: 'Commander à Livrer',
    ctaLink: '/restaurant#livraison',
    image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=1200&auto=format&fit=crop',
    hours: '24h/24',
    altText: 'Livraison rapide et soignée de repas frais commandés chez C’ESKY'
  },
  {
    id: 'location-espaces',
    slug: 'location-espaces',
    title: 'Location d’Espaces & Soirées VIP',
    category: 'services',
    shortDescription: 'Privatisation d’espaces pour mariages, anniversaires et soirées de prestige.',
    fullDescription: 'C’ESKY met ses espaces raffinés et son cabaret VIP à disposition pour la réussite de vos rassemblements professionnels ou réceptions privées.',
    highlights: ['Espaces intérieurs et extérieurs', 'Ambiance VIP privatisable', 'Accompagnement dédié'],
    ctaText: 'Organiser mon Événement',
    ctaLink: '/evenements',
    image: '/images/cabaret-vip-2.jpg',
    hours: 'Sur réservation',
    badge: 'Privatisation',
    altText: 'Salon VIP du cabaret C’ESKY privatisable pour réceptions et événements'
  }
];
