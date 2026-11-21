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
import { getContent } from "@/lib/content";
import { href, type Locale } from "@/lib/i18n";
import { POLE_PHOTOS } from "@/lib/photos";
import { meta } from "@/lib/seo";
import { PAGE_SEO } from "@/lib/page-seo";

const TX = {
  fr: {
    expertises: "Expertises", cta: "Parler de votre projet", subject: (n: string) => `Projet : ${n}`,
    probEyebrow: "Situations fréquentes", probTitle: "Vous vous reconnaissez ?",
    doEyebrow: "Ce que nous faisons", doTitle: "Nos interventions.",
    changes: "Ce qui change",
    proof: "Logiciels Wayzure associés", proofText: "Ces logiciels, prêts à l'emploi pour votre organisation, reposent sur ce savoir-faire.",
    seeImages: (n: string) => `Voir ${n} en images`,
    others: "Autres expertises",
    refEyebrow: "Références", refTitle: "Ils nous ont confié leur projet.",
  },
  en: {
    expertises: "Expertise", cta: "Discuss your project", subject: (n: string) => `Project: ${n}`,
    probEyebrow: "Common situations", probTitle: "Sound familiar?",
    doEyebrow: "What we do", doTitle: "How we help.",
    changes: "What changes",
    proof: "Related Wayzure software", proofText: "These products, ready to use in your organisation, are built on this know-how.",
    seeImages: (n: string) => `See ${n} in pictures`,
    others: "Other areas of expertise",
    refEyebrow: "References", refTitle: "They trusted us with their project.",
  },
};

export const expertiseSlugs = () => getContent("fr").ALL_EXPERTISES.map(e => ({ slug: e.slug }));

export function expertiseMeta(locale: Locale, slug: string) {
  const e = getContent(locale).ALL_EXPERTISES.find(x => x.slug === slug);
  if (!e) return {};
  const seo = PAGE_SEO[locale].expertise[e.slug];
  return meta(`/expertises/${e.slug}`, seo?.title ?? e.name, seo?.desc ?? e.seo, locale);
}

export function Expertise({ locale = "fr", slug }: { locale?: Locale; slug: string }) {
  const { ALL_EXPERTISES, SOLUTIONS } = getContent(locale);
  const e = ALL_EXPERTISES.find(x => x.slug === slug);
  if (!e) notFound();
  const T = TX[locale];
  const h = (p: string) => href(locale, p);
  const related = SOLUTIONS.filter(s => e.solutions.includes(s.slug));
  const photo = POLE_PHOTOS[e.slug];
  const others = ALL_EXPERTISES.filter(x => x.slug !== e.slug);
  // Le sujet du formulaire de contact reste le nom français du pôle (valeur attendue par l'API).
  const topic = getContent("fr").ALL_EXPERTISES.find(x => x.slug === e.slug)!.name;

  return (
    <Page locale={locale} path={`/expertises/${e.slug}`}>
      <JsonLd data={[
        breadcrumb([[T.expertises, "/expertises"], [e.name, `/expertises/${e.slug}`]], locale),
        {
          "@context": "https://schema.org", "@type": "Service", name: e.name, description: e.seo, serviceType: e.name, inLanguage: locale,
          provider: { "@type": "Organization", name: "Wayzure", url: SITE_URL }, areaServed: ["FR", "GN"], url: `${SITE_URL}${h(`/expertises/${e.slug}`)}`,
          hasOfferCatalog: { "@type": "OfferCatalog", name: e.name, itemListElement: e.items.map(it => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: it.t, description: it.d } })) },
        },
      ]} />
      <PageHero
        eyebrow={<Link href={h("/expertises")} className="hover:text-accent-hover">{T.expertises}</Link>}
        title={e.name}
        aside={photo && <HeroPhoto locale={locale} photo={photo} className="lg:ml-6"><span className="chip-in absolute -bottom-5 left-5 grid size-16 place-items-center rounded-2xl bg-bg text-accent shadow-xl shadow-black/10 ring-1 ring-line"><ExpertiseIcon slug={e.slug} className="size-8" /></span></HeroPhoto>}
      >
        <p className="mt-5 max-w-2xl text-xl leading-relaxed text-fg">{e.lead}</p>
        <p className="mt-4 max-w-2xl leading-relaxed text-fg-2">{e.intro}</p>
        <a href={contactHref(T.subject(e.name), topic, locale)} className="group mt-8 inline-flex items-center gap-2 rounded-full bg-btn px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#055e8f]">{T.cta} <Arrow /></a>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <SectionTitle eyebrow={T.probEyebrow} title={T.probTitle} />
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
          <SectionTitle eyebrow={T.doEyebrow} title={T.doTitle} />
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
            <p className="text-sm font-medium text-accent">{T.changes}</p>
            <ul className="mt-6 space-y-4">
              {e.outcomes.map(o => <li key={o} className="flex gap-3 text-lg text-fg"><Check />{o}</li>)}
            </ul>
          </div>
          {related.length > 0 ? (
            <div data-reveal style={{ "--d": "90ms" } as React.CSSProperties}>
              <p className="text-sm font-medium text-accent">{T.proof}</p>
              <p className="mt-3 text-fg-2">{T.proofText}</p>
              <Link href={h(`/solutions/${related[0].slug}`)} className="mt-6 block" aria-label={T.seeImages(related[0].name)}>
                <SolutionVisual locale={locale} slug={related[0].slug} compact sizes="(min-width: 1024px) 560px, 100vw" />
              </Link>
              <div className="mt-4 space-y-3">
                {related.map(s => (
                  <Link key={s.slug} href={h(`/solutions/${s.slug}`)} className="group flex items-center gap-4 rounded-2xl border border-line p-4 transition-shadow hover:shadow-lg hover:shadow-black/5">
                    <ProductMark slug={s.slug} className="size-10" />
                    <span className="flex-1"><span className="block font-semibold">{s.name}</span><span className="block text-sm text-muted">{s.category}</span></span>
                    <Arrow />
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div data-reveal>
              <p className="text-sm font-medium text-accent">{T.others}</p>
              <div className="mt-6 space-y-3">
                {others.slice(0, 3).map(o => (
                  <Link key={o.slug} href={h(`/expertises/${o.slug}`)} className="group flex items-center gap-4 rounded-2xl border border-line p-4 transition-shadow hover:shadow-lg hover:shadow-black/5">
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
            <SectionTitle eyebrow={T.refEyebrow} title={T.refTitle} />
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {e.cases.map((c, i) => (
                <article key={c.client} data-reveal style={{ "--d": `${(i % 2) * 70}ms` } as React.CSSProperties} className="flex flex-col rounded-3xl border border-line bg-bg p-7 sm:p-8">
                  {c.logo && (
                    <span className="mb-6 grid h-24 w-full max-w-[16rem] place-items-center overflow-hidden rounded-2xl bg-white px-5 ring-1 ring-black/5">
                      <Image src={c.logo} alt={c.client} width={720} height={360} className="h-[4.5rem] w-auto max-w-full object-contain" />
                    </span>
                  )}
                  <h3 className="font-display text-xl font-semibold tracking-tight">{c.client}</h3>
                  {c.context && <p className="mt-1 text-sm text-muted">{c.context}</p>}
                  <p className="mt-4 leading-relaxed text-fg-2">{c.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand locale={locale} />
    </Page>
  );
}
