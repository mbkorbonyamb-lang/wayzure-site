import Link from "next/link";
import { Page, PageHero } from "@/components/chrome";

export default function NotFound() {
  return (
    <Page>
      <PageHero eyebrow="Erreur 404" title="Cette page n'existe pas, ou plus.">
        <p className="mt-6 text-lg text-on-deep-2">Le site a été entièrement refait en novembre 2026 et certaines anciennes pages ont disparu.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="rounded-full bg-btn px-6 py-3.5 text-sm font-medium text-white">Retour à l&apos;accueil</Link>
          <Link href="/contact" className="rounded-full border border-white/25 px-6 py-3.5 text-sm font-medium text-white">Nous contacter</Link>
        </div>
      </PageHero>
    </Page>
  );
}
