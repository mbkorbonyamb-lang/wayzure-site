import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/company";
import { ALL_EXPERTISES, SOLUTIONS } from "@/lib/content";
import { href } from "@/lib/i18n";
import { FILM, SHOTS } from "@/lib/media";
import { getPosts } from "@/lib/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [string, number][] = [
    ["", 1],
    ["/expertises", 0.9],
    ...ALL_EXPERTISES.map(e => [`/expertises/${e.slug}`, 0.8] as [string, number]),
    ["/secteurs-dactivite", 0.8],
    ["/solutions", 0.9],
    ...SOLUTIONS.map(s => [`/solutions/${s.slug}`, 0.7] as [string, number]),
    ["/references", 0.7],
    ["/references/afl", 0.6],
    ["/a-propos", 0.6],
    ["/nos-valeurs", 0.5],
    ["/actualites", 0.6],
    ["/carrieres", 0.6],
    ...getPosts("fr").map(p => [`/actualites/${p.slug}`, 0.5] as [string, number]),
    ["/contact", 0.8],
    ["/mentions-legales", 0.2],
    ["/confidentialite", 0.2],
  ];
  // Images de chaque page (captures des logiciels, affiche du film) pour la recherche d'images.
  const images: Record<string, string[]> = {
    "": [FILM.poster],
    "/a-propos": [FILM.poster],
    "/solutions": SOLUTIONS.map(s => SHOTS[s.slug]?.[0]?.src).filter((x): x is string => Boolean(x)),
    ...Object.fromEntries(SOLUTIONS.map(s => [`/solutions/${s.slug}`, (SHOTS[s.slug] ?? []).map(x => x.src)])),
  };
  // Chaque page existe en français et en anglais, sauf les pages légales (en français seulement).
  // Une actualité sans version anglaise (content/actualites/en) n'est listée qu'en français.
  const enPosts = new Set(getPosts("en").map(p => `/actualites/${p.slug}`));
  const frOnly = new Set(["/mentions-legales", "/confidentialite", ...getPosts("fr").map(p => `/actualites/${p.slug}`).filter(x => !enPosts.has(x))]);
  const url = (locale: "fr" | "en", path: string) => `${SITE_URL}${href(locale, path || "/").replace(/^\/$/, "")}`;
  return pages.flatMap(([path, priority]) => {
    const common = {
      priority, changeFrequency: "monthly" as const, lastModified: new Date("2026-11-19"),
      ...(images[path]?.length ? { images: images[path].map(src => `${SITE_URL}${src}`) } : {}),
    };
    if (frOnly.has(path)) return [{ url: url("fr", path), ...common }];
    const alternates = { languages: { fr: url("fr", path), en: url("en", path) } };
    return [{ url: url("fr", path), ...common, alternates }, { url: url("en", path), ...common, alternates }];
  });
}
