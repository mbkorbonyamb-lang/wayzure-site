// Données structurées schema.org, injectées en JSON-LD.
import { SITE_URL } from "@/lib/company";

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

/** Fil d'Ariane : [libellé, chemin] à partir de l'accueil. */
export function breadcrumb(items: [string, string][]) {
  return {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [["Accueil", "/"] as [string, string], ...items].map(([name, path], i) => ({
      "@type": "ListItem", position: i + 1, name, item: `${SITE_URL}${path === "/" ? "" : path}`,
    })),
  };
}
