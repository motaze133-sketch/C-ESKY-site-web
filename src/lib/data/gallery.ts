export interface GalleryItem {
  id: string;
  title: string;
  category: 'restaurant' | 'piscine' | 'hebergement' | 'loisirs' | 'evenements';
  categoryLabel: string;
  image: string;
  altText: string;
  caption: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Terrasse Panoramique Restaurant',
    category: 'restaurant',
    categoryLabel: 'Restaurant & Bar',
    image: '/images/restaurant-terrasse-orange.jpg',
    altText: 'Terrasse panoramique du restaurant C’ESKY avec chaises orange et suspensions en osier',
    caption: 'Atmosphère chaleureuse et vue dégagée pour vos déjeuners et dîners'
  },
  {
    id: 'gal-2',
    title: 'Grande Terrasse & Piscine en Journée',
    category: 'piscine',
    categoryLabel: 'Piscine & VIP',
    image: '/images/complexe-vue-d-ensemble.jpg',
    altText: 'Vue panoramique de la grande terrasse couverte et du bassin de la piscine à C’ESKY',
    caption: 'Espace restaurant couvert et piscine extérieure ouvert tous les jours'
  },
  {
    id: 'gal-3',
    title: 'Cabaret & Bar Lounge VIP',
    category: 'restaurant',
    categoryLabel: 'Restaurant & Bar',
    image: '/images/cabaret-vip-1.jpg',
    altText: 'Ambiance feutrée et éclairage LED bleu du cabaret VIP C’ESKY',
    caption: 'Cocktails signature et soirées exclusives dans un cadre feutré'
  },
  {
    id: 'gal-4',
    title: 'Piscine Extérieure de Nuit',
    category: 'piscine',
    categoryLabel: 'Piscine & VIP',
    image: '/images/piscine-nuit.jpg',
    altText: 'Bassin de la piscine C’ESKY illuminé de nuit avec l’enseigne C’ESKY RESTAURANT',
    caption: 'Ambiance nocturne féerique au bord de l’eau'
  },
  {
    id: 'gal-5',
    title: 'Chambre Confort Climatisée',
    category: 'hebergement',
    categoryLabel: 'Hébergement',
    image: '/images/chambre-hebergement.jpg',
    altText: 'Chambre avec lit double en bois massif, climatisation et literie soignée',
    caption: 'Sérénité, hygiène et confort optimal 24h/24'
  },
  {
    id: 'gal-6',
    title: 'Terrasse Lounge Bord de Piscine',
    category: 'restaurant',
    categoryLabel: 'Restaurant & Bar',
    image: '/images/restaurant-terrasse-piscine.jpg',
    altText: 'Banquettes lounge et tables au bord de la piscine avec plafond végétalisé',
    caption: 'Espace détente et restauration ombragé au bord du bassin'
  },
  {
    id: 'gal-7',
    title: 'Salon de Billard Américain',
    category: 'loisirs',
    categoryLabel: 'Loisirs',
    image: '/images/espace-billard.jpg',
    altText: 'Table de billard professionnel et salon en cuir au complexe C’ESKY',
    caption: 'Moments ludiques et détente entre amis 24h/24'
  },
  {
    id: 'gal-8',
    title: 'Boutique Prêt-à-Porter & Mode',
    category: 'loisirs',
    categoryLabel: 'Loisirs',
    image: '/images/boutique-mode-1.jpg',
    altText: 'Boutique de vêtements féminins et accessoires au sein du complexe C’ESKY',
    caption: 'Sélection mode, robes et tenues de créateurs (09h00 – 20h00)'
  },
  {
    id: 'gal-9',
    title: 'Rayon Maroquinerie & Chaussures',
    category: 'loisirs',
    categoryLabel: 'Loisirs',
    image: '/images/boutique-mode-2.jpg',
    altText: 'Étagères d’accessoires dorées avec sacs de luxe, talons et chapeaux',
    caption: 'Sacs à main haut de gamme et accessoires d’exception'
  },
  {
    id: 'gal-10',
    title: 'Atelier de Couture & Stylisme',
    category: 'evenements',
    categoryLabel: 'Services & Confection',
    image: '/images/atelier-couture.jpg',
    altText: 'Couturières et apprenties à l’œuvre dans l’atelier de confection C’ESKY',
    caption: 'Confection artisanale sur mesure et stylisme'
  },
  {
    id: 'gal-11',
    title: 'Station de Lavage Automobile',
    category: 'evenements',
    categoryLabel: 'Services & Confection',
    image: '/images/lavage-auto.jpg',
    altText: 'Lavage haute pression d’un véhicule au complexe C’ESKY',
    caption: 'Nettoyage intérieur et extérieur professionnel de véhicules'
  },
  {
    id: 'gal-12',
    title: 'Salon Lounge Cabaret & Événements',
    category: 'evenements',
    categoryLabel: 'Événements',
    image: '/images/cabaret-vip-2.jpg',
    altText: 'Grand salon VIP du cabaret C’ESKY sous lumière bleue',
    caption: 'Espace privatisable pour anniversaires et soirées VIP'
  },
  {
    id: 'gal-13',
    title: 'Espace VIP & Tables de Jeux',
    category: 'loisirs',
    categoryLabel: 'Loisirs',
    image: '/images/cabaret-vip-3.jpg',
    altText: 'Salon VIP avec banquettes confortables, tables damier et grand écran',
    caption: 'Espace convivial et détendu sous éclairage néon'
  },
  {
    id: 'gal-14',
    title: 'Pizzas Artisanales au Feu de Bois',
    category: 'restaurant',
    categoryLabel: 'Restaurant & Bar',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop',
    altText: 'Pizza artisanale fraîchement sortie du four garnie d’ingrédients de première fraîcheur',
    caption: 'Pizzas cuites au four traditionnel disponibles 24h/24'
  }
];
