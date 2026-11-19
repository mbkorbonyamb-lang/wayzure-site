import Link from "next/link";
import { Arrow, Check, CtaBand, GridGlow, Page, SectionTitle } from "@/components/chrome";
import { ExpertiseIcon } from "@/components/icons";
import { ProductMark } from "@/components/marks";
import { ClientLogos } from "@/components/client-logos";
import { KeyFigures } from "@/components/key-figures";
import { HeroPhoto, Photo } from "@/components/photo";
import { Testimonial } from "@/components/testimonial";
import { SolutionVisual } from "@/components/solution-visual";
import { VideoPlayer } from "@/components/video-player";
import { JsonLd } from "@/components/json-ld";
import { COMPANY, GUINEA, SITE_URL } from "@/lib/company";
import { EXPERTISES, IT_SERVICES, KEY_FIGURES, SOLUTIONS, STEPS } from "@/lib/content";
import { FILM } from "@/lib/media";
import { PHOTOS, POLE_PHOTOS } from "@/lib/photos";

// Situation de départ, puis ce qui change. Formulées à partir de cas fréquents, sans client nommé.
const STORIES = [
  { pole: EXPERTISES[0], before: "Les données sont partout, les décisions se prennent à l'instinct.", after: "Des indicateurs fiables, à jour, que les équipes consultent vraiment." },
  { pole: EXPERTISES[1], before: "Les outils se sont empilés, plus personne n'a la vue d'ensemble.", after: "Une feuille de route chiffrée et un système d'information qui tient." },
  { pole: EXPERTISES[2], before: "Le métier tourne sur des tableurs et des ressaisies.", after: "Une application faite pour vos processus, reliée à vos autres outils." },
  { pole: EXPERTISES[3], before: "Les nouveaux outils sont là, les équipes ne s'en servent pas.", after: "Des équipes formées sur leurs cas réels, qui adoptent les outils." },
];

