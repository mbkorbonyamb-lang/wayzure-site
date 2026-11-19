// Photographies d'illustration issues d'Unsplash, servies depuis wayzure.com par l'optimiseur d'images (licence Unsplash : usage commercial libre,
// sans obligation de crédit). Les personnes photographiées ne sont ni des collaborateurs ni des clients
// de Wayzure : ne jamais les légender comme tels. Mention dans les mentions légales.

export type Photo = { id: string; alt: string; altEn: string; w: number; h: number; credit: string };

const P = (id: string, alt: string, altEn: string, credit: string, w = 1600, h = 1067): Photo => ({ id, alt, altEn, w, h, credit });

export const PHOTOS = {
  hero: P("1573496267526-08a69e46a409", "Deux femmes en rendez-vous de travail autour d'une table, dans un bureau lumineux.", "Two women in a work meeting around a table, in a bright office.", "Christina Morillo (WOCinTech Chat)"),
  data: P("1573162915955-6a8ba9d2fe20", "Une femme travaille sur un ordinateur portable près d'une baie vitrée.", "A woman works on a laptop near a large window.", "Christina Morillo (WOCinTech Chat)"),
  conseil: P("1758519289074-9de36003622b", "Deux consultants étudient des graphiques sur un ordinateur portable.", "Two consultants study charts on a laptop.", "Unsplash"),
  dev: P("1674916972909-a124c6c9ada6", "Un développeur concentré travaille sur son ordinateur portable.", "A focused developer works on a laptop.", "Unsplash"),
  formation: P("1573167691330-597fd91bc6c7", "Une intervenante échange avec des participantes autour d'une table.", "A trainer talks with participants around a table.", "Christina Morillo (WOCinTech Chat)"),
  it: P("1653566031535-bcf33e1c2893", "Une équipe échange autour d'une table avec ordinateurs et tablette.", "A team talks around a table with laptops and a tablet.", "Unsplash"),
  equipe: P("1573164574572-cb89e39749b4", "Une équipe réunie autour d'une grande table de réunion.", "A team gathered around a large meeting table.", "Christina Morillo (WOCinTech Chat)"),
  contact: P("1573164574397-dd250bc8a598", "Trois femmes échangent autour d'une table avec leurs ordinateurs.", "Three women talk around a table with their laptops.", "Christina Morillo (WOCinTech Chat)"),
  sante: P("1536064479547-7ee40b74b807", "Une médecin reçoit une jeune patiente en consultation.", "A doctor sees a young patient in consultation.", "Unsplash"),
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

/** Photo de chaque secteur, dans l'ordre de la page « Secteurs d'activité ». Vérifiées visuellement le 2026-11-19. */
export const SECTOR_PHOTOS: Photo[] = [
  P("1642929264315-ada2f8c9ecb9", "Une femme en hijab consulte une tablette dans un bureau.", "A woman in a hijab looks at a tablet in an office.", "Francis Odeyemi", 1200, 1600),
  P("1758691737543-09a1b2b715fa", "Une équipe échange en réunion dans un bureau moderne.", "A team talks in a meeting in a modern office.", "Vitaly Gariev"),
  P("1688841747582-41097036109d", "Un technicien souriant, casque de chantier et gilet orange.", "A smiling technician wearing a hard hat and an orange vest.", "Joseph Okon"),
  P("1741874299706-2b8e16839aaa", "Un agriculteur examine ses cultures dans un champ verdoyant.", "A farmer checks his crops in a green field.", "Richard Nyoni"),
  P("1759272548449-7b689a81c8fb", "Deux agents en casque et gilet de sécurité consultent une tablette près de conteneurs.", "Two workers in hard hats and safety vests check a tablet near shipping containers.", "Haris Illahi"),
  P("1586980702112-04d8d47734b5", "Un technicien répare du matériel électronique dans un atelier.", "A technician repairs electronic equipment in a workshop.", "uBreakiFix"),
  P("1687422808384-c896d0efd4ab", "Une commerçante encaisse un client devant sa boutique.", "A shopkeeper takes a payment from a customer in front of her shop.", "Ali Mkumbwa"),
  P("1632215861513-130b66fe97f4", "Une élève lit sur une tablette dans une salle de classe.", "A student reads on a tablet in a classroom.", "Emmanuel Ikwuegbu"),
];

// Source en 2400 px : l'optimiseur de Next.js en tire ensuite chaque taille utile (AVIF ou WebP).
export const photoSrc = (p: Photo) => `https://images.unsplash.com/photo-${p.id}?w=2400&q=85&fm=jpg&fit=max`;
