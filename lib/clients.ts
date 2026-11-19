// Logos des clients affichés dans la bande « Ils nous font confiance » (accueil).
// N'ajouter un client qu'avec son accord et son logo officiel (fichier dans public/clients/, SVG ou PNG transparent).
// tile: true pour un logo livré sur son propre fond de couleur : il remplit le cartouche, en couleur, sans retouche.
// Tant que la liste est vide, la bande n'apparaît pas. Sous 4 logos, ils sont affichés fixes et centrés (pas de défilement).
export type ClientLogo = { name: string; src: string; w: number; h: number; tile?: boolean };
export const CLIENT_LOGOS: ClientLogo[] = [
  { name: "JAARAY", src: "/clients/jaaray.webp", w: 704, h: 320, tile: true },
  { name: "Africa Fight League", src: "/clients/afl.webp", w: 640, h: 304 },
  { name: "Direction générale du Fonds de l'hydraulique", src: "/clients/dgfh.webp", w: 261, h: 211 },
  { name: "ASKALIA Logistique", src: "/clients/askalia.webp", w: 720, h: 354 },
  { name: "Savané Industrie International", src: "/clients/savane.webp", w: 360, h: 353 },
  { name: "CECL", src: "/clients/cecl.webp", w: 704, h: 320, tile: true },
  { name: "Modpresco", src: "/clients/modpresco.webp", w: 720, h: 157 },
  { name: "Villa Kijani", src: "/clients/villa-kijani.webp", w: 652, h: 244 },
  { name: "Écarlate", src: "/clients/ecarlate.webp", w: 720, h: 335 },
  { name: "Khuru", src: "/clients/khuru.webp", w: 720, h: 340 },
  { name: "Bald Engineer", src: "/clients/bald-engineer.webp", w: 185, h: 105 },
];
