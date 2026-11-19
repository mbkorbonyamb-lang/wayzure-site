// Candidatures spontanées : listes et limites partagées par le formulaire et l'API.
export const DOMAINS = [
  "Data & Intelligence artificielle",
  "Conseil",
  "Développement numérique",
  "Formation",
  "Services IT",
  "Autre domaine",
] as const;

/** Libellés anglais des domaines (la valeur envoyée reste le domaine français). */
export const DOMAINS_EN: Record<(typeof DOMAINS)[number], string> = {
  "Data & Intelligence artificielle": "Data & artificial intelligence",
  "Conseil": "Consulting",
  "Développement numérique": "Software development",
  "Formation": "Training",
  "Services IT": "IT services",
  "Autre domaine": "Other field",
};

export const COUNTRIES = ["France", "Guinée", "Sénégal", "Côte d'Ivoire", "Mali", "Maroc", "Belgique", "Canada"] as const;
export const COUNTRIES_EN = ["France", "Guinea", "Senegal", "Côte d'Ivoire", "Mali", "Morocco", "Belgium", "Canada", "United Kingdom", "United States"] as const;

/** CV : PDF uniquement, 4 Mo au plus (la limite d'une requête sur Vercel est de 4,5 Mo). */
export const CV_MAX_BYTES = 4 * 1024 * 1024;

/** Durée de conservation annoncée aux candidats (politique de confidentialité et formulaire). */
export const RETENTION = "2 ans à compter de notre dernier échange";
export const RETENTION_EN = "for 2 years from our last exchange";
