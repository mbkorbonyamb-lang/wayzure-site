// Bande des logos clients : CSS seul (aucun JavaScript), pause au survol. Tous les logos dans le même cartouche blanc
// (lisible en mode sombre), contenus sans recadrage, y compris ceux livrés sur leur propre fond (tile).
// Liste dans lib/clients.ts ; rien ne s'affiche tant qu'elle est vide, et pas de défilement sous 4 logos.
import Image from "next/image";
import { CLIENT_LOGOS } from "@/lib/clients";
import { type Locale, UI } from "@/lib/i18n";

const MIN_SCROLL = 4;

export function ClientLogos({ locale = "fr" }: { locale?: Locale }) {
  if (CLIENT_LOGOS.length === 0) return null;
  const scroll = CLIENT_LOGOS.length >= MIN_SCROLL;
  const row = (dup: boolean) => CLIENT_LOGOS.map(c => (
    <li key={`${c.name}-${dup}`} data-dup={dup || undefined} aria-hidden={dup || undefined} className="flex shrink-0 items-center px-3 sm:px-4">
      {/* Cadre identique pour tous les logos ; le logo est contenu (jamais rogné), y compris ceux livrés sur leur propre fond. */}
      <span className="relative grid h-24 w-48 place-items-center rounded-2xl bg-white p-3 ring-1 ring-black/10">
        <span className="relative block size-full">
          <Image src={c.src} alt={dup ? "" : c.name} fill sizes="168px" className="object-contain" />
        </span>
      </span>
    </li>
  ));
  return (
    <section aria-label={UI[locale].trusted} className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
      <p className="text-center text-sm font-medium text-muted">{UI[locale].trusted}</p>
      {scroll ? (
        <div className="marquee-wrap mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <ul className="marquee flex w-max" style={{ "--speed": `${Math.max(20, CLIENT_LOGOS.length * 6)}s` } as React.CSSProperties}>
            {row(false)}{row(true)}
          </ul>
        </div>
      ) : (
        <ul className="mt-6 flex flex-wrap justify-center">{row(false)}</ul>
      )}
    </section>
  );
}
