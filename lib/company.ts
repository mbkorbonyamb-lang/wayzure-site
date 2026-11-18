// Informations légales et coordonnées : une seule source pour tout le site (accueil, contact, mentions légales).
// Une valeur à null n'est pas affichée.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://wayzure.com").replace(/\/$/, "");

export const COMPANY = {
  name: "Wayzure",
  legalName: "Wayzure SAS",
  form: "Société par actions simplifiée",
  capital: "1 000 €" as string | null,
  address: "132 avenue Jean Jaurès, 92140 Clamart, France",
  rcs: "RCS Nanterre 901 524 082",
  vat: "FR22901524082",
  email: "contact@wayzure.com",
  phone: "+33 6 61 35 86 52" as string | null, // numéro officiel (mentions légales, données structurées)
  phoneGuinea: "+224 627 04 45 70" as string | null,
  publisher: "Moussa Baldé, Président",
  linkedin: "https://www.linkedin.com/company/wayzure1",
};

export const GUINEA = {
  legalName: "Wayzure SASU",
  address: "Conakry, République de Guinée",
  office: "Almamya, Conakry",
  rccm: "RCCM GN.TCC.2023.B.01274",
};

export const HOST = {
  name: "Vercel Inc.",
  address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
  url: "https://vercel.com",
};
