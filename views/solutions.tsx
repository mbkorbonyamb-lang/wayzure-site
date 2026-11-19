import Link from "next/link";
import { Arrow, CtaBand, Page, PageHero } from "@/components/chrome";
import { ProductMark } from "@/components/marks";
import { SolutionVisual } from "@/components/solution-visual";
import { getContent } from "@/lib/content";
import { href, type Locale } from "@/lib/i18n";
import { meta } from "@/lib/seo";

const TX = {
  fr: {
    desc: "WayPulse, WayPilot, WayLog et Waycare : les logiciels édités par Wayzure pour la prospection, l'e-commerce, la logistique et la santé.",
    h1: "Des logiciels que nous éditons et faisons tourner.",
    intro: "Chacun répond à un problème précis, observé sur le terrain. Nous les avons conçus, développés et mis en ligne nous-mêmes, et nous les exploitons chaque jour.",
    for: "Pour", market: "Marché", discover: (n: string) => `Découvrir ${n}`,
    note: "Captures des applications en service, avec leurs données d'exemple.",
    ctaTitle: "Un logiciel sur mesure ?",
    ctaText: "Les méthodes qui font tourner nos produits sont celles que nous appliquons à vos projets. Parlons du vôtre.",
  },
  en: {
    desc: "WayPulse, WayPilot, WayLog and Waycare: the software published by Wayzure for prospecting, e-commerce, logistics and healthcare.",
    h1: "Software we publish and run ourselves.",
    intro: "Each one answers a specific problem we saw in the field. We designed, built and launched them ourselves, and we operate them every day.",
    for: "For", market: "Market", discover: (n: string) => `Explore ${n}`,
    note: "Screenshots of the applications in service, with their sample data.",
    ctaTitle: "Need custom software?",
    ctaText: "The methods that keep our products running are the ones we apply to your projects. Let's talk about yours.",
  },
};

export const solutionsMeta = (locale: Locale) => meta("/solutions", "Solutions", TX[locale].desc, locale);

export function Solutions({ locale = "fr" }: { locale?: Locale }) {
  const { SOLUTIONS } = getContent(locale);
  const T = TX[locale];
  return (
    <Page locale={locale} path="/solutions">
      <PageHero eyebrow="Solutions" title={T.h1}>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-2">{T.intro}</p>
      </PageHero>
      <section className="mx-auto max-w-7xl space-y-20 px-4 py-20 sm:px-6 sm:space-y-28 lg:px-8">
        {SOLUTIONS.map((s, i) => (
          <article key={s.slug} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div data-reveal className={i % 2 ? "lg:order-2" : ""}>
              <div className="flex items-center gap-4">
                <ProductMark slug={s.slug} className="size-12" />
                <div>
                  <h2 className="font-display text-3xl font-semibold tracking-tight">{s.name}</h2>
                  <p className="text-sm font-medium text-accent">{s.category}</p>
                </div>
              </div>
              <p className="mt-6 font-display text-xl font-medium leading-snug">{s.tagline}</p>
              <p className="mt-3 leading-relaxed text-fg-2">{s.summary}</p>
              <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5 text-sm">
                <div><dt className="text-muted">{T.for}</dt><dd className="mt-1">{s.audience}</dd></div>
                <div><dt className="text-muted">{T.market}</dt><dd className="mt-1">{s.market}</dd></div>
              </dl>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={href(locale, `/solutions/${s.slug}`)} className="group inline-flex items-center gap-2 rounded-full bg-btn px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#055e8f]">{T.discover(s.name)} <Arrow /></Link>
                <a href={s.url} rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium hover:bg-surface">{s.url.replace(/^https:\/\/(www\.)?/, "")}</a>
              </div>
            </div>
            <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties} className={i % 2 ? "lg:order-1" : ""}>
              <SolutionVisual locale={locale} slug={s.slug} />
            </div>
          </article>
        ))}
        <p className="text-sm text-muted">{T.note}</p>
      </section>
      <CtaBand locale={locale} title={T.ctaTitle} text={T.ctaText} />
    </Page>
  );
}