export default function Home() {
  return (
    <Page>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "VideoObject", name: FILM.title, description: FILM.caption, thumbnailUrl: `${SITE_URL}${FILM.poster}`, contentUrl: `${SITE_URL}${FILM.mp4}`, uploadDate: "2026-11-18", duration: FILM.duration }} />
      {/* Accroche */}
      <section className="relative overflow-hidden bg-sky">
        <GridGlow />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 sm:pt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-8 lg:pb-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-sky-2 bg-bg/70 px-3 py-1 text-xs font-medium text-accent">
              <span className="size-1.5 rounded-full bg-brand" />ESN et éditeur de solutions numériques · France · Guinée
            </p>
            <h1 className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-fg sm:text-6xl lg:text-[4.1rem]">
              Le numérique qui fait <span className="text-accent">avancer</span> votre entreprise.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-2">
              Wayzure conseille, développe et forme. Data et intelligence artificielle, conseil IT, applications métiers, formation et services IT : une seule équipe, du cadrage à la mise en service. Et nous éditons nos propres logiciels, en production chaque jour.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-btn px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-[#0670aa]/20 transition-colors hover:bg-[#055e8f]">Parler de votre projet <Arrow /></Link>
              <Link href="/expertises" className="inline-flex items-center gap-2 rounded-full border border-line bg-bg px-6 py-3.5 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent">Découvrir nos expertises</Link>
            </div>
          </div>
          <HeroPhoto photo={PHOTOS.hero} sizes="(min-width: 1024px) 580px, 100vw" className="mb-6 lg:mb-0">
            <div style={{ "--d": ".5s" } as React.CSSProperties} className="chip-in absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl bg-bg/95 p-3 pr-4 shadow-xl shadow-black/10 ring-1 ring-line backdrop-blur sm:left-6">
              <span className="flex -space-x-2">{SOLUTIONS.map(x => <ProductMark key={x.slug} slug={x.slug} className="size-8 rounded-lg ring-2 ring-bg" />)}</span>
              <span className="text-xs leading-tight"><span className="block font-semibold">4 logiciels Wayzure</span><span className="text-muted">en service en France et en Guinée</span></span>
            </div>
            <div style={{ "--d": ".8s" } as React.CSSProperties} className="chip-in absolute -top-4 right-4 hidden items-center gap-2 rounded-full bg-bg/95 px-3.5 py-2 text-xs font-medium shadow-lg shadow-black/10 ring-1 ring-line backdrop-blur sm:flex">
              <span className="size-2 rounded-full bg-[#28c840]" />Du cadrage à la mise en service
            </div>
          </HeroPhoto>
        </div>
        <div className="relative border-t border-sky-2">
          <ul className="mx-auto flex max-w-7xl flex-wrap gap-x-8 gap-y-2 px-4 py-5 text-sm text-fg-2 sm:px-6 lg:px-8">
            {[...EXPERTISES, IT_SERVICES].map(e => (
              <li key={e.slug}><Link href={`/expertises/${e.slug}`} className="inline-flex items-center gap-2 hover:text-accent"><ExpertiseIcon slug={e.slug} className="size-4 text-accent" />{e.name}</Link></li>
            ))}
          </ul>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div data-reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-accent">Wayzure en chiffres</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Une équipe installée, des logiciels en service.</h2>
          </div>
        </div>
        <KeyFigures figures={KEY_FIGURES} />
      </section>

      <ClientLogos />

      {/* Problèmes et transformations */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Ce qui nous amène chez vous" title="Un problème concret au départ. Un changement visible à l'arrivée.">
          Nos clients ne viennent pas chercher une technologie. Ils viennent régler une situation qui coûte du temps, de l&apos;argent ou des clients.
        </SectionTitle>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {STORIES.map((s, i) => (
            <Link key={s.pole.slug} href={`/expertises/${s.pole.slug}`} data-reveal style={{ "--d": `${i * 80}ms` } as React.CSSProperties} className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-bg p-7 transition-shadow hover:shadow-xl hover:shadow-black/5 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-wider text-muted">Avant</p>
              <p className="mt-2 text-lg leading-snug text-fg-2">{s.before}</p>
              <div className="my-5 flex items-center gap-3 text-accent"><span className="h-px flex-1 bg-line" /><ExpertiseIcon slug={s.pole.slug} className="size-5" /><span className="h-px flex-1 bg-line" /></div>
              <p className="text-xs font-medium uppercase tracking-wider text-accent">Après</p>
              <p className="mt-2 font-display text-xl font-semibold leading-snug tracking-tight">{s.after}</p>
              <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent">{s.pole.name} <Arrow /></p>
            </Link>
          ))}
        </div>
      </section>

      {/* Pôles */}
      <section id="expertises" className="scroll-mt-20 border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Nos expertises" title="Quatre pôles, une même équipe.">
            Sur un même projet, ils se répondent : on cadre, on construit, on exploite les données, on forme les équipes.
          </SectionTitle>
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {EXPERTISES.map((e, i) => (
              <article key={e.slug} data-reveal style={{ "--d": `${(i % 2) * 90}ms` } as React.CSSProperties} className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-bg">
                <div className="relative aspect-[16/7] overflow-hidden">
                  <Photo photo={POLE_PHOTOS[e.slug]} sizes="(min-width: 1024px) 600px, 100vw" className="size-full transition-transform duration-700 group-hover:scale-[1.03]" />
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
                <Link href={`/expertises/${e.slug}`} className="group mt-8 inline-flex items-center gap-2 self-start text-sm font-medium text-accent hover:text-accent-hover">Découvrir le pôle <Arrow /></Link>
                </div>
              </article>
            ))}
          </div>

          {/* Services IT */}
          <div data-reveal className="mt-5 grid gap-8 rounded-3xl border border-sky-2 bg-sky p-7 sm:p-9 lg:grid-cols-[1fr_1.6fr] lg:items-center">
            <div>
              <div className="flex items-center gap-3 text-accent"><ExpertiseIcon slug="services-it" /><p className="text-sm font-medium">Au quotidien</p></div>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{IT_SERVICES.name}</h3>
              <p className="mt-2 text-fg-2">{IT_SERVICES.lead}</p>
              <Link href={`/expertises/${IT_SERVICES.slug}`} className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent">En savoir plus <Arrow /></Link>
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
            <p className="text-sm font-medium text-accent">Wayzure en 30 secondes</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Une ESN qui fait tourner ses propres logiciels.</h2>
            <p className="mt-4 leading-relaxed text-fg-2">{FILM.caption} Les écrans montrés sont ceux de nos applications, avec leurs données d&apos;exemple.</p>
          </div>
          <figure data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
            <VideoPlayer video={FILM} sizes="(min-width: 1024px) 760px, 100vw" />
          </figure>
        </div>
      </section>

      {/* Solutions */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle eyebrow="Nos solutions" title="Nous éditons aussi nos logiciels.">
            Conçus, développés et exploités par Wayzure, ils sont en service en France et en Guinée. Les méthodes qui les font tourner sont celles que nous appliquons à vos projets.
          </SectionTitle>
          <Link href="/solutions" className="group inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover">Toutes nos solutions <Arrow /></Link>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {SOLUTIONS.map((s, i) => (
            <Link key={s.slug} href={`/solutions/${s.slug}`} data-reveal style={{ "--d": `${(i % 2) * 90}ms` } as React.CSSProperties} className="group flex flex-col overflow-hidden rounded-3xl border border-line transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/5">
              <div className="transition-transform duration-700 group-hover:scale-[1.015]"><SolutionVisual slug={s.slug} compact sizes="(min-width: 768px) 560px, 100vw" /></div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <ProductMark slug={s.slug} className="size-9" />
                  <p className="font-display text-xl font-semibold tracking-tight">{s.name}</p>
                  <span className="ml-auto rounded-full bg-surface px-2.5 py-1 text-xs text-muted">{s.market}</span>
                </div>
                <p className="mt-3 text-sm font-medium text-accent">{s.category}</p>
                <p className="mt-2 flex-1 leading-relaxed text-fg-2">{s.tagline}</p>
                <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent">Voir {s.name} en images <Arrow /></p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Avis client */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <p data-reveal className="mb-6 text-sm font-medium text-accent">Ils utilisent nos logiciels</p>
        <Testimonial />
      </section>

      {/* Méthode */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Notre façon de travailler" title="Pas d'effet tunnel. Des résultats à chaque étape." />
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
          <SectionTitle eyebrow="Où nous intervenons" title="Entre la France et la Guinée.">
            Deux sociétés, une même équipe. Nous intervenons sur site en Île-de-France et à Conakry, et à distance partout ailleurs.
          </SectionTitle>
          <div className="grid gap-5 sm:grid-cols-2">
            <div data-reveal className="rounded-3xl border border-line p-7">
              <p className="text-sm font-medium text-accent">France</p>
              <p className="mt-2 font-display text-xl font-semibold">{COMPANY.legalName}</p>
              <p className="mt-2 text-sm leading-relaxed text-fg-2">Siège à Clamart, aux portes de Paris. Entreprises, PME et organisations en France.</p>
            </div>
            <div data-reveal style={{ "--d": "90ms" } as React.CSSProperties} className="rounded-3xl border border-line p-7">
              <p className="text-sm font-medium text-accent">Guinée</p>
              <p className="mt-2 font-display text-xl font-semibold">{GUINEA.legalName}</p>
              <p className="mt-2 text-sm leading-relaxed text-fg-2">Bureau à Conakry. Entreprises, institutions et organisations en Guinée.</p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </Page>
  );
}
