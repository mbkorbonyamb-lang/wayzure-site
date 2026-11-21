"use client";

// Recherche du site : un bouton loupe dans l'en-tête ouvre une fenêtre de recherche.
// L'index (lib/search-index.ts) est un JSON statique chargé seulement à la première ouverture,
// donc rien de plus à télécharger pour les visiteurs qui ne cherchent pas. Raccourcis : Ctrl/Cmd+K et « / ».
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { SearchEntry } from "@/lib/search-index";

const L = {
  fr: {
    open: "Rechercher sur le site", placeholder: "Rechercher une expertise, un logiciel, un secteur…", close: "Fermer",
    empty: "Aucun résultat. Essayez un autre mot, ou écrivez-nous depuis la page Contact.", loading: "Chargement…",
    error: "La recherche n'a pas pu se charger. Réessayez dans un instant.",
    hint: "Exemples : data, cybersécurité, logistique, santé, formation, références",
    keys: "↑ ↓ pour choisir, Entrée pour ouvrir, Échap pour fermer",
  },
  en: {
    open: "Search the site", placeholder: "Search an expertise, a software, an industry…", close: "Close",
    empty: "No results. Try another word, or write to us from the Contact page.", loading: "Loading…",
    error: "Search could not load. Please try again in a moment.",
    hint: "Examples: data, cybersecurity, logistics, health, training, references",
    keys: "↑ ↓ to choose, Enter to open, Esc to close",
  },
};

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’']/g, " ");

type Prepared = SearchEntry & { nt: string; nd: string; nk: string };

function search(index: Prepared[], q: string) {
  const terms = norm(q).split(/[^a-z0-9]+/).filter(t => t.length > 1 || /\d/.test(t));
  if (!terms.length) return [];
  const scored: [number, Prepared][] = [];
  for (const e of index) {
    let score = 0;
    let ok = true;
    for (const t of terms) {
      const inT = e.nt.includes(t), inD = e.nd.includes(t), inK = e.nk.includes(t);
      if (!inT && !inD && !inK) { ok = false; break; }
      score += (inT ? (new RegExp(`(^|[^a-z0-9])${t}`).test(e.nt) ? 12 : 8) : 0) + (inD ? 3 : 0) + (inK ? 1 : 0);
    }
    if (!ok) continue;
    // Un titre court qui correspond exactement à la recherche passe devant (ex. « formation » → la page Formation).
    const nq = terms.join(" ");
    if (e.nt === nq) score += 40; else if (e.nt.startsWith(nq)) score += 15;
    scored.push([score, e]);
  }
  return scored.sort((a, b) => b[0] - a[0]).slice(0, 8).map(s => s[1]);
}

