// Bande défilante des logos clients : CSS seul (aucun JavaScript), pause au survol, logos en niveaux de gris sur cartouche
// blanc (lisibles en mode sombre), en couleur au survol. Liste dans lib/clients.ts ; rien ne s'affiche tant qu'elle est vide.
import Image from "next/image";
import { CLIENT_LOGOS } from "@/lib/clients";

export function ClientLogos() {
  if (CLIENT_LOGOS.length === 0) return null;
  const row = (dup: boolean) => CLIENT_LOGOS.map(c => (
    <li key={`${c.name}-${dup}`} data-dup={dup || undefined} aria-hidden={dup || undefined} className="flex shrink-0 items-center px-3 sm:px-4">
      <span className="grid h-20 w-44 place-items-center rounded-2xl bg-white px-6 ring-1 ring-black/5">
      <Image src={c.src} alt={dup ? "" : c.name} width={c.w} height={c.h} className="h-10 w-auto max-w-[9rem] object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0" />
      </span>
    </li>
  ));
  return (
    <section aria-label="Ils nous font confiance" className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
      <p className="text-center text-sm font-medium text-muted">Ils nous font confiance</p>
      <div className="marquee-wrap mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <ul className="marquee flex w-max" style={{ "--speed": `${Math.max(20, CLIENT_LOGOS.length * 6)}s` } as React.CSSProperties}>
          {row(false)}{row(true)}
        </ul>
      </div>
    </section>
  );
}
