// Photographies d'illustration, servies par le CDN d'Unsplash (licence Unsplash : usage commercial libre,
// sans obligation de crédit). Les personnes photographiées ne sont ni des collaborateurs ni des clients
// de Wayzure : ne jamais les légender comme tels. Mention dans les mentions légales.

export type Photo = { id: string; alt: string; w: number; h: number; credit: string };

const P = (id: string, alt: string, credit: string, w = 1600, h = 1067): Photo => ({ id, alt, w, h, credit });

export const PHOTOS = {
  hero: P("1573496267526-08a69e46a409", "Deux femmes en rendez-vous de travail autour d'une table, dans un bureau lumineux.", "Christina Morillo (WOCinTech Chat)"),
  data: P("1573162915955-6a8ba9d2fe20", "Une femme travaille sur un ordinateur portable près d'une baie vitrée.", "Christina Morillo (WOCinTech Chat)"),
  conseil: P("1758519289074-9de36003622b", "Deux consultants étudient des graphiques sur un ordinateur portable.", "Unsplash"),
  dev: P("1674916972909-a124c6c9ada6", "Un développeur concentré travaille sur son ordinateur portable.", "Unsplash"),
  formation: P("1573167691330-597fd91bc6c7", "Une intervenante échange avec des participantes autour d'une table.", "Christina Morillo (WOCinTech Chat)"),
  it: P("1653566031535-bcf33e1c2893", "Une équipe échange autour d'une table avec ordinateurs et tablette.", "Unsplash"),
  equipe: P("1573164574572-cb89e39749b4", "Une équipe réunie autour d'une grande table de réunion.", "Christina Morillo (WOCinTech Chat)"),
  contact: P("1573164574397-dd250bc8a598", "Trois femmes échangent autour d'une table avec leurs ordinateurs.", "Christina Morillo (WOCinTech Chat)"),
  sante: P("1536064479547-7ee40b74b807", "Une médecin reçoit une jeune patiente en consultation.", "Unsplash"),
} satisfies Record<string, Photo>;

/** Photo de chaque pôle et des services IT, par slug. */
export const POLE_PHOTOS: Record<string, Photo> = {
  "data-intelligence-artificielle": PHOTOS.data,
  conseil: PHOTOS.conseil,
  "developpement-numerique": PHOTOS.dev,
  formation: PHOTOS.formation,
  "services-it": PHOTOS.it,
};

/** Photo d'illustration de certaines pages produit. */
export const SOLUTION_PHOTOS: Record<string, Photo> = { waycare: PHOTOS.sante };

export const photoSrc = (p: Photo) => `https://images.unsplash.com/photo-${p.id}`;
