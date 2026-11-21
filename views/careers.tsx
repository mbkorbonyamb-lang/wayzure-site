import { CtaBand, Page, PageHero, SectionTitle } from "@/components/chrome";
import { ApplicationForm } from "@/components/application-form";
import { ExpertiseIcon } from "@/components/icons";
import { HeroPhoto } from "@/components/photo";
import { JsonLd, breadcrumb } from "@/components/json-ld";
import { RETENTION, RETENTION_EN } from "@/lib/candidature";
import { COMPANY } from "@/lib/company";
import { FORM_ENABLED } from "@/lib/contact-link";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { PHOTOS } from "@/lib/photos";
import { meta } from "@/lib/seo";
import { PAGE_SEO } from "@/lib/page-seo";

const TX = {
  fr: {
    title: "Rejoignez l'aventure Wayzure",
    crumb: "Rejoindre Wayzure", eyebrow: "Carrières", h1: "Rejoignez l'aventure Wayzure.",
    intro: "Nous construisons une ESN entre la France et la Guinée, et nous éditons des logiciels pour les entreprises et les organisations. Si vous voulez travailler sur des projets concrets, au contact des métiers, envoyez-nous votre candidature.",
    apply: "Déposer ma candidature",
    profiles: "Les profils que nous rencontrons", profilesTitle: "Quatre pôles et des services IT, une même exigence.",
    profilesText: "Consultants, développeurs, data analysts, formateurs, administrateurs systèmes : nous lisons toutes les candidatures, y compris quand aucun poste n'est ouvert.",
    spont: "Candidature spontanée", spontTitle: "Parlez-nous de vous.", subject: "Candidature spontanée",
    mail1: "Envoyez votre CV au format PDF à", mail2: ", avec l'objet « Candidature spontanée ». Indiquez vos nom et prénom, votre pays de résidence, votre domaine d'expertise et, si vous en avez un, le lien vers votre profil LinkedIn ou votre portfolio.",
    send: "Envoyer ma candidature",
    data: "Vos données",
    items: [
      { t: "À quoi servent vos données", d: "Uniquement à étudier votre candidature et, si votre profil correspond, à vous contacter pour une mission ou un poste chez Wayzure, en France ou en Guinée." },
      { t: "Qui les reçoit", d: "Les personnes de Wayzure chargées du recrutement. Elles ne sont ni vendues, ni transmises à un client sans votre accord." },
      { t: "Combien de temps", d: `Votre candidature est conservée ${RETENTION}, puis supprimée. Vous pouvez en demander la suppression avant, à tout moment.` },
      { t: "Comment votre CV est protégé", d: "Il est transmis chiffré (HTTPS) directement à notre messagerie, sans être enregistré sur le site. Seuls les vrais fichiers PDF de 4 Mo au plus sont acceptés." },
    ],
    rights: "Pour accéder à vos données, les corriger ou les faire supprimer :", details: "Détails dans la", policy: "politique de confidentialité",
    ctaTitle: "Une question avant de candidater ?",
    ctaText: "Écrivez-nous : nous vous répondons sur le fonctionnement de l'équipe, les missions et les implantations en France et en Guinée.",
  },
  en: {
    title: "Join Wayzure",
    crumb: "Join Wayzure", eyebrow: "Careers", h1: "Join the Wayzure team.",
    intro: "We are building an IT services company between France and Guinea, and we publish software for companies and organisations. If you want to work on concrete projects, close to the business, send us your application.",
    apply: "Apply now",
    profiles: "The profiles we meet", profilesTitle: "Four practices plus IT services, one standard.",
    profilesText: "Consultants, developers, data analysts, trainers, system administrators: we read every application, even when no position is open.",
    spont: "Speculative application", spontTitle: "Tell us about yourself.", subject: "Speculative application",
    mail1: "Send your CV as a PDF to", mail2: ", with the subject “Speculative application”. Include your full name, country of residence, field of expertise and, if you have one, a link to your LinkedIn profile or portfolio.",
    send: "Send my application",
    data: "Your data",
    items: [
      { t: "What your data is used for", d: "Only to review your application and, if your profile matches, to contact you about an assignment or a position at Wayzure, in France or Guinea." },
      { t: "Who receives it", d: "The Wayzure staff in charge of recruitment. It is never sold, nor passed on to a client without your consent." },
      { t: "How long it is kept", d: `Your application is kept ${RETENTION_EN}, then deleted. You can ask for it to be deleted earlier, at any time.` },
      { t: "How your CV is protected", d: "It is sent encrypted (HTTPS) straight to our mailbox, without being stored on the website. Only genuine PDF files of 4 MB or less are accepted." },
    ],
    rights: "To access, correct or delete your data:", details: "Details in our", policy: "privacy policy (in French)",
    ctaTitle: "A question before you apply?",
    ctaText: "Write to us: we will answer your questions about how the team works, the assignments and our offices in France and Guinea.",
  },
};

export const careersMeta = (locale: Locale) => meta("/carrieres", PAGE_SEO[locale].careers.title, PAGE_SEO[locale].careers.desc, locale);

export function Careers({ locale = "fr" }: { locale?: Locale }) {
  const { ALL_EXPERTISES } = getContent(locale);
  const T = TX[locale];
  const mailto = `mailto:${COMPANY.email}?subject=${encodeURIComponent(T.subject)}`;
  return (
    <Page locale={locale} path="/carrieres">
      <JsonLd data={breadcrumb([[T.crumb, "/carrieres"]], locale)} />
      <PageHero eyebrow={T.eyebrow} title={T.h1} aside={<HeroPhoto locale={locale} photo={PHOTOS.formation} />}>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-2">{T.intro}</p>
        <a href="#candidature" className="group mt-8 inline-flex items-center gap-2 rounded-full bg-btn px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#055e8f]">{T.apply}</a>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle eyebrow={T.profiles} title={T.profilesTitle}>{T.profilesText}</SectionTitle>
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
            <SectionTitle eyebrow={T.spont} title={T.spontTitle} />
            <div className="mt-10 rounded-3xl border border-line bg-bg p-6 sm:p-8">
              {FORM_ENABLED ? <ApplicationForm locale={locale} email={COMPANY.email} /> : (
                <div>
                  <p className="leading-relaxed text-fg-2">{T.mail1} <a href={mailto} className="font-medium text-accent underline underline-offset-4">{COMPANY.email}</a>{T.mail2}</p>
                  <a href={mailto} className="mt-6 inline-flex items-center gap-2 rounded-full bg-btn px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#055e8f]">{T.send}</a>
                </div>
              )}
            </div>
          </div>
          <aside id="donnees" className="lg:pt-16">
            <p className="text-sm font-medium text-accent">{T.data}</p>
            <dl className="mt-4 space-y-5">
              {T.items.map(x => (
                <div key={x.t} className="rounded-2xl border border-line bg-bg p-5">
                  <dt className="font-semibold">{x.t}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-fg-2">{x.d}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-sm leading-relaxed text-muted">{T.rights} <a href={`mailto:${COMPANY.email}`} className="text-accent underline underline-offset-2">{COMPANY.email}</a>. {T.details} <a href="/confidentialite#candidatures" className="text-accent underline underline-offset-2">{T.policy}</a>.</p>
          </aside>
        </div>
      </section>

      <CtaBand locale={locale} title={T.ctaTitle} text={T.ctaText} />
    </Page>
  );
}
