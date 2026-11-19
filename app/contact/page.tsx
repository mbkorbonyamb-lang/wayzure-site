import { Page, PageHero, SocialIcon } from "@/components/chrome";
import { ContactForm } from "@/components/contact-form";
import { HeroPhoto } from "@/components/photo";
import { COMPANY, GUINEA, whatsappHref } from "@/lib/company";
import { TOPICS } from "@/lib/contact";
import { FORM_ENABLED } from "@/lib/contact-link";
import { PHOTOS } from "@/lib/photos";
import { meta } from "@/lib/seo";

export const metadata = meta("/contact", "Contact", "Parlez de votre projet à Wayzure : data et IA, conseil, développement, formation ou services IT. Réponse par e-mail ou par téléphone.");

const tel = (n: string) => `tel:${n.replace(/\s/g, "")}`;

// Le formulaire n'apparaît que si la clé Resend est définie dans Vercel (lue au build).
// Sans clé, la page propose l'e-mail direct. Après ajout de la clé, redéployer.
const formEnabled = FORM_ENABLED;

const mailto = (subject: string) => `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}`;

function EmailFirst() {
  return (
    <div className="rounded-3xl border border-line bg-surface p-8">
      <p className="font-display text-2xl font-semibold">Écrivez-nous directement.</p>
      <p className="mt-3 leading-relaxed text-fg-2">Un e-mail à <a href={`mailto:${COMPANY.email}`} className="font-medium text-accent underline underline-offset-4">{COMPANY.email}</a> arrive chez les personnes qui traitent votre demande. Pour aller plus vite, indiquez votre organisation, la situation actuelle, ce que vous voulez changer et l&apos;échéance éventuelle.</p>
      <p className="mt-8 text-sm font-medium">Choisissez un sujet, votre messagerie s&apos;ouvre avec l&apos;objet déjà rempli :</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {TOPICS.map(t => (
          <li key={t}><a href={mailto(`Demande : ${t}`)} className="inline-block rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent">{t}</a></li>
        ))}
      </ul>
      <a href={mailto("Demande de contact")} className="mt-8 inline-flex items-center gap-2 rounded-full bg-btn px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#055e8f]">Écrire à {COMPANY.email}</a>
    </div>
  );
}

export default function Contact() {
  return (
    <Page>
      <PageHero eyebrow="Contact" title="Parlons de votre projet." aside={<HeroPhoto photo={PHOTOS.contact} className="hidden lg:block" />}>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-2">Quelques lignes suffisent : qui vous êtes, ce qui bloque aujourd&apos;hui, et pour quand. Nous revenons vers vous avec des questions précises ou une première analyse, sans engagement.</p>
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:px-8">
        <div>
          {formEnabled ? <ContactForm email={COMPANY.email} /> : <EmailFirst />}
        </div>
        <aside className="space-y-5">
          <div className="rounded-3xl border border-line p-7">
            <p className="text-sm text-muted">Par e-mail</p>
            <a href={`mailto:${COMPANY.email}`} className="mt-1 block font-display text-xl font-semibold text-accent">{COMPANY.email}</a>
          </div>
          <div className="rounded-3xl border border-line p-7">
            <p className="text-sm font-medium text-accent">France</p>
            <p className="mt-2 font-semibold">{COMPANY.legalName}</p>
            <p className="mt-1 text-fg-2">{COMPANY.address}</p>
            {COMPANY.phone && <a href={tel(COMPANY.phone)} className="mt-2 block font-medium hover:text-accent">{COMPANY.phone}</a>}
          </div>
          <div className="rounded-3xl border border-line p-7">
            <p className="text-sm font-medium text-accent">Guinée</p>
            <p className="mt-2 font-semibold">{GUINEA.legalName}</p>
            <p className="mt-1 text-fg-2">{GUINEA.office}</p>
            {COMPANY.phoneGuinea && <a href={tel(COMPANY.phoneGuinea)} className="mt-2 block font-medium hover:text-accent">{COMPANY.phoneGuinea}</a>}
            {COMPANY.whatsappGuinea && <a href={whatsappHref(COMPANY.whatsappGuinea, "Bonjour Wayzure,")} rel="noopener" className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#1a8d4a] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#157a3f]"><SocialIcon name="WhatsApp" />Écrire sur WhatsApp</a>}
          </div>
        </aside>
      </section>
    </Page>
  );
}
