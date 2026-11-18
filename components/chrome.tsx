// Cadre commun : en-tête, pied de page, blocs de mise en page. Le menu mobile est un <details> : il fonctionne sans JavaScript, MenuCloser le referme après navigation.
import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "./marks";
import { MenuCloser } from "./menu-closer";
import { RevealOnScroll } from "./reveal";
import { COMPANY, GUINEA, SOCIAL_LINKS } from "@/lib/company";
import { ALL_EXPERTISES, SOLUTIONS } from "@/lib/content";

const NAV = [
  { href: "/expertises", label: "Expertises" },
  { href: "/solutions", label: "Solutions" },
  { href: "/a-propos", label: "À propos" },
];

export function Page({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-bg focus:px-3 focus:py-2">Aller au contenu</a>
      <Header />
      <main id="contenu" className="flex-1">{children}</main>
      <Footer />
      <RevealOnScroll />
      <MenuCloser />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Wayzure, accueil" className="shrink-0"><Logo /></Link>
        <nav aria-label="Navigation principale" className="hidden items-center gap-1 md:flex">
          <div className="group relative">
            <Link href="/expertises" className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm text-fg-2 transition-colors hover:text-fg">
              Expertises
              <svg viewBox="0 0 12 12" className="size-3 opacity-60" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden><path d="m3 4.5 3 3 3-3" /></svg>
            </Link>
            <div className="invisible absolute left-0 top-full w-80 translate-y-1 pt-2 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="rounded-2xl border border-line bg-bg p-2 shadow-xl shadow-black/5">
                {ALL_EXPERTISES.map(e => (
                  <Link key={e.slug} href={`/expertises/${e.slug}`} className="block rounded-xl px-3 py-2.5 hover:bg-surface">
                    <span className="block text-sm font-medium text-fg">{e.name}</span>
                    <span className="block text-xs leading-snug text-muted">{e.lead}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {NAV.slice(1).map(n => <Link key={n.href} href={n.href} className="rounded-md px-3 py-2 text-sm text-fg-2 transition-colors hover:text-fg">{n.label}</Link>)}
          <Link href="/contact" className="ml-3 inline-flex items-center gap-2 rounded-full bg-btn px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#055e8f]">Parler de votre projet</Link>
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <Link href="/contact" className="rounded-full bg-btn px-4 py-2 text-sm font-medium text-white">Contact</Link>
          <details data-menu className="group/m">
            <summary className="flex size-10 cursor-pointer list-none items-center justify-center rounded-lg border border-line [&::-webkit-details-marker]:hidden" aria-label="Menu">
              <svg viewBox="0 0 20 20" className="size-5 group-open/m:hidden" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" aria-hidden><path d="M3 6h14M3 10h14M3 14h14" /></svg>
              <svg viewBox="0 0 20 20" className="hidden size-5 group-open/m:block" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" aria-hidden><path d="m5 5 10 10M15 5 5 15" /></svg>
            </summary>
            <div className="fixed inset-x-0 top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-bg px-4 pb-6 pt-3 shadow-xl">
              <p className="px-3 pb-1 pt-2 text-xs font-medium uppercase tracking-wider text-muted">Expertises</p>
              {ALL_EXPERTISES.map(e => <Link key={e.slug} href={`/expertises/${e.slug}`} className="block rounded-lg px-3 py-3 text-base hover:bg-surface">{e.name}</Link>)}
              <p className="px-3 pb-1 pt-4 text-xs font-medium uppercase tracking-wider text-muted">Solutions</p>
              <div className="grid grid-cols-2 gap-1">
                {SOLUTIONS.map(s => <Link key={s.slug} href={`/solutions/${s.slug}`} className="block rounded-lg px-3 py-3 text-base hover:bg-surface">{s.name}</Link>)}
              </div>
              <div className="my-3 border-t border-line" />
              {NAV.slice(1).map(n => <Link key={n.href} href={n.href} className="block rounded-lg px-3 py-3 text-base hover:bg-surface">{n.label}</Link>)}
              <Link href="/contact" className="mt-3 block rounded-full bg-btn px-3 py-3.5 text-center text-base font-medium text-white">Parler de votre projet</Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

const tel = (n: string) => `tel:${n.replace(/\s/g, "")}`;

function Footer() {
  return (
    <footer className="bg-deep-2 text-on-deep">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:px-8">
        <div>
          <Logo tone="white" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-on-deep-2">ESN et éditeur de solutions numériques. Data et IA, conseil, développement, formation et services IT, en France et en Guinée.</p>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            {SOCIAL_LINKS.map(n => (
              <li key={n.name}>
                <a href={n.url} rel="noopener" className="inline-flex items-center gap-2 text-sm text-on-deep-2 hover:text-white">
                  <SocialIcon name={n.name} />{n.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Expertises</p>
          <ul className="mt-4 space-y-2.5 text-sm text-on-deep-2">
            {ALL_EXPERTISES.map(e => <li key={e.slug}><Link href={`/expertises/${e.slug}`} className="hover:text-white">{e.name}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Solutions</p>
          <ul className="mt-4 space-y-2.5 text-sm text-on-deep-2">
            {SOLUTIONS.map(s => <li key={s.slug}><Link href={`/solutions/${s.slug}`} className="hover:text-white">{s.name}</Link></li>)}
          </ul>
          <p className="mt-7 text-sm font-semibold text-white">Wayzure</p>
          <ul className="mt-4 space-y-2.5 text-sm text-on-deep-2">
            <li><Link href="/a-propos" className="hover:text-white">À propos</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div className="text-sm text-on-deep-2">
          <p className="font-semibold text-white">Nous joindre</p>
          <p className="mt-4"><a href={`mailto:${COMPANY.email}`} className="text-white hover:text-[#7cc4ec]">{COMPANY.email}</a></p>
          <p className="mt-4 text-xs uppercase tracking-wider text-on-deep-2/80">France</p>
          <p className="mt-1">{COMPANY.address}</p>
          {COMPANY.phone && <p className="mt-1"><a href={tel(COMPANY.phone)} className="hover:text-white">{COMPANY.phone}</a></p>}
          <p className="mt-4 text-xs uppercase tracking-wider text-on-deep-2/80">Guinée</p>
          <p className="mt-1">{GUINEA.office}</p>
          {COMPANY.phoneGuinea && <p className="mt-1"><a href={tel(COMPANY.phoneGuinea)} className="hover:text-white">{COMPANY.phoneGuinea}</a></p>}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-on-deep-2 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {COMPANY.legalName} · {GUINEA.legalName}</p>
          <p className="flex gap-5"><Link href="/mentions-legales" className="hover:text-white">Mentions légales</Link><Link href="/confidentialite" className="hover:text-white">Confidentialité</Link></p>
        </div>
      </div>
    </footer>
  );
}

/** En-tête des pages intérieures : fond clair bleuté, photo ou visuel facultatif à droite. */
export function PageHero({ eyebrow, title, children, aside }: { eyebrow?: ReactNode; title: ReactNode; children?: ReactNode; aside?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-sky">
      <GridGlow />
      <div className={`relative mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 ${aside ? "lg:grid-cols-[1.15fr_1fr] lg:items-center" : ""}`}>
        <div>
          {eyebrow && <p className="text-sm font-medium text-accent">{eyebrow}</p>}
          <h1 className="mt-4 max-w-3xl font-display text-[2.2rem] font-semibold leading-[1.08] tracking-tight text-fg sm:text-5xl lg:text-[3.4rem]">{title}</h1>
          {children}
        </div>
        {aside}
      </div>
    </section>
  );
}

/** Halo bleu lumineux et trame légère, pour les fonds clairs. */
export function GridGlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute -right-32 -top-48 size-[36rem] rounded-full bg-[#0782c6] opacity-[0.16] blur-[120px]" />
      <div className="absolute -bottom-56 -left-40 size-[28rem] rounded-full bg-[#3aa7e3] opacity-[0.12] blur-[120px]" />
      <div className="absolute inset-0 opacity-[0.5] [background-image:linear-gradient(var(--sky-2)_1px,transparent_1px),linear-gradient(90deg,var(--sky-2)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_65%)]" />
    </div>
  );
}

export function SectionTitle({ eyebrow, title, children, className = "" }: { eyebrow?: string; title: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <div className={className} data-reveal>
      {eyebrow && <p className="text-sm font-medium text-accent">{eyebrow}</p>}
      <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight sm:text-[2.6rem]">{title}</h2>
      {children && <div className="mt-4 max-w-2xl text-lg leading-relaxed text-fg-2">{children}</div>}
    </div>
  );
}

export function CtaBand({ title = "Parlons de votre projet.", text = "Décrivez la situation en quelques lignes. Nous revenons vers vous avec des questions précises ou une première analyse, sans engagement." }: { title?: string; text?: string }) {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[linear-gradient(120deg,#0670aa_0%,#0773b0_55%,#0a7ab9_100%)] px-6 py-16 text-center text-white sm:px-12" data-reveal>
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-32 size-96 rounded-full bg-white opacity-[0.12] blur-3xl" />
          <div className="absolute -bottom-40 -left-20 size-96 rounded-full bg-[#7cc4ec] opacity-25 blur-3xl" />
        </div>
        <div className="relative">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white">{text}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-[#0670aa] shadow-lg shadow-black/10 transition-colors hover:bg-[#eef7fd]">Nous écrire <Arrow /></Link>
            {COMPANY.phone && <a href={tel(COMPANY.phone)} className="inline-flex items-center gap-2 rounded-full border border-white/60 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10">{COMPANY.phone}</a>}
          </div>
        </div>
      </div>
    </section>
  );
}

export const Arrow = ({ className = "size-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" className={`${className} transition-transform group-hover:translate-x-0.5`} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M3 8h10M9 4l4 4-4 4" /></svg>
);

export const Check = () => (
  <svg viewBox="0 0 16 16" className="mt-1 size-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m3.5 8.5 3 3 6-7" /></svg>
);

function SocialIcon({ name }: { name: "LinkedIn" | "Facebook" | "X" }) {
  const d = {
    LinkedIn: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z",
    Facebook: "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z",
    X: "M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.82l4.71 6.23 5.46-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z",
  }[name];
  return <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden><path d={d} /></svg>;
}
