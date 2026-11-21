# Publier une actualité

1. Copier `fr/_modele.md` dans `fr/` et le renommer avec l'adresse voulue, en minuscules et sans accents :
   `fr/lancement-waylog.md` sera publié à l'adresse `/actualites/lancement-waylog`.
2. Remplir l'en-tête :
   - `titre` : le titre de l'article ;
   - `date` : au format AAAA-MM-JJ, par exemple 2026-12-01 ;
   - `categorie` : une des valeurs `actualites-wayzure`, `projets-realisations`, `evenements`, `innovations-solutions` ;
   - `resume` : une ou deux phrases, affichées dans la liste et dans les aperçus de partage ;
   - `image` (facultatif) : une photo déposée dans `public/actualites/`, par exemple `/actualites/lancement-waylog.jpg` ;
     ou une photo Unsplash (adresse `https://images.unsplash.com/photo-…`), jamais une photo présentée comme montrant nos clients ou nos équipes ;
   - `image_alt` : la description de cette photo ;
   - `brouillon: oui` pour préparer un article sans le publier.
3. Écrire le texte sous l'en-tête : `## Intertitre`, paragraphes séparés par une ligne vide, listes avec `- `,
   liens `[texte](https://…)`, **gras**, *italique*, image `![description](/actualites/photo.jpg)`.
4. Pour la version anglaise (facultative), créer le même nom de fichier dans `en/`.

La publication est en ligne après la fusion de la modification sur GitHub (déploiement automatique Vercel).
Une erreur dans l'en-tête (date, catégorie) bloque la mise en ligne et indique le fichier en cause.
Ne publier que des informations réelles et vérifiées : projets avec l'accord du client, événements confirmés.
