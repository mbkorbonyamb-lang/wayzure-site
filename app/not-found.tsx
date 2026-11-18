import Link from "next/link";
import { Hero, Page } from "@/components/chrome";

export default function NotFound() {
  return (
    <Page>
      <Hero eyebrow="Erreur 404" title="Cette page n'existe pas, ou plus.">
        <p className="mt-5 text-lg text-fg-2">Le site a été refait en novembre 2026 et certaines anciennes pages ont disparu.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg">Retour à l&apos;accueil</Link>
      </Hero>
    </Page>
  );
}
