import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, Check, CtaBand, GridGlow, Page, SectionTitle } from "@/components/chrome";
import { JsonLd, breadcrumb } from "@/components/json-ld";
import { ProductMark } from "@/components/marks";
import { ShotFigure, ShotFrame } from "@/components/media";
import { Photo } from "@/components/photo";
import { Testimonial } from "@/components/testimonial";
import { VideoPlayer } from "@/components/video-player";
import { SITE_URL } from "@/lib/company";
import { contactHref } from "@/lib/contact-link";
import { getContent } from "@/lib/content";
import { href, type Locale } from "@/lib/i18n";
import { PRODUCT_VIDEOS, SHOTS } from "@/lib/media";
import { SOLUTION_PHOTOS } from "@/lib/photos";
import { meta } from "@/lib/seo";
import { JAARAY } from "@/lib/testimonials";

const TX = {
  fr: {
    goTo: (h: string) => `Aller sur ${h}`, demoCta: "Demander une démonstration", demoSubject: (n: string) => `Démonstration ${n}`,
    problem: "Le problème", problemTitle: "Ce que nous avons voulu régler.",
    who: "Pour qui", market: "Marché", know: "À savoir",
    imgEyebrow: "Le logiciel en images", imgTitle: (n: string) => `${n}, tel que vos équipes l'utilisent.`,
    imgText: "Captures de l'application en service, avec ses données d'exemple.",
    featEyebrow: "Ce que fait le logiciel", featTitle: (n: string) => `${n}, en quatre temps.`,
    source: "Description tirée du site officiel", sourceEnd: ", qui fait foi pour les fonctions et les tarifs.",
    review: "Avis client", others: "Nos autres solutions",
    ctaTitle: "Un outil sur mesure pour votre métier ?",
    ctaText: "Nous appliquons à vos projets les méthodes qui font tourner nos propres logiciels.",
  },
  en: {
    goTo: (h: string) => `Go to ${h}`, demoCta: "Request a demo", demoSubject: (n: string) => `${n} demo`,
    problem: "The problem", problemTitle: "What we set out to fix.",
    who: "For whom", market: "Market", know: "Good to know",
    imgEyebrow: "The software in pictures", imgTitle: (n: string) => `${n}, as your teams use it.`,
    imgText: "Screenshots of the application in service, with its sample data.",
    featEyebrow: "What the software does", featTitle: (n: string) => `${n}, in four steps.`,
    source: "Description taken from the official website", sourceEnd: ", which is the reference for features and pricing.",
    review: "Customer review", others: "Our other solutions",
    ctaTitle: "A custom tool for your business?",
    ctaText: "We apply to your projects the methods that keep our own software running.",
  },
};

export const solutionSlugs = () => getContent("fr").SOLUTIONS.map(s => ({ slug: s.slug }));

export function solutionMeta(locale: Locale, slug: string) {
  const s = getContent(locale).SOLUTIONS.find(x => x.slug === slug);
  if (!s) return {};
  const m = meta(`/solutions/${s.slug}`, `${s.name}${locale === "en" ? ":" : " :"} ${s.category.toLowerCase()}`, s.seo, locale);
  const shot = SHOTS[s.slug]?.[0];
  if (shot) m.openGraph = { ...m.openGraph, images: [{ url: shot.src, width: shot.w, height: shot.h, alt: locale === "en" ? shot.altEn : shot.alt }] };
  return m;
}

