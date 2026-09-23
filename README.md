# 🏰 Complexe C’ESKY — Site Web Officiel & Plateforme de Service

[![Next.js](https://img.shields.io/badge/Next.js-16.3.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-gold?style=flat-square)](#)

Plateforme web officielle, vitrine d'exception et système interactif de réservation et de commande en ligne pour le **Complexe C’ESKY**, espace d'hôtellerie, restauration, détente et événements de référence situé à **Yaoundé, Cameroun**.

---

## 🌟 Fonctionnalités Principales

### 🏨 1. Vitrine Complète des 12 Pôles d'Activités
- **Restaurant Gastronomique & Bar VIP** : Découverte des cartes, grillades, spécialités locales et cocktails créations.
- **Piscine & Espace Relax VIP** (Accès de 10h à 19h).
- **Hébergement & Suites** : Présentation des espaces de séjour.
- **Événements & Privatisation** : Anniversaires, banquets, mariages et soirées privées.
- **Services Complémentaires** : Pressing, laverie automatique, espaces shopping et loisirs.

### 🍽️ 2. Système de Commande Restaurant Interactive
- **Panier dynamique** en temps réel avec sélection des plats et ajustement des quantités.
- **Choix du mode de consommation** : Sur Place (Numéro de Table), À Emporter, ou Livraison.
- **Suivi des Statuts de Commande** : `en-attente`, `confirmee`, `en-preparation`, `terminee`, `annulee`.
- **Annulation par le Client** : Possibilité d'annuler une commande recente via un modal de confirmation (*« Êtes-vous sûr de vouloir annuler cette commande ? »*).
- **Alertes Email Instantanées** : Envoi d'une notification d'annulation et de récapitulatif à la gérance (`complexecesky237@gmail.com`).

### 📅 3. Module de Réservation Directe
- Formulaire de réservation personnalisé pour le restaurant, la piscine VIP, l'hbergement et la privatisation d'espaces.
- Envoi automatique de confirmations par email via Nodemailer SMTP.

### 🗺️ 4. Localisation GPS & Google Maps Officiel
- Fiche Google Maps officielle intégrée : [`https://maps.app.goo.gl/CK9rJJcmL9sFaZ8J9`](https://maps.app.goo.gl/CK9rJJcmL9sFaZ8J9).
- Carte interactive iframe responsive avec repères visuels géographiques (Accès Tsinga, FECAFOOT, Bastos, Golf) et bouton de guidage 1-clic pour smartphones.

### 💬 5. Canaux Directs & Réseaux Sociaux
- **WhatsApp Officiel** (`+237 690 836 746`) avec génération automatique de messages pré-remplis selon la prestation choisie.
- Liens officiels vers **Facebook**, **TikTok** et **FindGlocal**.

### 🛡️ 6. Conformité Légale & Protection des Données
- Conforme à la **Loi Camerounaise n°2024/017** relative à la protection des données à caractère personnel.
- Module de gestion des consentements (cookies & données), Mentions Légales, CGU et Politiques de Confidentialité dédiées.

---

## 🛠️ Stack Technique

- **Framework Frontend/Backend** : [Next.js 16 (App Router / Turbopack)](https://nextjs.org/)
- **Bibliothèque UI** : [React 19](https://react.dev/)
- **Langage** : [TypeScript](https://www.typescriptlang.org/)
- **Styling** : [TailwindCSS](https://tailwindcss.com/) avec design system sur-mesure (Or `#D4AF37` / Dark `#0B0B0C`)
- **Icônes** : [Lucide React](https://lucide.dev/) & Composants SVG vectoriels de marques officiels
- **Services Email** : [Nodemailer](https://nodemailer.com/) (SMTP / Gmail Application Password)

---

## 📂 Structure du Projet

```text
site web c'esky/
├── public/                 # Ressources statiques (images, logo officiel, favicon)
├── src/
│   ├── app/                # Next.js App Router (Pages, Layouts & Endpoints API)
│   │   ├── api/            # Route Handlers (commande, reservation, contact)
│   │   ├── contact/        # Page Contact & Plan GPS
│   │   ├── evenements/     # Page Événements & Privatisation
│   │   ├── galerie/        # Page Galerie Photos HD
│   │   ├── hebergement/    # Page Séjour & Suites
│   │   ├── piscine/        # Page Espace Piscine VIP
│   │   ├── reservation/    # Page Réservations en ligne
│   │   ├── restaurant/     # Page Restaurant & Menu interactif
│   │   └── page.tsx        # Page d'Accueil Principale
│   ├── components/         # Composants React Réutilisables
│   │   ├── common/         # Cartes GPS, Header, Footer, BrandIcons
│   │   ├── layout/         # Navigation, Menus mobiles, WhatsApp Floating
│   │   ├── restaurant/     # Menu Restaurant, CartDrawer, Modals
│   │   └── reviews/        # Section Avis & Témoignages
│   └── lib/                # Données statiques, configurations & utilitaires email
│       ├── data/           # Services, Heures, Menu, Legal, Socials
│       ├── email.ts        # Envoi d'emails SMTP (Réservations, Commandes, Annulations)
│       └── utils.ts        # Fonctions utilitaires
├── .env.example            # Fichier modèle des variables d'environnement
├── .gitignore              # Configurations des exclusions Git
├── next.config.ts          # Configuration Next.js
├── package.json            # Dépendances du projet
├── README.md               # Documentation officielle du projet
└── tsconfig.json           # Configuration TypeScript
```

---

## 🚀 Installation & Démarrage

### 1. Prérequis
S'assurer d'avoir **Node.js** (v18.0.0 ou supérieur) et **npm** installés sur votre machine.

```bash
node -v
npm -v
```

### 2. Cloner le projet
```bash
git clone https://github.com/motaze133-sketch/C-ESKY-site-web.git
cd C-ESKY-site-web
```

### 3. Installer les dépendances
```bash
npm install
```

### 4. Configurer les Variables d'Environnement
Créez un fichier `.env.local` à la racine du projet en copiant le modèle `.env.example` :

```bash
cp .env.example .env.local
```

Renseignez les variables SMTP pour l'envoi d'emails (ex. Gmail avec Mot de Passe d'Application) :
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=complexecesky237@gmail.com
SMTP_PASS=votre_mot_de_passe_application_16_caracteres
SMTP_FROM="Complexe C’ESKY <complexecesky237@gmail.com>"
```

### 5. Lancer le Serveur de Développement
```bash
npm run dev
```
Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour visualiser le site.

### 6. Build de Production
Pour compiler et tester le projet en mode production :

```bash
npm run build
npm run start
```

---

## 📞 Contact & Support

- **Adresse** : Complexe C’ESKY, Yaoundé, Cameroun
- **Téléphone / WhatsApp** : +237 690 836 746 / +237 653 260 268
- **Email** : `complexecesky237@gmail.com`
- **Google Maps** : [https://maps.app.goo.gl/CK9rJJcmL9sFaZ8J9](https://maps.app.goo.gl/CK9rJJcmL9sFaZ8J9)

---
*Développé avec soin pour le Complexe C’ESKY.*
