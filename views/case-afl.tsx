// Fiche réalisation AFL (Africa Fight League). Textes fournis par Moussa le 2026-11-21 : ne rien ajouter
// (prestation, chiffre, résultat). Témoignage de Thierno Oumar repris mot pour mot ; il doit être validé par lui
// avant publication. Photos : vraies photos fournies par Moussa (public/realisations/afl/), jamais d'images générées.
import Image from "next/image";
import Link from "next/link";
import { Arrow, Check, CtaBand, GridGlow, Page, SectionTitle } from "@/components/chrome";
import { JsonLd, breadcrumb } from "@/components/json-ld";
import { href, type Locale, UI } from "@/lib/i18n";
import { PAGE_SEO } from "@/lib/page-seo";
import { meta } from "@/lib/seo";

export const AFL_INSTAGRAM = "https://www.instagram.com/afl_officiel/";

// Photos fournies par Moussa. La première est la photo d'ouverture.
type Shot = { src: string; w: number; h: number; alt: string; altEn: string; caption: string; captionEn: string };
export const AFL_PHOTOS: Shot[] = [
  {
    src: "/realisations/afl/groupe-ceinture.webp", w: 938, h: 428,
    alt: "Thierno Oumar et le ministre de la Jeunesse tiennent la ceinture AFL, entourés des représentants présents, dont le président de Wayzure.",
    altEn: "Thierno Oumar and the Minister of Youth hold the AFL belt, surrounded by the representatives present, including Wayzure's president.",
    caption: "Présentation de la ceinture AFL au ministère de la Jeunesse, en présence du président de Wayzure (en grand boubou, à droite de Thierno Oumar).",
    captionEn: "The AFL belt presented at the Ministry of Youth, with Wayzure's president (in a grand boubou, to the right of Thierno Oumar).",
  },
  {
    src: "/realisations/afl/rencontre-ministre.webp", w: 850, h: 648,
    alt: "Le ministre de la Jeunesse, gants de boxe aux mains, aux côtés de Thierno Oumar qui tient la ceinture AFL.",
    altEn: "The Minister of Youth, wearing boxing gloves, next to Thierno Oumar holding the AFL belt.",
    caption: "Thierno Oumar et le ministre de la Jeunesse lors de la rencontre institutionnelle.",
    captionEn: "Thierno Oumar and the Minister of Youth at the institutional meeting.",
  },
  {
    src: "/realisations/afl/ceinture.webp", w: 988, h: 1078,
    alt: "La ceinture de championne du monde AFL brandie au-dessus de la tête, devant le mur des partenaires.",
    altEn: "The AFL world champion belt held overhead in front of the partners' wall.",
    caption: "La ceinture AFL, réalisée avec l'accompagnement de Wayzure.",
    captionEn: "The AFL belt, made with Wayzure's support.",
  },
];