export function SiteSearch({ locale = "fr", className = "" }: { locale?: "fr" | "en"; className?: string }) {
  const T = L[locale];
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [index, setIndex] = useState<Prepared[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  const load = useCallback(() => {
    if (index) return;
    setFailed(false);
    fetch(`/recherche-index/${locale}`)
      .then(r => (r.ok ? r.json() : Promise.reject()))
      .then((data: SearchEntry[]) => setIndex(data.map(e => ({ ...e, nt: norm(e.t), nd: norm(e.d), nk: norm(e.k) }))))
      .catch(() => setFailed(true));
  }, [index, locale]);

  const show = useCallback(() => { setOpen(true); load(); }, [load]);
  const hide = useCallback(() => { setOpen(false); button.current?.focus(); }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // L'en-tête contient deux boutons (ordinateur et mobile) : seul celui qui est affiché réagit aux raccourcis.
      if (!button.current?.offsetParent) return;
      const el = e.target as HTMLElement;
      const typing = el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) { e.preventDefault(); show(); }
      else if (e.key === "/" && !typing) { e.preventDefault(); show(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Ferme le menu mobile s'il était ouvert.
    document.querySelectorAll<HTMLDetailsElement>("details[data-menu][open]").forEach(d => d.removeAttribute("open"));
    requestAnimationFrame(() => input.current?.focus());
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const results = useMemo(() => (index ? search(index, q) : []), [index, q]);
  useEffect(() => setActive(0), [q]);

  const go = (u: string) => { setOpen(false); setQ(""); router.push(u); };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { e.preventDefault(); hide(); }
    else if (e.key === "ArrowDown") { e.preventDefault(); setActive(a => Math.min(a + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
    else if (e.key === "Enter" && results[active]) { e.preventDefault(); go(results[active].u); }
  };

  return (
    <>
      <button ref={button} type="button" onClick={show} aria-label={T.open} title={`${T.open} (Ctrl+K)`}
        className={`grid size-10 place-items-center rounded-lg border border-line text-fg-2 transition-colors hover:border-accent hover:text-accent ${className}`}>
        <svg viewBox="0 0 20 20" className="size-[1.1rem]" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" aria-hidden><circle cx="8.8" cy="8.8" r="5.6" /><path d="m13 13 4.2 4.2" /></svg>
      </button>
      {open && createPortal(
        <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/40 px-4 pt-[8vh] backdrop-blur-sm sm:pt-[12vh]" onMouseDown={e => { if (e.target === e.currentTarget) hide(); }}>
          <div role="dialog" aria-modal="true" aria-label={T.open} onKeyDown={onKeyDown} className="flex max-h-[80vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-line bg-bg shadow-2xl">
            <div className="flex items-center gap-3 border-b border-line px-4">
              <svg viewBox="0 0 20 20" className="size-5 shrink-0 text-muted" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" aria-hidden><circle cx="8.8" cy="8.8" r="5.6" /><path d="m13 13 4.2 4.2" /></svg>
              <input ref={input} type="search" value={q} onChange={e => setQ(e.target.value)} placeholder={T.placeholder} aria-label={T.placeholder}
                role="combobox" aria-expanded={results.length > 0} aria-controls="site-search-results" aria-activedescendant={results[active] ? `site-search-${active}` : undefined} autoComplete="off" spellCheck={false}
                className="h-14 min-w-0 flex-1 bg-transparent text-base text-fg !outline-none placeholder:text-muted [&::-webkit-search-cancel-button]:hidden" />
              <button type="button" onClick={hide} className="shrink-0 rounded-md border border-line px-2 py-1 text-xs text-muted hover:text-fg">{locale === "en" ? "Esc" : "Échap"}<span className="sr-only"> · {T.close}</span></button>
            </div>
            <div className="overflow-y-auto p-2" aria-live="polite">
              {failed ? <p className="px-3 py-6 text-sm text-muted">{T.error}</p>
                : !index ? <p className="px-3 py-6 text-sm text-muted">{T.loading}</p>
                : !q.trim() ? <p className="px-3 py-6 text-sm text-muted">{T.hint}</p>
                : !results.length ? <p className="px-3 py-6 text-sm text-muted">{T.empty}</p>
                : (
                  <ul id="site-search-results" role="listbox">
                    {results.map((r, i) => (
                      <li key={r.u + r.t} id={`site-search-${i}`} role="option" aria-selected={i === active}>
                        <a href={r.u} onClick={e => { e.preventDefault(); go(r.u); }} onMouseMove={() => setActive(i)}
                          className={`block rounded-xl px-3 py-2.5 ${i === active ? "bg-surface" : ""}`}>
                          <span className="flex items-baseline gap-2">
                            <span className={`text-sm font-medium ${i === active ? "text-accent" : "text-fg"}`}>{r.t}</span>
                            <span className="shrink-0 rounded-full bg-sky px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider text-accent">{r.g}</span>
                          </span>
                          {r.d && <span className="mt-0.5 line-clamp-2 block text-xs leading-snug text-muted">{r.d}</span>}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
            </div>
            <p className="hidden border-t border-line px-4 py-2 text-[0.7rem] text-muted sm:block">{T.keys}</p>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
