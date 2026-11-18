// Visuel de l'accueil : les quatre pôles convergent vers l'entreprise du client. Dessiné en SVG, animé en CSS.
const NODES = [
  { x: 85, y: 70, label: "Data & IA" },
  { x: 380, y: 60, label: "Conseil" },
  { x: 95, y: 330, label: "Développement" },
  { x: 375, y: 340, label: "Formation" },
];
const C = { x: 230, y: 205 };

export function HeroArt() {
  return (
    <div className="relative mx-auto aspect-[46/40] w-full max-w-[30rem]" aria-hidden>
      <svg viewBox="0 0 460 400" className="absolute inset-0 size-full">
        <defs>
          <linearGradient id="hl" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0782C6" />
            <stop offset="1" stopColor="#7cc4ec" />
          </linearGradient>
          <radialGradient id="hc" cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor="#0782C6" stopOpacity=".55" />
            <stop offset="1" stopColor="#0782C6" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={C.x} cy={C.y} r="150" fill="url(#hc)" />
        <circle cx={C.x} cy={C.y} r="118" fill="none" stroke="#ffffff" strokeOpacity=".08" />
        <circle cx={C.x} cy={C.y} r="74" fill="none" stroke="#ffffff" strokeOpacity=".12" strokeDasharray="3 6" />
        {NODES.map((n, i) => {
          const mx = (n.x + C.x) / 2 + (i % 2 ? -40 : 40);
          const my = (n.y + C.y) / 2;
          return (
            <path key={n.label} d={`M${n.x} ${n.y} Q${mx} ${my} ${C.x} ${C.y}`} fill="none" stroke="url(#hl)" strokeWidth="2" className="hero-line" style={{ animationDelay: `${0.2 + i * 0.25}s` }} />
          );
        })}
        {NODES.map((n, i) => (
          <circle key={n.label} cx={n.x} cy={n.y} r="5" fill="#7cc4ec" className="hero-dot" style={{ animationDelay: `${i * 0.8}s` }} />
        ))}
        <circle cx={C.x} cy={C.y} r="44" fill="#0f222b" stroke="#0782C6" strokeWidth="2" />
      </svg>
      {NODES.map(n => (
        <span
          key={n.label}
          className="absolute -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs font-medium text-white backdrop-blur"
          style={{ left: `${(n.x / 460) * 100}%`, top: `${((n.y + (n.y < 200 ? -36 : 16)) / 400) * 100}%` }}
        >
          {n.label}
        </span>
      ))}
      <span className="absolute left-1/2 top-1/2 w-24 -translate-x-1/2 -translate-y-1/2 text-center text-[0.7rem] font-semibold leading-tight text-white">Votre entreprise</span>
    </div>
  );
}
