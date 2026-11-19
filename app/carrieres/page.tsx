import { CtaBand, Page, PageHero, SectionTitle } from "@/components/chrome";
import { ApplicationForm } from "@/components/application-form";
import { ExpertiseIcon } from "@/components/icons";
import { HeroPhoto } from "@/components/photo";
import { JsonLd, breadcrumb } from "@/components/json-ld";
import { RETENTION } from "@/lib/candidature";
import { COMPANY } from "@/lib/company";
import { FORM_ENABLED } from "@/lib/contact-link";
import { ALL_EXPERTISES } from "@/lib/content";
import { PHOTOS } from "@/lib/photos";
import { meta } from "@/lib/seo";

export const metadata = meta(
  "/carrieres",
  "Rejoignez l'aventure Wayzure",
  "Candidature spontanée chez Wayzure : data et IA, conseil, développement numérique, formation et services IT, en France et en Guinée.",
);

const mailto = `mailto:${COMPANY.email}?subject=${encodeURIComponent("Candidature spontanée")}`;

const DATA = [
  { t: "À quoi servent vos données", d: "Uniquement à étudier votre candidature et, si votre profil correspond, à vous contacter pour une mission ou un poste chez Wayzure, en France ou en Guinée." },
  { t: "Qui les reçoit", d: "Les personnes de Wayzure chargées du recrutement. Elles ne sont ni vendues, ni transmises à un client sans votre accord." },
  { t: "Combien de temps", d: `Votre candidature est conservée ${RETENTION}, puis supprimée. Vous pouvez en demander la suppression avant, à tout moment.` },
  { t: "Comment votre CV est protégé", d: "Il est transmis chiffré (HTTPS) directement à notre messagerie, sans être enregistré sur le site. Seuls les vrais fichiers PDF de 4 Mo au plus sont acceptés." },
];

export default function Carrieres() {
  return (
    <Page>
      <JsonLd data={breadcrumb([["Rejoindre Wayzure", "/carrieres"]])} />
      <PageHero eyebrow="Carrières" title="Rejoignez l'aventure Wayzure." aside={<HeroPhoto photo={PHOTOS.formation} />}>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-2">Nous construisons une ESN entre la France et la Guinée, et nous éditons nos propres logiciels. Si vous voulez travailler sur des projets concrets, au contact des métiers, envoyez-nous votre candidature.</p>
        <a href="#candidature" className="group mt-8 inline-flex items-center gap-2 rounded-full bg-btn px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#055e8f]">Déposer ma candidature</a>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Les profils que nous rencontrons" title="Cinq domaines, une même exigence.">
          Consultants, développeurs, data analysts, formateurs, administrateurs systèmes : nous lisons toutes les candidatures, y compris quand aucun poste n&apos;est ouvert.
        </SectionTitle>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {ALL_EXPERTISES.map((e, i) => (
            <li key={e.slug} data-reveal style={{ "--d": `${i * 60}ms` } as React.CSSProperties} className="rounded-3xl border border-line p-6">
              <span className="grid size-11 place-items-center rounded-2xl bg-accent-soft text-accent"><ExpertiseIcon slug={e.slug} /></span>
              <p className="mt-4 font-display font-semibold tracking-tight">{e.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-fg-2">{e.lead}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="candidature" className="scroll-mt-20 border-y border-line bg-surface">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:px-8">
          <div>
            <SectionTitle eyebrow="Candidature spontanée" title="Parlez-nous de vous." />
            <div className="mt-10 rounded-3xl border border-line bg-bg p-6 sm:p-8">
              {FORM_ENABLED ? <ApplicationForm email={COMPANY.email} /> : (
                <div>
                  <p className="leading-relaxed text-fg-2">Envoyez votre CV au format PDF à <a href={mailto} className="font-medium text-accent underline underline-offset-4">{COMPANY.email}</a>, avec l&apos;objet « Candidature spontanée ». Indiquez vos nom et prénom, votre pays de résidence, votre domaine d&apos;expertise et, si vous en avez un, le lien vers votre profil LinkedIn ou votre portfolio.</p>
                  <a href={mailto} className="mt-6 inline-flex items-center gap-2 rounded-full bg-btn px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#055e8f]">Envoyer ma candidature</a>
                </div>
              )}
            </div>
          </div>
          <aside id="donnees" className="lg:pt-16">
            <p className="text-sm font-medium text-accent">Vos données</p>
            <dl className="mt-4 space-y-5">
              {DATA.map(x => (
                <div key={x.t} className="rounded-2xl border border-line bg-bg p-5">
                  <dt className="font-semibold">{x.t}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-fg-2">{x.d}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-sm leading-relaxed text-muted">Pour accéder à vos données, les corriger ou les faire supprimer : <a href={`mailto:${COMPANY.email}`} className="text-accent underline underline-offset-2">{COMPANY.email}</a>. Détails dans la <a href="/confidentialite#candidatures" className="text-accent underline underline-offset-2">politique de confidentialité</a>.</p>
          </aside>
        </div>
      </section>

      <CtaBand title="Une question avant de candidater ?" text="Écrivez-nous : nous vous répondons sur le fonctionnement de l'équipe, les missions et les implantations en France et en Guinée." />
    </Page>
  );
}
