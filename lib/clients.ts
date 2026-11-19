// Logos des clients affichés dans la bande « Ils nous font confiance » (accueil).
// N'ajouter un client qu'avec son accord et son logo officiel (fichier dans public/clients/, SVG ou PNG transparent).
// tile: true pour un logo livré sur son propre fond de couleur : il remplit le cartouche, en couleur, sans retouche.
// Tant que la liste est vide, la bande n'apparaît pas. Sous 4 logos, ils sont affichés fixes et centrés (pas de défilement).
export type ClientLogo = { name: string; src: string; w: number; h: number; tile?: boolean };
export const CLIENT_LOGOS: ClientLogo[] = [
  { name: "JAARAY", src: "/clients/jaaray.webp", w: 704, h: 320, tile: true },
  { name: "Africa Fight League", src: "/clients/afl.webp", w: 640, h: 304 },
];
