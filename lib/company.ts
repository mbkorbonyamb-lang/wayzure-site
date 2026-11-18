// Informations légales et coordonnées : une seule source pour tout le site (accueil, contact, mentions légales).
// Une valeur à null n'est pas affichée. Les valeurs manquantes sont à compléter par Moussa avant la mise en ligne.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://wayzure.com").replace(/\/$/, "");

export const COMPANY = {
  name: "Wayzure",
  legalName: "Wayzure SAS",
  form: "Société par actions simplifiée",
  capital: null as string | null, // ex. « 1 000 € » : à compléter
  address: "132 avenue Jean Jaurès, 92140 Clamart, France",
  rcs: "RCS Nanterre 901 524 082",
  vat: "FR22901524082",
  email: "contact@wayzure.com",
  phone: null as string | null, // numéro officiel à choisir : à compléter
  publisher: "Moussa Baldé, Président",
  linkedin: "https://www.linkedin.com/company/wayzure1",
};

export const GUINEA = {
  legalName: "Wayzure SASU",
  address: "Conakry, République de Guinée",
  rccm: "RCCM GN.TCC.2023.B.01274",
};

export const HOST = {
  name: "Vercel Inc.",
  address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
  url: "https://vercel.com",
};
