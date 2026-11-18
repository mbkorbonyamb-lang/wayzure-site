// Cadre commun : menu, pied de page. Sans JavaScript : le menu mobile est un <details>.
import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "./marks";
import { COMPANY } from "@/lib/company";
import { POLES } from "@/lib/content";

const NAV = [
  { href: "/#expertises", label: "Expertises" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/a-propos", label: "À propos" },
];

export function Page({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#contenu" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-bg focus:px-3 focus:py-2">Aller au contenu</a>
      <Nav />
      <main id="contenu" className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label="Wayzure, accueil"><Logo /></Link>
        <nav aria-label="Navigation principale" className="hidden items-center gap-1 md:flex">
          {NAV.map(n => <Link key={n.href} href={n.href} className="rounded-md px-3 py-2 text-sm text-fg-2 transition-colors hover:text-fg">{n.label}</Link>)}
          <Link href="/contact" className="ml-2 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85">Nous écrire</Link>
        </nav>
        <details className="relative md:hidden">
          <summary className="flex size-10 cursor-pointer list-none items-center justify-center rounded-md border border-line" aria-label="Ouvrir le menu">
            <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" aria-hidden><path d="M3 6h14M3 10h14M3 14h14" /></svg>
          </summary>
          <div className="absolute right-0 top-12 w-56 rounded-xl border border-line bg-bg p-2 shadow-lg">
            {[...NAV, { href: "/contact", label: "Nous écrire" }].map(n => <Link key={n.href} href={n.href} className="block rounded-md px-3 py-2.5 text-[0.95rem] text-fg hover:bg-surface">{n.label}</Link>)}
          </div>
        </details>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-2">Data, conseil, développement numérique et formation pour les PME et les organisations.</p>
          <p className="mt-4 text-sm text-fg-2"><a href={`mailto:${COMPANY.email}`} className="hover:text-accent">{COMPANY.email}</a></p>
          {COMPANY.phone && <p className="mt-1 text-sm text-fg-2"><a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="hover:text-accent">{COMPANY.phone}</a></p>}
          <p className="mt-1 text-sm text-muted">{COMPANY.address}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Expertises</p>
          <ul className="mt-3 space-y-2 text-sm text-fg-2">
            {POLES.map(p => <li key={p.id}><Link href={`/#${p.id}`} className="hover:text-fg">{p.name}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Wayzure</p>
          <ul className="mt-3 space-y-2 text-sm text-fg-2">
            <li><Link href="/realisations" className="hover:text-fg">Réalisations</Link></li>
            <li><Link href="/a-propos" className="hover:text-fg">À propos</Link></li>
            <li><Link href="/contact" className="hover:text-fg">Contact</Link></li>
            <li><a href={COMPANY.linkedin} className="hover:text-fg" rel="noopener">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} {COMPANY.legalName}</p>
          <p className="flex gap-5"><Link href="/mentions-legales" className="hover:text-fg">Mentions légales</Link><Link href="/confidentialite" className="hover:text-fg">Confidentialité</Link></p>
        </div>
      </div>
    </footer>
  );
}

export function Hero({ eyebrow, title, children }: { eyebrow?: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-4 pb-14 pt-16 sm:px-6 sm:pt-20">
        {eyebrow && <p className="text-sm font-medium text-accent">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl font-display text-[2.1rem] font-semibold leading-[1.1] tracking-tight sm:text-5xl">{title}</h1>
        {children}
      </div>
    </section>
  );
}

export const Arrow = () => (
  <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M3 8h10M9 4l4 4-4 4" /></svg>
);
