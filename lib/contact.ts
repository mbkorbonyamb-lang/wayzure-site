// Sujets proposés dans le formulaire de contact, partagés par le formulaire et l'API.
export const TOPICS = [
  "Data & Intelligence artificielle",
  "Conseil",
  "Développement numérique",
  "Formation",
  "Services IT",
  "WayPulse, WayPilot, WayLog ou Waycare",
  "Autre demande",
] as const;

/** Libellés anglais des sujets (la valeur envoyée reste le sujet français). */
export const TOPICS_EN: Record<(typeof TOPICS)[number], string> = {
  "Data & Intelligence artificielle": "Data & artificial intelligence",
  "Conseil": "Consulting",
  "Développement numérique": "Software development",
  "Formation": "Training",
  "Services IT": "IT services",
  "WayPulse, WayPilot, WayLog ou Waycare": "WayPulse, WayPilot, WayLog or Waycare",
  "Autre demande": "Other request",
};
