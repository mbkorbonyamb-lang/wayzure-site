// Actualités : liste (toutes ou par catégorie) et page de publication. Contenus dans content/actualites (lib/news.ts).
// Tant qu'aucun article n'est publié, la page affiche un état d'attente sobre, sans publication inventée.
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, CtaBand, Page, PageHero, SocialIcon } from "@/components/chrome";
import { JsonLd, breadcrumb } from "@/components/json-ld";
import { Markdown } from "@/components/markdown";
import { COMPANY, SITE_URL, SOCIAL_LINKS } from "@/lib/company";
import { href, type Locale } from "@/lib/i18n";
import { NEWS_CATEGORIES, type Post, categoryLabel, formatDate, getPost, getPosts } from "@/lib/news";
import { meta } from "@/lib/seo";

const TX = {
  fr: {
    title: "Actualités",
    desc: "Actualités de Wayzure : vie de l'entreprise, projets et réalisations, événements, innovations et solutions.",
    h1: "Les nouvelles de Wayzure.",
    intro: "Nos projets, nos solutions, les événements auxquels nous participons et la vie de l'entreprise, en France et en Guinée.",
    all: "Tout",
    filter: "Catégories",
    read: "Lire",
    emptyTitle: "Les premières publications arrivent bientôt.",
    emptyText: "Nous publierons ici nos projets, nos événements et les évolutions de nos solutions. En attendant, suivez-nous sur nos réseaux ou écrivez-nous.",
    emptyCat: "Aucune publication dans cette catégorie pour le moment.",
    seeAll: "Voir toutes les actualités",
    follow: "Nous suivre",
    write: "Nous écrire",
    back: "Toutes les actualités",
    more: "À lire aussi",
    published: "Publié le",
  },
  en: {
    title: "News",
    desc: "Wayzure news: company life, projects and achievements, events, innovations and solutions.",
    h1: "News from Wayzure.",
    intro: "Our projects, our solutions, the events we take part in and company life, in France and Guinea.",
    all: "All",
    filter: "Categories",
    read: "Read",
    emptyTitle: "Our first posts are coming soon.",
    emptyText: "This is where we will share our projects, events and updates to our solutions. In the meantime, follow us or write to us.",
    emptyCat: "No posts in this category yet.",
    seeAll: "See all news",
    follow: "Follow us",
    write: "Write to us",
    back: "All news",
    more: "Read also",
    published: "Published on",
  },
};

export const newsSlugs = (locale: Locale) => () => getPosts(locale).map(p => ({ slug: p.slug }));
export const categorySlugs = () => NEWS_CATEGORIES.map(c => ({ categorie: c.slug }));

export const newsMeta = (locale: Locale) => meta("/actualites", TX[locale].title, TX[locale].desc, locale);

export function newsCategoryMeta(locale: Locale, cat: string): Metadata {
  const label = categoryLabel(cat, locale);
  const m = meta(`/actualites/categorie/${cat}`, `${label} · ${TX[locale].title}`, TX[locale].desc, locale);
  // Une catégorie encore vide n'a rien à proposer aux moteurs de recherche.
  return getPosts(locale).some(p => p.category === cat) ? m : { ...m, robots: { index: false, follow: true } };
}

export function newsPostMeta(locale: Locale, slug: string): Metadata {
  const p = getPost(locale, slug);
  if (!p) return {};
  const m = meta(`/actualites/${slug}`, p.title, p.summary, locale, false);
  return { ...m, openGraph: { ...m.openGraph, type: "article", publishedTime: p.date, ...(p.image ? { images: [{ url: p.image, alt: p.imageAlt }] } : {}) } };
}

function Card({ p, locale, big = false }: { p: Post; locale: Locale; big?: boolean }) {
  const T = TX[locale];
  return (
    <article className={`group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-bg transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-xl hover:shadow-[#0670aa]/10 ${big ? "lg:col-span-2 lg:flex-row" : ""}`}>
      <div className={`relative aspect-[16/9] overflow-hidden bg-sky ${big ? "lg:aspect-auto lg:w-1/2" : ""}`}>
        {p.image
          ? <Image src={p.image} alt={p.imageAlt ?? ""} fill sizes={big ? "(min-width: 1024px) 640px, 100vw" : "(min-width: 1024px) 400px, 100vw"} className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
          : <div aria-hidden className="absolute inset-0 bg-[linear-gradient(135deg,#0782c6_0%,#19323e_100%)] opacity-90" />}
      </div>
      <div className={`flex flex-1 flex-col p-6 sm:p-7 ${big ? "lg:justify-center lg:p-10" : ""}`}>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs"><span className="font-medium uppercase tracking-wider text-accent">{categoryLabel(p.category, locale)}</span><time dateTime={p.date} className="text-muted">{formatDate(p.date, locale)}</time></p>
        <h2 className={`mt-3 font-display font-semibold leading-snug tracking-tight ${big ? "text-2xl sm:text-3xl" : "text-xl"}`}>
          <Link href={href(locale, `/actualites/${p.slug}`)} className="after:absolute after:inset-0">{p.title}</Link>
        </h2>
        {p.summary && <p className="mt-3 flex-1 leading-relaxed text-fg-2">{p.summary}</p>}
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">{T.read} <Arrow className="size-3" /></span>
      </div>
    </article>
  );
}

