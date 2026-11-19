import Link from "next/link";
import { Arrow, CtaBand, GridGlow, Page, PageHero, SectionTitle } from "@/components/chrome";
import { JoinBand } from "@/components/join-band";
import { HeroPhoto } from "@/components/photo";
import { VideoPlayer } from "@/components/video-player";
import { COMPANY, GUINEA } from "@/lib/company";
import { href, type Locale } from "@/lib/i18n";
import { FILM } from "@/lib/media";
import { PHOTOS } from "@/lib/photos";
import { meta } from "@/lib/seo";

const TX = {
  fr: {
    title: "À propos",
    desc: "Wayzure est une ESN et un éditeur de solutions numériques fondé en 2021 à Clamart, présent en France et en Guinée.",
    h1: "Une ESN qui édite aussi ses propres logiciels.",
    intro: "Wayzure a été fondée en 2021 à Clamart, aux portes de Paris. Nous accompagnons entreprises et organisations sur leurs données, leurs systèmes, leurs applications et la formation de leurs équipes, en France et en Guinée.",
    approach: "Notre approche", approachTitle: "Le métier d'abord, l'outil ensuite.",
    p1: "Beaucoup de projets numériques déçoivent parce que l'outil a été choisi avant que le problème soit posé. Nous commençons donc par comprendre le métier, et nous restons jusqu'à ce que l'outil soit adopté.",
    p2: "Nous éditons aussi nos propres logiciels : WayPulse pour la prospection commerciale, WayPilot pour l'e-commerce, WayLog pour la logistique et Waycare pour la santé.",
    p3: (n: string) => `Wayzure est dirigée par son fondateur, ${n}.`,
    principles: [
      { t: "Dire ce qu'on livre, livrer ce qu'on dit", d: "Nous n'affichons que ce que nous savons faire. Quand un besoin sort de notre champ, nous le disons et nous orientons vers quelqu'un de mieux placé." },
      { t: "Un interlocuteur qui connaît le dossier", d: "La personne qui cadre votre projet est celle qui le suit. Vous n'avez pas à tout réexpliquer à chaque étape." },
      { t: "Des outils que vous pouvez reprendre", d: "Code documenté, accès remis, équipes formées. Vous devez pouvoir continuer sans nous si vous le souhaitez." },
      { t: "Éditeur autant que prestataire", d: "Nous exploitons nos propres logiciels. Nous savons ce que coûtent un incident, une mise à jour ratée ou un utilisateur perdu." },
    ],
    film: "Wayzure en 30 secondes", filmTitle: "Ce que nous faisons, en images.",
    france: "France", guinea: "Guinée",
    hq: `Siège social au ${COMPANY.address}. ${COMPANY.rcs}.`,
    gn: `Bureau à ${GUINEA.office}. ${GUINEA.rccm}. Société distincte de ${COMPANY.legalName}.`,
    exp: "Nos expertises", sol: "Nos solutions",
  },
  en: {
    title: "About",
    desc: "Wayzure is an IT services company and software publisher founded in 2021 in Clamart, near Paris, operating in France and Guinea.",
    h1: "An IT services company that also publishes its own software.",
    intro: "Wayzure was founded in 2021 in Clamart, on the edge of Paris. We support companies and organisations with their data, systems, applications and staff training, in France and Guinea.",
    approach: "Our approach", approachTitle: "The business first, the tool second.",
    p1: "Many digital projects disappoint because the tool was chosen before the problem was understood. So we start by understanding the business, and we stay until the tool is adopted.",
    p2: "We also publish our own software: WayPulse for sales prospecting, WayPilot for e-commerce, WayLog for logistics and Waycare for healthcare.",
    p3: (n: string) => `Wayzure is run by its founder, ${n}.`,
    principles: [
      { t: "Say what we deliver, deliver what we say", d: "We only claim what we know how to do. When a need falls outside our scope, we say so and point you to someone better placed." },
      { t: "One contact who knows your project", d: "The person who scopes your project is the one who follows it through. You don't have to explain everything again at each stage." },
      { t: "Tools you can take over", d: "Documented code, handed-over access, trained teams. You should be able to carry on without us if you choose to." },
      { t: "A publisher as much as a service provider", d: "We run our own software. We know the cost of an incident, a failed update or a lost user." },
    ],
    film: "Wayzure in 30 seconds", filmTitle: "What we do, in pictures.",
    france: "France", guinea: "Guinea",
    hq: `Registered office: ${COMPANY.address}. ${COMPANY.rcs}.`,
    gn: `Office in ${GUINEA.office}. ${GUINEA.rccm}. A separate company from ${COMPANY.legalName}.`,
    exp: "Our expertise", sol: "Our solutions",
  },
};

export const aboutMeta = (locale: Locale) => meta("/a-propos", TX[locale].title, TX[locale].desc, locale);

export function About({ locale = "fr" }: { locale?: Locale }) {
  const T = TX[locale];
  return (
    <Page locale={locale} path="/a-propos">
      <PageHero eyebrow={T.title} title={T.h1} aside={<HeroPhoto locale={locale} photo={PHOTOS.equipe} />}>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-2">{T.intro}</p>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionTitle eyebrow={T.approach} title={T.approachTitle} />
            <div data-reveal className="mt-6 space-y-4 leading-relaxed text-fg-2">
              <p>{T.p1}</p>
              <p>{T.p2}</p>
              <p>{T.p3(COMPANY.publisher.split(",")[0])}</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {T.principles.map((p, i) => (
              <div key={p.t} data-reveal style={{ "--d": `${i * 70}ms` } as React.CSSProperties} className="rounded-3xl border border-line p-6">
                <p className="font-display font-semibold">{p.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-fg-2">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-sky-2 bg-sky">
        <GridGlow />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:px-8">
          <div data-reveal>
            <p className="text-sm font-medium text-accent">{T.film}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">{T.filmTitle}</h2>
            <p className="mt-4 leading-relaxed text-fg-2">{locale === "en" ? FILM.captionEn : FILM.caption}</p>
          </div>
          <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties}><VideoPlayer locale={locale} video={FILM} sizes="(min-width: 1024px) 760px, 100vw" /></div>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-20 sm:px-6 md:grid-cols-2 lg:px-8">
          <div data-reveal className="rounded-3xl bg-bg p-8">
            <p className="text-sm font-medium text-accent">{T.france}</p>
            <p className="mt-2 font-display text-2xl font-semibold">{COMPANY.legalName}</p>
            <p className="mt-3 leading-relaxed text-fg-2">{T.hq}</p>
          </div>
          <div data-reveal style={{ "--d": "90ms" } as React.CSSProperties} className="rounded-3xl bg-bg p-8">
            <p className="text-sm font-medium text-accent">{T.guinea}</p>
            <p className="mt-2 font-display text-2xl font-semibold">{GUINEA.legalName}</p>
            <p className="mt-3 leading-relaxed text-fg-2">{T.gn}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3">
          <Link href={href(locale, "/expertises")} className="group inline-flex items-center gap-2 rounded-full bg-btn px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#055e8f]">{T.exp} <Arrow /></Link>
          <Link href={href(locale, "/solutions")} className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium hover:bg-surface">{T.sol} <Arrow /></Link>
        </div>
      </section>
      <JoinBand locale={locale} />

      <CtaBand locale={locale} />
    </Page>
  );
}
