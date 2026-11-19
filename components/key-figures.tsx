"use client";

// « Wayzure en chiffres » : les nombres défilent de 1 à leur valeur quand la section entre à l'écran.
// Le HTML contient déjà les valeurs finales (lisibles sans JavaScript et par les moteurs de recherche) ;
// l'animation ne démarre que si la section est encore hors de l'écran, et pas si l'utilisateur réduit les animations.
import { useEffect, useRef } from "react";

export type Figure = { value: number; prefix?: string; suffix?: string; label: string; detail: string };

export function KeyFigures({ figures }: { figures: Figure[] }) {
  const ref = useRef<HTMLDListElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const nums = Array.from(root.querySelectorAll<HTMLElement>("[data-to]"));
    if (root.getBoundingClientRect().top < innerHeight) return; // déjà visible : on n'efface pas ce que l'on voit
    nums.forEach(n => (n.textContent = "1"));
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (now: number) => {
        let done = true;
        nums.forEach((n, i) => {
          const to = Number(n.dataset.to), dur = 1400 + i * 250;
          const p = Math.min((now - t0) / dur, 1), k = 1 - Math.pow(1 - p, 4);
          n.textContent = String(Math.max(1, Math.round(1 + (to - 1) * k)));
          if (p < 1) done = false;
        });
        if (!done) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.35 });
    io.observe(root);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return (
    <dl ref={ref} className="grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] border border-sky-2 bg-sky-2 lg:grid-cols-4">
      {figures.map(f => (
        <div key={f.label} className="flex flex-col bg-bg p-6 sm:p-9">
          <dt className="order-2 mt-3 font-display text-base font-semibold tracking-tight sm:text-lg">{f.label}</dt>
          <dd className="order-1 flex items-baseline gap-x-1.5 whitespace-nowrap font-display font-semibold leading-none tracking-tight text-accent tabular-nums">
            {f.prefix && <span className="text-sm font-medium text-fg-2 sm:text-lg">{f.prefix}</span>}
            <span className="text-[2.6rem] sm:text-6xl lg:text-7xl"><span data-to={f.value}>{f.value}</span>{f.suffix && <span className="ml-0.5 text-[0.6em]">{f.suffix}</span>}</span>
          </dd>
          <dd className="order-3 mt-1.5 text-sm leading-relaxed text-fg-2">{f.detail}</dd>
        </div>
      ))}
    </dl>
  );
}
