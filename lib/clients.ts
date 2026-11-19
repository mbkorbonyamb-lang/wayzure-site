// Logos des clients affichés dans la grille « Ils nous ont fait confiance » (accueil).
// N'ajouter un client qu'avec son accord et son logo officiel (fichier dans public/clients/, SVG ou PNG transparent).
// tile: true pour un logo livré sur son propre fond de couleur (affiché tel quel, contenu dans le même cartouche que les autres).
// Tant que la liste est vide, la section n'apparaît pas.
// meta / metaEn : secteur et pays, uniquement quand ils sont confirmés (rien d'inventé ; laisser vide sinon).
export type ClientLogo = { name: string; src: string; w: number; h: number; tile?: boolean; meta?: string; metaEn?: string };
export const CLIENT_LOGOS: ClientLogo[] = [
  { name: "JAARAY", src: "/clients/jaaray.webp", w: 704, h: 320, tile: true, meta: "E-commerce · Maroc", metaEn: "E-commerce · Morocco" },
  { name: "Africa Fight League", src: "/clients/afl.webp", w: 640, h: 304, meta: "Sport de combat · France", metaEn: "Combat sports · France" },
  { name: "Direction générale du Fonds de l'hydraulique", src: "/clients/dgfh.webp", w: 261, h: 211, meta: "Administration publique · Guinée", metaEn: "Public administration · Guinea" },
  { name: "ASKALIA Logistique", src: "/clients/askalia.webp", w: 720, h: 354, meta: "Logistique et transport · Guinée", metaEn: "Logistics and transport · Guinea" },
  { name: "Savané Industrie International", src: "/clients/savane.webp", w: 360, h: 353, meta: "Industrie · Guinée", metaEn: "Industry · Guinea" },
  { name: "CECL", src: "/clients/cecl.webp", w: 704, h: 320, tile: true, meta: "Formation en ligne · Égypte", metaEn: "Online training · Egypt" },
  { name: "Modpresco", src: "/clients/modpresco.webp", w: 720, h: 157, meta: "Construction et services · Guinée", metaEn: "Construction and services · Guinea" },
  { name: "Villa Kijani", src: "/clients/villa-kijani.webp", w: 652, h: 244, meta: "Tastout Group · Guinée", metaEn: "Tastout Group · Guinea" },
  { name: "Écarlate", src: "/clients/ecarlate.webp", w: 720, h: 335, meta: "Tastout Group · Guinée", metaEn: "Tastout Group · Guinea" },
  { name: "Khuru", src: "/clients/khuru.webp", w: 720, h: 340, meta: "Tastout Group · Guinée", metaEn: "Tastout Group · Guinea" },
  { name: "Bald Engineer", src: "/clients/bald-engineer.webp", w: 185, h: 105, meta: "Électricité · France", metaEn: "Electrical engineering · France" },
];