const TX = {
  fr: {
    crumb: "Références", eyebrow: "Réalisation · Conseil", client: "AFL, Africa Fight League",
    h1: "AFL : transformer une ambition sportive en réalité institutionnelle.",
    intro: "Accompagnement stratégique, organisationnel et méthodologique d'une ligue de sports de combat, de l'idée jusqu'aux premiers combats professionnels de MMA en Guinée.",
    facts: [["Client", "AFL, Africa Fight League"], ["Porteur du projet", "Thierno Oumar, boxeur professionnel français"], ["Expertise", "Conseil en stratégie et en organisation"], ["Pays", "France et Guinée"]],
    ctxEyebrow: "Contexte et défi", ctxTitle: "Un projet sur le point d'être abandonné.",
    ctx: [
      "AFL est un projet porté par Thierno Oumar, boxeur professionnel français, qui souhaitait créer sa propre ligue de sports de combat.",
      "Après avoir été déçu par plusieurs promesses de partenariats et d'accompagnement, il envisageait d'abandonner son projet. Wayzure a alors construit avec lui un accompagnement stratégique, organisationnel et méthodologique pour transformer son ambition en une organisation concrète.",
    ],
    missionsEyebrow: "Notre accompagnement", missionsTitle: "De la vision à l'organisation.",
    missions: [
      { t: "Conseil stratégique", d: "Conseil stratégique et structuration du projet." },
      { t: "Nom de la ligue", d: "Recherche et validation du nom de la ligue." },
      { t: "Documents stratégiques", d: "Rédaction des documents stratégiques." },
      { t: "Identité visuelle", d: "Conception du logo et de l'identité visuelle." },
      { t: "Première ceinture AFL", d: "Accompagnement jusqu'à la réalisation de la première ceinture AFL." },
      { t: "Démarches institutionnelles", d: "Appui aux démarches et aux mises en relation institutionnelles auprès du ministère de la Jeunesse en Guinée." },
    ],
    stepsEyebrow: "Étapes clés", stepsTitle: "Du projet structuré à la première soirée.",
    steps: [
      { t: "Structurer", d: "Conseil stratégique, structuration du projet et documents stratégiques." },
      { t: "Incarner", d: "Nom de la ligue, logo, identité visuelle et première ceinture AFL." },
      { t: "Ancrer institutionnellement", d: "Démarches et mises en relation auprès du ministère de la Jeunesse en Guinée." },
      { t: "Concrétiser", d: "Le 13 juin 2026, premiers combats professionnels de MMA en Guinée." },
    ],
    resultEyebrow: "Résultat", resultDate: "13 juin 2026",
    result: "Cet accompagnement a contribué à l'organisation des premiers combats professionnels de MMA en Guinée, avec la participation de la Fédération guinéenne de MMA et une retransmission dans plus d'une centaine de pays.",
    reviewEyebrow: "Témoignage client",
    galleryEyebrow: "En images", galleryTitle: "La ligue, ses ceintures, ses partenaires institutionnels.",
    insta: "Suivre AFL sur Instagram",
    ctaTitle: "Une ambition à transformer en organisation ?",
    ctaText: "Stratégie, organisation, identité, démarches : nous accompagnons les projets de la vision à la concrétisation.",
    rating: (n: number) => `Note : ${n} sur 5`,
  },
  en: {
    crumb: "References", eyebrow: "Case study · Consulting", client: "AFL, Africa Fight League",
    h1: "AFL: turning a sporting ambition into an institutional reality.",
    intro: "Strategic, organisational and methodological support for a combat sports league, from the initial idea to the first professional MMA fights in Guinea.",
    facts: [["Client", "AFL, Africa Fight League"], ["Project founder", "Thierno Oumar, French professional boxer"], ["Expertise", "Strategy and organisation consulting"], ["Countries", "France and Guinea"]],
    ctxEyebrow: "Context and challenge", ctxTitle: "A project on the verge of being abandoned.",
    ctx: [
      "AFL is a project led by Thierno Oumar, a French professional boxer who wanted to create his own combat sports league.",
      "Let down by several promises of partnership and support, he was considering giving up. Wayzure then built with him a strategic, organisational and methodological support programme to turn his ambition into a real organisation.",
    ],
    missionsEyebrow: "Our support", missionsTitle: "From vision to organisation.",
    missions: [
      { t: "Strategy consulting", d: "Strategy consulting and structuring of the project." },
      { t: "League name", d: "Research and validation of the league's name." },
      { t: "Strategic documents", d: "Drafting of the strategic documents." },
      { t: "Visual identity", d: "Design of the logo and visual identity." },
      { t: "First AFL belt", d: "Support through to the making of the first AFL belt." },
      { t: "Institutional relations", d: "Support with procedures and institutional introductions to Guinea's Ministry of Youth." },
    ],
    stepsEyebrow: "Key steps", stepsTitle: "From a structured project to the first fight night.",
    steps: [
      { t: "Structure", d: "Strategy consulting, project structuring and strategic documents." },
      { t: "Embody", d: "League name, logo, visual identity and the first AFL belt." },
      { t: "Anchor institutionally", d: "Procedures and introductions to Guinea's Ministry of Youth." },
      { t: "Deliver", d: "On 13 June 2026, the first professional MMA fights in Guinea." },
    ],
    resultEyebrow: "Outcome", resultDate: "13 June 2026",
    result: "This support helped organise the first professional MMA fights in Guinea, with the participation of the Guinean MMA Federation and broadcast in more than a hundred countries.",
    reviewEyebrow: "Client testimonial",
    galleryEyebrow: "In pictures", galleryTitle: "The league, its belts, its institutional partners.",
    insta: "Follow AFL on Instagram",
    ctaTitle: "An ambition to turn into an organisation?",
    ctaText: "Strategy, organisation, identity, institutional relations: we support projects from vision to delivery.",
    rating: (n: number) => `Rating: ${n} out of 5`,
  },
};

