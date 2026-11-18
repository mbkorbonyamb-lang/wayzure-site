// Contenu des quatre pôles et des produits. Règle : n'écrire que ce que Wayzure livre aujourd'hui.

export type Pole = {
  id: string;
  name: string;
  lead: string;
  text: string;
  items: string[];
};

export const POLES: Pole[] = [
  {
    id: "data",
    name: "Data",
    lead: "Faire parler les données que vous avez déjà.",
    text: "Dans la plupart des entreprises, les données existent : un ERP, un CRM, des tableurs envoyés par e-mail, des fichiers clients en double. Ce qui manque, c'est un endroit fiable où les lire pour décider.",
    items: [
      "Inventaire de vos sources et de ce qu'elles valent vraiment",
      "Nettoyage, dédoublonnage, règles de saisie",
      "Tableaux de bord suivis, pas des rapports qu'on ouvre une fois",
      "Automatisation des exports et des rapports répétitifs",
      "Fichiers clients et prospects remis en conformité RGPD",
    ],
  },
  {
    id: "conseil",
    name: "Conseil",
    lead: "Cadrer avant de dépenser.",
    text: "Un projet numérique coûte cher quand on choisit l'outil avant d'avoir posé le problème. On commence par regarder comment vous travaillez, puis on vous dit ce qui vaut la peine d'être fait, y compris quand la réponse est de ne rien acheter.",
    items: [
      "Audit de l'existant : outils, processus, coûts",
      "Choix d'outils et comparatif chiffré",
      "Cahier des charges et aide au choix d'un prestataire",
      "Pilotage du projet jusqu'à la mise en service",
    ],
  },
  {
    id: "developpement",
    name: "Développement numérique",
    lead: "Concevoir, développer et mettre en ligne.",
    text: "Applications web, outils internes, sites, connexions entre vos logiciels. Nous livrons par étapes courtes, vous validez chaque étape. La sécurité des accès et le RGPD sont pris en compte dès la conception, pas ajoutés à la fin.",
    items: [
      "Applications web et outils métier sur mesure",
      "Sites vitrines rapides et bien référencés",
      "Intégrations : paiement, e-mail, CRM, API",
      "Mise en ligne et hébergement (Vercel, AWS, Supabase)",
      "Maintenance des applications que nous livrons",
    ],
  },
  {
    id: "formation",
    name: "Formation",
    lead: "Que vos équipes se servent vraiment des outils.",
    text: "Un outil que personne n'utilise ne sert à rien. Nos formations partent de vos cas réels et du niveau de chacun, sur site ou à distance, en petits groupes.",
    items: [
      "Prise en main des outils numériques du quotidien",
      "L'IA dans le travail de tous les jours : ce qu'elle fait bien, ses limites",
      "Outils collaboratifs et organisation du partage de fichiers",
      "Formation des utilisateurs aux applications que nous livrons",
    ],
  },
];

export type Product = {
  slug: "waypulse" | "waypilot" | "waylog" | "waycare";
  name: string;
  pole: string;
  tagline: string;
  text: string;
  url: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "waypulse",
    name: "WayPulse",
    pole: "Data et développement",
    tagline: "Développement commercial B2B",
    text: "Repère les entreprises qui ont une raison réelle d'acheter, trouve les bons interlocuteurs, prépare l'approche que vous validez et suit la relation jusqu'à la signature.",
    url: "https://waypulse.wayzure.com",
  },
  {
    slug: "waypilot",
    name: "WayPilot",
    pole: "Data",
    tagline: "Audit de catalogues e-commerce",
    text: "Analyse les catalogues WooCommerce et Shopify et signale les anomalies qui coûtent des ventes : prix, stocks, fiches incomplètes.",
    url: "https://waypilot.wayzure.com",
  },
  {
    slug: "waylog",
    name: "WayLog",
    pole: "Développement",
    tagline: "Preuve de livraison numérique",
    text: "Remplace le bordereau papier par une preuve de livraison numérique, consultable par le transporteur et par son client.",
    url: "https://waylog.wayzure.com",
  },
  {
    slug: "waycare",
    name: "Waycare",
    pole: "Développement",
    tagline: "Santé numérique",
    text: "Plateforme de santé numérique qui met en relation des patients de Guinée et de la diaspora avec des médecins.",
    url: "https://www.waycare.care",
  },
];
