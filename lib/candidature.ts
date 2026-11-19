// Candidatures spontanées : listes et limites partagées par le formulaire et l'API.
export const DOMAINS = [
  "Data & Intelligence artificielle",
  "Conseil",
  "Développement numérique",
  "Formation",
  "Services IT",
  "Autre domaine",
] as const;

export const COUNTRIES = ["France", "Guinée", "Sénégal", "Côte d'Ivoire", "Mali", "Maroc", "Belgique", "Canada"] as const;

/** CV : PDF uniquement, 4 Mo au plus (la limite d'une requête sur Vercel est de 4,5 Mo). */
export const CV_MAX_BYTES = 4 * 1024 * 1024;

/** Durée de conservation annoncée aux candidats (politique de confidentialité et formulaire). */
export const RETENTION = "2 ans à compter de notre dernier échange";
