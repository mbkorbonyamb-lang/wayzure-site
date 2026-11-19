// Bande des logos clients : CSS seul (aucun JavaScript), pause au survol. Logos transparents en couleur sur
// cartouche blanc (lisibles en mode sombre) ; logos sur fond de couleur (tile) affichés tels quels.
// Liste dans lib/clients.ts ; rien ne s'affiche tant qu'elle est vide, et pas de défilement sous 4 logos.
import Image from "next/image";
import { CLIENT_LOGOS } from "@/lib/clients";

const MIN_SCROLL = 4;

export function ClientLogos() {
  if (CLIENT_LOGOS.length === 0) return null;
  const scroll = CLIENT_LOGOS.length >= MIN_SCROLL;
  const row = (dup: boolean) => CLIENT_LOGOS.map(c => (
    <li key={`${c.name}-${dup}`} data-dup={dup || undefined} aria-hidden={dup || undefined} className="flex shrink-0 items-center px-3 sm:px-4">
      {c.tile ? (
        <span className="relative block h-20 w-44 overflow-hidden rounded-2xl ring-1 ring-black/5">
          <Image src={c.src} alt={dup ? "" : c.name} fill sizes="176px" className="object-cover" />
        </span>
      ) : (
        <span className="grid h-20 w-44 place-items-center rounded-2xl bg-white px-6 ring-1 ring-black/5">
          <Image src={c.src} alt={dup ? "" : c.name} width={c.w} height={c.h} className={`${c.w / c.h < 1.8 ? "h-16" : "h-12"} w-auto max-w-[9.5rem] object-contain`} />
        </span>
      )}
    </li>
  ));
  return (
    <section aria-label="Ils nous font confiance" className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
      <p className="text-center text-sm font-medium text-muted">Ils nous font confiance</p>
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
