import Link from "next/link";
import { Arrow, CtaBand, Page, PageHero } from "@/components/chrome";
import { ProductMark } from "@/components/marks";
import { SolutionVisual } from "@/components/solution-visual";
import { SOLUTIONS } from "@/lib/content";
import { meta } from "@/lib/seo";

export const metadata = meta(
  "/solutions",
  "Solutions",
  "WayPulse, WayPilot, WayLog et Waycare : les logiciels édités par Wayzure pour la prospection, l'e-commerce, la logistique et la santé.",
);

export default function Solutions() {
  return (
    <Page>
      <PageHero eyebrow="Solutions" title="Des logiciels que nous éditons et faisons tourner.">
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-2">Chacun répond à un problème précis, observé sur le terrain. Nous les avons conçus, développés et mis en ligne nous-mêmes, et nous les exploitons chaque jour.</p>
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
                <div><dt className="text-muted">Pour</dt><dd className="mt-1">{s.audience}</dd></div>
                <div><dt className="text-muted">Marché</dt><dd className="mt-1">{s.market}</dd></div>
              </dl>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={`/solutions/${s.slug}`} className="group inline-flex items-center gap-2 rounded-full bg-btn px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#055e8f]">Découvrir {s.name} <Arrow /></Link>
                <a href={s.url} rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium hover:bg-surface">{s.url.replace(/^https:\/\/(www\.)?/, "")}</a>
              </div>
            </div>
            <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties} className={i % 2 ? "lg:order-1" : ""}>
              <SolutionVisual slug={s.slug} />
            </div>
          </article>
        ))}
        <p className="text-sm text-muted">Captures des applications en service, avec leurs données d&apos;exemple.</p>
      </section>
      <CtaBand title="Un logiciel sur mesure ?" text="Les méthodes qui font tourner nos produits sont celles que nous appliquons à vos projets. Parlons du vôtre." />
    </Page>
  );
}
