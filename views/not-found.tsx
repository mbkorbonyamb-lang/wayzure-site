import Link from "next/link";
import { Page, PageHero } from "@/components/chrome";
import { href, type Locale } from "@/lib/i18n";

const TX = {
  fr: {
    eyebrow: "Erreur 404", title: "Cette page n'existe pas, ou plus.",
    text: "Le site a été entièrement refait en novembre 2026 et certaines anciennes pages ont disparu.",
    home: "Retour à l'accueil", contact: "Nous contacter",
  },
  en: {
    eyebrow: "Error 404", title: "This page does not exist, or no longer does.",
    text: "The website was completely rebuilt in November 2026 and some old pages are gone.",
    home: "Back to the home page", contact: "Contact us",
  },
};

export function NotFound({ locale = "fr" }: { locale?: Locale }) {
  const T = TX[locale];
  return (
    <Page locale={locale}>
      <PageHero eyebrow={T.eyebrow} title={T.title}>
        <p className="mt-6 text-lg text-fg-2">{T.text}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={href(locale, "/")} className="rounded-full bg-btn px-6 py-3.5 text-sm font-medium text-white">{T.home}</Link>
          <Link href={href(locale, "/contact")} className="rounded-full border border-line bg-bg px-6 py-3.5 text-sm font-medium text-fg hover:border-accent">{T.contact}</Link>
        </div>
      </PageHero>
    </Page>
  );
}
