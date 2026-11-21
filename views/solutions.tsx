import Link from "next/link";
import { Arrow, Check, Page, PageHero } from "@/components/chrome";
import { ProductMark } from "@/components/marks";
import { SolutionVisual } from "@/components/solution-visual";
import { getContent } from "@/lib/content";
import { href, type Locale } from "@/lib/i18n";
import { meta } from "@/lib/seo";
import { PAGE_SEO } from "@/lib/page-seo";

const TX = {
  fr: {
    h1: "Des solutions conçues par nous, pensées pour vos métiers.",
    intro: "Nous concevons, éditons et commercialisons des logiciels qui répondent à des enjeux métiers concrets. Des solutions que nous faisons évoluer en permanence, au rythme des besoins de nos clients.",
    paths: [
      { href: "#nos-logiciels", k: "Logiciels Wayzure", t: "Quatre logiciels prêts à l'emploi pour votre organisation." },
      { href: "#sur-mesure", k: "Développement sur mesure", t: "Une solution conçue pour votre organisation." },
    ],
    productsEyebrow: "Logiciels Wayzure",
    productsTitle: "Quatre logiciels prêts à déployer chez vous.",
    productsText: "Chacun répond à un problème précis, observé chez nos clients. Vous les adoptez sans projet de développement : nous assurons leur maintenance et les faisons évoluer.",
    short: { waypulse: "Intelligence commerciale et prospection.", waypilot: "Contrôle qualité et optimisation des catalogues e-commerce.", waylog: "Gestion des opérations et de la logistique.", waycare: "Plateforme numérique de santé." } as Record<string, string>,
    see: "Voir le produit",
    customEyebrow: "Développement sur mesure",
    customTitle: "Votre besoin est spécifique ? Nous concevons votre solution.",
    customText: "Quand aucun logiciel existant ne correspond à votre besoin, nous accompagnons les organisations dans la conception et le développement d'applications métiers, de plateformes numériques et de logiciels de gestion adaptés à leurs processus, leurs contraintes et leurs objectifs.",
    customKinds: ["Applications métiers", "Plateformes numériques", "Logiciels de gestion"],
    customSteps: [
      { t: "Comprendre", d: "Nous partons de vos processus, de vos contraintes et de vos objectifs, avec les personnes qui utiliseront l'outil." },
      { t: "Concevoir", d: "Parcours, écrans et données sont définis et validés avec vous avant le développement." },
      { t: "Développer", d: "Le travail avance par livraisons courtes : vous testez l'application à chaque étape." },
      { t: "Faire évoluer", d: "Après la mise en service : maintenance, évolutions et formation de vos équipes." },
    ],
    customNote: "Ce sont les méthodes avec lesquelles nous construisons les logiciels Wayzure. La solution développée pour vous reste la vôtre.",
    customCta: "Parlons de votre projet",
    customMore: "Notre pôle Développement numérique",
    for: "Pour", market: "Marché", discover: (n: string) => `Découvrir ${n}`,
    note: "Captures des applications en service, avec leurs données d'exemple.",
  },
  en: {
    h1: "Solutions we design, built for your business.",
    intro: "We design, publish and sell software that addresses concrete business needs. Solutions we keep improving, in step with our clients' needs.",
    paths: [
      { href: "#nos-logiciels", k: "Wayzure software", t: "Four ready-to-use products for your organisation." },
      { href: "#sur-mesure", k: "Custom development", t: "A solution designed for your organisation." },
    ],
    productsEyebrow: "Wayzure software",
    productsTitle: "Four products ready to deploy in your organisation.",
    productsText: "Each one answers a specific problem we saw at our clients. You adopt them without a development project: we handle maintenance and keep improving them.",
    short: { waypulse: "Sales intelligence and prospecting.", waypilot: "Quality control and optimisation of e-commerce catalogues.", waylog: "Operations and logistics management.", waycare: "Digital health platform." } as Record<string, string>,
    see: "See the product",
    customEyebrow: "Custom development",
    customTitle: "A specific need? We design your solution.",
    customText: "When no existing software fits your needs, we help organisations design and build business applications, digital platforms and management software tailored to their processes, their constraints and their goals.",
    customKinds: ["Business applications", "Digital platforms", "Management software"],
    customSteps: [
      { t: "Understand", d: "We start from your processes, constraints and goals, with the people who will use the tool." },
      { t: "Design", d: "User journeys, screens and data are defined and approved with you before development." },
      { t: "Build", d: "Work moves forward in short deliveries: you test the application at every step." },
      { t: "Evolve", d: "After go-live: maintenance, improvements and training for your teams." },
    ],
    customNote: "These are the methods we use to build Wayzure software. The solution built for you remains yours.",
    customCta: "Let's talk about your project",
    customMore: "Our software development practice",
    for: "For", market: "Market", discover: (n: string) => `Explore ${n}`,
    note: "Screenshots of the applications in service, with their sample data.",
  },
};

export const solutionsMeta = (locale: Locale) => meta("/solutions", PAGE_SEO[locale].solutions.title, PAGE_SEO[locale].solutions.desc, locale);

