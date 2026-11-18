"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Referme le menu mobile (<details data-menu>) après une navigation, sur Échap ou clic à l'extérieur. */
export function MenuCloser() {
  const pathname = usePathname();
  useEffect(() => {
    document.querySelectorAll<HTMLDetailsElement>("details[data-menu]").forEach(d => { d.open = false; });
  }, [pathname]);
  useEffect(() => {
    const close = (ev: Event) => {
      document.querySelectorAll<HTMLDetailsElement>("details[data-menu][open]").forEach(d => {
        if (ev.type === "keydown" ? (ev as KeyboardEvent).key === "Escape" : !d.contains(ev.target as Node)) d.open = false;
      });
    };
    document.addEventListener("keydown", close);
    document.addEventListener("click", close);
    return () => { document.removeEventListener("keydown", close); document.removeEventListener("click", close); };
  }, []);
  return null;
}
