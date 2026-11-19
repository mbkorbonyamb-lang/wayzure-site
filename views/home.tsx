import Link from "next/link";
import { Arrow, Check, CtaBand, GridGlow, Page, SectionTitle } from "@/components/chrome";
import { ExpertiseIcon } from "@/components/icons";
import { ProductMark } from "@/components/marks";
import { ClientLogos } from "@/components/client-logos";
import { JoinBand } from "@/components/join-band";
import { KeyFigures } from "@/components/key-figures";
import { HeroPhoto, Photo } from "@/components/photo";
import { Testimonial } from "@/components/testimonial";
import { SolutionVisual } from "@/components/solution-visual";
import { VideoPlayer } from "@/components/video-player";
import { JsonLd } from "@/components/json-ld";
import { COMPANY, GUINEA, SITE_URL } from "@/lib/company";
import { getContent } from "@/lib/content";
import { href, type Locale } from "@/lib/i18n";
import { FILM } from "@/lib/media";
import { PHOTOS, POLE_PHOTOS } from "@/lib/photos";
import { meta } from "@/lib/seo";

// Situation de départ, puis ce qui change. Formulées à partir de cas fréquents, sans client nommé.
const STORIES = {
  fr: [
    { before: "Les données sont partout, les décisions se prennent à l'instinct.", after: "Des indicateurs fiables, à jour, que les équipes consultent vraiment." },
    { before: "Les outils se sont empilés, plus personne n'a la vue d'ensemble.", after: "Une feuille de route chiffrée et un système d'information qui tient." },
    { before: "Le métier tourne sur des tableurs et des ressaisies.", after: "Une application faite pour vos processus, reliée à vos autres outils." },
    { before: "Les nouveaux outils sont là, les équipes ne s'en servent pas.", after: "Des équipes formées sur leurs cas réels, qui adoptent les outils." },
  ],
  en: [
    { before: "Data is everywhere, and decisions are made on gut feeling.", after: "Reliable, up-to-date indicators that teams actually use." },
    { before: "Tools have piled up and nobody has the full picture any more.", after: "A costed roadmap and an information system that holds together." },
    { before: "The business runs on spreadsheets and double entry.", after: "An application built for your processes, connected to your other tools." },
    { before: "The new tools are there, but teams don't use them.", after: "Teams trained on their real cases, who adopt the tools." },
  ],
};