export function Solutions({ locale = "fr" }: { locale?: Locale }) {
  const { SOLUTIONS } = getContent(locale);
  const T = TX[locale];
  return (
    <Page locale={locale} path="/solutions">
      <PageHero eyebrow="Solutions" title={T.h1}>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-2">{T.intro}</p>
        <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
          {T.paths.map((p, i) => (
            <a key={p.href} href={p.href} className="group rounded-2xl border border-sky-2 bg-bg/80 p-4 transition-colors hover:border-accent">
              <span className="flex items-center gap-2 text-sm font-semibold text-fg"><span className="grid size-6 place-items-center rounded-full bg-accent-soft font-mono text-xs text-accent">{i + 1}</span>{p.k}<Arrow className="ml-auto size-3.5 text-accent" /></span>
              <span className="mt-1.5 block text-sm text-fg-2">{p.t}</span>
            </a>
          ))}
        </div>
      </PageHero>

      <section id="nos-logiciels" aria-labelledby="nos-logiciels-t" className="mx-auto max-w-7xl scroll-mt-24 px-4 pt-20 sm:px-6 lg:px-8">
        <div data-reveal>
          <p className="text-sm font-medium text-accent">{T.productsEyebrow}</p>
          <h2 id="nos-logiciels-t" className="mt-3 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight sm:text-[2.6rem]">{T.productsTitle}</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-fg-2">{T.productsText}</p>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SOLUTIONS.map(s => (
            <li key={s.slug} data-reveal>
              <a href={`#${s.slug}`} className="group flex h-full flex-col rounded-2xl border border-line bg-bg p-5 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-lg hover:shadow-[#0670aa]/10">
                <span className="flex items-center gap-3"><ProductMark slug={s.slug} className="size-10" /><span className="font-display text-xl font-semibold">{s.name}</span></span>
                <span className="mt-4 flex-1 text-sm leading-relaxed text-fg-2">{T.short[s.slug]}</span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">{T.see} <Arrow className="size-3" /></span>
              </a>
            </li>
          ))}
        </ul>
      </section>
      <section className="mx-auto max-w-7xl space-y-20 px-4 py-20 sm:px-6 sm:space-y-28 lg:px-8">
        {SOLUTIONS.map((s, i) => (
          <article key={s.slug} id={s.slug} className="grid scroll-mt-24 items-center gap-10 lg:grid-cols-2 lg:gap-16">
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
                <div><dt className="text-muted">{T.for}</dt><dd className="mt-1">{s.audience}</dd></div>
                <div><dt className="text-muted">{T.market}</dt><dd className="mt-1">{s.market}</dd></div>
              </dl>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={href(locale, `/solutions/${s.slug}`)} className="group inline-flex items-center gap-2 rounded-full bg-btn px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#055e8f]">{T.discover(s.name)} <Arrow /></Link>
                <a href={s.url} rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium hover:bg-surface">{s.url.replace(/^https:\/\/(www\.)?/, "")}</a>
              </div>
            </div>
            <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties} className={i % 2 ? "lg:order-1" : ""}>
              <SolutionVisual locale={locale} slug={s.slug} />
            </div>
          </article>
        ))}
        <p className="text-sm text-muted">{T.note}</p>
      </section>

      <section id="sur-mesure" aria-labelledby="sur-mesure-t" className="scroll-mt-16 px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#19323e] px-6 py-14 text-white sm:px-12 sm:py-16" data-reveal>
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -right-24 -top-32 size-[28rem] rounded-full bg-[#0782c6] opacity-40 blur-3xl" />
            <div className="absolute -bottom-40 -left-24 size-96 rounded-full bg-[#0782c6] opacity-20 blur-3xl" />
          </div>
          <div className="relative grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <p className="text-sm font-medium text-[#7cc4ec]">{T.customEyebrow}</p>
              <h2 id="sur-mesure-t" className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-[2.6rem]">{T.customTitle}</h2>
              <p className="mt-5 text-lg leading-relaxed text-white/85">{T.customText}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {T.customKinds.map(k => <li key={k} className="rounded-full border border-white/25 bg-white/5 px-3.5 py-1.5 text-sm">{k}</li>)}
              </ul>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Link href={href(locale, "/contact")} className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-[#0670aa] shadow-lg shadow-black/10 transition-colors hover:bg-[#eef7fd]">{T.customCta} <Arrow /></Link>
                <Link href={href(locale, "/expertises/developpement-numerique")} className="group inline-flex items-center gap-2 text-sm font-medium text-white/85 hover:text-white">{T.customMore} <Arrow className="size-3" /></Link>
              </div>
            </div>
            <div>
              <ol className="grid gap-3 sm:grid-cols-2">
                {T.customSteps.map((st, i) => (
                  <li key={st.t} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                    <p className="font-mono text-xs text-[#7cc4ec]">0{i + 1}</p>
                    <p className="mt-2 flex gap-2 font-medium"><Check />{st.t}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/75">{st.d}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-sm leading-relaxed text-white/70">{T.customNote}</p>
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}
