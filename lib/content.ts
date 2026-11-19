// Contenus du site : pôles d'expertise, services IT et solutions.
// Règle : aucun client, chiffre ou témoignage inventé. Les faits sur les produits viennent de leurs propres sites.

export type Item = { t: string; d: string };

// Référence client réelle, donnée par Moussa : ne rien ajouter qui n'ait été confirmé.
export type Case = { client: string; logo?: string; context: string; text: string };

export type Expertise = {
  slug: string;
  name: string;
  short: string; // nom court pour le menu et les cartes
  lead: string; // promesse en une phrase
  intro: string;
  problems: string[]; // situations rencontrées chez les clients
  items: Item[]; // ce que nous faisons
  outcomes: string[]; // ce qui change concrètement
  solutions: Solution["slug"][]; // produits Wayzure liés, servent de preuve
  cases?: Case[]; // références clients du pôle
  seo: string;
};

export const EXPERTISES: Expertise[] = [
  {
    slug: "data-intelligence-artificielle",
    name: "Data & Intelligence artificielle",
    short: "Data & IA",
    lead: "Transformer vos données en décisions, et l'IA en gains réels.",
    intro:
      "Les données existent déjà : dans l'ERP, le CRM, les tableurs, les e-mails. Le problème est rarement leur volume. C'est qu'on ne peut pas s'y fier, ni les lire au bon moment. Nous partons de vos décisions à prendre, puis nous remontons vers les données qui les éclairent. L'IA vient ensuite, là où elle fait gagner du temps sans créer de risque.",
    problems: [
      "Chaque service a ses propres chiffres, et aucun ne donne le même total.",
      "Les rapports sont refaits à la main chaque mois, à partir d'exports.",
      "On parle d'IA en comité de direction, sans savoir par où commencer.",
      "Des tâches répétitives occupent des personnes qualifiées toute la semaine.",
    ],
    items: [
      { t: "Data Analytics et Business Intelligence", d: "Modèle de données, indicateurs définis avec les métiers, tableaux de bord suivis dans la durée." },
      { t: "Exploitation et valorisation des données", d: "Inventaire des sources, nettoyage, dédoublonnage, règles de qualité et de conformité RGPD." },
      { t: "Intelligence artificielle et IA générative", d: "Cas d'usage choisis pour leur gain mesurable : recherche documentaire, rédaction assistée, analyse de textes." },
      { t: "Automatisation intelligente et intégration de modèles IA", d: "Flux automatisés entre vos outils et modèles d'IA branchés dans vos applications, avec contrôle humain là où il le faut." },
    ],
    outcomes: [
      "Un chiffre de référence par indicateur, connu de tous.",
      "Des rapports qui se mettent à jour seuls.",
      "Des usages de l'IA cadrés : données protégées, résultats vérifiables.",
    ],
    solutions: ["waypulse", "waypilot"],
    seo: "Data analytics, business intelligence, IA générative et automatisation intelligente pour les entreprises et les organisations, en France et en Guinée.",
  },
  {
    slug: "conseil",
    name: "Conseil",
    short: "Conseil",
    lead: "Décider avant d'investir, puis piloter jusqu'au résultat.",
    intro:
      "Un projet numérique coûte cher quand l'outil est choisi avant que le problème soit posé. Nous regardons d'abord comment vous travaillez, ce que coûtent vos systèmes et où sont les risques. Vous repartez avec des priorités claires et chiffrées, y compris quand la bonne réponse est de ne rien acheter.",
    problems: [
      "Les outils se sont empilés au fil des années, personne n'a la vue d'ensemble.",
      "Un projet informatique dérape en délai ou en budget.",
      "La direction veut avancer sur le numérique sans savoir par quoi commencer.",
      "La sécurité et la continuité de service reposent sur une ou deux personnes.",
    ],
    items: [
      { t: "Stratégie et transformation digitale", d: "Diagnostic, feuille de route, priorités chiffrées et calendrier réaliste." },
      { t: "Conseil IT et systèmes d'information", d: "Cartographie du SI, choix d'outils, schéma directeur, réduction des coûts." },
      { t: "Audit informatique et opérationnel", d: "État des lieux des outils, des processus, des contrats et des risques, avec un plan d'action." },
      { t: "Cybersécurité, cloud et infrastructure", d: "Revue des accès et des sauvegardes, politique de sécurité, choix d'hébergement et migration vers le cloud." },
      { t: "AMOA, gouvernance IT et gestion de projets", d: "Expression des besoins, cahier des charges, choix du prestataire, pilotage et recette." },
      { t: "Organisation et optimisation des processus", d: "Analyse des flux de travail, suppression des ressaisies et des étapes sans valeur." },
    ],
    outcomes: [
      "Une décision prise sur des faits, pas sur une démonstration commerciale.",
      "Un projet piloté avec un budget, un calendrier et des responsables.",
      "Des risques connus, classés et traités.",
    ],
    solutions: ["waypulse"],
    cases: [
      {
        client: "Africa Fight League (AFL)",
        logo: "/clients/afl.webp",
        context: "Ligue de combat française · 2024",
        text: "Conseil en stratégie et en organisation, de la conception du projet jusqu'à la première soirée de combat internationale de la ligue, organisée à Conakry. Nous avons aussi créé son logo.",
      },
    ],
    seo: "Conseil en stratégie digitale, systèmes d'information, audit informatique, cybersécurité, cloud, AMOA et organisation des processus.",
  },
  {
    slug: "developpement-numerique",
    name: "Développement numérique",
    short: "Développement",
    lead: "Concevoir, développer et faire vivre les logiciels de votre métier.",
    intro:
      "Quand aucun logiciel du marché ne colle à votre façon de travailler, ou quand vos outils ne se parlent pas, nous construisons ce qui manque. Le travail avance par livraisons courtes, que vous validez une à une. La sécurité des accès et la protection des données sont prévues dès la conception.",
    problems: [
      "Le métier tourne sur des tableurs partagés et des ressaisies.",
      "Une application existante vieillit et plus personne n'ose la modifier.",
      "Les logiciels de l'entreprise ne s'échangent aucune donnée.",
      "Les clients ou les équipes de terrain attendent une application mobile.",
    ],
    items: [
      { t: "Logiciels et applications métiers", d: "Outils internes sur mesure : gestion, suivi d'activité, portails clients et fournisseurs." },
      { t: "Développement web et mobile", d: "Sites et applications rapides, accessibles, pensés d'abord pour le téléphone, y compris hors réseau." },
      { t: "Plateformes SaaS et API", d: "Conception d'offres logicielles en ligne, abonnements, API documentées pour vos partenaires." },
      { t: "Intégration de solutions ERP et CRM", d: "Paramétrage, reprise de données et connexion avec vos autres outils." },
      { t: "Architecture, modernisation et maintenance applicative", d: "Reprise d'applications existantes, migration vers le cloud, corrections et évolutions dans la durée." },
    ],
    outcomes: [
      "Un outil qui suit vos processus, et non l'inverse.",
      "Des données saisies une seule fois, partagées partout.",
      "Un code documenté et des accès remis : vous restez propriétaire.",
    ],
    solutions: ["waylog", "waycare", "waypilot", "waypulse"],
    seo: "Développement de logiciels métiers, applications web et mobiles, plateformes SaaS, API, intégration ERP et CRM, modernisation applicative.",
  },
  {
    slug: "formation",
    name: "Formation",
    short: "Formation",
    lead: "Que vos équipes maîtrisent les outils et en tirent parti.",
    intro:
      "Un outil que personne n'utilise ne rapporte rien. Nos formations partent de vos cas réels et du niveau de chacun, en petits groupes, sur site ou à distance. Nous accompagnons aussi le changement lui-même : expliquer, rassurer, ajuster.",
    problems: [
      "Un nouvel outil est déployé, et les équipes reviennent aux anciennes habitudes.",
      "Les collaborateurs utilisent l'IA chacun de leur côté, sans règles.",
      "Les bons réflexes de sécurité ne sont pas acquis.",
      "Les compétences data reposent sur une seule personne.",
    ],
    items: [
      { t: "Formation professionnelle IT et numérique", d: "Outils bureautiques et collaboratifs, logiciels métiers, applications que nous livrons." },
      { t: "Data et intelligence artificielle", d: "Lire et construire un tableau de bord, utiliser l'IA générative au travail, connaître ses limites." },
      { t: "Cybersécurité et outils digitaux", d: "Hameçonnage, mots de passe, partage de fichiers : les gestes qui évitent les incidents." },
      { t: "Accompagnement et conduite du changement", d: "Plan de communication, relais internes, supports et suivi après le déploiement." },
    ],
    outcomes: [
      "Des équipes autonomes sur leurs outils.",
      "Des règles claires pour l'usage de l'IA et des données.",
      "Un déploiement adopté plutôt que subi.",
    ],
    solutions: [],
    seo: "Formation professionnelle IT et numérique, data, intelligence artificielle, cybersécurité et conduite du changement.",
  },
];

