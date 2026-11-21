// Actualités : chaque publication est un fichier Markdown dans content/actualites/fr (ou /en pour la version anglaise).
// Le nom du fichier donne l'adresse : content/actualites/fr/ouverture-bureau.md → /actualites/ouverture-bureau.
// Les fichiers dont le nom commence par « _ » (modèle) et LISEZMOI.md sont ignorés. Mode d'emploi : content/actualites/LISEZMOI.md.
import fs from "node:fs";
import path from "node:path";
import type { Locale } from "@/lib/i18n";

export const NEWS_CATEGORIES = [
  { slug: "actualites-wayzure", fr: "Actualités Wayzure", en: "Wayzure news" },
  { slug: "projets-realisations", fr: "Projets et réalisations", en: "Projects and achievements" },
  { slug: "evenements", fr: "Événements", en: "Events" },
  { slug: "innovations-solutions", fr: "Innovations et solutions", en: "Innovations and solutions" },
] as const;
export type NewsCategory = (typeof NEWS_CATEGORIES)[number]["slug"];

export type Post = {
  slug: string;
  title: string;
  date: string; // AAAA-MM-JJ
  category: NewsCategory;
  summary: string;
  image?: string; // chemin dans /public, ex. /actualites/ouverture-bureau.jpg
  imageAlt?: string;
  body: string; // Markdown
};

const DIR = path.join(process.cwd(), "content", "actualites");

/** En-tête « clé: valeur » entre deux lignes « --- ». */
function parse(file: string, slug: string): Post | null {
  const raw = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(`Actualité ${file} : en-tête « --- » manquant.`);
  const fm: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) fm[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  if (fm.brouillon === "oui" || fm.draft === "true") return null;
  const cat = NEWS_CATEGORIES.find(c => c.slug === fm.categorie || c.slug === fm.category);
  if (!fm.titre && !fm.title) throw new Error(`Actualité ${file} : « titre » manquant.`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fm.date ?? "")) throw new Error(`Actualité ${file} : « date » attendue au format AAAA-MM-JJ.`);
  if (!cat) throw new Error(`Actualité ${file} : « categorie » doit valoir ${NEWS_CATEGORIES.map(c => c.slug).join(", ")}.`);
  return {
    slug, title: fm.titre ?? fm.title, date: fm.date, category: cat.slug,
    summary: fm.resume ?? fm.summary ?? "", image: fm.image || undefined, imageAlt: fm.image_alt ?? fm.imageAlt ?? "",
    body: m[2].trim(),
  };
}

export function getPosts(locale: Locale): Post[] {
  const dir = path.join(DIR, locale);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith(".md") && !f.startsWith("_"))
    .map(f => parse(path.join(dir, f), f.replace(/\.md$/, "")))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export const getPost = (locale: Locale, slug: string) => getPosts(locale).find(p => p.slug === slug);

export const categoryLabel = (slug: string, locale: Locale) => NEWS_CATEGORIES.find(c => c.slug === slug)?.[locale] ?? slug;

export const formatDate = (d: string, locale: Locale) =>
  new Date(`${d}T12:00:00Z`).toLocaleDateString(locale === "en" ? "en-GB" : "fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
