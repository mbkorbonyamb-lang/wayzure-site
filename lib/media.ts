// Captures et vidéos des logiciels Wayzure.
// Toutes viennent des applications elles-mêmes (dépôts WayPulse, WayPilot, WayLog, www-waycare),
// affichées avec leurs données d'exemple. Aucune maquette ni capture retouchée.

export type Shot = {
  src: string;
  w: number;
  h: number;
  alt: string;
  /** desktop : fenêtre de navigateur ; phone : téléphone ; document : feuille (rapport, bon). */
  frame: "desktop" | "phone" | "document";
  caption: string;
  url?: string;
};

export type Video = { mp4: string; webm: string; poster: string; w: number; h: number; title: string; duration: string; caption: string };

export const SHOTS: Record<string, Shot[]> = {
  waypulse: [
    { src: "/captures/waypulse/pipeline.webp", w: 1600, h: 1000, frame: "desktop", url: "waypulse.wayzure.com", alt: "WayPulse, tableau des opportunités et devis : chiffre pondéré, devis signés, revenu mensuel récurrent et colonnes Découverte, Proposition, Négociation, Gagnée.", caption: "Opportunités et devis, de la découverte à la signature." },
    { src: "/captures/waypulse/veille.webp", w: 1600, h: 1000, frame: "desktop", url: "waypulse.wayzure.com", alt: "WayPulse, veille : entreprises qui ont montré un besoin dans les 30 derniers jours, avec la preuve, sa date et la personne à qui écrire.", caption: "La veille repère les entreprises qui ont une raison d'acheter." },
    { src: "/captures/waypulse/fiche.webp", w: 1600, h: 1000, frame: "desktop", url: "waypulse.wayzure.com", alt: "WayPulse, fiche prospect : priorité, signaux datés et sourcés, interlocuteur à contacter.", caption: "Chaque prospect arrive avec ses signaux, datés et sourcés." },
    { src: "/captures/waypulse/validation.webp", w: 1600, h: 1000, frame: "desktop", url: "waypulse.wayzure.com", alt: "WayPulse, validation : approche préparée par l'outil, à relire et valider avant tout envoi.", caption: "Rien ne part sans votre validation." },
  ],
  waypilot: [
    { src: "/captures/waypilot/rapport.webp", w: 1600, h: 1138, frame: "document", alt: "Rapport d'audit WayPilot : score qualité 86 %, 218 € de ventes en jeu, problèmes classés par effet sur les ventes.", caption: "Le rapport d'audit : score, ventes en jeu, problèmes classés par effet." },
  ],
  waylog: [
    { src: "/captures/waylog/suivi-mobile.webp", w: 780, h: 1688, frame: "phone", alt: "WayLog sur téléphone : bon de livraison WL-2026-00128, étapes horodatées créé, en transit, livré, et marchandises reçues.", caption: "Ce que reçoit le destinataire : étapes horodatées et marchandises." },
    { src: "/captures/waylog/bon-signe.webp", w: 1323, h: 1234, frame: "document", alt: "Bon de livraison signé généré par WayLog : marchandises commandées et reçues, réserve du destinataire, signature, position GPS et QR code de vérification.", caption: "Le bon signé en PDF, avec réserve, GPS et QR de vérification." },
  ],
  waycare: [
    { src: "/captures/waycare/accueil-mobile.webp", w: 780, h: 1688, frame: "phone", alt: "Waycare sur téléphone : recherche d'un médecin vérifié en Guinée par spécialité et commune.", caption: "Trouver un médecin vérifié en Guinée." },
    { src: "/captures/waycare/parcours-desktop.webp", w: 1600, h: 1314, frame: "desktop", url: "waycare.care", alt: "Waycare : prise de rendez-vous, dossier médical sécurisé et option diaspora pour gérer et régler les soins d'un proche en Guinée.", caption: "Rendez-vous, dossier médical et soins d'un proche à distance." },
    { src: "/captures/waycare/pharmacies-mobile.webp", w: 780, h: 1688, frame: "phone", alt: "Waycare sur téléphone : réseau de pharmacies partenaires en Guinée et à l'international.", caption: "Le réseau de pharmacies partenaires." },
  ],
};

export const PRODUCT_VIDEOS: Record<string, Video> = {
  waypulse: {
    mp4: "/captures/waypulse/parcours.mp4", webm: "/captures/waypulse/parcours.webm", poster: "/captures/waypulse/parcours.webp", w: 1920, h: 1080,
    title: "WayPulse, le parcours complet", duration: "PT42S",
    caption: "Le parcours WayPulse en 42 secondes : identifier, détecter, trouver le décideur, qualifier, convertir.",
  },
};

export const FILM: Video = {
  mp4: "/video/wayzure-film.mp4", webm: "/video/wayzure-film.webm", poster: "/video/wayzure-film.webp", w: 1920, h: 1080,
  title: "Wayzure en 30 secondes", duration: "PT30S",
  caption: "Nos quatre pôles, nos services IT et nos quatre logiciels, en 30 secondes.",
};