export const IT_SERVICES: Expertise = {
  slug: "services-it",
  name: "Services IT",
  short: "Services IT",
  lead: "Un parc informatique qui tourne, des utilisateurs qui ont une réponse.",
  intro:
    "Au quotidien, l'informatique doit simplement marcher : postes, comptes, messagerie, réseau, sauvegardes. Nous prenons en charge tout ou partie de ce travail, avec un point d'entrée unique pour vos utilisateurs.",
  problems: [
    "Les demandes des utilisateurs arrivent par tous les canaux et se perdent.",
    "Personne ne sait vraiment qui a accès à quoi.",
    "Les mises à jour et les sauvegardes se font quand quelqu'un y pense.",
  ],
  items: [
    { t: "Support utilisateurs et helpdesk", d: "Un point d'entrée unique, des demandes suivies jusqu'à leur résolution." },
    { t: "Administration systèmes et réseaux", d: "Comptes, droits d'accès, messagerie professionnelle, réseau, sauvegardes." },
    { t: "Maintenance", d: "Mises à jour, correctifs, suivi du parc et des licences." },
    { t: "Infogérance", d: "Prise en charge de tout ou partie de votre informatique, avec un périmètre écrit." },
  ],
  outcomes: [
    "Un interlocuteur unique pour les incidents et les demandes.",
    "Des accès et des sauvegardes sous contrôle.",
  ],
  solutions: [],
  seo: "Support utilisateurs, helpdesk, administration systèmes et réseaux, maintenance et infogérance.",
};

