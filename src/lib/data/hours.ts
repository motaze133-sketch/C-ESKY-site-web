export interface ServiceHour {
  id: string;
  name: string;
  hours: string;
  notes?: string;
  status: 'confirmed' | 'to_confirm';
}

export const OFFICIAL_HOURS: ServiceHour[] = [
  {
    id: 'piscine',
    name: 'Piscine & Espace VIP',
    hours: '10h00 – 19h00',
    notes: 'Maître-nageur présent sur place. Tenue de bain réglementaire obligatoire.',
    status: 'confirmed',
  },
  {
    id: 'pressing',
    name: 'Pressing & Laverie',
    hours: '09h00 – 19h00',
    notes: 'Service de nettoyage et soin du linge.',
    status: 'confirmed',
  },
  {
    id: 'shopping',
    name: 'Boutique & Shopping',
    hours: '09h00 – 20h00',
    notes: 'Sélection d’articles et accessoires.',
    status: 'confirmed',
  },
  {
    id: 'restaurant',
    name: 'Restaurant, Bar & Snack-bar',
    hours: '24h/24',
    notes: 'Service continu jour et nuit.',
    status: 'confirmed',
  },
  {
    id: 'hebergement',
    name: 'Hébergement',
    hours: '24h/24',
    notes: 'Réception et accueil permanents.',
    status: 'confirmed',
  },
  {
    id: 'pizzeria',
    name: 'Pizzeria & Livraison',
    hours: '24h/24',
    notes: 'Commande directe et livraison rapide.',
    status: 'confirmed',
  },
];