// Témoignage de Thierno Oumar, mot pour mot (texte fourni par Moussa, à valider par l'intéressé).
const REVIEW = {
  headline: "Si AFL a vu le jour et atteint ce niveau, c’est en partie grâce à Wayzure.",
  body: [
    "Lorsque j’ai décidé de créer ma propre ligue de sports de combat, j’avais reçu beaucoup de promesses d’accompagnement et de partenariats. Mais au moment de concrétiser le projet, je me suis retrouvé pratiquement seul et j’envisageais d’abandonner.",
    "C’est à ce moment que j’ai rencontré Wayzure.",
    "L’équipe a immédiatement compris ma vision et le potentiel du projet. Elle m’a proposé un accompagnement stratégique, organisationnel et méthodologique qui m’a permis de reprendre confiance et de structurer mon initiative.",
    "Wayzure nous a accompagnés dans le choix du nom, la rédaction des documents stratégiques, la création de notre identité visuelle et de notre logo, ainsi que dans la réalisation de notre première ceinture.",
    "L’équipe nous a également aidés dans nos démarches institutionnelles, notamment auprès du ministère de la Jeunesse en Guinée.",
    "Cet accompagnement a contribué à concrétiser notre ambition avec l’organisation, le 13 juin 2026, des premiers combats professionnels de MMA en Guinée, diffusés dans plus d’une centaine de pays.",
    "Wayzure ne s’est pas contenté de nous conseiller : l’équipe a cru en notre vision et nous a accompagnés jusqu’à sa concrétisation.",
    "Je leur en suis profondément reconnaissant.",
  ],
  // Traduction pour la version anglaise, signalée comme telle. Le texte français fait foi.
  headlineEn: "If AFL came into being and reached this level, it is partly thanks to Wayzure.",
  bodyEn: [
    "When I decided to create my own combat sports league, I had received many promises of support and partnership. But when it came to making the project happen, I found myself practically alone and was thinking of giving up.",
    "That is when I met Wayzure.",
    "The team immediately understood my vision and the project's potential. They offered me strategic, organisational and methodological support that helped me regain confidence and structure my initiative.",
    "Wayzure supported us in choosing the name, drafting the strategic documents, creating our visual identity and logo, and making our first belt.",
    "The team also helped us with our institutional procedures, in particular with Guinea's Ministry of Youth.",
    "This support helped make our ambition real with the organisation, on 13 June 2026, of the first professional MMA fights in Guinea, broadcast in more than a hundred countries.",
    "Wayzure did not just advise us: the team believed in our vision and stayed with us until it became reality.",
    "I am deeply grateful to them.",
  ],
  author: "Thierno Oumar", role: "CEO, AFL", rating: 5,
};

const Star = () => <svg viewBox="0 0 20 20" className="size-5" fill="currentColor" aria-hidden><path d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8L10 1.6Z" /></svg>;

export const caseAflMeta = (locale: Locale) => {
  const m = meta("/references/afl", PAGE_SEO[locale].caseAfl.title, PAGE_SEO[locale].caseAfl.desc, locale);
  const p = AFL_PHOTOS[0];
  if (p) m.openGraph = { ...m.openGraph, type: "article", images: [{ url: p.src, width: p.w, height: p.h, alt: locale === "en" ? p.altEn : p.alt }] };
  return m;
};