const TX = {
  fr: {
    badge: "ESN et éditeur de solutions numériques · France · Guinée",
    h1: <>Le numérique qui fait <span className="text-accent">avancer</span> votre entreprise.</>,
    intro: "Wayzure conseille, développe et forme. Data et intelligence artificielle, conseil IT, applications métiers, formation et services IT : une seule équipe, du cadrage à la mise en service. Et nous éditons nos propres logiciels, en production chaque jour.",
    cta: "Parler de votre projet", cta2: "Découvrir nos expertises",
    chipA: "4 logiciels Wayzure", chipB: "en service en France et en Guinée", chipC: "Du cadrage à la mise en service",
    figEyebrow: "Wayzure en chiffres", figTitle: "Une équipe installée, des logiciels en service.",
    storyEyebrow: "Ce qui nous amène chez vous", storyTitle: "Un problème concret au départ. Un changement visible à l'arrivée.",
    storyText: "Nos clients ne viennent pas chercher une technologie. Ils viennent régler une situation qui coûte du temps, de l'argent ou des clients.",
    before: "Avant", after: "Après",
    polesEyebrow: "Nos expertises", polesTitle: "Quatre pôles, une même équipe.",
    polesText: "Sur un même projet, ils se répondent : on cadre, on construit, on exploite les données, on forme les équipes.",
    discoverPole: "Découvrir le pôle", daily: "Au quotidien", more: "En savoir plus",
    filmEyebrow: "Wayzure en 30 secondes", filmTitle: "Une ESN qui fait tourner ses propres logiciels.", filmNote: "Les écrans montrés sont ceux de nos applications, avec leurs données d'exemple.",
    solEyebrow: "Nos solutions", solTitle: "Nous éditons aussi nos logiciels.",
    solText: "Conçus, développés et exploités par Wayzure, ils sont en service en France et en Guinée. Les méthodes qui les font tourner sont celles que nous appliquons à vos projets.",
    allSol: "Toutes nos solutions", see: (n: string) => `Voir ${n} en images`,
    reviews: "Ils utilisent nos logiciels",
    methodEyebrow: "Notre façon de travailler", methodTitle: "Pas d'effet tunnel. Des résultats à chaque étape.",
    whereEyebrow: "Où nous intervenons", whereTitle: "Entre la France et la Guinée.",
    whereText: "Deux sociétés, une même équipe. Nous intervenons sur site en Île-de-France et à Conakry, et à distance partout ailleurs.",
    france: "France", guinea: "Guinée",
    frText: "Siège à Clamart, aux portes de Paris. Entreprises, PME et organisations en France.",
    gnText: "Bureau à Conakry. Entreprises, institutions et organisations en Guinée.",
  },
  en: {
    badge: "IT services company and software publisher · France · Guinea",
    h1: <>Digital that moves your business <span className="text-accent">forward</span>.</>,
    intro: "Wayzure advises, builds and trains. Data and artificial intelligence, IT consulting, business applications, training and IT services: one team, from scoping to go-live. And we publish our own software, running in production every day.",
    cta: "Discuss your project", cta2: "Explore our expertise",
    chipA: "4 Wayzure software products", chipB: "in service in France and Guinea", chipC: "From scoping to go-live",
    figEyebrow: "Wayzure in figures", figTitle: "An established team, software in service.",
    storyEyebrow: "What brings us to you", storyTitle: "A concrete problem at the start. A visible change at the end.",
    storyText: "Our clients don't come looking for a technology. They come to fix a situation that is costing them time, money or customers.",
    before: "Before", after: "After",
    polesEyebrow: "Our expertise", polesTitle: "Four practices, one team.",
    polesText: "On a single project they work hand in hand: we scope, we build, we put the data to work, we train the teams.",
    discoverPole: "Explore this practice", daily: "Day to day", more: "Learn more",
    filmEyebrow: "Wayzure in 30 seconds", filmTitle: "An IT services company that runs its own software.", filmNote: "The screens shown are from our applications, with their sample data.",
    solEyebrow: "Our solutions", solTitle: "We also publish our own software.",
    solText: "Designed, built and operated by Wayzure, they are in service in France and Guinea. The methods that keep them running are the ones we apply to your projects.",
    allSol: "All our solutions", see: (n: string) => `See ${n} in pictures`,
    reviews: "They use our software",
    methodEyebrow: "How we work", methodTitle: "No black box. Results at every stage.",
    whereEyebrow: "Where we work", whereTitle: "Between France and Guinea.",
    whereText: "Two companies, one team. We work on site in the Paris region and in Conakry, and remotely everywhere else.",
    france: "France", guinea: "Guinea",
    frText: "Head office in Clamart, just outside Paris. Companies, SMEs and organisations in France.",
    gnText: "Office in Conakry. Companies, institutions and organisations in Guinea.",
  },
};

const HOME_TITLE = { fr: "Wayzure : le numérique qui fait avancer votre entreprise", en: "Wayzure: digital that moves your business forward" };
const HOME_DESC = {
  fr: "Wayzure, ESN et éditeur de solutions numériques : data et intelligence artificielle, conseil IT, développement d'applications, formation et services IT, en France et en Guinée.",
  en: "Wayzure, IT services company and software publisher: data and artificial intelligence, IT consulting, application development, training and IT services, in France and Guinea.",
};

export const homeMeta = (locale: Locale) => ({ ...meta("/", HOME_TITLE[locale], HOME_DESC[locale], locale), title: { absolute: HOME_TITLE[locale] } });

