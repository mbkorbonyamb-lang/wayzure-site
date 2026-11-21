import { Page, PageHero, SocialIcon } from "@/components/chrome";
import { ContactForm } from "@/components/contact-form";
import { HeroPhoto } from "@/components/photo";
import { COMPANY, DOSSIER_PDF, GUINEA, whatsappHref } from "@/lib/company";
import { UI } from "@/lib/i18n";
import { TOPICS, TOPICS_EN } from "@/lib/contact";
import { FORM_ENABLED } from "@/lib/contact-link";
import type { Locale } from "@/lib/i18n";
import { PHOTOS } from "@/lib/photos";
import { meta } from "@/lib/seo";
import { PAGE_SEO } from "@/lib/page-seo";

const TX = {
  fr: {
    h1: "Parlons de votre projet.",
    intro: "Quelques lignes suffisent : qui vous êtes, ce qui bloque aujourd'hui, et pour quand. Nous revenons vers vous avec des questions précises ou une première analyse, sans engagement.",
    direct: "Écrivez-nous directement.",
    d1: "Un e-mail à", d2: "arrive chez les personnes qui traitent votre demande. Pour aller plus vite, indiquez votre organisation, la situation actuelle, ce que vous voulez changer et l'échéance éventuelle.",
    pick: "Choisissez un sujet, votre messagerie s'ouvre avec l'objet déjà rempli :",
    request: (t: string) => `Demande : ${t}`, generic: "Demande de contact", writeTo: (e: string) => `Écrire à ${e}`,
    byEmail: "Par e-mail", france: "France", guinea: "Guinée", hello: "Bonjour Wayzure,", wa: "Écrire sur WhatsApp",
    quick: "Échanger de vive voix", quickText: "Réservez un créneau dans notre agenda, ou écrivez-nous sur WhatsApp.", book: "Réserver un échange",
  },
  en: {
    h1: "Let's talk about your project.",
    intro: "A few lines are enough: who you are, what is holding you back today, and your timeline. We will come back to you with precise questions or a first analysis, with no commitment.",
    direct: "Write to us directly.",
    d1: "An email to", d2: "reaches the people who handle your request. To speed things up, mention your organisation, the current situation, what you want to change and any deadline. We reply in English or French.",
    pick: "Choose a subject and your email app opens with the subject line filled in:",
    request: (t: string) => `Request: ${t}`, generic: "Contact request", writeTo: (e: string) => `Write to ${e}`,
    byEmail: "By email", france: "France", guinea: "Guinea", hello: "Hello Wayzure,", wa: "Message us on WhatsApp",
    quick: "Talk to us directly", quickText: "Book a slot in our calendar, or message us on WhatsApp.", book: "Book a call",
  },
};

export const contactMeta = (locale: Locale) => meta("/contact", PAGE_SEO[locale].contact.title, PAGE_SEO[locale].contact.desc, locale);

const tel = (n: string) => `tel:${n.replace(/\s/g, "")}`;
const mailto = (subject: string) => `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}`;

// Le formulaire n'apparaît que si la clé Resend est définie dans Vercel (lue au build).
// Sans clé, la page propose l'e-mail direct. Après ajout de la clé, redéployer.
function EmailFirst({ locale }: { locale: Locale }) {
  const T = TX[locale];
  return (
    <div className="rounded-3xl border border-line bg-surface p-8">
      <p className="font-display text-2xl font-semibold">{T.direct}</p>
      <p className="mt-3 leading-relaxed text-fg-2">{T.d1} <a href={`mailto:${COMPANY.email}`} className="font-medium text-accent underline underline-offset-4">{COMPANY.email}</a> {T.d2}</p>
      <p className="mt-8 text-sm font-medium">{T.pick}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {TOPICS.map(t => {
          const label = locale === "en" ? TOPICS_EN[t] : t;
          return <li key={t}><a href={mailto(T.request(label))} className="inline-block rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent">{label}</a></li>;
        })}
      </ul>
      <a href={mailto(T.generic)} className="mt-8 inline-flex items-center gap-2 rounded-full bg-btn px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#055e8f]">{T.writeTo(COMPANY.email)}</a>
    </div>
  );
}

export function Contact({ locale = "fr" }: { locale?: Locale }) {
  const T = TX[locale];
  return (
    <Page locale={locale} path="/contact">
      <PageHero eyebrow="Contact" title={T.h1} aside={<HeroPhoto locale={locale} photo={PHOTOS.contact} className="hidden lg:block" />}>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-2">{T.intro}</p>
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:px-8">
        <div>
          {FORM_ENABLED ? <ContactForm locale={locale} email={COMPANY.email} /> : <EmailFirst locale={locale} />}
        </div>
        <aside className="space-y-5">
          {(COMPANY.booking || COMPANY.whatsappGuinea) && (
            <div className="rounded-3xl border border-sky-2 bg-sky p-7">
              <p className="font-display text-xl font-semibold">{T.quick}</p>
              <p className="mt-2 text-sm leading-relaxed text-fg-2">{T.quickText}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {COMPANY.booking && <a href={COMPANY.booking} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-btn px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#055e8f]">{T.book}</a>}
                {COMPANY.whatsappGuinea && <a href={whatsappHref(COMPANY.whatsappGuinea, T.hello)} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-[#1a8d4a] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#157a3f]"><SocialIcon name="WhatsApp" />{T.wa}</a>}
              </div>
              {COMPANY.whatsappGuinea && <p className="mt-3 text-sm text-muted">WhatsApp : {COMPANY.whatsappGuinea}</p>}
            </div>
          )}
          <a href={DOSSIER_PDF} download className="group inline-flex items-center gap-2 rounded-full border border-line bg-bg px-5 py-3 text-sm font-medium hover:border-accent hover:text-accent">{UI[locale].dossier} <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M8 2v9M4 7l4 4 4-4M3 14h10" /></svg></a>
          <div className="rounded-3xl border border-line p-7">
            <p className="text-sm text-muted">{T.byEmail}</p>
            <a href={`mailto:${COMPANY.email}`} className="mt-1 block font-display text-xl font-semibold text-accent">{COMPANY.email}</a>
          </div>
          <div className="rounded-3xl border border-line p-7">
            <p className="text-sm font-medium text-accent">{T.france}</p>
            <p className="mt-2 font-semibold">{COMPANY.legalName}</p>
            <p className="mt-1 text-fg-2">{COMPANY.address}</p>
            {COMPANY.phone && <a href={tel(COMPANY.phone)} className="mt-2 block font-medium hover:text-accent">{COMPANY.phone}</a>}
          </div>
          <div className="rounded-3xl border border-line p-7">
            <p className="text-sm font-medium text-accent">{T.guinea}</p>
            <p className="mt-2 font-semibold">{GUINEA.legalName}</p>
            <p className="mt-1 text-fg-2">{GUINEA.office}</p>
            {COMPANY.phoneGuinea && <a href={tel(COMPANY.phoneGuinea)} className="mt-2 block font-medium hover:text-accent">{COMPANY.phoneGuinea}</a>}
          </div>
        </aside>
      </section>
    </Page>
  );
}
