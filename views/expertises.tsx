import Link from "next/link";
import { Arrow, Check, CtaBand, Page, PageHero } from "@/components/chrome";
import { ExpertiseIcon } from "@/components/icons";
import { HeroPhoto } from "@/components/photo";
import { getContent } from "@/lib/content";
import { href, type Locale } from "@/lib/i18n";
import { PHOTOS } from "@/lib/photos";
import { meta } from "@/lib/seo";
import { PAGE_SEO } from "@/lib/page-seo";

const TX = {
  fr: {
    title: "Expertises",
    h1: "Du conseil à la mise en service, une seule équipe.",
    intro: "Quatre pôles qui se complètent sur un même projet, pour les administrations, les institutions et les entreprises. Et des services IT transversaux pour que tout tourne au quotidien.",
    detail: "Voir le détail",
    poles: "Quatre pôles", transversal: "Services IT transversaux",
    transversalText: "Ils ne forment pas un cinquième pôle : ils accompagnent les quatre autres, avant, pendant et après chaque déploiement.",
  },
  en: {
    title: "Expertise",
    h1: "From consulting to go-live, one team.",
    intro: "Four practices that complement each other on a single project, for administrations, institutions and companies. And cross-cutting IT services to keep everything running day to day.",
    detail: "See the details",
    poles: "Four practices", transversal: "Cross-cutting IT services",
    transversalText: "Not a fifth practice: they support the other four, before, during and after each deployment.",
  },
};

export const expertisesMeta = (locale: Locale) => meta("/expertises", PAGE_SEO[locale].expertises.title, PAGE_SEO[locale].expertises.desc, locale);

export function Expertises({ locale = "fr" }: { locale?: Locale }) {
  const { EXPERTISES, IT_SERVICES } = getContent(locale);
  const T = TX[locale];
  return (
    <Page locale={locale} path="/expertises">
      <PageHero eyebrow={T.title} title={T.h1} aside={<HeroPhoto locale={locale} photo={PHOTOS.it} />}>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-2">{T.intro}</p>
      </PageHero>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-sm font-medium text-accent">{T.poles}</p>
        <div className="mt-5 space-y-5">
          {EXPERTISES.map((e, i) => (
            <article key={e.slug} data-reveal className="grid gap-8 rounded-3xl border border-line p-7 sm:p-10 lg:grid-cols-[1fr_1.2fr]">
              <div>
                <div className="flex items-center gap-4">
                  <span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent"><ExpertiseIcon slug={e.slug} /></span>
                  <p className="font-mono text-xs text-muted">0{i + 1}</p>
                </div>
                <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight">{e.name}</h2>
                <p className="mt-3 text-lg text-fg-2">{e.lead}</p>
                <Link href={href(locale, `/expertises/${e.slug}`)} className="group mt-6 inline-flex items-center gap-2 rounded-full bg-btn px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#055e8f]">{T.detail} <Arrow /></Link>
              </div>
              <ul className="grid content-start gap-3 sm:grid-cols-2">
                {e.items.map(it => (
                  <li key={it.t} className="rounded-2xl bg-surface p-5">
                    <p className="flex gap-2 font-medium"><Check />{it.t}</p>
                    <p className="mt-1.5 pl-6 text-sm leading-relaxed text-fg-2">{it.d}</p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <article data-reveal className="mt-10 grid gap-8 rounded-3xl border border-sky-2 bg-sky p-7 sm:p-10 lg:grid-cols-[1fr_1.2fr]">
              <div>
              <div className="flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent"><ExpertiseIcon slug={IT_SERVICES.slug} /></span>
                <p className="text-sm font-medium text-accent">{T.transversal}</p>
              </div>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight">{IT_SERVICES.name}</h2>
              <p className="mt-3 text-lg text-fg-2">{IT_SERVICES.lead}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{T.transversalText}</p>
              <Link href={href(locale, `/expertises/${IT_SERVICES.slug}`)} className="group mt-6 inline-flex items-center gap-2 rounded-full bg-btn px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#055e8f]">{T.detail} <Arrow /></Link>
            </div>
            <ul className="grid content-start gap-3 sm:grid-cols-2">
              {IT_SERVICES.items.map(it => (
                <li key={it.t} className="rounded-2xl bg-bg p-5">
                  <p className="flex gap-2 font-medium"><Check />{it.t}</p>
                  <p className="mt-1.5 pl-6 text-sm leading-relaxed text-fg-2">{it.d}</p>
                </li>
              ))}
            </ul>
        </article>
      </section>
      <CtaBand locale={locale} />
    </Page>
  );
}
