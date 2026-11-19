// Logos des clients affichés dans la bande « Ils nous font confiance » (accueil).
// N'ajouter un client qu'avec son accord et son logo officiel (fichier dans public/clients/, SVG ou PNG transparent).
// Tant que la liste est vide, la bande n'apparaît pas.
export type ClientLogo = { name: string; src: string; w: number; h: number };

export const CLIENT_LOGOS: ClientLogo[] = [];
