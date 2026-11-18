import type { NextConfig } from "next";

// Anciennes adresses du site WordPress, renvoyées vers la page la plus proche (redirection permanente 301).
const OLD: Record<string, string> = {
  "/accueil": "/",
  "/page-de-maintenance": "/",
  "/qui-sommes-nous-2": "/a-propos",
  "/notre-vision": "/a-propos",
  "/nos-valeurs": "/a-propos",
  "/nos-engagements": "/a-propos",
  "/nous-contacter": "/contact",
  "/15c42-web-agency-gb-contact-us": "/contact",
  "/mentions-legales-2": "/confidentialite",
  "/secteurs-dactivite": "/#expertises",
  "/secteurs-dactivite-2": "/#expertises",
  "/conseil": "/#conseil",
  "/conseil-et-communication-en-marketing": "/#conseil",
  "/logiciels-plates-formes-et-site-web": "/#developpement",
  "/conception-et-developpement-de-logiciel": "/#developpement",
  "/lintegration-de-systemes": "/#developpement",
  "/formation-et-assistance": "/#formation",
  "/linfogerance-externalisation-ou-outsourcing": "/#expertises",
  "/energie": "/#expertises",
  "/transport": "/#expertises",
  "/telecom": "/#expertises",
  "/aeronautique-et-deense": "/#expertises",
  "/banque-assurance-et-tertiaire": "/#expertises",
  "/ingenierie-de-data-center": "/#expertises",
  "/actualites": "/",
  "/carrieres": "/",
  "/offres-demplois": "/",
};

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return Object.entries(OLD).map(([source, destination]) => ({ source, destination, permanent: true }));
  },
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ],
    }];
  },
};

export default nextConfig;
