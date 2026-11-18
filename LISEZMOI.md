# wayzure.com

Site vitrine de Wayzure en Next.js, hébergé sur Vercel. Remplace l'ancien site WordPress.com.

## Positionnement (cahier des charges de Moussa, 18/11/2026)

- Wayzure est une ESN et un éditeur de solutions numériques, en France (Wayzure SAS) et en Guinée (Wayzure SASU).
- Signature : « Le numérique qui fait avancer votre entreprise. »
- Quatre pôles : Data & Intelligence artificielle, Conseil, Développement numérique, Formation. Plus les services IT (support, helpdesk, administration systèmes et réseaux, maintenance, infogérance).
- Quatre solutions : WayPulse, WayPilot, WayLog, Waycare. Les faits repris sur chaque produit viennent de son propre site.
- Couleurs : bleu #0782C6, bleu profond #19323E, noir et blanc. Les boutons et liens utilisent #0670AA, une nuance du bleu qui passe le contraste minimal d'accessibilité sur fond blanc.
- Aucun client, témoignage ou chiffre inventé. Formation : aucune mention « éligible OPCO » sans certification Qualiopi.

## Où modifier

- Coordonnées et informations légales : `lib/company.ts` (une seule source pour tout le site).
- Pôles, services IT, solutions, méthode : `lib/content.ts`.
- Anciennes adresses redirigées : `next.config.ts`.
- Logos : `public/brand/` (symbole couleur, versions noire et blanche vectorisées). Originaux fournis par Moussa dans les fichiers du projet, dossier `logo/`.

## Formulaire de contact

Le formulaire envoie un e-mail via l'API Resend. À renseigner dans Vercel, Settings > Environment Variables :

- `RESEND_API_KEY` (obligatoire) : clé API Resend, avec le domaine wayzure.com vérifié dans Resend.
- `CONTACT_TO` (facultatif) : destinataire, par défaut contact@wayzure.com.
- `CONTACT_FROM` (facultatif) : expéditeur, par défaut `Site Wayzure <site@wayzure.com>`.

Sans clé, la page Contact n'affiche pas le formulaire : elle propose l'e-mail direct, avec l'objet prérempli selon le sujet. La clé est lue au build : après l'avoir ajoutée, redéployer pour faire apparaître le formulaire.

Autres variables facultatives : `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`.

## Mise en ligne : ne toucher qu'à A et www

Le domaine wayzure.com est enregistré chez WordPress.com, et sa zone DNS y est gérée. Cette zone porte les e-mails IONOS (MX, SPF, DKIM), DMARC, Resend et les sous domaines waypulse, waypilot, waylog.

Pour basculer vers Vercel : ajouter wayzure.com et www.wayzure.com au projet Vercel, vérifier que la branche de production est `main`, puis changer uniquement l'enregistrement A de wayzure.com et le CNAME www, avec les valeurs que Vercel affiche. Ne jamais modifier ni supprimer MX, TXT ou les autres sous domaines.

## Commandes

```
npm install
npm run dev      # http://localhost:3000
npm run build
```
