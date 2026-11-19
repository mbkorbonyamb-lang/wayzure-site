// Deux langues : le français (adresses sans préfixe) et l'anglais (adresses sous /en).
// Les pages anglaises reprennent la même arborescence : /expertises/conseil → /en/expertises/conseil.

export type Locale = "fr" | "en";
export const LOCALES: Locale[] = ["fr", "en"];

/** Adresse d'une page dans une langue, à partir de son chemin français (« / », « /contact »…). */
export const href = (locale: Locale, path: string) => (locale === "en" ? (path === "/" ? "/en" : `/en${path}`) : path);

export const other = (locale: Locale): Locale => (locale === "fr" ? "en" : "fr");

/** Choisit le texte de la langue courante. */
export const t = <T,>(locale: Locale, fr: T, en: T): T => (locale === "en" ? en : fr);

/** Textes du cadre commun (en-tête, pied de page, bandeaux). */
export const UI = {
  fr: {
    skip: "Aller au contenu",
    home: "Accueil",
    homeAria: "Wayzure, accueil",
    nav: "Navigation principale",
    expertises: "Expertises",
    sectors: "Secteurs d'activité",
    solutions: "Solutions",
    about: "À propos",
    careers: "Carrières",
    contact: "Contact",
    cta: "Parler de votre projet",
    menu: "Menu",
    footerLine: "L'ingénierie numérique au service des transformations majeures. ESN et éditeur, Wayzure accompagne administrations, institutions et entreprises en France et en Guinée.",
    reach: "Nous joindre",
    france: "France",
    guinea: "Guinée",
    whatsapp: "WhatsApp Guinée",
    whatsappHello: "Bonjour Wayzure,",
    legal: "Mentions légales",
    privacy: "Confidentialité",
    ctaTitle: "Parlons de votre projet.",
    ctaText: "Décrivez la situation en quelques lignes. Nous revenons vers vous avec des questions précises ou une première analyse, sans engagement.",
    write: "Nous écrire",
    switchTo: "English",
    switchAria: "View this page in English",
    trusted: "Ils nous ont fait confiance",
    poles: "Quatre pôles",
    transversal: "Services IT transversaux",
  },
  en: {
    skip: "Skip to content",
    home: "Home",
    homeAria: "Wayzure, home",
    nav: "Main navigation",
    expertises: "Expertise",
    sectors: "Industries",
    solutions: "Solutions",
    about: "About",
    careers: "Careers",
    contact: "Contact",
    cta: "Discuss your project",
    menu: "Menu",
    footerLine: "Digital engineering for major transformations. An IT services company and software publisher, Wayzure supports administrations, institutions and companies in France and Guinea.",
    reach: "Get in touch",
    france: "France",
    guinea: "Guinea",
    whatsapp: "WhatsApp Guinea",
    whatsappHello: "Hello Wayzure,",
    legal: "Legal notice (FR)",
    privacy: "Privacy (FR)",
    ctaTitle: "Let's talk about your project.",
    ctaText: "Describe the situation in a few lines. We will come back to you with precise questions or a first analysis, with no commitment.",
    write: "Write to us",
    switchTo: "Français",
    switchAria: "Voir cette page en français",
    trusted: "They have trusted us",
    poles: "Four practices",
    transversal: "Cross-cutting IT services",
  },
} as const;

export type Ui = (typeof UI)[Locale];
