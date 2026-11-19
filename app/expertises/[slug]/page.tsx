import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, Check, CtaBand, Page, PageHero, SectionTitle } from "@/components/chrome";
import { ExpertiseIcon } from "@/components/icons";
import { HeroPhoto } from "@/components/photo";
import { JsonLd, breadcrumb } from "@/components/json-ld";
import { ProductMark } from "@/components/marks";
import { SolutionVisual } from "@/components/solution-visual";
import { SITE_URL } from "@/lib/company";
import { contactHref } from "@/lib/contact-link";
import { ALL_EXPERTISES, SOLUTIONS } from "@/lib/content";
import { POLE_PHOTOS } from "@/lib/photos";
import { meta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return ALL_EXPERTISES.map(e => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const e = ALL_EXPERTISES.find(x => x.slug === slug);
  return e ? meta(`/expertises/${e.slug}`, e.name, e.seo) : {};
}

export default async function ExpertisePage({ params }: Props) {
  const { slug } = await params;
  const e = ALL_EXPERTISES.find(x => x.slug === slug);
  if (!e) notFound();
  const related = SOLUTIONS.filter(s => e.solutions.includes(s.slug));
  const photo = POLE_PHOTOS[e.slug];
  const others = ALL_EXPERTISES.filter(x => x.slug !== e.slug);

  return (
    <Page>
      <JsonLd data={[
        breadcrumb([["Expertises", "/expertises"], [e.name, `/expertises/${e.slug}`]]),
        {
          "@context": "https://schema.org", "@type": "Service", name: e.name, description: e.seo, serviceType: e.name,
          provider: { "@type": "Organization", name: "Wayzure", url: SITE_URL }, areaServed: ["FR", "GN"], url: `${SITE_URL}/expertises/${e.slug}`,
          hasOfferCatalog: { "@type": "OfferCatalog", name: e.name, itemListElement: e.items.map(it => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: it.t, description: it.d } })) },
        },
      ]} />
      <PageHero
        eyebrow={<Link href="/expertises" className="hover:text-accent-hover">Expertises</Link>}
        title={e.name}
        aside={photo && <HeroPhoto photo={photo} className="lg:ml-6"><span className="chip-in absolute -bottom-5 left-5 grid size-16 place-items-center rounded-2xl bg-bg text-accent shadow-xl shadow-black/10 ring-1 ring-line"><ExpertiseIcon slug={e.slug} className="size-8" /></span></HeroPhoto>}
      >
        <p className="mt-5 max-w-2xl text-xl leading-relaxed text-fg">{e.lead}</p>
        <p className="mt-4 max-w-2xl leading-relaxed text-fg-2">{e.intro}</p>
        <a href={contactHref(`Projet : ${e.name}`, e.name)} className="group mt-8 inline-flex items-center gap-2 rounded-full bg-btn px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#055e8f]">Parler de votre projet <Arrow /></a>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <SectionTitle eyebrow="Situations fréquentes" title="Vous vous reconnaissez ?" />
          <ul className="grid gap-4 sm:grid-cols-2">
            {e.problems.map((p, i) => (
              <li key={p} data-reveal style={{ "--d": `${i * 60}ms` } as React.CSSProperties} className="rounded-2xl border border-line p-5 leading-relaxed text-fg-2">
                <span className="mb-3 block h-1 w-8 rounded-full bg-accent" />{p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Ce que nous faisons" title="Nos interventions." />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {e.items.map((it, i) => (
              <div key={it.t} data-reveal style={{ "--d": `${(i % 3) * 70}ms` } as React.CSSProperties} className="rounded-3xl border border-line bg-bg p-7">
                <p className="font-mono text-xs text-muted">0{i + 1}</p>
                <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">{it.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-2">{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div data-reveal className="rounded-3xl border border-sky-2 bg-sky p-8 sm:p-10">
            <p className="text-sm font-medium text-accent">Ce qui change</p>
            <ul className="mt-6 space-y-4">
              {e.outcomes.map(o => <li key={o} className="flex gap-3 text-lg text-fg"><Check />{o}</li>)}
            </ul>
          </div>
          {related.length > 0 ? (
            <div data-reveal style={{ "--d": "90ms" } as React.CSSProperties}>
              <p className="text-sm font-medium text-accent">La preuve par nos produits</p>
              <p className="mt-3 text-fg-2">Ces logiciels Wayzure mobilisent ce savoir-faire en production.</p>
              <Link href={`/solutions/${related[0].slug}`} className="mt-6 block" aria-label={`Voir ${related[0].name} en images`}>
                <SolutionVisual slug={related[0].slug} compact sizes="(min-width: 1024px) 560px, 100vw" />
              </Link>
              <div className="mt-4 space-y-3">
                {related.map(s => (
                  <Link key={s.slug} href={`/solutions/${s.slug}`} className="group flex items-center gap-4 rounded-2xl border border-line p-4 transition-shadow hover:shadow-lg hover:shadow-black/5">
                    <ProductMark slug={s.slug} className="size-10" />
                    <span className="flex-1"><span className="block font-semibold">{s.name}</span><span className="block text-sm text-muted">{s.category}</span></span>
                    <Arrow />
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div data-reveal>
              <p className="text-sm font-medium text-accent">Autres expertises</p>
              <div className="mt-6 space-y-3">
                {others.slice(0, 3).map(o => (
                  <Link key={o.slug} href={`/expertises/${o.slug}`} className="group flex items-center gap-4 rounded-2xl border border-line p-4 transition-shadow hover:shadow-lg hover:shadow-black/5">
                    <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent"><ExpertiseIcon slug={o.slug} className="size-5" /></span>
                    <span className="flex-1 font-semibold">{o.name}</span>
                    <Arrow />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {e.cases && e.cases.length > 0 && (
        <section className="border-t border-line bg-surface">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <SectionTitle eyebrow="Référence" title="Un accompagnement de bout en bout." />
            <div className="mt-10 grid gap-5">
              {e.cases.map(c => (
                <article key={c.client} data-reveal className="grid items-center gap-8 rounded-3xl border border-line bg-bg p-7 sm:p-10 md:grid-cols-[14rem_1fr]">
                  {c.logo && (
                    <span className="grid h-28 place-items-center rounded-2xl bg-white px-6 ring-1 ring-black/5">
                      <Image src={c.logo} alt={c.client} width={640} height={304} className="h-16 w-auto object-contain" />
                    </span>
                  )}
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-tight">{c.client}</h3>
                    <p className="mt-1 text-sm text-muted">{c.context}</p>
                    <p className="mt-4 max-w-3xl leading-relaxed text-fg-2">{c.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </Page>
  );
}
