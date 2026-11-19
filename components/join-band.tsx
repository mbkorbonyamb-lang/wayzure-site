// Encart « Rejoignez l'aventure Wayzure », renvoie vers la page Carrières et son formulaire.
import Link from "next/link";
import { Arrow } from "@/components/chrome";
import { Photo } from "@/components/photo";
import { PHOTOS } from "@/lib/photos";

export function JoinBand() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
      <div data-reveal className="grid overflow-hidden rounded-[2rem] border border-sky-2 bg-sky lg:grid-cols-[1fr_1.1fr]">
        <div className="relative min-h-56 lg:min-h-full">
          <Photo photo={PHOTOS.dev} sizes="(min-width: 1024px) 600px, 100vw" className="absolute inset-0 size-full" />
        </div>
        <div className="p-7 sm:p-10 lg:p-12">
          <p className="text-sm font-medium text-accent">Carrières</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Rejoignez l&apos;aventure Wayzure.</h2>
          <p className="mt-4 max-w-xl leading-relaxed text-fg-2">Data, conseil, développement, formation, services IT : nous rencontrons des profils qui veulent des projets concrets, en France et en Guinée. Déposez une candidature spontanée, nous la lisons même quand aucun poste n&apos;est ouvert.</p>
          <Link href="/carrieres#candidature" className="group mt-8 inline-flex items-center gap-2 rounded-full bg-btn px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#055e8f]">Candidater <Arrow /></Link>
        </div>
      </div>
    </section>
  );
}
