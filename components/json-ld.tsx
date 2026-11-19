// Données structurées schema.org, injectées en JSON-LD.
import { SITE_URL } from "@/lib/company";
import { href, type Locale } from "@/lib/i18n";

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

/** Fil d'Ariane : [libellé, chemin français] à partir de l'accueil. */
export function breadcrumb(items: [string, string][], locale: Locale = "fr") {
  return {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [[locale === "en" ? "Home" : "Accueil", "/"] as [string, string], ...items].map(([name, path], i) => ({
      "@type": "ListItem", position: i + 1, name, item: `${SITE_URL}${href(locale, path) === "/" ? "" : href(locale, path)}`,
    })),
  };
}
