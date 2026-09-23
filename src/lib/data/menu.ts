export interface MenuItem {
  id: string;
  name: string;
  category: 'pizzas-sandwichs' | 'restaurant' | 'terroir' | 'plats-composes' | 'sauces' | 'boissons-chaudes';
  subcategory: string;
  ingredients?: string;
  price: string;
  priceDetails?: { label: string; amount: string }[];
  badge?: string;
  isOrderOnly?: boolean;
}

export interface MenuSubcategory {
  id: string;
  title: string;
  note?: string;
  items: MenuItem[];
}

export interface MenuCategory {
  id: 'pizzas-sandwichs' | 'restaurant' | 'terroir' | 'plats-composes' | 'sauces' | 'boissons-chaudes';
  title: string;
  subtitle: string;
  icon: string;
  subcategories: MenuSubcategory[];
}

export const RESTAURANT_MENU: MenuCategory[] = [
  {
    id: 'pizzas-sandwichs',
    title: 'Pizzas & Sandwichs',
    subtitle: 'Pâtes artisanales fraîches et snack-bar gourmet',
    icon: 'Pizza',
    subcategories: [
      {
        id: 'pizzas',
        title: 'Pizzas',
        note: 'Pâtes pétries sur place, cuites à la perfection (tailles au choix)',
        items: [
          {
            id: 'pizza-mont-manengouba',
            name: 'Mont Manengouba',
            category: 'pizzas-sandwichs',
            subcategory: 'Pizzas',
            ingredients: 'Œuf, Viande hachée, Poulet, Saucisson, Jambon, Fromage',
            price: '5 000 F / 9 000 F',
            priceDetails: [
              { label: 'Moyenne', amount: '5 000 F' },
              { label: 'Grande', amount: '9 000 F' },
            ],
          },
          {
            id: 'pizza-all-america',
            name: 'All America',
            category: 'pizzas-sandwichs',
            subcategory: 'Pizzas',
            ingredients: 'Blanc de poulet, Viande hachée, Saucisson',
            price: '5 000 F / 8 000 F',
            priceDetails: [
              { label: 'Moyenne', amount: '5 000 F' },
              { label: 'Grande', amount: '8 000 F' },
            ],
          },
          {
            id: 'pizza-savoyard',
            name: 'Savoyard',
            category: 'pizzas-sandwichs',
            subcategory: 'Pizzas',
            ingredients: 'Jambon, Champignons, Lardons, Fromage',
            price: '5 000 F / 7 000 F',
            priceDetails: [
              { label: 'Moyenne', amount: '5 000 F' },
              { label: 'Grande', amount: '7 000 F' },
            ],
          },
          {
            id: 'pizza-vegetarienne',
            name: 'Végétarienne',
            category: 'pizzas-sandwichs',
            subcategory: 'Pizzas',
            ingredients: 'Carotte, Tomate, Poivron, Concombre, Maïs doux, Fromage',
            price: '5 000 F / 7 000 F',
            badge: 'Végétarien',
            priceDetails: [
              { label: 'Moyenne', amount: '5 000 F' },
              { label: 'Grande', amount: '7 000 F' },
            ],
          },
          {
            id: 'pizza-madona',
            name: 'Madona',
            category: 'pizzas-sandwichs',
            subcategory: 'Pizzas',
            ingredients: 'Poulet, Saucisson, Jambon, Fromage',
            price: '5 000 F / 7 000 F',
            priceDetails: [
              { label: 'Moyenne', amount: '5 000 F' },
              { label: 'Grande', amount: '7 000 F' },
            ],
          },
          {
            id: 'pizza-azura',
            name: 'Azura',
            category: 'pizzas-sandwichs',
            subcategory: 'Pizzas',
            ingredients: 'Jambon, Lardons, Fromage',
            price: '5 000 F / 7 000 F',
            priceDetails: [
              { label: 'Moyenne', amount: '5 000 F' },
              { label: 'Grande', amount: '7 000 F' },
            ],
          },
          {
            id: 'pizza-monte-christo',
            name: 'Monte Christo',
            category: 'pizzas-sandwichs',
            subcategory: 'Pizzas',
            ingredients: 'Ananas, Fromage',
            price: '4 000 F / 7 000 F',
            priceDetails: [
              { label: 'Moyenne', amount: '4 000 F' },
              { label: 'Grande', amount: '7 000 F' },
            ],
          },
          {
            id: 'pizza-marguarita',
            name: 'Marguarita',
            category: 'pizzas-sandwichs',
            subcategory: 'Pizzas',
            ingredients: 'Olives noires, Fromage, Sauce tomate',
            price: '3 000 F / 5 000 F',
            priceDetails: [
              { label: 'Moyenne', amount: '3 000 F' },
              { label: 'Grande', amount: '5 000 F' },
            ],
          },
          {
            id: 'pizza-cesky',
            name: 'C\'Esky',
            category: 'pizzas-sandwichs',
            subcategory: 'Pizzas',
            ingredients: 'Viande hachée ou blanc de poulet, Fromage',
            price: '2 000 F / 3 000 F / 5 000 F',
            badge: 'Signature C’ESKY',
            priceDetails: [
              { label: 'Petite', amount: '2 000 F' },
              { label: 'Moyenne', amount: '3 000 F' },
              { label: 'Grande', amount: '5 000 F' },
            ],
          },
        ],
      },
      {
        id: 'sandwichs',
        title: 'Sandwichs',
        note: 'Préparations chaudes et minutes',
        items: [
          {
            id: 'sandwich-hamburger',
            name: 'Hamburger',
            category: 'pizzas-sandwichs',
            subcategory: 'Sandwichs',
            price: '1 000 F',
          },
          {
            id: 'sandwich-shawarma-viande',
            name: 'Shawarma Viande',
            category: 'pizzas-sandwichs',
            subcategory: 'Sandwichs',
            price: '1 000 F',
          },
          {
            id: 'sandwich-shawarma-poulet',
            name: 'Shawarma Poulet',
            category: 'pizzas-sandwichs',
            subcategory: 'Sandwichs',
            price: '2 000 F',
          },
        ],
      },
    ],
  },
  {
    id: 'restaurant',
    title: 'Restaurant',
    subtitle: 'Entrées fraîches, volailles, viandes sélectionnées et poissons',
    icon: 'Utensils',
    subcategories: [
      {
        id: 'entrees-salades',
        title: 'Entrées / Salades',
        items: [
          {
            id: 'entree-avocat',
            name: 'Avocat',
            category: 'restaurant',
            subcategory: 'Entrées / Salades',
            price: '2 000 F',
          },
          {
            id: 'entree-crudites',
            name: 'Crudités',
            category: 'restaurant',
            subcategory: 'Entrées / Salades',
            price: '2 000 F',
          },
          {
            id: 'entree-composee',
            name: 'Composée',
            category: 'restaurant',
            subcategory: 'Entrées / Salades',
            price: '2 500 F',
          },
          {
            id: 'entree-gesier',
            name: 'Gésier',
            category: 'restaurant',
            subcategory: 'Entrées / Salades',
            price: '2 500 F',
          },
          {
            id: 'entree-avocat-crevettes',
            name: 'Avocat aux Crevettes',
            category: 'restaurant',
            subcategory: 'Entrées / Salades',
            price: '2 500 F',
          },
          {
            id: 'entree-bollonaise',
            name: 'Bollonaise',
            category: 'restaurant',
            subcategory: 'Entrées / Salades',
            price: '2 500 F',
          },
        ],
      },
      {
        id: 'poulet-volailles',
        title: 'Poulet / Volailles',
        items: [
          {
            id: 'poulet-grille',
            name: 'Grillé',
            category: 'restaurant',
            subcategory: 'Poulet / Volailles',
            price: '½ : 3 000 F | Entier : 12 000 F',
            priceDetails: [
              { label: '½', amount: '3 000 F' },
              { label: 'Entier', amount: '12 000 F' },
            ],
          },
          {
            id: 'poulet-pane',
            name: 'Pané',
            category: 'restaurant',
            subcategory: 'Poulet / Volailles',
            price: '½ : 3 500 F | Entier : 14 000 F',
            priceDetails: [
              { label: '½', amount: '3 500 F' },
              { label: 'Entier', amount: '14 000 F' },
            ],
          },
          {
            id: 'poulet-dg',
            name: 'DG',
            category: 'restaurant',
            subcategory: 'Poulet / Volailles',
            badge: 'Spécialité DG',
            price: '½ : 3 500 F | Entier : 14 000 F',
            priceDetails: [
              { label: '½', amount: '3 500 F' },
              { label: 'Entier', amount: '14 000 F' },
            ],
          },
          {
            id: 'poulet-roti',
            name: 'Rôti',
            category: 'restaurant',
            subcategory: 'Poulet / Volailles',
            price: '½ : 3 500 F | Entier : 14 000 F',
            priceDetails: [
              { label: '½', amount: '3 500 F' },
              { label: 'Entier', amount: '14 000 F' },
            ],
          },
          {
            id: 'poulet-cordon-bleu',
            name: 'Cordon Bleu',
            category: 'restaurant',
            subcategory: 'Poulet / Volailles',
            price: '½ : 3 500 F | Entier : 14 000 F',
            priceDetails: [
              { label: '½', amount: '3 500 F' },
              { label: 'Entier', amount: '14 000 F' },
            ],
          },
        ],
      },
      {
        id: 'fruits-de-mer',
        title: 'Fruits de Mer',
        items: [
          {
            id: 'mer-bouillon-bar',
            name: 'Bouillon Bar',
            category: 'restaurant',
            subcategory: 'Fruits de Mer',
            price: '3 000 F',
          },
          {
            id: 'mer-bouillon-sillure',
            name: 'Bouillon Sillure',
            category: 'restaurant',
            subcategory: 'Fruits de Mer',
            price: '3 000 F',
          },
          {
            id: 'mer-bouillon-carpe',
            name: 'Bouillon Carpe',
            category: 'restaurant',
            subcategory: 'Fruits de Mer',
            price: '3 000 F / 5 000 F',
          },
          {
            id: 'mer-bar-poele',
            name: 'Bar à la Poêle',
            category: 'restaurant',
            subcategory: 'Fruits de Mer',
            price: '3 000 F',
          },
          {
            id: 'mer-maquereau',
            name: 'Maquereau',
            category: 'restaurant',
            subcategory: 'Fruits de Mer',
            price: '2 500 F',
          },
          {
            id: 'mer-carpes',
            name: 'Carpes',
            category: 'restaurant',
            subcategory: 'Fruits de Mer',
            price: '3 000 F / 3 500 F',
          },
          {
            id: 'mer-crevettes-sautees',
            name: 'Crevettes Sautées',
            category: 'restaurant',
            subcategory: 'Fruits de Mer',
            price: '7 500 F',
          },
          {
            id: 'mer-gambas-sautees',
            name: 'Gambas Sautées',
            category: 'restaurant',
            subcategory: 'Fruits de Mer',
            price: '8 500 F',
          },
        ],
      },
      {
        id: 'porc',
        title: 'Porc',
        items: [
          {
            id: 'porc-fume',
            name: 'Fumé',
            category: 'restaurant',
            subcategory: 'Porc',
            price: '3 000 F',
          },
          {
            id: 'porc-saucisses',
            name: 'Saucisses',
            category: 'restaurant',
            subcategory: 'Porc',
            price: '3 000 F',
          },
          {
            id: 'porc-cotes',
            name: 'Côtes de Porc',
            category: 'restaurant',
            subcategory: 'Porc',
            price: '4 500 F',
          },
        ],
      },
      {
        id: 'boeuf',
        title: 'Bœuf',
        items: [
          {
            id: 'boeuf-bouillon-jarret',
            name: 'Bouillon Jarret',
            category: 'restaurant',
            subcategory: 'Bœuf',
            price: '2 000 F',
          },
          {
            id: 'boeuf-brochettes',
            name: 'Brochettes',
            category: 'restaurant',
            subcategory: 'Bœuf',
            price: '2 500 F',
          },
          {
            id: 'boeuf-beefsteack',
            name: 'Beefsteack',
            category: 'restaurant',
            subcategory: 'Bœuf',
            price: '2 500 F',
          },
          {
            id: 'boeuf-emincees',
            name: 'Émincées',
            category: 'restaurant',
            subcategory: 'Bœuf',
            price: '2 500 F',
          },
          {
            id: 'boeuf-saucisses',
            name: 'Saucisses',
            category: 'restaurant',
            subcategory: 'Bœuf',
            price: '3 000 F',
          },
          {
            id: 'boeuf-rognons',
            name: 'Rognons',
            category: 'restaurant',
            subcategory: 'Bœuf',
            price: '3 500 F',
          },
          {
            id: 'boeuf-steak-poivres',
            name: 'Steak aux Poivres',
            category: 'restaurant',
            subcategory: 'Bœuf',
            price: '3 500 F',
          },
          {
            id: 'boeuf-trippes',
            name: 'Trippes',
            category: 'restaurant',
            subcategory: 'Bœuf',
            price: '3 500 F',
          },
        ],
      },
    ],
  },
  {
    id: 'terroir',
    title: 'Terroir',
    subtitle: 'Saveurs authentiques du patrimoine culinaire camerounais',
    icon: 'Sparkles',
    subcategories: [
      {
        id: 'terroir-plats',
        title: 'Plats du Terroir',
        items: [
          {
            id: 'terroir-riz-viande',
            name: 'Riz Sauté Viande',
            category: 'terroir',
            subcategory: 'Plats du Terroir',
            price: '2 500 F',
          },
          {
            id: 'terroir-riz-gesiers',
            name: 'Riz Sauté aux Gésiers',
            category: 'terroir',
            subcategory: 'Plats du Terroir',
            price: '2 500 F',
          },
          {
            id: 'terroir-riz-saucisses',
            name: 'Riz Sauté aux Saucisses',
            category: 'terroir',
            subcategory: 'Plats du Terroir',
            price: '3 000 F',
          },
          {
            id: 'terroir-riz-poulet',
            name: 'Riz Sauté Poulet',
            category: 'terroir',
            subcategory: 'Plats du Terroir',
            price: '4 500 F',
          },
          {
            id: 'terroir-ndolet-nature',
            name: 'Ndolet Nature',
            category: 'terroir',
            subcategory: 'Plats du Terroir',
            price: '2 000 F',
          },
          {
            id: 'terroir-ndolet-viande',
            name: 'Ndolet Viande',
            category: 'terroir',
            subcategory: 'Plats du Terroir',
            price: '2 500 F',
          },
          {
            id: 'terroir-ndolet-poulet',
            name: 'Ndolet Poulet',
            category: 'terroir',
            subcategory: 'Plats du Terroir',
            price: '4 500 F',
          },
          {
            id: 'terroir-ndolet-poisson',
            name: 'Ndolet Poisson',
            category: 'terroir',
            subcategory: 'Plats du Terroir',
            price: '4 000 F',
          },
          {
            id: 'terroir-ndolet-crevettes',
            name: 'Ndolet Crevettes',
            category: 'terroir',
            subcategory: 'Plats du Terroir',
            price: '5 000 F',
          },
          {
            id: 'terroir-okok',
            name: 'Okok',
            category: 'terroir',
            subcategory: 'Plats du Terroir',
            price: '1 500 F',
          },
          {
            id: 'terroir-eru',
            name: 'Eru',
            category: 'terroir',
            subcategory: 'Plats du Terroir',
            price: '2 500 F',
          },
          {
            id: 'terroir-couscous-ndjapcheu',
            name: 'Couscous Ndjapcheu',
            category: 'terroir',
            subcategory: 'Plats du Terroir',
            price: '2 000 F',
          },
          {
            id: 'terroir-c-ndjapcheu-viande',
            name: 'C. Ndjapcheu Viande',
            category: 'terroir',
            subcategory: 'Plats du Terroir',
            price: '2 500 F',
          },
          {
            id: 'terroir-couscous-gombo',
            name: 'Couscous Gombo',
            category: 'terroir',
            subcategory: 'Plats du Terroir',
            price: '2 000 F',
          },
        ],
      },
      {
        id: 'terroir-extras',
        title: 'Extras',
        items: [
          {
            id: 'extra-bhb',
            name: 'Beignet - Haricot - Bouillie',
            category: 'terroir',
            subcategory: 'Extras',
            price: '1 000 F',
          },
          {
            id: 'extra-ndomba-sillure',
            name: 'Ndomba Sillure',
            category: 'terroir',
            subcategory: 'Extras',
            price: 'à partir de 2 500 F',
          },
          {
            id: 'extra-koki',
            name: 'Koki',
            category: 'terroir',
            subcategory: 'Extras',
            price: 'Sur commande',
            badge: 'Sur commande',
            isOrderOnly: true,
          },
          {
            id: 'extra-taro',
            name: 'Taro',
            category: 'terroir',
            subcategory: 'Extras',
            price: 'Sur commande',
            badge: 'Sur commande',
            isOrderOnly: true,
          },
        ],
      },
      {
        id: 'terroir-dessert',
        title: 'Dessert',
        items: [
          {
            id: 'dessert-fruits-saison',
            name: 'Fruits de Saison',
            category: 'terroir',
            subcategory: 'Dessert',
            price: '1 000 F',
          },
        ],
      },
    ],
  },
  {
    id: 'plats-composes',
    title: 'Plats Composés',
    subtitle: 'Assortiments généreux — Tous les plats composés sont accompagnés de salades',
    icon: 'Flame',
    subcategories: [
      {
        id: 'composes-liste',
        title: 'Formules Plats Composés',
        note: 'Tous les plats composés sont accompagnés de salades',
        items: [
          {
            id: 'compose-poulet-saucisses',
            name: 'Poulet + Saucisses',
            category: 'plats-composes',
            subcategory: 'Formules Plats Composés',
            ingredients: 'Accompagné de salades',
            price: '4 500 F',
          },
          {
            id: 'compose-poulet-brochettes',
            name: 'Poulet + Brochettes',
            category: 'plats-composes',
            subcategory: 'Formules Plats Composés',
            ingredients: 'Accompagné de salades',
            price: '5 500 F',
          },
          {
            id: 'compose-brochettes-saucisses',
            name: 'Brochettes + Saucisses',
            category: 'plats-composes',
            subcategory: 'Formules Plats Composés',
            ingredients: 'Accompagné de salades',
            price: '5 500 F',
          },
          {
            id: 'compose-steak-brochettes',
            name: 'Steak + Brochettes',
            category: 'plats-composes',
            subcategory: 'Formules Plats Composés',
            ingredients: 'Accompagné de salades',
            price: '6 000 F',
          },
          {
            id: 'compose-poulet-porc',
            name: 'Poulet + Porc',
            category: 'plats-composes',
            subcategory: 'Formules Plats Composés',
            ingredients: 'Accompagné de salades',
            price: '7 500 F',
          },
          {
            id: 'compose-steak-brochettes-porc',
            name: 'Steak + Brochettes + Porc',
            category: 'plats-composes',
            subcategory: 'Formules Plats Composés',
            ingredients: 'Accompagné de salades',
            price: '10 500 F',
            badge: 'Formule Royale',
          },
        ],
      },
    ],
  },
  {
    id: 'sauces',
    title: 'Sauces',
    subtitle: 'Sauces onctueuses et assaisonnements faits maison',
    icon: 'Soup',
    subcategories: [
      {
        id: 'sauces-liste',
        title: 'Nos Sauces',
        items: [
          {
            id: 'sauce-oignons',
            name: 'Aux Oignons',
            category: 'sauces',
            subcategory: 'Nos Sauces',
            price: '500 F',
          },
          {
            id: 'sauce-legumes',
            name: 'Aux Légumes',
            category: 'sauces',
            subcategory: 'Nos Sauces',
            price: '500 F',
          },
          {
            id: 'sauce-poivres',
            name: 'Aux Poivres',
            category: 'sauces',
            subcategory: 'Nos Sauces',
            price: '500 F',
          },
          {
            id: 'sauce-blanche',
            name: 'Blanche',
            category: 'sauces',
            subcategory: 'Nos Sauces',
            price: '1 000 F',
          },
        ],
      },
    ],
  },
  {
    id: 'boissons-chaudes',
    title: 'Boissons Chaudes',
    subtitle: 'Infusions bienfaisantes, thés aromatiques et cafés',
    icon: 'Coffee',
    subcategories: [
      {
        id: 'boissons-chaudes-liste',
        title: 'Thés, Infusions & Cafés',
        items: [
          {
            id: 'boisson-nescafe',
            name: 'Nescafé',
            category: 'boissons-chaudes',
            subcategory: 'Thés, Infusions & Cafés',
            price: '1 000 F',
          },
          {
            id: 'boisson-the-gingembre',
            name: 'Thé Gingembre',
            category: 'boissons-chaudes',
            subcategory: 'Thés, Infusions & Cafés',
            price: '1 000 F',
          },
          {
            id: 'boisson-gingembre-menthe',
            name: 'Gingembre & Menthe',
            category: 'boissons-chaudes',
            subcategory: 'Thés, Infusions & Cafés',
            price: '1 000 F',
          },
          {
            id: 'boisson-the-victoria',
            name: 'Thé Victoria',
            category: 'boissons-chaudes',
            subcategory: 'Thés, Infusions & Cafés',
            price: '1 000 F',
          },
          {
            id: 'boisson-the-menthe',
            name: 'Thé Menthe',
            category: 'boissons-chaudes',
            subcategory: 'Thés, Infusions & Cafés',
            price: '1 000 F',
          },
          {
            id: 'boisson-the-citron',
            name: 'Thé au Citron',
            category: 'boissons-chaudes',
            subcategory: 'Thés, Infusions & Cafés',
            price: '1 000 F',
          },
          {
            id: 'boisson-tole-tea',
            name: 'Tole Tea',
            category: 'boissons-chaudes',
            subcategory: 'Thés, Infusions & Cafés',
            price: '1 000 F',
          },
        ],
      },
    ],
  },
];

export const ALL_MENU_ITEMS: MenuItem[] = RESTAURANT_MENU.flatMap((cat) =>
  cat.subcategories.flatMap((sub) => sub.items)
);
