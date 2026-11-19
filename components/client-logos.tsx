// « Ils nous ont fait confiance » (accueil) : grille de logos dans des cadres identiques, avec le nom de l'organisation
// et, quand ils sont confirmés, son secteur et son pays. Pas de description de mission ici : les études de cas
// détaillées restent sur les pages d'expertise. Liste dans lib/clients.ts ; rien ne s'affiche tant qu'elle est vide.
import Image from "next/image";
import { CLIENT_LOGOS } from "@/lib/clients";
import { type Locale, UI } from "@/lib/i18n";

export function ClientLogos({ locale = "fr" }: { locale?: Locale }) {
  if (CLIENT_LOGOS.length === 0) return null;
  return (
    <section aria-labelledby="confiance" className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
      <h2 id="confiance" className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{UI[locale].trusted}</h2>
      <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {CLIENT_LOGOS.map((c, i) => {
          const meta = locale === "en" ? c.metaEn : c.meta;
          return (
            <li key={c.name} data-reveal style={{ "--d": `${(i % 6) * 50}ms` } as React.CSSProperties} className="flex flex-col">
              <span className="grid aspect-[2/1] place-items-center rounded-2xl bg-white p-4 ring-1 ring-black/10">
                <span className="relative block size-full">
                  <Image src={c.src} alt="" fill sizes="(min-width: 1280px) 190px, (min-width: 640px) 30vw, 45vw" className="object-contain" />
                </span>
              </span>
              <p className="mt-3 text-sm font-medium leading-snug">{c.name}</p>
              {meta && <p className="mt-0.5 text-xs leading-snug text-muted">{meta}</p>}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
