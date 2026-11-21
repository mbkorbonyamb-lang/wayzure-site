// « Ils nous ont fait confiance » (accueil) : défilement horizontal continu des logos, dans des cadres identiques,
// avec le nom de l'organisation et, quand ils sont confirmés, son secteur et son pays. Pas de description de mission ici.
// Animation en CSS seul (transform), pause au survol ou au clavier ; si l'utilisateur réduit les animations,
// la liste s'affiche en grille fixe. Liste dans lib/clients.ts ; rien ne s'affiche tant qu'elle est vide.
import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/chrome";
import { CLIENT_LOGOS } from "@/lib/clients";
import { href, type Locale, UI } from "@/lib/i18n";

function Item({ c, locale, hidden = false }: { c: (typeof CLIENT_LOGOS)[number]; locale: Locale; hidden?: boolean }) {
  const meta = locale === "en" ? c.metaEn : c.meta;
  return (
    <li aria-hidden={hidden || undefined} className="flex w-40 shrink-0 flex-col sm:w-48">
      <span className="grid aspect-[2/1] place-items-center rounded-2xl bg-white p-4 ring-1 ring-black/10">
        <span className="relative block size-full">
          <Image src={c.src} alt="" fill sizes="(min-width: 640px) 192px, 160px" className="object-contain" />
        </span>
      </span>
      <p className="mt-3 text-sm font-medium leading-snug">{c.name}</p>
      {meta && <p className="mt-0.5 text-xs leading-snug text-muted">{meta}</p>}
    </li>
  );
}

export function ClientLogos({ locale = "fr" }: { locale?: Locale }) {
  if (CLIENT_LOGOS.length === 0) return null;
  return (
    <section aria-labelledby="confiance" className="pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="confiance" className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{UI[locale].trusted}</h2>
          <Link href={href(locale, "/references")} className="group inline-flex items-center gap-2 text-sm font-medium text-accent">{UI[locale].seeReferences} <Arrow /></Link>
        </div>
      </div>
      <div className="logo-marquee mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
        <div className="logo-track flex w-max">
          <ul className="flex gap-6 pr-6 sm:gap-8 sm:pr-8">
            {CLIENT_LOGOS.map(c => <Item key={c.name} c={c} locale={locale} />)}
          </ul>
          {/* Copie pour une boucle sans à-coup, ignorée par les lecteurs d'écran. */}
          <ul aria-hidden className="logo-copy flex gap-6 pr-6 sm:gap-8 sm:pr-8">
            {CLIENT_LOGOS.map(c => <Item key={c.name} c={c} locale={locale} hidden />)}
          </ul>
        </div>
      </div>
    </section>
  );
}
