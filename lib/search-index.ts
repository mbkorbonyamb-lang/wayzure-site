// Index de la recherche du site : une entrée par page (ou section) avec son titre, son adresse,
// une description courte et le texte sur lequel on cherche. Construit au build, servi en JSON statique
// (app/recherche-index/[locale]/route.ts) et chargé par le navigateur seulement à l'ouverture de la recherche.
import { getContent } from "@/lib/content";
import { href, type Locale } from "@/lib/i18n";
import { categoryLabel, getPosts } from "@/lib/news";
import { PAGE_SEO } from "@/lib/page-seo";
import { sectors } from "@/views/sectors";

export type SearchEntry = { t: string; u: string; d: string; g: string; k: string };

const G = {
  fr: { page: "Page", exp: "Expertise", sol: "Logiciel", sec: "Secteur", news: "Actualité", ref: "Référence" },
  en: { page: "Page", exp: "Expertise", sol: "Software", sec: "Industry", news: "News", ref: "Reference" },
};

const strip = (md: string) => md.replace(/!\[[^\]]*\]\([^)]*\)/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/[#*>_`-]/g, " ").replace(/\s+/g, " ").trim();
const cut = (s: string, n = 170) => (s.length > n ? `${s.slice(0, n).replace(/\s+\S*$/, "")}…` : s);

export function buildSearchIndex(locale: Locale): SearchEntry[] {
  const g = G[locale];
  const S = PAGE_SEO[locale];
  const { ALL_EXPERTISES, SOLUTIONS } = getContent(locale);
  const h = (p: string) => href(locale, p);
  const out: SearchEntry[] = [];

  const pages: [keyof typeof S, string][] = [
    ["home", "/"], ["expertises", "/expertises"], ["sectors", "/secteurs-dactivite"], ["solutions", "/solutions"],
    ["references", "/references"], ["about", "/a-propos"], ["values", "/nos-valeurs"], ["news", "/actualites"],
    ["careers", "/carrieres"], ["contact", "/contact"],
  ];
  for (const [key, path] of pages) {
    const p = S[key] as { title: string; desc: string };
    out.push({ t: p.title.replace(/^Wayzure\s*:\s*/, ""), u: h(path), d: cut(p.desc), g: g.page, k: p.desc });
  }

  for (const e of ALL_EXPERTISES) {
    out.push({
      t: e.name, u: h(`/expertises/${e.slug}`), d: e.lead, g: g.exp,
      k: [e.intro, ...e.problems, ...e.items.map(i => `${i.t} ${i.d}`), ...e.outcomes, ...(e.cases ?? []).map(c => `${c.client} ${c.text}`), e.seo].join(" "),
    });
  }
  for (const s of SOLUTIONS) {
    out.push({
      t: `${s.name} · ${s.category}`, u: h(`/solutions/${s.slug}`), d: s.tagline, g: g.sol,
      k: [s.summary, s.problem, ...s.features.map(f => `${f.t} ${f.d}`), s.audience, s.market, s.seo].join(" "),
    });
  }
  for (const s of sectors(locale)) {
    out.push({ t: s.title, u: `${h("/secteurs-dactivite")}#${s.id}`, d: cut(s.issues), g: g.sec, k: [s.issues, ...s.items].join(" ") });
  }
  const cases = ALL_EXPERTISES.flatMap(e => e.cases ?? []);
  for (const c of cases) {
    const afl = c.client.startsWith("Africa Fight");
    out.push({ t: c.client, u: h(afl ? "/references/afl" : "/references"), d: cut(c.text), g: g.ref, k: `${c.context ?? ""} ${c.text}${afl ? " Thierno Oumar MMA ceinture belt ministère Jeunesse Youth" : ""}` });
  }
  for (const p of getPosts(locale)) {
    out.push({ t: p.title, u: h(`/actualites/${p.slug}`), d: cut(p.summary), g: g.news, k: `${categoryLabel(p.category, locale)} ${p.summary} ${strip(p.body).slice(0, 4000)}` });
  }
  return out;
}
