"use client";

// Choix de l'apparence : automatique (réglage de l'appareil), clair ou sombre. Mémorisé dans ce navigateur.
// Le script de <head> (layout) applique le choix avant l'affichage, sans flash.
import { useEffect, useState } from "react";

type Mode = "auto" | "light" | "dark";
const NEXT: Record<Mode, Mode> = { auto: "light", light: "dark", dark: "auto" };
const LABEL: Record<Mode, string> = { auto: "Apparence automatique", light: "Apparence claire", dark: "Apparence sombre" };

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [mode, setMode] = useState<Mode>("auto");
  useEffect(() => {
    const t = document.documentElement.dataset.theme;
    if (t === "light" || t === "dark") setMode(t);
  }, []);
  const change = () => {
    const m = NEXT[mode];
    setMode(m);
    const root = document.documentElement;
    if (m === "auto") delete root.dataset.theme; else root.dataset.theme = m;
    try { if (m === "auto") localStorage.removeItem("theme"); else localStorage.setItem("theme", m); } catch {}
  };
  return (
    <button type="button" onClick={change} className={`grid size-10 place-items-center rounded-lg border border-line text-fg-2 transition-colors hover:border-accent hover:text-accent ${className}`}
      aria-label={`${LABEL[mode]}. Changer l'apparence`} title={`${LABEL[mode]} (cliquer pour changer)`}>
      <svg viewBox="0 0 20 20" className="size-[1.1rem]" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {mode === "light" && <><circle cx="10" cy="10" r="3.4" /><path d="M10 2v1.6M10 16.4V18M2 10h1.6M16.4 10H18M4.3 4.3l1.1 1.1M14.6 14.6l1.1 1.1M4.3 15.7l1.1-1.1M14.6 5.4l1.1-1.1" /></>}
        {mode === "dark" && <path d="M16.5 12.3A6.8 6.8 0 0 1 7.7 3.5a6.8 6.8 0 1 0 8.8 8.8Z" />}
        {mode === "auto" && <><circle cx="10" cy="10" r="7" /><path d="M10 3v14" /><path d="M10 3a7 7 0 0 1 0 14Z" fill="currentColor" stroke="none" /></>}
      </svg>
    </button>
  );
}