export function CaseAfl({ locale = "fr" }: { locale?: Locale }) {
  const T = TX[locale];
  const en = locale === "en";
  const [hero, ...rest] = AFL_PHOTOS;
  return (
    <Page locale={locale} path="/references/afl">
      <JsonLd data={breadcrumb([[T.crumb, "/references"], ["AFL", "/references/afl"]], locale)} />

      {/* Ouverture */}
      <section className="relative overflow-hidden bg-sky">
        <GridGlow />
        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 sm:pt-16 lg:px-8">
          <Link href={href(locale, "/references")} className="group inline-flex items-center gap-2 text-sm text-fg-2 hover:text-accent"><Arrow className="size-3.5 rotate-180" /> {T.crumb}</Link>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="grid h-14 w-28 place-items-center rounded-2xl bg-white p-2 ring-1 ring-black/10"><span className="relative block size-full"><Image src="/clients/afl.webp" alt="AFL" fill sizes="112px" className="object-contain" /></span></span>
            <p className="text-sm font-medium text-accent">{T.eyebrow}</p>
          </div>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">{T.h1}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-fg-2">{T.intro}</p>
          {hero && (
            <figure className="mt-10 overflow-hidden rounded-[2rem] shadow-xl shadow-[#0670aa]/10 ring-1 ring-black/5">
              <Image src={hero.src} alt={en ? hero.altEn : hero.alt} width={hero.w} height={hero.h} priority sizes="(min-width: 1280px) 1216px, 100vw" className="h-auto w-full" />
              <figcaption className="bg-bg px-5 py-3 text-sm text-muted">{en ? hero.captionEn : hero.caption}</figcaption>
            </figure>
          )}
          <dl className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-sky-2 bg-sky-2 sm:grid-cols-2 lg:grid-cols-4">
            {T.facts.map(([k, v]) => (
              <div key={k} className="bg-bg p-5">
                <dt className="text-xs font-medium uppercase tracking-wider text-muted">{k}</dt>
                <dd className="mt-1.5 font-medium leading-snug">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Contexte */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:px-8">
        <SectionTitle eyebrow={T.ctxEyebrow} title={T.ctxTitle} />
        <div data-reveal className="space-y-4 text-lg leading-relaxed text-fg-2">
          {T.ctx.map(p => <p key={p}>{p}</p>)}
        </div>
      </section>

      {/* Missions */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionTitle eyebrow={T.missionsEyebrow} title={T.missionsTitle} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {T.missions.map((m, i) => (
              <div key={m.t} data-reveal style={{ "--d": `${(i % 3) * 70}ms` } as React.CSSProperties} className="rounded-3xl bg-bg p-6 ring-1 ring-line">
                <div className="flex items-start gap-3"><Check /><p className="font-display font-semibold">{m.t}</p></div>
                <p className="mt-2 pl-7 text-sm leading-relaxed text-fg-2">{m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Étapes et résultat */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle eyebrow={T.stepsEyebrow} title={T.stepsTitle} />
        <ol className="mt-10 grid gap-4 md:grid-cols-4">
          {T.steps.map((s, i) => (
            <li key={s.t} data-reveal style={{ "--d": `${i * 70}ms` } as React.CSSProperties} className="relative rounded-3xl border border-line p-6">
              <span className="font-display text-3xl font-semibold text-accent">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-3 font-display font-semibold">{s.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-fg-2">{s.d}</p>
            </li>
          ))}
        </ol>
        <div data-reveal className="mt-6 rounded-[2rem] bg-[#19323E] p-8 text-white sm:p-12">
          <p className="text-sm font-medium text-[#7cc4ec]">{T.resultEyebrow} · {T.resultDate}</p>
          <p className="mt-4 max-w-4xl font-display text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">{T.result}</p>
        </div>
      </section>

      {/* Témoignage */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <p data-reveal className="mb-6 text-sm font-medium text-accent">{T.reviewEyebrow}</p>
        <figure data-reveal className="relative overflow-hidden rounded-[2rem] border border-sky-2 bg-sky p-7 sm:p-10 lg:p-12">
          <div className="flex items-center gap-3">
            <span className="flex text-[#f5a524]" role="img" aria-label={T.rating(REVIEW.rating)}>{Array.from({ length: REVIEW.rating }, (_, i) => <Star key={i} />)}</span>
            <span className="text-sm font-semibold">{REVIEW.rating}/5</span>
          </div>
          <blockquote className="mt-6">
            <p className="max-w-4xl font-display text-2xl font-semibold leading-snug tracking-tight text-fg sm:text-3xl">{en ? <>“{REVIEW.headlineEn}”</> : <>« {REVIEW.headline} »</>}</p>
            <div className="mt-6 max-w-3xl space-y-3 leading-relaxed text-fg-2">
              {(en ? REVIEW.bodyEn : REVIEW.body).map(p => <p key={p}>{p}</p>)}
            </div>
          </blockquote>
          <figcaption className="mt-8 flex flex-wrap items-center gap-4">
            <span aria-hidden className="grid size-12 place-items-center rounded-full bg-btn font-semibold text-white">TO</span>
            <span className="flex-1">
              <span className="block font-semibold">{REVIEW.author}</span>
              <span className="block text-sm text-fg-2">{REVIEW.role}</span>
            </span>
            {en && <span className="text-sm text-muted">Translated from French.</span>}
          </figcaption>
        </figure>
      </section>

      {/* Galerie */}
      {rest.length > 0 && (
        <section className="border-y border-line bg-surface">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <SectionTitle eyebrow={T.galleryEyebrow} title={T.galleryTitle} />
            <div className="mt-10 grid items-start gap-5 md:grid-cols-2">
              {rest.map(p => (
                <figure key={p.src} data-reveal className="overflow-hidden rounded-3xl bg-bg ring-1 ring-line">
                  <Image src={p.src} alt={en ? p.altEn : p.alt} width={p.w} height={p.h} sizes="(min-width: 768px) 600px, 100vw" className="h-auto w-full" />
                  <figcaption className="px-5 py-3 text-sm text-muted">{en ? p.captionEn : p.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3">
          <a href={AFL_INSTAGRAM} target="_blank" rel="noopener" className="group inline-flex items-center gap-2 rounded-full bg-btn px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#055e8f]">{T.insta} <Arrow /></a>
          <Link href={href(locale, "/expertises/conseil")} className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium hover:bg-surface">{en ? "Our consulting practice" : "Notre pôle Conseil"} <Arrow /></Link>
          <Link href={href(locale, "/references")} className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium hover:bg-surface">{UI[locale].seeReferences} <Arrow /></Link>
        </div>
      </section>

      <CtaBand locale={locale} title={T.ctaTitle} text={T.ctaText} />
    </Page>
  );
}
