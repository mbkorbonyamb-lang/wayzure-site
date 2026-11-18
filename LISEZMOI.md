# wayzure.com

Site vitrine de Wayzure, refait en Next.js (remplace le site WordPress.com).

## Décisions (Moussa, 18/11/2026)

- Quatre pôles : Data, Conseil, Développement numérique, Formation.
- Ne pas afficher l'infogérance ni la cybersécurité tant que Wayzure ne les livre pas. Le cloud apparaît seulement comme partie du développement.
- Formation : aucune mention « éligible OPCO » sans certification Qualiopi.
- Les produits (WayPulse, WayPilot, WayLog, Waycare) servent de preuves concrètes.
- Pas de promesse de délai de réponse, pas de témoignage anonyme.
- Style des textes : phrases simples, pas de tirets, pas de formules creuses.

## Où modifier

- Coordonnées et informations légales : `lib/company.ts` (une seule source pour tout le site).
- Textes des pôles et des produits : `lib/content.ts`.
- Redirections des anciennes adresses WordPress : `next.config.ts`.

## Mise en ligne : ne toucher qu'à A et www

Le domaine wayzure.com est enregistré chez WordPress.com, et sa zone DNS y est gérée. Cette zone porte les e-mails IONOS (MX, SPF, DKIM, DMARC), DKIM Resend et les sous domaines waypulse, waypilot, waylog.

Pour basculer vers Vercel : ajouter wayzure.com et www.wayzure.com au projet Vercel, puis changer uniquement l'enregistrement A de wayzure.com et le CNAME www, avec les valeurs que Vercel affiche. Ne jamais modifier ni supprimer MX, TXT ou les autres sous domaines.

## Commandes

```
npm install
npm run dev      # http://localhost:3000
npm run build
```

Audit de l'ancien site : https://claude.ai/artifact/P1ZDPg9Yo7rPTwaiyiDLB9
