import type { Metadata } from "next";

/** Métadonnées d'une page : titre, description, adresse canonique, aperçu de partage. */
export function meta(path: string, title: string, description: string): Metadata {
  return {
    title, description,
    alternates: { canonical: path },
    openGraph: { type: "website", locale: "fr_FR", siteName: "Wayzure", url: path, title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}