export function News({ locale = "fr", category }: { locale?: Locale; category?: string }) {
  const T = TX[locale];
  const all = getPosts(locale);
  const posts = category ? all.filter(p => p.category === category) : all;
  const path = category ? `/actualites/categorie/${category}` : "/actualites";
  const crumbs: [string, string][] = [[T.title, "/actualites"]];
  if (category) crumbs.push([categoryLabel(category, locale), path]);
  return (
    <Page locale={locale} path={path}>
      <JsonLd data={breadcrumb(crumbs, locale)} />
      <PageHero eyebrow={T.title} title={category ? categoryLabel(category, locale) : T.h1}>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-2">{T.intro}</p>
        <nav aria-label={T.filter} className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {[{ slug: "", label: T.all }, ...NEWS_CATEGORIES.map(c => ({ slug: c.slug, label: c[locale] }))].map(c => {
              const active = (category ?? "") === c.slug;
              return (
                <li key={c.slug || "all"}>
                  <Link href={href(locale, c.slug ? `/actualites/categorie/${c.slug}` : "/actualites")} aria-current={active ? "page" : undefined}
                    className={`inline-flex rounded-full border px-4 py-2 text-sm transition-colors ${active ? "border-accent bg-accent text-white" : "border-sky-2 bg-bg/70 text-fg-2 hover:border-accent hover:text-accent"}`}>{c.label}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => <Card key={p.slug} p={p} locale={locale} big={i === 0 && !category && posts.length > 2} />)}
          </div>
        ) : (
          <div data-reveal className="relative overflow-hidden rounded-[2rem] border border-sky-2 bg-sky px-6 py-16 text-center sm:px-12 sm:py-20">
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-[#0782c6] opacity-[0.12] blur-3xl" />
            <div className="relative mx-auto max-w-2xl">
              <span aria-hidden className="mx-auto grid size-14 place-items-center rounded-2xl bg-bg text-accent shadow-sm ring-1 ring-sky-2">
                <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h13a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Z" /><path d="M19 9h1a1 1 0 0 1 1 1v8a2 2 0 0 1-2 2" /><path d="M8 9h7M8 13h7M8 17h4" /></svg>
              </span>
              <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight sm:text-3xl">{category && all.length > 0 ? T.emptyCat : T.emptyTitle}</h2>
              {!(category && all.length > 0) && <p className="mt-4 text-lg leading-relaxed text-fg-2">{T.emptyText}</p>}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {category && all.length > 0
                  ? <Link href={href(locale, "/actualites")} className="group inline-flex items-center gap-2 rounded-full bg-btn px-5 py-3 text-sm font-medium text-white hover:bg-[#055e8f]">{T.seeAll} <Arrow /></Link>
                  : <>
                      {SOCIAL_LINKS.filter(s => s.name === "LinkedIn" || s.name === "Instagram").map(s => (
                        <a key={s.name} href={s.url} rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-sky-2 bg-bg px-5 py-3 text-sm font-medium text-fg hover:border-accent hover:text-accent"><SocialIcon name={s.name} />{s.name}</a>
                      ))}
                      <Link href={href(locale, "/contact")} className="group inline-flex items-center gap-2 rounded-full bg-btn px-5 py-3 text-sm font-medium text-white hover:bg-[#055e8f]">{T.write} <Arrow /></Link>
                    </>}
              </div>
            </div>
          </div>
        )}
      </section>
    </Page>
  );
}

export function NewsPost({ locale = "fr", slug }: { locale?: Locale; slug: string }) {
  const T = TX[locale];
  const p = getPost(locale, slug);
  if (!p) notFound();
  const others = getPosts(locale).filter(o => o.slug !== slug).slice(0, 3);
  const url = `${SITE_URL}${href(locale, `/actualites/${slug}`)}`;
  return (
    <Page locale={locale} path={`/actualites/${slug}`}>
      <JsonLd data={[
        breadcrumb([[T.title, "/actualites"], [p.title, `/actualites/${slug}`]], locale),
        { "@context": "https://schema.org", "@type": "NewsArticle", headline: p.title, description: p.summary, datePublished: p.date, inLanguage: locale, mainEntityOfPage: url,
          ...(p.image ? { image: `${SITE_URL}${p.image}` } : {}), author: { "@type": "Organization", name: "Wayzure" }, publisher: { "@type": "Organization", name: COMPANY.legalName } },
      ]} />
      <article>
        <header className="relative overflow-hidden bg-sky">
          <div className="relative mx-auto max-w-3xl px-4 pb-12 pt-14 sm:px-6 sm:pt-20">
            <Link href={href(locale, "/actualites")} className="group inline-flex items-center gap-2 text-sm text-fg-2 hover:text-accent"><Arrow className="size-3.5 rotate-180" /> {T.back}</Link>
            <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <Link href={href(locale, `/actualites/categorie/${p.category}`)} className="font-medium text-accent hover:underline">{categoryLabel(p.category, locale)}</Link>
              <span className="text-muted">{T.published} <time dateTime={p.date}>{formatDate(p.date, locale)}</time></span>
            </p>
            <h1 className="mt-4 font-display text-[2rem] font-semibold leading-[1.12] tracking-tight sm:text-5xl">{p.title}</h1>
            {p.summary && <p className="mt-5 text-xl leading-relaxed text-fg-2">{p.summary}</p>}
          </div>
        </header>
        {p.image && (
          <div className="mx-auto -mt-2 max-w-5xl px-4 pt-10 sm:px-6">
            <Image src={p.image} alt={p.imageAlt ?? ""} width={1600} height={900} priority sizes="(min-width: 1024px) 1000px, 100vw" className="h-auto w-full rounded-[1.8rem] shadow-xl shadow-[#0670aa]/10" />
          </div>
        )}
        <div className="prose-news mx-auto max-w-3xl px-4 py-14 sm:px-6"><Markdown source={p.body} /></div>
      </article>
      {others.length > 0 && (
        <section className="border-t border-line bg-surface">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight">{T.more}</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{others.map(o => <Card key={o.slug} p={o} locale={locale} />)}</div>
          </div>
        </section>
      )}
      <CtaBand locale={locale} />
    </Page>
  );
}
