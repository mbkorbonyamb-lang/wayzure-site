import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import { COMPANY, GUINEA, SITE_URL } from "@/lib/company";

const DESCRIPTION = "Wayzure accompagne les PME et les organisations en data, conseil, développement numérique et formation. Basée à Clamart.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Wayzure : data, conseil et développement numérique", template: "%s · Wayzure" },
  description: DESCRIPTION,
  openGraph: { type: "website", locale: "fr_FR", siteName: "Wayzure", title: "Wayzure", description: DESCRIPTION },
  twitter: { card: "summary_large_image" },
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
    ...(process.env.BING_SITE_VERIFICATION ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } } : {}),
  },
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#ffffff" }, { media: "(prefers-color-scheme: dark)", color: "#0b0c0f" }],
};

// Polices servies par le site lui-même : aucune requête des visiteurs vers Google.
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter", display: "swap" });
const display = Inter_Tight({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-display", display: "swap" });

const ORG_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY.name,
  legalName: COMPANY.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}/logo-wayzure.png`,
  email: COMPANY.email,
  ...(COMPANY.phone ? { telephone: COMPANY.phone } : {}),
  vatID: COMPANY.vat,
  address: { "@type": "PostalAddress", streetAddress: "132 avenue Jean Jaurès", postalCode: "92140", addressLocality: "Clamart", addressCountry: "FR" },
  sameAs: [COMPANY.linkedin],
  subOrganization: { "@type": "Organization", legalName: GUINEA.legalName, address: { "@type": "PostalAddress", addressLocality: "Conakry", addressCountry: "GN" } },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${display.variable}`}>
      <body className="font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ORG_LD }} />
        {children}
      </body>
    </html>
  );
}