export function Home({ locale = "fr" }: { locale?: Locale }) {
  const { EXPERTISES, IT_SERVICES, KEY_FIGURES, SOLUTIONS, STEPS } = getContent(locale);
  const T = TX[locale];
  const h = (p: string) => href(locale, p);
  const film = { title: locale === "en" ? FILM.titleEn : FILM.title, caption: locale === "en" ? FILM.captionEn : FILM.caption };
  const stories = STORIES[locale].map((s, i) => ({ ...s, pole: EXPERTISES[i] }));
  return (
    <Page locale={locale} path="/">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "VideoObject", name: film.title, description: film.caption, inLanguage: locale, thumbnailUrl: `${SITE_URL}${FILM.poster}`, contentUrl: `${SITE_URL}${FILM.mp4}`, uploadDate: "2026-11-18", duration: FILM.duration }} />
      {/* Accroche */}
      <section className="relative overflow-hidden bg-sky">
        <GridGlow />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 sm:pt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-8 lg:pb-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-sky-2 bg-bg/70 px-3 py-1 text-xs font-medium text-accent">
              <span className="size-1.5 rounded-full bg-brand" />{T.badge}
            </p>
            <h1 className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-fg sm:text-6xl lg:text-[4.1rem]">{T.h1}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-2">{T.intro}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={h("/contact")} className="group inline-flex items-center gap-2 rounded-full bg-btn px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-[#0670aa]/20 transition-colors hover:bg-[#055e8f]">{T.cta} <Arrow /></Link>
              <Link href={h("/expertises")} className="inline-flex items-center gap-2 rounded-full border border-line bg-bg px-6 py-3.5 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent">{T.cta2}</Link>
            </div>
          </div>
          <HeroPhoto locale={locale} photo={PHOTOS.hero} sizes="(min-width: 1024px) 580px, 100vw" className="mb-6 lg:mb-0">
            <div style={{ "--d": ".5s" } as React.CSSProperties} className="chip-in absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl bg-bg/95 p-3 pr-4 shadow-xl shadow-black/10 ring-1 ring-line backdrop-blur sm:left-6">
              <span className="flex -space-x-2">{SOLUTIONS.map(x => <ProductMark key={x.slug} slug={x.slug} className="size-8 rounded-lg ring-2 ring-bg" />)}</span>
              <span className="text-xs leading-tight"><span className="block font-semibold">{T.chipA}</span><span className="text-muted">{T.chipB}</span></span>
            </div>
            <div style={{ "--d": ".8s" } as React.CSSProperties} className="chip-in absolute -top-4 right-4 hidden items-center gap-2 rounded-full bg-bg/95 px-3.5 py-2 text-xs font-medium shadow-lg shadow-black/10 ring-1 ring-line backdrop-blur sm:flex">
              <span className="size-2 rounded-full bg-[#28c840]" />{T.chipC}
            </div>
          </HeroPhoto>
        </div>
        <div className="relative border-t border-sky-2">
          <ul className="mx-auto flex max-w-7xl flex-wrap gap-x-8 gap-y-2 px-4 py-5 text-sm text-fg-2 sm:px-6 lg:px-8">
            {[...EXPERTISES, IT_SERVICES].map(e => (
              <li key={e.slug}><Link href={h(`/expertises/${e.slug}`)} className="inline-flex items-center gap-2 hover:text-accent"><ExpertiseIcon slug={e.slug} className="size-4 text-accent" />{e.name}</Link></li>
            ))}
          </ul>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div data-reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-accent">{T.figEyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{T.figTitle}</h2>
          </div>
        </div>
        <KeyFigures figures={KEY_FIGURES} />
      </section>

      <ClientLogos locale={locale} />

      {/* Problèmes et transformations */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionTitle eyebrow={T.storyEyebrow} title={T.storyTitle}>{T.storyText}</SectionTitle>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {stories.map((s, i) => (
            <Link key={s.pole.slug} href={h(`/expertises/${s.pole.slug}`)} data-reveal style={{ "--d": `${i * 80}ms` } as React.CSSProperties} className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-bg p-7 transition-shadow hover:shadow-xl hover:shadow-black/5 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-wider text-muted">{T.before}</p>
              <p className="mt-2 text-lg leading-snug text-fg-2">{s.before}</p>
              <div className="my-5 flex items-center gap-3 text-accent"><span className="h-px flex-1 bg-line" /><ExpertiseIcon slug={s.pole.slug} className="size-5" /><span className="h-px flex-1 bg-line" /></div>
              <p className="text-xs font-medium uppercase tracking-wider text-accent">{T.after}</p>
              <p className="mt-2 font-display text-xl font-semibold leading-snug tracking-tight">{s.after}</p>
              <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent">{s.pole.name} <Arrow /></p>
            </Link>
          ))}
        </div>
      </section>

      {/* Pôles */}
      <section id="expertises" className="scroll-mt-20 border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <SectionTitle eyebrow={T.polesEyebrow} title={T.polesTitle}>{T.polesText}</SectionTitle>
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {EXPERTISES.map((e, i) => (
              <article key={e.slug} data-reveal style={{ "--d": `${(i % 2) * 90}ms` } as React.CSSProperties} className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-bg">
                <div className="relative aspect-[16/7] overflow-hidden">
                  <Photo locale={locale} photo={POLE_PHOTOS[e.slug]} sizes="(min-width: 1024px) 600px, 100vw" className="size-full transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <div className="flex flex-1 flex-col p-7 sm:p-9">
                <div className="flex items-center gap-4">
                  <span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent"><ExpertiseIcon slug={e.slug} /></span>
                  <div>
                    <p className="font-mono text-xs text-muted">0{i + 1}</p>
                    <h3 className="font-display text-2xl font-semibold tracking-tight">{e.name}</h3>
                  </div>
                </div>
                <p className="mt-5 text-fg-2">{e.lead}</p>
                <ul className="mt-6 flex-1 space-y-2.5 text-[0.95rem]">
                  {e.items.map(it => <li key={it.t} className="flex gap-3"><Check /><span>{it.t}</span></li>)}
                </ul>
                <Link href={h(`/expertises/${e.slug}`)} className="group mt-8 inline-flex items-center gap-2 self-start text-sm font-medium text-accent hover:text-accent-hover">{T.discoverPole} <Arrow /></Link>
                </div>
              </article>
            ))}
          </div>

          {/* Services IT */}
          <div data-reveal className="mt-5 grid gap-8 rounded-3xl border border-sky-2 bg-sky p-7 sm:p-9 lg:grid-cols-[1fr_1.6fr] lg:items-center">
            <div>
              <div className="flex items-center gap-3 text-accent"><ExpertiseIcon slug="services-it" /><p className="text-sm font-medium">{T.daily}</p></div>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{IT_SERVICES.name}</h3>
              <p className="mt-2 text-fg-2">{IT_SERVICES.lead}</p>
              <Link href={h(`/expertises/${IT_SERVICES.slug}`)} className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent">{T.more} <Arrow /></Link>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {IT_SERVICES.items.map(it => (
                <li key={it.t} className="rounded-2xl border border-line bg-bg p-5">
                  <p className="font-medium">{it.t}</p>
                  <p className="mt-1 text-sm leading-relaxed text-fg-2">{it.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Film */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_75%_50%,var(--sky-2),transparent_70%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1fr_1.6fr] lg:px-8">
          <div data-reveal>
            <p className="text-sm font-medium text-accent">{T.filmEyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{T.filmTitle}</h2>
            <p className="mt-4 leading-relaxed text-fg-2">{film.caption} {T.filmNote}</p>
          </div>
          <figure data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
            <VideoPlayer locale={locale} video={FILM} sizes="(min-width: 1024px) 760px, 100vw" />
          </figure>
        </div>
      </section>

      {/* Solutions */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle eyebrow={T.solEyebrow} title={T.solTitle}>{T.solText}</SectionTitle>
          <Link href={h("/solutions")} className="group inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover">{T.allSol} <Arrow /></Link>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {SOLUTIONS.map((s, i) => (
            <Link key={s.slug} href={h(`/solutions/${s.slug}`)} data-reveal style={{ "--d": `${(i % 2) * 90}ms` } as React.CSSProperties} className="group flex flex-col overflow-hidden rounded-3xl border border-line transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/5">
              <div className="transition-transform duration-700 group-hover:scale-[1.015]"><SolutionVisual locale={locale} slug={s.slug} compact sizes="(min-width: 768px) 560px, 100vw" /></div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <ProductMark slug={s.slug} className="size-9" />
                  <p className="font-display text-xl font-semibold tracking-tight">{s.name}</p>
                  <span className="ml-auto rounded-full bg-surface px-2.5 py-1 text-xs text-muted">{s.market}</span>
                </div>
                <p className="mt-3 text-sm font-medium text-accent">{s.category}</p>
                <p className="mt-2 flex-1 leading-relaxed text-fg-2">{s.tagline}</p>
                <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent">{T.see(s.name)} <Arrow /></p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Avis client */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <p data-reveal className="mb-6 text-sm font-medium text-accent">{T.reviews}</p>
        <Testimonial locale={locale} />
      </section>

      {/* Méthode */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <SectionTitle eyebrow={T.methodEyebrow} title={T.methodTitle} />
          <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.t} data-reveal style={{ "--d": `${i * 80}ms` } as React.CSSProperties} className="relative rounded-3xl border border-line bg-bg p-6">
                <p className="font-display text-4xl font-semibold text-accent/25">0{i + 1}</p>
                <p className="mt-4 font-semibold">{s.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-fg-2">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Présence */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <SectionTitle eyebrow={T.whereEyebrow} title={T.whereTitle}>{T.whereText}</SectionTitle>
          <div className="grid gap-5 sm:grid-cols-2">
            <div data-reveal className="rounded-3xl border border-line p-7">
              <p className="text-sm font-medium text-accent">{T.france}</p>
              <p className="mt-2 font-display text-xl font-semibold">{COMPANY.legalName}</p>
              <p className="mt-2 text-sm leading-relaxed text-fg-2">{T.frText}</p>
            </div>
            <div data-reveal style={{ "--d": "90ms" } as React.CSSProperties} className="rounded-3xl border border-line p-7">
              <p className="text-sm font-medium text-accent">{T.guinea}</p>
              <p className="mt-2 font-display text-xl font-semibold">{GUINEA.legalName}</p>
              <p className="mt-2 text-sm leading-relaxed text-fg-2">{T.gnText}</p>
            </div>
          </div>
        </div>
      </section>

      <JoinBand locale={locale} />

      <CtaBand locale={locale} />
    </Page>
  );
}
