import { OFFICIAL_CONTACT_INFO, OFFICIAL_SOCIAL_LINKS } from './legal';

export interface ContextualWhatsAppLink {
  key: 'general' | 'reservation' | 'piscine' | 'hebergement' | 'evenement' | 'restaurant' | 'loisirs' | 'pressing';
  label: string;
  message: string;
  url: string;
}

const buildWhatsAppUrl = (message: string) => {
  const cleanPhone = OFFICIAL_CONTACT_INFO.officialWhatsApp.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};

export const SITE_CONFIG = {
  name: OFFICIAL_CONTACT_INFO.companyName,
  tagline: 'Bien plus qu’un lieu, une expérience.',
  city: OFFICIAL_CONTACT_INFO.city,
  neighborhood: OFFICIAL_CONTACT_INFO.neighborhood,
  fullAddress: OFFICIAL_CONTACT_INFO.fullAddress,
  phone1: OFFICIAL_CONTACT_INFO.officialPhone1,
  phone2: OFFICIAL_CONTACT_INFO.officialPhone2,
  whatsappNumber: OFFICIAL_CONTACT_INFO.officialWhatsApp,
  email: OFFICIAL_CONTACT_INFO.officialEmail,
  logo: '/images/logo.png',
  googleMapsUrl: OFFICIAL_CONTACT_INFO.googleMapsUrl,
  social: OFFICIAL_SOCIAL_LINKS,

  whatsappMessages: {
    general: {
      label: 'Informations Générales',
      message: 'Bonjour C’ESKY, je souhaiterais obtenir des informations.',
      url: buildWhatsAppUrl('Bonjour C’ESKY, je souhaiterais obtenir des informations.'),
    },
    reservation: {
      label: 'Réservation',
      message: 'Bonjour C’ESKY, je souhaiterais effectuer une réservation.',
      url: buildWhatsAppUrl('Bonjour C’ESKY, je souhaiterais effectuer une réservation.'),
    },
    piscine: {
      label: 'Piscine & VIP',
      message: 'Bonjour C’ESKY, je souhaiterais avoir des informations concernant la piscine.',
      url: buildWhatsAppUrl('Bonjour C’ESKY, je souhaiterais avoir des informations concernant la piscine.'),
    },
    hebergement: {
      label: 'Hébergement',
      message: 'Bonjour C’ESKY, je souhaiterais avoir des informations concernant l\'hébergement.',
      url: buildWhatsAppUrl('Bonjour C’ESKY, je souhaiterais avoir des informations concernant l\'hébergement.'),
    },
    evenement: {
      label: 'Événements & Privatisation',
      message: 'Bonjour C’ESKY, je souhaiterais organiser un événement dans votre établissement.',
      url: buildWhatsAppUrl('Bonjour C’ESKY, je souhaiterais organiser un événement dans votre établissement.'),
    },
    restaurant: {
      label: 'Restaurant & Table',
      message: 'Bonjour C’ESKY, je souhaiterais réserver une table ou commander à manger.',
      url: buildWhatsAppUrl('Bonjour C’ESKY, je souhaiterais réserver une table ou commander à manger.'),
    },
    loisirs: {
      label: 'Billard & Shopping',
      message: 'Bonjour C’ESKY, je souhaiterais des informations sur le billard ou la boutique.',
      url: buildWhatsAppUrl('Bonjour C’ESKY, je souhaiterais des informations sur le billard ou la boutique.'),
    },
    pressing: {
      label: 'Pressing & Laverie',
      message: 'Bonjour C’ESKY, je souhaiterais déposer du linge au pressing / laverie.',
      url: buildWhatsAppUrl('Bonjour C’ESKY, je souhaiterais déposer du linge au pressing / laverie.'),
    },
  },

  getWhatsAppLink: (customMessage?: string) => {
    return buildWhatsAppUrl(customMessage || 'Bonjour C’ESKY, je souhaiterais obtenir des informations.');
  },
};

