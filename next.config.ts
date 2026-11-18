import type { NextConfig } from "next";

// Anciennes adresses (site WordPress et première version du nouveau site), renvoyées vers la page la plus proche.
// Next.js répond en 308, l'équivalent permanent du 301 que Google traite de la même façon.
const OLD: Record<string, string> = {
  "/accueil": "/",
  "/page-de-maintenance": "/",
  "/qui-sommes-nous": "/a-propos",
  "/qui-sommes-nous-2": "/a-propos",
  "/notre-vision": "/a-propos",
  "/nos-valeurs": "/a-propos",
  "/nos-engagements": "/a-propos",
  "/nous-contacter": "/contact",
  "/nous-joindre": "/contact",
  "/15c42-web-agency-gb-contact-us": "/contact",
  "/mentions-legales-2": "/confidentialite",
  "/politique-de-confidentialite": "/confidentialite",
  "/nos-services": "/expertises",
  "/secteurs-dactivite": "/expertises",
  "/secteurs-dactivite-2": "/expertises",
  "/conseil": "/expertises/conseil",
  "/conseil-et-communication-en-marketing": "/expertises/conseil",
  "/logiciels-plates-formes-et-site-web": "/expertises/developpement-numerique",
  "/conception-et-developpement-de-logiciel": "/expertises/developpement-numerique",
  "/lintegration-de-systemes": "/expertises/developpement-numerique",
  "/formation-et-assistance": "/expertises/formation",
  "/linfogerance-externalisation-ou-outsourcing": "/expertises/services-it",
  "/ingenierie-de-data-center": "/expertises/services-it",
  "/energie": "/expertises",
  "/transport": "/expertises",
  "/telecom": "/expertises",
  "/aeronautique-et-deense": "/expertises",
  "/banque-assurance-et-tertiaire": "/expertises",
  "/actualites": "/",
  "/carrieres": "/a-propos",
  "/emplois": "/a-propos",
  "/offres-demplois": "/a-propos",
  "/realisations": "/solutions",
};

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: false,
  async redirects() {
    // Une barre finale (/nous-contacter/) est d'abord retirée par Next.js, puis la règle s'applique.
    return Object.entries(OLD).map(([source, destination]) => ({ source, destination, permanent: true }));
  },
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "Content-Security-Policy", value: CSP },
        { key: "Strict-Transport-Security", value: "max-age=63072000" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
      ],
    }];
  },
};

export default nextConfig;