export const ALL_EXPERTISES = [...EXPERTISES, IT_SERVICES];

export type Solution = {
  slug: "waypulse" | "waypilot" | "waylog" | "waycare";
  name: string;
  category: string;
  tagline: string;
  summary: string;
  problem: string;
  features: Item[];
  audience: string;
  market: string;
  url: string;
  proof?: string;
  seo: string;
};

export const SOLUTIONS: Solution[] = [
  {
    slug: "waypulse",
    name: "WayPulse",
    category: "Prospection commerciale intelligente",
    tagline: "Du signal d'achat au client fidèle.",
    summary:
      "WayPulse repère les entreprises qui ont une raison réelle d'acheter, trouve les bons interlocuteurs, prépare l'approche que vous validez et suit la relation jusqu'à la signature, puis dans la durée.",
    problem:
      "Prospecter prend du temps et donne peu quand on écrit au hasard. Le bon moment pour se présenter existe, mais il est dispersé dans les annonces légales, les marchés publics et les sites des entreprises.",
    features: [
      { t: "Rechercher", d: "Les entreprises de votre cible dans l'annuaire officiel, et les personnes à qui parler. Coordonnées reprises des sites, jamais devinées." },
      { t: "Détecter", d: "Chaque matin, les entreprises qui viennent de bouger : annonces BODACC, marchés BOAMP, recrutements, site lent. Chaque signal est daté et sourcé." },
      { t: "Valider", d: "Un brouillon d'approche qui cite ce qui a été constaté. Rien ne part sans votre accord." },
      { t: "Conclure et développer", d: "Réponses classées, opportunités suivies, devis accepté en ligne, relation suivie après la signature." },
    ],
    audience: "Dirigeants et équipes commerciales B2B.",
    market: "France",
    url: "https://waypulse.wayzure.com",
    seo: "WayPulse, logiciel de prospection commerciale B2B : détection de signaux d'achat, contacts vérifiés, approche validée, suivi jusqu'à la signature.",
  },
  {
    slug: "waypilot",
    name: "WayPilot",
    category: "Contrôle qualité des catalogues e-commerce",
    tagline: "Les erreurs qui bloquent vos ventes, trouvées et corrigées.",
    summary:
      "WayPilot trouve dans une boutique WooCommerce ou Shopify les produits que les clients ne peuvent pas commander, les prix faux et les variations en double, puis les corrige après validation.",
    problem:
      "Une taille affichée mais impossible à commander, un prix à zéro, une variation en double : l'administration de la boutique ne le signale pas, et le client part sans rien dire.",
    features: [
      { t: "Ventes bloquées", d: "Tailles ou options sans variation commandable, variations en double, prix absent ou à zéro." },
      { t: "Prix contradictoires", d: "Prix de la description différent du prix affiché, promotion plus chère que le prix normal." },
      { t: "Catalogue mal tenu", d: "Références absentes ou en double, images répétées, produits sans catégorie ni description." },
      { t: "Visibilité sur Google", d: "Codes-barres invalides, images trop petites pour Google Shopping, textes alternatifs manquants." },
    ],
    audience: "E-commerçants et agences qui gèrent des boutiques WooCommerce ou Shopify.",
    market: "France",
    url: "https://waypilot.wayzure.com",
    proof: "Cas client publié avec l'accord de la boutique JAARAY : 55 corrections appliquées après validation, sans échec.",
    seo: "WayPilot, audit et correction de catalogues WooCommerce et Shopify : ventes bloquées, prix contradictoires, données produit et visibilité Google.",
  },
  {
    slug: "waylog",
    name: "WayLog",
    category: "Gestion logistique et opérations",
    tagline: "Le bon de livraison papier se perd. La preuve signée, non.",
    summary:
      "WayLog remplace le bordereau papier par une preuve de livraison signée sur le téléphone du chauffeur, avec photo, position GPS et heure, et donne au donneur d'ordre une vue en direct sur ses tournées.",
    problem:
      "Quantité contestée, bon perdu, camion parti sans nouvelles : sans trace au moment de la livraison, c'est la parole de l'un contre celle de l'autre, et la facturation attend.",
    features: [
      { t: "Bordereau numérique", d: "Client, marchandises et chauffeur saisis au bureau, avec un numéro et un QR code de suivi." },
      { t: "Signature sur place", d: "Le client vérifie les quantités et signe du doigt. Heure et position sont jointes à la preuve." },
      { t: "Réserves documentées", d: "En cas de manquant ou de casse, photo et motif obligatoires, et le bordereau passe en litige." },
      { t: "Pensé pour le terrain", d: "Fonctionne sans réseau, preuve protégée par une empreinte numérique, bon PDF envoyé au client." },
    ],
    audience: "Grossistes, distributeurs et transporteurs.",
    market: "Guinée",
    url: "https://waylog.wayzure.com",
    seo: "WayLog, bordereau de livraison numérique et preuve de livraison signée pour grossistes, distributeurs et transporteurs en Guinée.",
  },
  {
    slug: "waycare",
    name: "Waycare",
    category: "Plateforme numérique de santé",
    tagline: "La santé, organisée simplement, en Guinée et depuis la diaspora.",
    summary:
      "Waycare permet de trouver un médecin vérifié en Guinée, de prendre rendez-vous, de consulter à distance et de tenir son dossier médical. Les membres de la diaspora peuvent régler à distance le parcours de soins d'un proche.",
    problem:
      "Trouver le bon médecin, garder ses ordonnances, payer des soins pour un proche resté au pays : tout passe encore par le bouche-à-oreille, le papier et les transferts d'argent.",
    features: [
      { t: "Annuaire et rendez-vous", d: "Médecins vérifiés par spécialité et par quartier, réservation en ligne." },
      { t: "Dossier médical", d: "Ordonnances, comptes rendus et documents, chiffrés et accessibles au seul patient." },
      { t: "Option diaspora", d: "Paiement à distance d'un acte médical, le proche reçoit un QR code pour la consultation ou les médicaments." },
      { t: "Téléexpertise", d: "Un médecin en Guinée peut solliciter l'avis d'un confrère, en Guinée ou à l'international." },
    ],
    audience: "Patients en Guinée, membres de la diaspora et professionnels de santé.",
    market: "Guinée et diaspora",
    url: "https://www.waycare.care",
    proof: "Données de santé hébergées dans l'Union européenne sur une infrastructure certifiée HDS. Application utilisable plusieurs heures sans réseau.",
    seo: "Waycare, plateforme de santé numérique en Guinée : annuaire de médecins, rendez-vous, téléconsultation, dossier médical et option diaspora.",
  },
];

