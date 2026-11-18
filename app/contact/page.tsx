import { Hero, Page } from "@/components/chrome";
import { COMPANY } from "@/lib/company";
import { meta } from "@/lib/seo";

export const metadata = meta("/contact", "Contact", "Écrivez à Wayzure pour parler de votre projet de data, de conseil, de développement ou de formation.");

const SUBJECT = encodeURIComponent("Projet avec Wayzure");
const BODY = encodeURIComponent("Bonjour,\n\nNotre organisation :\nLe besoin, en quelques lignes :\nÉchéance éventuelle :\n\nMerci,\n");

export default function Contact() {
  return (
    <Page>
      <Hero eyebrow="Contact" title="Parlons de votre projet.">
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-2">Quelques lignes suffisent : qui vous êtes, ce qui bloque aujourd&apos;hui, et pour quand. Nous revenons vers vous avec des questions précises ou une première proposition.</p>
      </Hero>
      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-16 sm:px-6 md:grid-cols-2">
        <a href={`mailto:${COMPANY.email}?subject=${SUBJECT}&body=${BODY}`} className="rounded-2xl border border-line p-7 transition-shadow hover:shadow-md">
          <p className="text-sm text-muted">Par e-mail</p>
          <p className="mt-2 text-xl font-semibold text-accent">{COMPANY.email}</p>
          <p className="mt-3 text-sm leading-relaxed text-fg-2">Le message s&apos;ouvre avec trois questions à compléter pour aller plus vite.</p>
        </a>
        <div className="rounded-2xl border border-line p-7">
          <p className="text-sm text-muted">Adresse</p>
          <p className="mt-2 text-xl font-semibold">{COMPANY.legalName}</p>
          <p className="mt-1 text-fg-2">{COMPANY.address}</p>
          {COMPANY.phone && <p className="mt-3 text-fg-2">Téléphone : <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="text-accent">{COMPANY.phone}</a></p>}
        </div>
      </section>
    </Page>
  );
}