export function Solution({ locale = "fr", slug }: { locale?: Locale; slug: string }) {
  const { SOLUTIONS } = getContent(locale);
  const s = SOLUTIONS.find(x => x.slug === slug);
  if (!s) notFound();
  const T = TX[locale];
  const h = (p: string) => href(locale, p);
  const others = SOLUTIONS.filter(x => x.slug !== s.slug);
  const host = s.url.replace(/^https:\/\/(www\.)?/, "");
  const shots = SHOTS[s.slug] ?? [];
  const [hero, ...gallery] = shots;
  const video = PRODUCT_VIDEOS[s.slug];
  const photo = SOLUTION_PHOTOS[s.slug];
  const review = JAARAY.product === s.slug ? JAARAY : null;
  const demo = contactHref(T.demoSubject(s.name), "WayPulse, WayPilot, WayLog ou Waycare", locale);

  return (
    <Page locale={locale} path={`/solutions/${s.slug}`}>
      <JsonLd data={[
        breadcrumb([["Solutions", "/solutions"], [s.name, `/solutions/${s.slug}`]], locale),
        {
          "@context": "https://schema.org", "@type": "SoftwareApplication",
          name: s.name, applicationCategory: "BusinessApplication", operatingSystem: "Web",
          description: s.summary, url: s.url, inLanguage: locale,
          image: shots.map(x => `${SITE_URL}${x.src}`),
          publisher: { "@type": "Organization", name: "Wayzure", url: SITE_URL },
          areaServed: s.market,
          ...(review ? {
            aggregateRating: { "@type": "AggregateRating", ratingValue: review.rating, bestRating: 5, ratingCount: 1 },
            review: { "@type": "Review", reviewBody: review.quote, author: { "@type": "Person", name: review.author }, reviewRating: { "@type": "Rating", ratingValue: review.rating, bestRating: 5 } },
          } : {}),
        },
        ...(video ? [{
          "@context": "https://schema.org", "@type": "VideoObject", name: locale === "en" ? video.titleEn : video.title, description: locale === "en" ? video.captionEn : video.caption,
          thumbnailUrl: `${SITE_URL}${video.poster}`, contentUrl: `${SITE_URL}${video.mp4}`, uploadDate: "2026-11-18", duration: video.duration,
        }] : []),
      ]} />

      <section className="relative overflow-hidden bg-sky">
        <GridGlow />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:grid-cols-[1fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-medium text-accent"><Link href={h("/solutions")} className="hover:text-accent-hover">Solutions</Link> · {s.category}</p>
            <h1 className="mt-5 flex items-center gap-4 font-display text-5xl font-semibold tracking-tight text-fg sm:text-6xl">
              <ProductMark slug={s.slug} className="size-12 sm:size-14" />{s.name}
            </h1>
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-fg">{s.tagline}</p>
            <p className="mt-4 max-w-xl leading-relaxed text-fg-2">{s.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={s.url} rel="noopener" className="group inline-flex items-center gap-2 rounded-full bg-btn px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#055e8f]">{T.goTo(host)} <Arrow /></a>
              <a href={demo} className="inline-flex items-center gap-2 rounded-full border border-line bg-bg px-6 py-3.5 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent">{T.demoCta}</a>
            </div>
          </div>
          {hero && (
            <div className="relative">
              <div aria-hidden className="absolute -inset-8 rounded-[3rem] bg-[radial-gradient(closest-side,rgba(7,130,198,.22),transparent)] blur-2xl" />
              <ShotFrame locale={locale} shot={hero} priority sizes="(min-width: 1024px) 640px, 100vw" className="relative hero-float" />
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <SectionTitle eyebrow={T.problem} title={T.problemTitle}>{s.problem}</SectionTitle>
          <div className="space-y-6">
          {photo && (
            <figure data-reveal className="overflow-hidden rounded-3xl">
              <Photo locale={locale} photo={photo} sizes="(min-width: 1024px) 680px, 100vw" className="aspect-[16/9] w-full" />
            </figure>
          )}
          <dl data-reveal className="grid gap-4 rounded-3xl bg-surface p-7 sm:grid-cols-2">
            <div><dt className="text-sm text-muted">{T.who}</dt><dd className="mt-1 font-medium">{s.audience}</dd></div>
            <div><dt className="text-sm text-muted">{T.market}</dt><dd className="mt-1 font-medium">{s.market}</dd></div>
            {s.proof && <div className="sm:col-span-2"><dt className="text-sm text-muted">{T.know}</dt><dd className="mt-1 leading-relaxed">{s.proof}</dd></div>}
          </dl>
          </div>
        </div>
      </section>

      {(video || gallery.length > 0) && (
        <section className="border-t border-line">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <SectionTitle eyebrow={T.imgEyebrow} title={T.imgTitle(s.name)}>
              {T.imgText}
            </SectionTitle>
            {video && (
              <figure data-reveal className="mt-12">
                <VideoPlayer locale={locale} video={video} sizes="(min-width: 1280px) 1216px, 100vw" />
                <figcaption className="mt-4 text-sm text-muted">{locale === "en" ? video.captionEn : video.caption}</figcaption>
              </figure>
            )}
            {gallery.length > 0 && (
              <div className={`mt-12 grid items-start gap-10 ${gallery.length >= 3 ? "md:grid-cols-3" : gallery.length === 2 ? "md:grid-cols-2" : "mx-auto max-w-3xl"}`}>
                {gallery.map(g => <ShotFigure locale={locale} key={g.src} shot={g} sizes="(min-width: 768px) 50vw, 100vw" />)}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionTitle eyebrow={T.featEyebrow} title={T.featTitle(s.name)} />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {s.features.map((f, i) => (
              <div key={f.t} data-reveal style={{ "--d": `${i * 70}ms` } as React.CSSProperties} className="rounded-3xl border border-line bg-bg p-7">
                <p className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight"><Check />{f.t}</p>
                <p className="mt-3 text-sm leading-relaxed text-fg-2">{f.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-sm text-muted">{T.source} <a href={s.url} rel="noopener" className="text-accent underline underline-offset-2">{host}</a>{T.sourceEnd}</p>
        </div>
      </section>

      {review && (
        <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
          <p data-reveal className="mb-6 text-sm font-medium text-accent">{T.review}</p>
          <Testimonial locale={locale} linkProduct={false} />
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-sm font-medium text-accent">{T.others}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {others.map(o => (
            <Link key={o.slug} href={h(`/solutions/${o.slug}`)} className="group flex items-center gap-4 rounded-2xl border border-line p-5 transition-shadow hover:shadow-lg hover:shadow-black/5">
              <ProductMark slug={o.slug} className="size-10" />
              <span className="flex-1"><span className="block font-semibold">{o.name}</span><span className="block text-sm text-muted">{o.category}</span></span>
              <Arrow />
            </Link>
          ))}
        </div>
      </section>

      <CtaBand locale={locale} title={T.ctaTitle} text={T.ctaText} />
    </Page>
  );
}