export const STEPS: Item[] = [
  { t: "Un premier échange", d: "Trente minutes, en visio ou par téléphone. Vous exposez la situation, nous posons les questions qui comptent." },
  { t: "Une proposition écrite", d: "Ce qui sera fait, ce qui ne le sera pas, le délai et le prix. Si le projet ne nous paraît pas utile, nous le disons." },
  { t: "Des livraisons courtes", d: "Le travail avance par étapes de quelques semaines. Vous voyez le résultat et vous validez avant la suite." },
  { t: "Un suivi après la mise en service", d: "Maintenance, évolutions et formation : vos équipes doivent pouvoir s'en servir sans nous." },
];

/** « Wayzure en chiffres » (valeurs données par la direction, novembre 2026). À mettre à jour ici. */
export const KEY_FIGURES = [
  { value: 2021, prefix: "depuis", label: "Au service des entreprises", detail: "Wayzure a été fondée en 2021 à Clamart, aux portes de Paris." },
  { value: 2, label: "Marchés", detail: "La France et la Guinée, avec une société dans chaque pays." },
  { value: 4, label: "Solutions éditées", detail: "WayPulse, WayPilot, WayLog et Waycare, en service." },
  { value: 20, suffix: "+", label: "Projets d'envergure réalisés", detail: "Pour des entreprises, des institutions et des associations." },
];
