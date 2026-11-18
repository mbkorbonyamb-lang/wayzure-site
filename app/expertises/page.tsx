import Link from "next/link";
import { Arrow, Check, CtaBand, Page, PageHero } from "@/components/chrome";
import { ExpertiseIcon } from "@/components/icons";
import { HeroPhoto } from "@/components/photo";
import { ALL_EXPERTISES } from "@/lib/content";
import { PHOTOS } from "@/lib/photos";
import { meta } from "@/lib/seo";

export const metadata = meta(
  "/expertises",
  "Expertises",
  "Data et intelligence artificielle, conseil, développement numérique, formation et services IT : les expertises de Wayzure, en France et en Guinée.",
);

export default function Expertises() {
  return (
    <Page>
      <PageHero eyebrow="Expertises" title="Du conseil à la mise en service, une seule équipe." aside={<HeroPhoto photo={PHOTOS.it} />}>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-2">Quatre pôles qui se complètent sur un même projet, et des services IT pour que tout tourne au quotidien.</p>
      </PageHero>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="space-y-5">
          {ALL_EXPERTISES.map((e, i) => (
            <article key={e.slug} data-reveal className="grid gap-8 rounded-3xl border border-line p-7 sm:p-10 lg:grid-cols-[1fr_1.2fr]">
              <div>
                <div className="flex items-center gap-4">
                  <span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent"><ExpertiseIcon slug={e.slug} /></span>
                  <p className="font-mono text-xs text-muted">0{i + 1}</p>
                </div>
                <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight">{e.name}</h2>
                <p className="mt-3 text-lg text-fg-2">{e.lead}</p>
                <Link href={`/expertises/${e.slug}`} className="group mt-6 inline-flex items-center gap-2 rounded-full bg-btn px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#055e8f]">Voir le détail <Arrow /></Link>
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
      </section>
      <CtaBand />
    </Page>
  );
}
