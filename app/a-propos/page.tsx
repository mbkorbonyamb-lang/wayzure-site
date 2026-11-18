import Link from "next/link";
import { Arrow, CtaBand, Page, PageHero, SectionTitle } from "@/components/chrome";
import { VideoPlayer } from "@/components/video-player";
import { COMPANY, GUINEA } from "@/lib/company";
import { FILM } from "@/lib/media";
import { meta } from "@/lib/seo";

export const metadata = meta(
  "/a-propos",
  "À propos",
  "Wayzure est une ESN et un éditeur de solutions numériques fondé en 2021 à Clamart, présent en France et en Guinée.",
);

const PRINCIPLES = [
  { t: "Dire ce qu'on livre, livrer ce qu'on dit", d: "Nous n'affichons que ce que nous savons faire. Quand un besoin sort de notre champ, nous le disons et nous orientons vers quelqu'un de mieux placé." },
  { t: "Un interlocuteur qui connaît le dossier", d: "La personne qui cadre votre projet est celle qui le suit. Vous n'avez pas à tout réexpliquer à chaque étape." },
  { t: "Des outils que vous pouvez reprendre", d: "Code documenté, accès remis, équipes formées. Vous devez pouvoir continuer sans nous si vous le souhaitez." },
  { t: "Éditeur autant que prestataire", d: "Nous exploitons nos propres logiciels. Nous savons ce que coûtent un incident, une mise à jour ratée ou un utilisateur perdu." },
];

export default function APropos() {
  return (
    <Page>
      <PageHero eyebrow="À propos" title="Une ESN qui édite aussi ses propres logiciels.">
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-on-deep-2">Wayzure a été fondée en 2021 à Clamart, aux portes de Paris. Nous accompagnons entreprises et organisations sur leurs données, leurs systèmes, leurs applications et la formation de leurs équipes, en France et en Guinée.</p>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionTitle eyebrow="Notre approche" title="Le métier d'abord, l'outil ensuite." />
            <div data-reveal className="mt-6 space-y-4 leading-relaxed text-fg-2">
              <p>Beaucoup de projets numériques déçoivent parce que l&apos;outil a été choisi avant que le problème soit posé. Nous commençons donc par comprendre le métier, et nous restons jusqu&apos;à ce que l&apos;outil soit adopté.</p>
              <p>Nous éditons aussi nos propres logiciels : WayPulse pour la prospection commerciale, WayPilot pour l&apos;e-commerce, WayLog pour la logistique et Waycare pour la santé.</p>
              <p>Wayzure est dirigée par son fondateur, {COMPANY.publisher.split(",")[0]}.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <div key={p.t} data-reveal style={{ "--d": `${i * 70}ms` } as React.CSSProperties} className="rounded-3xl border border-line p-6">
                <p className="font-display font-semibold">{p.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-fg-2">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-deep text-on-deep">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:px-8">
          <div data-reveal>
            <p className="text-sm font-medium text-[#9fd3f1]">Wayzure en 30 secondes</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white">Ce que nous faisons, en images.</h2>
            <p className="mt-4 leading-relaxed text-on-deep-2">{FILM.caption}</p>
          </div>
          <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties}><VideoPlayer video={FILM} sizes="(min-width: 1024px) 760px, 100vw" /></div>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-20 sm:px-6 md:grid-cols-2 lg:px-8">
          <div data-reveal className="rounded-3xl bg-bg p-8">
            <p className="text-sm font-medium text-accent">France</p>
            <p className="mt-2 font-display text-2xl font-semibold">{COMPANY.legalName}</p>
            <p className="mt-3 leading-relaxed text-fg-2">Siège social au {COMPANY.address}. {COMPANY.rcs}.</p>
          </div>
          <div data-reveal style={{ "--d": "90ms" } as React.CSSProperties} className="rounded-3xl bg-bg p-8">
            <p className="text-sm font-medium text-accent">Guinée</p>
            <p className="mt-2 font-display text-2xl font-semibold">{GUINEA.legalName}</p>
            <p className="mt-3 leading-relaxed text-fg-2">Bureau à {GUINEA.office}. {GUINEA.rccm}. Société distincte de {COMPANY.legalName}.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3">
          <Link href="/expertises" className="group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg hover:opacity-85">Nos expertises <Arrow /></Link>
          <Link href="/solutions" className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium hover:bg-surface">Nos solutions <Arrow /></Link>
        </div>
      </section>
      <CtaBand />
    </Page>
  );
}
