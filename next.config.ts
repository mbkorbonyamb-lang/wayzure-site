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
  "/emplois": "/carrieres",
  "/offres-demplois": "/carrieres",
  "/recrutement": "/carrieres",
  "/nous-rejoindre": "/carrieres",
  "/realisations": "/solutions",
  // Adresses courtes, faciles à donner à l'oral ou sur un support imprimé.
  "/waypulse": "/solutions/waypulse",
  "/waypilot": "/solutions/waypilot",
  "/waylog": "/solutions/waylog",
  "/waycare": "/solutions/waycare",
  "/data": "/expertises/data-intelligence-artificielle",
  "/ia": "/expertises/data-intelligence-artificielle",
  "/developpement": "/expertises/developpement-numerique",
  "/formation": "/expertises/formation",
  "/services-it": "/expertises/services-it",
  "/infogerance": "/expertises/services-it",
  // Structure WordPress : archives, flux et administration.
  "/category/:path*": "/",
  "/tag/:path*": "/",
  "/author/:path*": "/a-propos",
  "/page/:n": "/",
  "/feed": "/",
  "/comments/feed": "/",
  "/:slug/feed": "/",
  "/wp-admin/:path*": "/",
  "/wp-login.php": "/",
};

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-src 'none'",
  "worker-src 'self'",
  "manifest-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Deux mises en page racines (français et anglais) : la page 404 des adresses inconnues est définie à part.
  experimental: { globalNotFound: true },
  trailingSlash: false,
  // Photos Unsplash récupérées côté serveur et servies depuis wayzure.com (aucune requête du visiteur vers Unsplash).
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/photo-*" }],
    formats: ["image/avif", "image/webp"],
    qualities: [72, 75],
    minimumCacheTTL: 2678400,
  },
  async redirects() {
    // Une barre finale (/nous-contacter/) est d'abord retirée par Next.js, puis la règle s'applique.
    // L'adresse technique de Vercel (wayzure-site.vercel.app) renvoie vers le domaine officiel, pour qu'il n'existe
    // qu'une version publique du site. Les aperçus de branche (wayzure-site-git-…) ne sont pas concernés.
    const vercelHost = { source: "/:path*", has: [{ type: "host" as const, value: "wayzure-site.vercel.app" }], destination: "https://www.wayzure.com/:path*", permanent: true };
    return [vercelHost, ...Object.entries(OLD).map(([source, destination]) => ({ source, destination, permanent: true }))];
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
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
        { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      ],
    }, {
      // Captures, vidéos et logos : fichiers lourds, rarement modifiés (changer le nom du fichier en cas de mise à jour).
      source: "/:dir(captures|video|brand)/:path*",
      headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
    }];
  },
};

export default nextConfig;
