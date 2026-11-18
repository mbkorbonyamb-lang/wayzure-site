import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, Check, CtaBand, Page, PageHero, SectionTitle } from "@/components/chrome";
import { ProductMark } from "@/components/marks";
import { SOLUTIONS } from "@/lib/content";
import { meta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return SOLUTIONS.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const s = SOLUTIONS.find(x => x.slug === slug);
  return s ? meta(`/solutions/${s.slug}`, `${s.name} : ${s.category.toLowerCase()}`, s.seo) : {};
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const s = SOLUTIONS.find(x => x.slug === slug);
  if (!s) notFound();
  const others = SOLUTIONS.filter(x => x.slug !== s.slug);
  const host = s.url.replace(/^https:\/\/(www\.)?/, "");

  return (
    <Page>
      <PageHero
        eyebrow={<Link href="/solutions" className="hover:text-white">Solutions · {s.category}</Link>}
        title={<span className="flex flex-col gap-5"><ProductMark slug={s.slug} className="size-16" />{s.name}</span>}
      >
        <p className="mt-5 max-w-2xl text-xl leading-relaxed text-white/90">{s.tagline}</p>
        <p className="mt-4 max-w-2xl leading-relaxed text-on-deep-2">{s.summary}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={s.url} rel="noopener" className="group inline-flex items-center gap-2 rounded-full bg-btn px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#055e8f]">Aller sur {host} <Arrow /></a>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10">Nous contacter</Link>
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <SectionTitle eyebrow="Le problème" title="Ce que nous avons voulu régler.">{s.problem}</SectionTitle>
          <dl data-reveal className="grid gap-4 rounded-3xl bg-surface p-7 sm:grid-cols-2">
            <div><dt className="text-sm text-muted">Pour qui</dt><dd className="mt-1 font-medium">{s.audience}</dd></div>
            <div><dt className="text-sm text-muted">Marché</dt><dd className="mt-1 font-medium">{s.market}</dd></div>
            {s.proof && <div className="sm:col-span-2"><dt className="text-sm text-muted">À savoir</dt><dd className="mt-1 leading-relaxed">{s.proof}</dd></div>}
          </dl>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Ce que fait le logiciel" title={`${s.name}, en quatre temps.`} />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {s.features.map((f, i) => (
              <div key={f.t} data-reveal style={{ "--d": `${i * 70}ms` } as React.CSSProperties} className="rounded-3xl border border-line bg-bg p-7">
                <p className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight"><Check />{f.t}</p>
                <p className="mt-3 text-sm leading-relaxed text-fg-2">{f.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-sm text-muted">Description tirée du site officiel <a href={s.url} rel="noopener" className="text-accent underline underline-offset-2">{host}</a>, qui fait foi pour les fonctions et les tarifs.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-sm font-medium text-accent">Nos autres solutions</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {others.map(o => (
            <Link key={o.slug} href={`/solutions/${o.slug}`} className="group flex items-center gap-4 rounded-2xl border border-line p-5 transition-shadow hover:shadow-lg hover:shadow-black/5">
              <ProductMark slug={o.slug} className="size-10" />
              <span className="flex-1"><span className="block font-semibold">{o.name}</span><span className="block text-sm text-muted">{o.category}</span></span>
              <Arrow />
            </Link>
          ))}
        </div>
      </section>

      <CtaBand title="Un outil sur mesure pour votre métier ?" text="Nous appliquons à vos projets les méthodes qui font tourner nos propres logiciels." />
    </Page>
  );
}
