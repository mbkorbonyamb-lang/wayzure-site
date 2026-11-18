import Image from "next/image";

/* eslint-disable @next/next/no-img-element */
// Icônes des produits Wayzure, reprises des logos officiels (mêmes tracés que dans WayPulse).
const MARKS: Record<string, (id: string) => React.ReactNode> = {
  waypulse: () => (
    <>
      <rect width="32" height="32" rx="7.3" fill="#0a84c6" />
      <g transform="translate(5.33 5.33) scale(.667)">
        <path d="M2 5h6l7 22H9z" fill="#fff" /><path d="M9 27h6l6-17h-6z" fill="#fff" fillOpacity=".55" />
        <path d="M13 10h6l6 17h-6z" fill="#fff" /><path d="M19 27h6l5-22h-6z" fill="#fff" fillOpacity=".55" />
      </g>
    </>
  ),
  waypilot: id => (
    <>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3770FA" /><stop offset="1" stopColor="#1A47CA" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8.3" fill={`url(#${id})`} />
      <path d="M8 16.3l5.1 5.1L24.2 10.2" fill="none" stroke="#fff" strokeWidth="3.9" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  waylog: () => (
    <>
      <rect width="32" height="32" rx="8.5" fill="#162C55" />
      <path d="M7 22.5c3.2 0 4.2-2.6 5.3-5.6 1.2-3.2 2.4-6.4 6.2-6.4" fill="none" stroke="#F7A224" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="7" cy="22.5" r="2.2" fill="#F7A224" />
      <path d="m18.5 14.2 2.6 2.6 4.9-5.3" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  waycare: id => (
    <>
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0" stopColor="#0033CC" /><stop offset="0.55" stopColor="#0394D4" /><stop offset="1" stopColor="#00DCC8" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill={`url(#${id})`} />
      <path d="M6.5 8.4L11.1 23 16 17.6 20.9 23 25.5 8.4" fill="none" stroke="#fff" strokeWidth="3.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 17.6C12.9 14.6 10.8 12.7 10.8 11.3 10.8 9.9 12 9 13.3 9 14.6 9 15.4 9.7 16 10.6 16.6 9.7 17.4 9 18.7 9 20 9 21.2 9.9 21.2 11.3 21.2 12.7 19.1 14.6 16 17.6Z" fill="#fff" />
      <path d="M15.2 11.6h1.6v1.6h1.6v1.6h-1.6v1.6h-1.6v-1.6h-1.6v-1.6h1.6z" fill={`url(#${id})`} />
    </>
  ),
};


export function ProductMark({ slug, className = "size-10" }: { slug: string; className?: string }) {
  const mark = MARKS[slug];
  return mark ? <svg viewBox="0 0 32 32" className={`${className} shrink-0`} aria-hidden>{mark(`pm-${slug}`)}</svg> : null;
}

/**
 * Logo officiel Wayzure en ligne : symbole couleur (W en ruban) + nom.
 * tone "auto" : couleur sur fond clair, blanc en mode sombre. tone "white" : pour les fonds bleu profond.
 */
export function Logo({ tone = "auto", className = "" }: { tone?: "auto" | "white"; className?: string }) {
  const white = (
    <span className={`items-center gap-2.5 ${tone === "auto" ? "logo-dark" : "flex"}`}>
      <img src="/brand/wayzure-mark-blanc.svg" alt="" width={42} height={28} className="h-7 w-auto" />
      <img src="/brand/wayzure-wordmark-blanc.svg" alt="Wayzure" width={95} height={22} className="h-[1.3rem] w-auto" />
    </span>
  );
  if (tone === "white") return <span className={`inline-flex ${className}`}>{white}</span>;
  return (
    <span className={`inline-flex ${className}`}>
      <span className="logo-light flex items-center gap-2.5">
        <Image src="/brand/wayzure-symbole-couleur.png" alt="" width={268} height={179} priority className="h-7 w-auto" />
        <img src="/brand/wayzure-wordmark-couleur.svg" alt="Wayzure" width={95} height={22} className="h-[1.3rem] w-auto" />
      </span>
      {white}
    </span>
  );
}
