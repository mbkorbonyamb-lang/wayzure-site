import { Page, PageHero } from "@/components/chrome";
import { ContactForm } from "@/components/contact-form";
import { COMPANY, GUINEA } from "@/lib/company";
import { meta } from "@/lib/seo";

export const metadata = meta("/contact", "Contact", "Parlez de votre projet à Wayzure : data et IA, conseil, développement, formation ou services IT. Réponse par e-mail ou par téléphone.");

const tel = (n: string) => `tel:${n.replace(/\s/g, "")}`;

export default function Contact() {
  return (
    <Page>
      <PageHero eyebrow="Contact" title="Parlons de votre projet.">
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-on-deep-2">Quelques lignes suffisent : qui vous êtes, ce qui bloque aujourd&apos;hui, et pour quand. Nous revenons vers vous avec des questions précises ou une première analyse, sans engagement.</p>
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:px-8">
        <div>
          <ContactForm email={COMPANY.email} />
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
          </div>
        </aside>
      </section>
    </Page>
  );
}
