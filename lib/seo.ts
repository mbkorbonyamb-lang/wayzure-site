import type { Metadata } from "next";
import { href, type Locale } from "@/lib/i18n";

/** Métadonnées d'une page : titre, description, adresse canonique, versions linguistiques, aperçu de partage.
 *  path : chemin français de la page (« /contact ») ; la version anglaise est sous /en. */
export function meta(path: string, title: string, description: string, locale: Locale = "fr", translated = true): Metadata {
  const url = href(locale, path);
  return {
    title, description,
    alternates: {
      canonical: url,
      ...(translated ? { languages: { fr: path, en: href("en", path), "x-default": path } } : {}),
    },
    openGraph: { type: "website", locale: locale === "en" ? "en_GB" : "fr_FR", alternateLocale: locale === "en" ? "fr_FR" : "en_GB", siteName: "Wayzure", url, title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}
