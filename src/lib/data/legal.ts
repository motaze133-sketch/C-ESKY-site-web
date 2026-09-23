export interface DataProcessingItem {
  treatmentName: string;
  purpose: string;
  dataCollected: string[];
  justification: string;
  legalBasis: string;
  recipients: string;
  subprocessors: string;
  retentionPeriod: string;
  securityMeasures: string;
  requiresConsent: boolean;
}

export const CAMEROON_LAW_DATA_MAPPING: DataProcessingItem[] = [
  {
    treatmentName: 'Demande de Contact Général',
    purpose: 'Répondre aux questions, demandes d’information ou renseignements sur le complexe C’ESKY.',
    dataCollected: ['Nom', 'Numéro de téléphone / WhatsApp', 'Adresse e-mail (optionnel)', 'Type de demande', 'Message'],
    justification: 'Indispensable pour identifier l’émetteur de la demande et lui transmettre une réponse adaptée.',
    legalBasis: 'Exécution de mesures précontractuelles prises à la demande de la personne concernée / Intérêt légitime.',
    recipients: 'Service Réception et Clientèle du complexe C’ESKY.',
    subprocessors: 'Hébergeur du site web (serveurs sécurisés).',
    retentionPeriod: 'Conservé uniquement pendant le temps nécessaire au traitement de la demande puis archivé [À VALIDER JURIDIQUEMENT].',
    securityMeasures: 'Chiffrement des flux HTTPS (TLS 1.3), contrôle d’accès strict, sanitisation des données entrantes.',
    requiresConsent: true,
  },
  {
    treatmentName: 'Demande de Réservation (Hébergement, Table, Piscine VIP, Événements)',
    purpose: 'Enregistrer, organiser et confirmer la prise en charge des demandes de réservation au sein des services.',
    dataCollected: ['Nom', 'Numéro de téléphone / WhatsApp', 'Email', 'Service concerné', 'Date et heure souhaitées', 'Nombre de personnes', 'Précisions'],
    justification: 'Nécessaire pour vérifier la disponibilité des espaces, organiser le service et recontacter le client.',
    legalBasis: 'Mesures précontractuelles et exécution du contrat de réservation.',
    recipients: 'Responsable de la réservation et direction opérationnelle C’ESKY.',
    subprocessors: 'Hébergeur Web et service d’infrastructure.',
    retentionPeriod: 'Durée de la gestion de la réservation + durée légale de conservation des preuves comptables [À VALIDER JURIDIQUEMENT].',
    securityMeasures: 'Stockage sécurisé, accès restreint aux seuls personnels habilités.',
    requiresConsent: true,
  },
  {
    treatmentName: 'Gestion des Consentements Cookies & Mesure d’Audience',
    purpose: 'Mémoriser le choix de l’utilisateur concernant le dépôt de cookies et mesurer l’audience de manière anonymisée.',
    dataCollected: ['Statut du consentement (opt-in/opt-out)', 'Horodatage de la décision', 'Identifiant aléatoire de session non nominatif'],
    justification: 'Permet d’assurer la conformité légale et d’adapter le dépôt de scripts non essentiels.',
    legalBasis: 'Obligation légale (Loi n°2024/017 du 23 décembre 2024 relative à la protection des données personnelles au Cameroun).',
    recipients: 'Administrateur technique du site C’ESKY.',
    subprocessors: 'Aucun sous-traitant tiers non validé.',
    retentionPeriod: 'Durée maximale de 6 à 12 mois à compter du choix de l’utilisateur.',
    securityMeasures: 'Stockage local sécurisé (LocalStorage / Cookie First-Party), aucun identifiant personnel lié.',
    requiresConsent: false,
  },
];

export interface CookieInventoryItem {
  name: string;
  domain: string;
  duration: string;
  purpose: string;
  category: 'necessary' | 'preferences' | 'analytics' | 'marketing';
  type: 'First-party' | 'Third-party';
  dataAssociated: string;
  legalBasis: string;
  requiresConsent: boolean;
}

export const COOKIE_INVENTORY: CookieInventoryItem[] = [
  {
    name: 'cesky_consent_status',
    domain: 'cesky.com',
    duration: '6 mois',
    purpose: 'Conserve le choix d’acceptation ou de refus des cookies par le visiteur.',
    category: 'necessary',
    type: 'First-party',
    dataAssociated: 'Statut du consentement (accepted/rejected/custom)',
    legalBasis: 'Obligation légale de respect de la vie privée (Loi Cameroun 2024/017)',
    requiresConsent: false,
  },
  {
    name: 'cesky_session_id',
    domain: 'cesky.com',
    duration: 'Session',
    purpose: 'Maintient la session de navigation sécurisée et prévient les attaques CSRF.',
    category: 'necessary',
    type: 'First-party',
    dataAssociated: 'Token cryptographique de session temporaire',
    legalBasis: 'Intérêt légitime de sécurité du site',
    requiresConsent: false,
  }
];

export const OFFICIAL_SOCIAL_LINKS = {
  facebook: 'https://web.facebook.com/people/ComplexeCesky/100083162020921/',
  tiktok: 'https://www.tiktok.com/@complexe.cesky/video/7551459368676429067',
  findglocal: 'https://www.findglocal.com/CM/Yaound%C3%A9/100389192639741/Complexe.Cesky.',
  googleMaps: 'https://maps.app.goo.gl/CK9rJJcmL9sFaZ8J9'
};

export const OFFICIAL_CONTACT_INFO = {
  companyName: 'Complexe C’ESKY Officiel',
  legalForm: 'Complexe Touristique & Multi-Services',
  capital: '[CAPITAL SOCIAL À CONFIRMER PAR LA DIRECTION]',
  rccm: '[NUMÉRO RCCM À FOURNIR PAR LA DIRECTION]',
  niu: '[NUMÉRO D’IDENTIFIANT UNIQUE (NIU) À FOURNIR]',
  city: 'Yaoundé',
  country: 'Cameroun',
  neighborhood: 'Quartier Éleveur',
  landmark: 'À 100 mètres de la station Tradex Éleveur (lieu-dit Dépôt de sable Éleveur)',
  fullAddress: 'Quartier Éleveur (100m Tradex Éleveur), Yaoundé, Cameroun',
  geoCoordinates: {
    latitude: 3.9016611,
    longitude: 11.5587342,
  },
  googleMapsUrl: OFFICIAL_SOCIAL_LINKS.googleMaps,
  officialPhone1: '+237 690 836 746',
  officialPhone2: '+237 690 836 746',
  officialWhatsApp: '+237 690 836 746',
  whatsAppDirectUrl: 'https://wa.me/237690836746?text=Bonjour%20Complexe%20C%E2%80%99ESKY%2C%20je%20souhaite%20des%20informations.',
  officialEmail: 'complexecesky237@gmail.com',
  social: OFFICIAL_SOCIAL_LINKS,
  dataControllerName: 'Direction Générale du Complexe C’ESKY',
  dataProtectionOfficerEmail: 'complexecesky237@gmail.com',
  hostingProvider: 'Serveurs Sécurisés Cloud',
  lastUpdated: '21 Septembre 2026',
  cameroonianLawRef: 'Loi n°2024/017 du 23 décembre 2024 relative à la protection des données à caractère personnel au Cameroun.'
};

export const LEGAL_PLACEHOLDERS = OFFICIAL_CONTACT_INFO;
