// Page « Nos valeurs » (/nos-valeurs, adresse de l'ancien site). Les quatre valeurs validées (page À propos) sont
// reprises ici avec, pour chacune, ce qu'elle change concrètement dans un projet. Chaque engagement « concrètement »
// s'appuie sur ce que le site dit déjà de la méthode et des produits : n'y ajouter que des pratiques réelles.
import Link from "next/link";
import { Arrow, Check, CtaBand, Page, PageHero } from "@/components/chrome";
import { JsonLd, breadcrumb } from "@/components/json-ld";
import { href, type Locale } from "@/lib/i18n";
import { meta } from "@/lib/seo";

type Value = { t: string; d: string; how: string[] };

const TX: Record<Locale, { title: string; desc: string; h1: string; intro: string; concretely: string; about: string; aboutText: string; ctaTitle: string; ctaText: string; values: Value[] }> = {
  fr: {
    title: "Nos valeurs",
    desc: "Souveraineté et rigueur, pragmatisme opérationnel, résilience terrain, transparence et autonomie : les quatre valeurs de Wayzure et ce qu'elles changent concrètement dans un projet.",
    h1: "Quatre engagements que vous retrouvez dans chaque projet.",
    intro: "Nos valeurs ne sont pas des slogans. Ce sont des règles de travail : la façon dont nous traitons vos données, dont nous décidons, dont nous construisons et dont nous partons, une fois vos équipes autonomes.",
    concretely: "Concrètement",
    about: "Notre mission et notre histoire",
    aboutText: "Qui nous sommes, d'où nous venons et ce que nous cherchons à accomplir.",
    ctaTitle: "Travaillons ensemble.",
    ctaText: "Exposez votre situation : vous verrez rapidement si notre façon de travailler vous convient.",
    values: [
      { t: "Souveraineté & rigueur", d: "Maîtrise des données, sécurité, traçabilité et respect des cadres réglementaires.",
        how: ["Vos données restent les vôtres : où elles sont hébergées et qui y accède est décidé avec vous.", "L'hébergement suit les règles de chaque domaine. Les données de santé de Waycare, par exemple, sont hébergées dans l'Union européenne sur une infrastructure certifiée HDS.", "Chaque intervention est documentée : vous savez ce qui a été fait, et pourquoi."] },
      { t: "Pragmatisme opérationnel", d: "Résoudre des problèmes concrets, avec des résultats mesurables.",
        how: ["Nous commençons par comprendre le métier, avant de choisir l'outil.", "Une proposition écrite précise ce qui sera fait, ce qui ne le sera pas, le délai et le prix.", "Si un projet ne nous paraît pas utile, nous le disons."] },
      { t: "Résilience terrain", d: "Concevoir des solutions robustes, adaptées aux contraintes d'infrastructure et aux usages réels.",
        how: ["Quand le réseau est incertain, nos applications continuent de fonctionner : WayLog et Waycare restent utilisables sans connexion.", "Les outils sont conçus pour ceux qui s'en servent, sur leurs appareils et dans leurs conditions de travail.", "Après la mise en service, la maintenance et le support font partie de l'accompagnement."] },
      { t: "Transparence & autonomie", d: "Avancer sans effet tunnel, et rendre les équipes autonomes après le déploiement.",
        how: ["Le travail avance par livraisons courtes : vous voyez le résultat et vous validez avant la suite.", "La formation de vos équipes fait partie du projet, pas d'une option.", "Notre objectif : que vos équipes puissent se servir de l'outil, et le faire vivre, sans dépendre de nous."] },
    ],
  },
  en: {
    title: "Our values",
    desc: "Sovereignty and rigour, operational pragmatism, field resilience, transparency and autonomy: Wayzure's four values and what they change in practice on a project.",
    h1: "Four commitments you will find in every project.",
    intro: "Our values are not slogans. They are working rules: how we handle your data, how we make decisions, how we build, and how we step back once your teams are self-sufficient.",
    concretely: "In practice",
    about: "Our mission and our story",
    aboutText: "Who we are, where we come from and what we aim to achieve.",
    ctaTitle: "Let's work together.",
    ctaText: "Describe your situation: you will quickly see whether the way we work suits you.",
    values: [
      { t: "Sovereignty & rigour", d: "Control over data, security, traceability and compliance with regulatory frameworks.",
        how: ["Your data remains yours: where it is hosted and who can access it is decided with you.", "Hosting follows the rules of each field. Waycare's health data, for example, is hosted in the European Union on HDS-certified infrastructure.", "Every intervention is documented: you know what was done, and why."] },
      { t: "Operational pragmatism", d: "Solving concrete problems, with measurable results.",
        how: ["We start by understanding the business, before choosing the tool.", "A written proposal states what will be done, what will not, the timeline and the price.", "If a project does not seem useful to us, we say so."] },
      { t: "Field resilience", d: "Designing robust solutions suited to infrastructure constraints and real-world use.",
        how: ["When the network is unreliable, our applications keep working: WayLog and Waycare can be used offline.", "Tools are designed for the people who use them, on their devices and in their working conditions.", "After go-live, maintenance and support are part of what we provide."] },
      { t: "Transparency & autonomy", d: "No black box, and teams that run on their own after deployment.",
        how: ["Work moves forward in short deliveries: you see the result and approve it before the next step.", "Training your teams is part of the project, not an option.", "Our goal: your teams can use the tool, and keep it running, without depending on us."] },
    ],
  },
};

export const valuesMeta = (locale: Locale) => meta("/nos-valeurs", TX[locale].title, TX[locale].desc, locale);

export function Values({ locale = "fr" }: { locale?: Locale }) {
  const T = TX[locale];
  return (
    <Page locale={locale} path="/nos-valeurs">
      <JsonLd data={breadcrumb([[T.title, "/nos-valeurs"]], locale)} />
      <PageHero eyebrow={T.title} title={T.h1}>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-2">{T.intro}</p>
      </PageHero>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <ol className="grid gap-5 lg:grid-cols-2">
          {T.values.map((v, i) => (
            <li key={v.t} data-reveal style={{ "--d": `${(i % 2) * 80}ms` } as React.CSSProperties} className="flex flex-col rounded-3xl border border-line p-7 sm:p-9">
              <div className="flex items-baseline gap-4">
                <span className="font-display text-4xl font-semibold text-accent/80">0{i + 1}</span>
                <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-[1.7rem]">{v.t}</h2>
              </div>
              <p className="mt-4 text-lg leading-relaxed text-fg">{v.d}</p>
              <div className="mt-6 flex-1 rounded-2xl bg-sky p-5 sm:p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-accent">{T.concretely}</p>
                <ul className="mt-3 space-y-2.5">
                  {v.how.map(h => <li key={h} className="flex gap-2 text-[0.95rem] leading-relaxed text-fg-2"><Check />{h}</li>)}
                </ul>
              </div>
            </li>
          ))}
        </ol>
        <Link href={href(locale, "/a-propos")} data-reveal className="group mt-10 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-sky-2 bg-sky px-7 py-6 transition-colors hover:border-accent">
          <span>
            <span className="block font-display text-xl font-semibold">{T.about}</span>
            <span className="mt-1 block text-fg-2">{T.aboutText}</span>
          </span>
          <Arrow className="size-5 text-accent" />
        </Link>
      </section>
      <CtaBand locale={locale} title={T.ctaTitle} text={T.ctaText} />
    </Page>
  );
}
