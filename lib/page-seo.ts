// Titres et descriptions des pages pour les moteurs de recherche (balises <title> et meta description).
// Un seul endroit pour les relire et les ajuster. Repères : titre de 60 caractères au plus
// (« · Wayzure » est ajouté automatiquement, sauf pour l'accueil) ; description d'environ 150 à 170 caractères,
// avec les mots que tapent les visiteurs. Ne rien promettre qui ne soit pas vrai.
import type { Locale } from "./i18n";

type Seo = { title: string; desc: string };

type PageSeo = {
  home: Seo; expertises: Seo; sectors: Seo; solutions: Seo; about: Seo; values: Seo;
  news: Seo; careers: Seo; contact: Seo; references: Seo; caseAfl: Seo;
  expertise: Record<string, Seo>;
  solution: Record<string, Seo>;
  newsCategory: Record<string, string>;
};

export const PAGE_SEO: Record<Locale, PageSeo> = {
  fr: {
    home: {
      title: "Wayzure : ESN et éditeur de logiciels, France et Guinée",
      desc: "ESN et éditeur de logiciels : data et IA, conseil IT, développement d'applications métiers, formation et services IT pour administrations, institutions et entreprises en France et en Guinée.",
    },
    expertises: {
      title: "Expertises : data et IA, conseil IT, développement, formation",
      desc: "Data et intelligence artificielle, conseil en systèmes d'information, développement d'applications métiers, formation IT et infogérance : les expertises de Wayzure pour les organisations publiques et privées.",
    },
    sectors: {
      title: "Secteurs d'activité : public, banque, mines, santé, logistique",
      desc: "Secteur public, banque et assurance, mines et énergie, agriculture, transport et logistique, télécoms, commerce, santé et éducation : comment Wayzure accompagne la transformation numérique de chaque secteur.",
    },
    solutions: {
      title: "Logiciels métiers et développement sur mesure",
      desc: "WayPulse pour la prospection B2B, WayPilot pour les catalogues e-commerce, WayLog pour la logistique, Waycare pour la santé : des logiciels prêts à l'emploi, ou une application développée sur mesure.",
    },
    about: {
      title: "À propos : ESN et éditeur de logiciels depuis 2021",
      desc: "Wayzure, ESN et éditeur de logiciels créé en 2021 : mission, approche et implantations à Clamart (France) et à Conakry (Guinée), au service des administrations, des institutions et des entreprises.",
    },
    values: {
      title: "Nos valeurs : rigueur, pragmatisme, résilience, transparence",
      desc: "Souveraineté des données, pragmatisme opérationnel, solutions adaptées au terrain, transparence et autonomie des équipes : les engagements de Wayzure dans chaque projet numérique.",
    },
    news: {
      title: "Actualités : projets, événements et innovations",
      desc: "Les actualités de Wayzure : projets et réalisations, événements, innovations et nouveautés de nos logiciels, en France et en Guinée.",
    },
    careers: {
      title: "Carrières : rejoindre une ESN en France et en Guinée",
      desc: "Data et IA, conseil IT, développement d'applications, formation, services IT : envoyez votre candidature spontanée à Wayzure, ESN et éditeur de logiciels implantée en France et en Guinée.",
    },
    references: {
      title: "Références : administrations, groupes et entreprises",
      desc: "Direction générale du Fonds de l'hydraulique, Tastout Group, Africa Fight League, ASKALIA, Modpresco, JAARAY : les projets numériques et de conseil menés par Wayzure en Guinée, en France et au-delà.",
    },
    caseAfl: {
      title: "AFL : d'une ambition sportive à une réalité institutionnelle",
      desc: "Comment Wayzure a accompagné Africa Fight League : conseil stratégique, nom, identité visuelle, première ceinture et démarches institutionnelles, jusqu'aux premiers combats professionnels de MMA en Guinée.",
    },
    contact: {
      title: "Contact : parlez-nous de votre projet numérique",
      desc: "Un projet de data, d'IA, de conseil IT, de développement d'application, de formation ou de services IT ? Écrivez à Wayzure ou appelez nos équipes en France et en Guinée.",
    },
    expertise: {
      "data-intelligence-artificielle": {
        title: "Data et intelligence artificielle : BI, IA générative",
        desc: "Tableaux de bord et business intelligence, qualité et gouvernance des données, IA générative et automatisation pour les administrations, les institutions et les entreprises, en France et en Guinée.",
      },
      conseil: {
        title: "Conseil IT : stratégie digitale, SI, cybersécurité",
        desc: "Stratégie digitale, schéma directeur, audit des systèmes d'information, cybersécurité, cloud, AMOA et organisation des processus : pour décider avant d'investir, puis piloter jusqu'au résultat.",
      },
      "developpement-numerique": {
        title: "Développement d'applications métiers, web et mobiles",
        desc: "Logiciels métiers, applications web et mobiles, plateformes SaaS, API, intégration ERP et CRM, modernisation applicative : Wayzure développe et maintient les outils de votre organisation.",
      },
      formation: {
        title: "Formation IT et numérique : data, IA, cybersécurité",
        desc: "Formation professionnelle aux outils numériques, à la data, à l'intelligence artificielle et à la cybersécurité, et conduite du changement, sur les cas réels de vos équipes.",
      },
      "services-it": {
        title: "Services IT : support, helpdesk, maintenance, infogérance",
        desc: "Support utilisateurs, helpdesk, administration systèmes et réseaux, maintenance du parc et infogérance : un parc informatique suivi et des utilisateurs qui ont une réponse.",
      },
    },
    solution: {
      waypulse: {
        title: "WayPulse : logiciel de prospection commerciale B2B",
        desc: "WayPulse aide vos équipes commerciales à détecter les signaux d'achat, trouver les bons décideurs avec des contacts vérifiés et suivre chaque opportunité jusqu'à la signature.",
      },
      waypilot: {
        title: "WayPilot : audit de catalogue WooCommerce et Shopify",
        desc: "WayPilot trouve et corrige les erreurs de votre catalogue WooCommerce ou Shopify : ventes bloquées, prix contradictoires, fiches produit incomplètes, visibilité Google.",
      },
      waylog: {
        title: "WayLog : bon de livraison numérique et preuve signée",
        desc: "WayLog remplace le bon de livraison papier par une preuve de livraison signée et horodatée, pour les grossistes, distributeurs et transporteurs en Guinée.",
      },
      waycare: {
        title: "Waycare : plateforme de santé numérique en Guinée",
        desc: "Waycare, plateforme de santé numérique en Guinée : annuaire de médecins, prise de rendez-vous, téléconsultation, dossier médical et paiement des soins à distance pour la diaspora.",
      },
    },
    newsCategory: {
      "actualites-wayzure": "La vie de Wayzure en France et en Guinée : annonces, équipe et nouvelles implantations.",
      "projets-realisations": "Projets et réalisations de Wayzure : data, conseil IT, développement d'applications et formation.",
      evenements: "Les événements, salons et conférences auxquels Wayzure participe, en France et en Guinée.",
      "innovations-solutions": "Nouveautés des logiciels WayPulse, WayPilot, WayLog et Waycare, et innovations de Wayzure.",
    },
  },
  en: {
    home: {
      title: "Wayzure: IT services and software company, France and Guinea",
      desc: "IT services company and software publisher: data and AI, IT consulting, business application development, training and IT services for governments, institutions and companies in France and Guinea.",
    },
    expertises: {
      title: "Expertise: data and AI, IT consulting, development, training",
      desc: "Data and artificial intelligence, information systems consulting, business application development, IT training and managed services: Wayzure's expertise for public and private organisations.",
    },
    sectors: {
      title: "Industries: public sector, banking, mining, health, logistics",
      desc: "Public sector, banking and insurance, mining and energy, agriculture, transport and logistics, telecoms, retail, health and education: how Wayzure supports digital transformation in each industry.",
    },
    solutions: {
      title: "Business software and custom development",
      desc: "WayPulse for B2B prospecting, WayPilot for e-commerce catalogues, WayLog for logistics, Waycare for healthcare: ready-to-use software, or an application built to your requirements.",
    },
    about: {
      title: "About: IT services and software company since 2021",
      desc: "Wayzure, IT services company and software publisher founded in 2021: mission, approach and offices in Clamart (France) and Conakry (Guinea), serving governments, institutions and companies.",
    },
    values: {
      title: "Our values: rigour, pragmatism, resilience, transparency",
      desc: "Data sovereignty, operational pragmatism, solutions built for real conditions, transparency and team autonomy: Wayzure's commitments on every digital project.",
    },
    news: {
      title: "News: projects, events and innovations",
      desc: "Wayzure news: projects and achievements, events, innovations and updates to our software, in France and Guinea.",
    },
    careers: {
      title: "Careers: join an IT services company in France and Guinea",
      desc: "Data and AI, IT consulting, application development, training, IT services: send your speculative application to Wayzure, an IT services and software company in France and Guinea.",
    },
    references: {
      title: "References: public bodies, groups and companies",
      desc: "Guinea's Hydraulic Fund directorate, Tastout Group, Africa Fight League, ASKALIA, Modpresco, JAARAY: digital and consulting projects delivered by Wayzure in Guinea, France and beyond.",
    },
    caseAfl: {
      title: "AFL: from sporting ambition to institutional reality",
      desc: "How Wayzure supported Africa Fight League: strategy consulting, name, visual identity, first belt and institutional relations, through to the first professional MMA fights in Guinea.",
    },
    contact: {
      title: "Contact: tell us about your digital project",
      desc: "A data, AI, IT consulting, application development, training or IT services project? Write to Wayzure or call our teams in France and Guinea.",
    },
    expertise: {
      "data-intelligence-artificielle": {
        title: "Data and artificial intelligence: BI, generative AI",
        desc: "Dashboards and business intelligence, data quality and governance, generative AI and automation for public administrations, institutions and companies in France and Guinea.",
      },
      conseil: {
        title: "IT consulting: digital strategy, IS, cybersecurity",
        desc: "Digital strategy, IT master plans, information systems audits, cybersecurity, cloud, project ownership support and process design: IT consulting to decide before you invest, then steer to results.",
      },
      "developpement-numerique": {
        title: "Business application development: web and mobile",
        desc: "Business software, web and mobile applications, SaaS platforms, APIs, ERP and CRM integration, application modernisation: Wayzure builds and maintains your organisation's tools.",
      },
      formation: {
        title: "IT and digital training: data, AI, cybersecurity",
        desc: "Professional training in digital tools, data, artificial intelligence and cybersecurity, plus change management, built on your teams' real cases.",
      },
      "services-it": {
        title: "IT services: support, helpdesk, maintenance, managed IT",
        desc: "User support, helpdesk, systems and network administration, hardware maintenance and managed IT services: IT that keeps running and users who get answers.",
      },
    },
    solution: {
      waypulse: {
        title: "WayPulse: B2B sales prospecting software",
        desc: "WayPulse helps your sales teams detect buying signals, reach the right decision-makers with verified contacts and follow every opportunity through to signature.",
      },
      waypilot: {
        title: "WayPilot: WooCommerce and Shopify catalogue audit",
        desc: "WayPilot finds and fixes errors in your WooCommerce or Shopify catalogue: blocked sales, conflicting prices, incomplete product pages, Google visibility.",
      },
      waylog: {
        title: "WayLog: digital delivery notes and signed proof",
        desc: "WayLog replaces paper delivery notes with signed, time-stamped proof of delivery, for wholesalers, distributors and carriers in Guinea.",
      },
      waycare: {
        title: "Waycare: digital health platform in Guinea",
        desc: "Waycare, a digital health platform in Guinea: doctor directory, appointment booking, teleconsultation, medical records and remote payment of care for the diaspora.",
      },
    },
    newsCategory: {
      "actualites-wayzure": "Wayzure company news in France and Guinea: announcements, team and new offices.",
      "projets-realisations": "Wayzure projects and achievements: data, IT consulting, application development and training.",
      evenements: "Events, trade shows and conferences Wayzure takes part in, in France and Guinea.",
      "innovations-solutions": "Updates to WayPulse, WayPilot, WayLog and Waycare, and innovations from Wayzure.",
    },
  },
};
