import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { COMPANY, GUINEA, SITE_URL, SOCIAL_LINKS } from "@/lib/company";

const DESCRIPTION =
  "Wayzure, ESN et éditeur de solutions numériques : data et intelligence artificielle, conseil IT, développement d'applications, formation et services IT, en France et en Guinée.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Wayzure : le numérique qui fait avancer votre entreprise", template: "%s · Wayzure" },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "fr_FR", siteName: "Wayzure", title: "Wayzure : le numérique qui fait avancer votre entreprise", description: DESCRIPTION, url: "/" },
  twitter: { card: "summary_large_image" },
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
    ...(process.env.BING_SITE_VERIFICATION ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } } : {}),
  },
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#ffffff" }, { media: "(prefers-color-scheme: dark)", color: "#0a1216" }],
};

// Polices hébergées avec le site (Inter et Plus Jakarta Sans, licence SIL OFL) : aucune requête vers Google.
const body = localFont({ src: "./fonts/inter-latin-var.woff2", weight: "100 900", variable: "--font-body", display: "swap" });
const head = localFont({ src: "./fonts/plus-jakarta-sans-latin-var.woff2", weight: "200 800", variable: "--font-head", display: "swap" });

const ORG_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY.name,
  legalName: COMPANY.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}/brand/wayzure-logo-couleur.png`,
  slogan: "Le numérique qui fait avancer votre entreprise.",
  email: COMPANY.email,
  ...(COMPANY.phone ? { telephone: COMPANY.phone } : {}),
  vatID: COMPANY.vat,
  address: { "@type": "PostalAddress", streetAddress: "132 avenue Jean Jaurès", postalCode: "92140", addressLocality: "Clamart", addressCountry: "FR" },
  areaServed: ["FR", "GN"],
  sameAs: SOCIAL_LINKS.map(s => s.url),
  subOrganization: { "@type": "Organization", legalName: GUINEA.legalName, address: { "@type": "PostalAddress", addressLocality: "Conakry", addressCountry: "GN" }, ...(COMPANY.phoneGuinea ? { telephone: COMPANY.phoneGuinea } : {}) },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${body.variable} ${head.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        {/* Active les animations d'apparition si JavaScript tourne, et applique l'apparence choisie avant l'affichage. */}
        <script dangerouslySetInnerHTML={{ __html: "var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')d.dataset.theme=t}catch(e){}" }} />
      </head>
      <body className="font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ORG_LD }} />
        {children}
      </body>
    </html>
  );
}
