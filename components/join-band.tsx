// Encart « Rejoignez l'aventure Wayzure », renvoie vers la page Carrières et son formulaire.
import Link from "next/link";
import { Arrow } from "@/components/chrome";
import { Photo } from "@/components/photo";
import { href, type Locale, t } from "@/lib/i18n";
import { PHOTOS } from "@/lib/photos";

export function JoinBand({ locale = "fr" }: { locale?: Locale }) {
  const L = (fr: string, en: string) => t(locale, fr, en);
  return (
    <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
      <div data-reveal className="grid overflow-hidden rounded-[2rem] border border-sky-2 bg-sky lg:grid-cols-[1fr_1.1fr]">
        <div className="relative min-h-56 lg:min-h-full">
          <Photo locale={locale} photo={PHOTOS.dev} sizes="(min-width: 1024px) 600px, 100vw" className="absolute inset-0 size-full" />
        </div>
        <div className="p-7 sm:p-10 lg:p-12">
          <p className="text-sm font-medium text-accent">{L("Carrières", "Careers")}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{L("Rejoignez l'aventure Wayzure.", "Join the Wayzure adventure.")}</h2>
          <p className="mt-4 max-w-xl leading-relaxed text-fg-2">{L("Data, conseil, développement, formation, services IT : nous rencontrons des profils qui veulent des projets concrets, en France et en Guinée. Déposez une candidature spontanée, nous la lisons même quand aucun poste n'est ouvert.", "Data, consulting, development, training, IT services: we meet people who want real projects, in France and Guinea. Send us an open application; we read it even when no position is advertised.")}</p>
          <Link href={`${href(locale, "/carrieres")}#candidature`} className="group mt-8 inline-flex items-center gap-2 rounded-full bg-btn px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#055e8f]">{L("Candidater", "Apply")} <Arrow /></Link>
        </div>
      </div>
    </section>
  );
}
