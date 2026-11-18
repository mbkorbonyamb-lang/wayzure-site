import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, Check, CtaBand, GridGlow, Page, SectionTitle } from "@/components/chrome";
import { JsonLd, breadcrumb } from "@/components/json-ld";
import { ProductMark } from "@/components/marks";
import { ShotFigure, ShotFrame } from "@/components/media";
import { VideoPlayer } from "@/components/video-player";
import { SITE_URL } from "@/lib/company";
import { contactHref } from "@/lib/contact-link";
import { SOLUTIONS } from "@/lib/content";
import { PRODUCT_VIDEOS, SHOTS } from "@/lib/media";
import { meta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return SOLUTIONS.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const s = SOLUTIONS.find(x => x.slug === slug);
  if (!s) return {};
  const m = meta(`/solutions/${s.slug}`, `${s.name} : ${s.category.toLowerCase()}`, s.seo);
  const shot = SHOTS[s.slug]?.[0];
  if (shot) m.openGraph = { ...m.openGraph, images: [{ url: shot.src, width: shot.w, height: shot.h, alt: shot.alt }] };
  return m;
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const s = SOLUTIONS.find(x => x.slug === slug);
  if (!s) notFound();
  const others = SOLUTIONS.filter(x => x.slug !== s.slug);
  const host = s.url.replace(/^https:\/\/(www\.)?/, "");
  const shots = SHOTS[s.slug] ?? [];
  const [hero, ...gallery] = shots;
  const video = PRODUCT_VIDEOS[s.slug];
  const demo = contactHref(`Démonstration ${s.name}`, "WayPulse, WayPilot, WayLog ou Waycare");

  return (
    <Page>
      <JsonLd data={[
        breadcrumb([["Solutions", "/solutions"], [s.name, `/solutions/${s.slug}`]]),
        {
          "@context": "https://schema.org", "@type": "SoftwareApplication",
          name: s.name, applicationCategory: "BusinessApplication", operatingSystem: "Web",
          description: s.summary, url: s.url, inLanguage: "fr",
          image: shots.map(x => `${SITE_URL}${x.src}`),
          publisher: { "@type": "Organization", name: "Wayzure", url: SITE_URL },
          areaServed: s.market,
        },
        ...(video ? [{
          "@context": "https://schema.org", "@type": "VideoObject", name: video.title, description: video.caption,
          thumbnailUrl: `${SITE_URL}${video.poster}`, contentUrl: `${SITE_URL}${video.mp4}`, uploadDate: "2026-11-18", duration: video.duration,
        }] : []),
      ]} />

      <section className="relative overflow-hidden bg-deep text-on-deep">
        <GridGlow />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:grid-cols-[1fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-medium text-[#9fd3f1]"><Link href="/solutions" className="hover:text-white">Solutions</Link> · {s.category}</p>
            <h1 className="mt-5 flex items-center gap-4 font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              <ProductMark slug={s.slug} className="size-12 sm:size-14" />{s.name}
            </h1>
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-white/90">{s.tagline}</p>
            <p className="mt-4 max-w-xl leading-relaxed text-on-deep-2">{s.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={s.url} rel="noopener" className="group inline-flex items-center gap-2 rounded-full bg-btn px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#055e8f]">Aller sur {host} <Arrow /></a>
              <a href={demo} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10">Demander une démonstration</a>
            </div>
          </div>
          {hero && (
            <div className="relative">
              <div aria-hidden className="absolute -inset-8 rounded-[3rem] bg-[radial-gradient(closest-side,rgba(7,130,198,.45),transparent)] blur-2xl" />
              <ShotFrame shot={hero} priority sizes="(min-width: 1024px) 640px, 100vw" className="relative hero-float" />
            </div>
          )}
        </div>
      </section>

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

      {(video || gallery.length > 0) && (
        <section className="border-t border-line">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <SectionTitle eyebrow="Le logiciel en images" title={`${s.name}, tel que vos équipes l'utilisent.`}>
              Captures de l&apos;application en service, avec ses données d&apos;exemple.
            </SectionTitle>
            {video && (
              <figure data-reveal className="mt-12">
                <VideoPlayer video={video} sizes="(min-width: 1280px) 1216px, 100vw" />
                <figcaption className="mt-4 text-sm text-muted">{video.caption}</figcaption>
              </figure>
            )}
            {gallery.length > 0 && (
              <div className={`mt-12 grid items-start gap-10 ${gallery.length >= 3 ? "md:grid-cols-3" : gallery.length === 2 ? "md:grid-cols-2" : "mx-auto max-w-3xl"}`}>
                {gallery.map(g => <ShotFigure key={g.src} shot={g} sizes="(min-width: 768px) 50vw, 100vw" />)}
              </div>
            )}
          </div>
        </section>
      )}

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
