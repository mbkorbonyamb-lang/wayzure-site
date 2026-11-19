// Cadre HTML commun aux deux langues : chaque langue a sa propre mise en page racine (lang="fr" ou lang="en"),
// qui s'appuie sur ce module pour les polices, le script d'apparence, les données d'organisation et les métadonnées de base.
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { COMPANY, GUINEA, SITE_URL, SOCIAL_LINKS } from "@/lib/company";
import type { Locale } from "@/lib/i18n";

const TX = {
  fr: {
    title: "Wayzure : l'ingénierie numérique au service des transformations majeures",
    desc: "Wayzure, ESN et éditeur de solutions numériques, accompagne administrations, institutions et entreprises : data et intelligence artificielle, conseil IT, développement d'applications, formation et services IT, en France et en Guinée.",
    slogan: "L'ingénierie numérique au service des transformations majeures.",
  },
  en: {
    title: "Wayzure: digital engineering for major transformations",
    desc: "Wayzure, IT services company and software publisher, supports administrations, institutions and companies: data and artificial intelligence, IT consulting, application development, training and IT services, in France and Guinea.",
    slogan: "Digital engineering for major transformations.",
  },
};

export function baseMetadata(locale: Locale): Metadata {
  const T = TX[locale];
  const home = locale === "en" ? "/en" : "/";
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: T.title, template: "%s · Wayzure" },
    description: T.desc,
    alternates: { canonical: home, languages: { fr: "/", en: "/en", "x-default": "/" } },
    openGraph: { type: "website", locale: locale === "en" ? "en_GB" : "fr_FR", siteName: "Wayzure", title: T.title, description: T.desc, url: home },
    twitter: { card: "summary_large_image" },
    verification: {
      ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
      ...(process.env.BING_SITE_VERIFICATION ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } } : {}),
    },
  };
}

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#ffffff" }, { media: "(prefers-color-scheme: dark)", color: "#0a1216" }],
};

// Polices hébergées avec le site (Inter et Plus Jakarta Sans, licence SIL OFL) : aucune requête vers Google.
const body = localFont({ src: "./fonts/inter-latin-var.woff2", weight: "100 900", variable: "--font-body", display: "swap" });
const head = localFont({ src: "./fonts/plus-jakarta-sans-latin-var.woff2", weight: "200 800", variable: "--font-head", display: "swap" });

const orgLd = (locale: Locale) => JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY.name,
  legalName: COMPANY.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}/brand/wayzure-logo-couleur.png`,
  slogan: TX[locale].slogan,
  email: COMPANY.email,
  ...(COMPANY.phone ? { telephone: COMPANY.phone } : {}),
  vatID: COMPANY.vat,
  address: { "@type": "PostalAddress", streetAddress: "132 avenue Jean Jaurès", postalCode: "92140", addressLocality: "Clamart", addressCountry: "FR" },
  areaServed: ["FR", "GN"],
  knowsLanguage: ["fr", "en"],
  sameAs: SOCIAL_LINKS.map(s => s.url),
  subOrganization: { "@type": "Organization", legalName: GUINEA.legalName, address: { "@type": "PostalAddress", addressLocality: "Conakry", addressCountry: "GN" }, ...(COMPANY.phoneGuinea ? { telephone: COMPANY.phoneGuinea } : {}) },
});

export function Shell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html lang={locale} className={`${body.variable} ${head.variable}`} suppressHydrationWarning>
      <head>
        {/* Active les animations d'apparition si JavaScript tourne, et applique l'apparence choisie avant l'affichage. */}
        <script dangerouslySetInnerHTML={{ __html: "var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')d.dataset.theme=t}catch(e){}" }} />
      </head>
      <body className="font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: orgLd(locale) }} />
        {children}
      </body>
    </html>
  );
}
