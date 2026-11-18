// Pictogrammes des pôles, dessinés pour Wayzure (trait 1,6, coins arrondis).
const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const ICONS: Record<string, React.ReactNode> = {
  "data-intelligence-artificielle": (
    <g {...P}><path d="M4 20V10M9 20V4M14 20v-7M19 20V8" /><circle cx="19" cy="5" r="1.6" /><path d="M14 10.5 18 6.5" /></g>
  ),
  conseil: (
    <g {...P}><circle cx="12" cy="12" r="8.5" /><path d="m15.5 8.5-2.3 4.7-4.7 2.3 2.3-4.7z" /></g>
  ),
  "developpement-numerique": (
    <g {...P}><rect x="3" y="4.5" width="18" height="15" rx="2.5" /><path d="M3 9h18M9.5 13l-2 2 2 2M14.5 13l2 2-2 2" /></g>
  ),
  formation: (
    <g {...P}><path d="M2.5 9 12 4.5 21.5 9 12 13.5z" /><path d="M6.5 11v4.5c1.5 1.4 3.4 2 5.5 2s4-.6 5.5-2V11M21.5 9v5" /></g>
  ),
  "services-it": (
    <g {...P}><path d="M4.5 13a7.5 7.5 0 0 1 15 0" /><rect x="3" y="13" width="4" height="6" rx="1.5" /><rect x="17" y="13" width="4" height="6" rx="1.5" /><path d="M19 19c0 1.2-1.5 2-3.5 2H13" /></g>
  ),
};

export function ExpertiseIcon({ slug, className = "size-6" }: { slug: string; className?: string }) {
  return <svg viewBox="0 0 24 24" className={className} aria-hidden>{ICONS[slug]}</svg>;
}
