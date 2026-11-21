// Cadre commun : en-tête, pied de page, blocs de mise en page. Le menu mobile est un <details> : il fonctionne sans JavaScript, MenuCloser le referme après navigation.
import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "./marks";
import { MenuCloser } from "./menu-closer";
import { RevealOnScroll } from "./reveal";
import { SiteSearch } from "./search";
import { ThemeToggle } from "./theme-toggle";
import { COMPANY, GUINEA, SOCIAL_LINKS, type SocialName, whatsappHref } from "@/lib/company";
import { getContent } from "@/lib/content";
import { href, type Locale, other, UI } from "@/lib/i18n";
import { sectorNav } from "@/views/sectors";

const nav = (l: Locale) => [
  { href: href(l, "/solutions"), label: UI[l].solutions },
  { href: href(l, "/a-propos"), label: UI[l].about },
  { href: href(l, "/actualites"), label: UI[l].news },
];

/** Cadre d'une page. path : chemin français de la page, pour le lien vers l'autre langue. */
export function Page({ children, locale = "fr", path = "/" }: { children: ReactNode; locale?: Locale; path?: string }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-bg focus:px-3 focus:py-2">{UI[locale].skip}</a>
      <Header locale={locale} path={path} />
      <main id="contenu" className="flex-1">{children}</main>
      <Footer locale={locale} />
      <RevealOnScroll />
      <MenuCloser />
    </div>
  );
}

function LangSwitch({ locale, path, className = "" }: { locale: Locale; path: string; className?: string }) {
  const o = other(locale);
  return (
    <Link href={href(o, path)} hrefLang={o} lang={o} aria-label={UI[locale].switchAria} className={`inline-flex h-10 items-center justify-center rounded-lg border border-line px-2.5 text-xs font-semibold tracking-wide text-fg-2 transition-colors hover:border-accent hover:text-accent ${className}`}>
      {o.toUpperCase()}
    </Link>
  );
}

function Header({ locale, path }: { locale: Locale; path: string }) {
  const { EXPERTISES, IT_SERVICES, SOLUTIONS } = getContent(locale);
  const SECTORS = sectorNav(locale);
  const u = UI[locale];
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href={href(locale, "/")} aria-label={u.homeAria} className="shrink-0"><Logo /></Link>
        <nav aria-label={u.nav} className="hidden items-center gap-1 lg:flex">
          <div className="group relative">
            <Link href={href(locale, "/expertises")} className="inline-flex items-center gap-1 rounded-md px-2 py-2 text-sm text-fg-2 xl:px-3 transition-colors hover:text-fg">
              {u.expertises}
              <svg viewBox="0 0 12 12" className="size-3 opacity-60" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden><path d="m3 4.5 3 3 3-3" /></svg>
            </Link>
            <div className="invisible absolute left-0 top-full w-80 translate-y-1 pt-2 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="rounded-2xl border border-line bg-bg p-2 shadow-xl shadow-black/5">
                <p className="px-3 pb-1 pt-1.5 text-[0.7rem] font-medium uppercase tracking-wider text-muted">{u.poles}</p>
                {EXPERTISES.map(e => (
                  <Link key={e.slug} href={href(locale, `/expertises/${e.slug}`)} className="block rounded-xl px-3 py-2.5 hover:bg-surface">
                    <span className="block text-sm font-medium text-fg">{e.name}</span>
                    <span className="block text-xs leading-snug text-muted">{e.lead}</span>
                  </Link>
                ))}
                <p className="mx-3 mt-1.5 border-t border-line px-0 pb-1 pt-3 text-[0.7rem] font-medium uppercase tracking-wider text-muted">{u.transversal}</p>
                <Link href={href(locale, `/expertises/${IT_SERVICES.slug}`)} className="block rounded-xl px-3 py-2.5 hover:bg-surface">
                  <span className="block text-sm font-medium text-fg">{IT_SERVICES.name}</span>
                  <span className="block text-xs leading-snug text-muted">{IT_SERVICES.lead}</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="group relative">
            <Link href={href(locale, "/secteurs-dactivite")} className="inline-flex items-center gap-1 whitespace-nowrap rounded-md px-2 py-2 text-sm text-fg-2 xl:px-3 transition-colors hover:text-fg">
              {u.sectors}
              <svg viewBox="0 0 12 12" className="size-3 opacity-60" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden><path d="m3 4.5 3 3 3-3" /></svg>
            </Link>
            <div className="invisible absolute left-1/2 top-full w-[34rem] -translate-x-1/2 translate-y-1 pt-2 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="rounded-2xl border border-line bg-bg p-2 shadow-xl shadow-black/5">
                <p className="px-3 pb-1 pt-1.5 text-[0.7rem] font-medium uppercase tracking-wider text-muted">{u.sectorsLead}</p>
                <div className="grid grid-cols-2 gap-x-1">
                  {SECTORS.map(s => (
                    <Link key={s.id} href={`${href(locale, "/secteurs-dactivite")}#${s.id}`} className="block rounded-xl px-3 py-2.5 text-sm font-medium text-fg hover:bg-surface hover:text-accent">{s.title}</Link>
                  ))}
                </div>
                <Link href={href(locale, "/secteurs-dactivite")} className="group/all mx-1 mt-1.5 flex items-center gap-2 border-t border-line px-2 pb-1.5 pt-3 text-sm font-medium text-accent">{u.sectorsAll} <Arrow /></Link>
              </div>
            </div>
          </div>
          {nav(locale).map(n => <Link key={n.href} href={n.href} className="whitespace-nowrap rounded-md px-2 py-2 text-sm text-fg-2 xl:px-3 transition-colors hover:text-fg">{n.label}</Link>)}
          <SiteSearch locale={locale} className="ml-1 xl:ml-2" />
          <LangSwitch locale={locale} path={path} className="ml-1 xl:ml-2" />
          <ThemeToggle locale={locale} className="ml-1 xl:ml-2" />
          <Link href={href(locale, "/contact")} className="ml-1 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-btn px-3.5 py-2 xl:ml-2 xl:px-4 text-sm font-medium text-white transition-colors hover:bg-[#055e8f]">{u.cta}</Link>
        </nav>
        <div className="flex items-center gap-1.5 lg:hidden">
          <SiteSearch locale={locale} />
          <LangSwitch locale={locale} path={path} />
          <ThemeToggle locale={locale} />
          <Link href={href(locale, "/contact")} className="hidden rounded-full bg-btn px-3 py-2 text-sm font-medium text-white min-[450px]:inline-flex">{u.contact}</Link>
          <details data-menu className="group/m">
            <summary className="flex size-10 cursor-pointer list-none items-center justify-center rounded-lg border border-line [&::-webkit-details-marker]:hidden" aria-label={u.menu}>
              <svg viewBox="0 0 20 20" className="size-5 group-open/m:hidden" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" aria-hidden><path d="M3 6h14M3 10h14M3 14h14" /></svg>
              <svg viewBox="0 0 20 20" className="hidden size-5 group-open/m:block" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" aria-hidden><path d="m5 5 10 10M15 5 5 15" /></svg>
            </summary>
            <div className="fixed inset-x-0 top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-bg px-4 pb-6 pt-3 shadow-xl">
              {/* Menu mobile : chaque page n'y figure qu'une fois ; la langue et l'apparence restent dans la barre du haut. */}
              <Link href={href(locale, "/expertises")} className="block px-3 pb-1 pt-2 text-xs font-medium uppercase tracking-wider text-muted hover:text-accent">{u.expertises}</Link>
              {EXPERTISES.map(e => <Link key={e.slug} href={href(locale, `/expertises/${e.slug}`)} className="block rounded-lg px-3 py-3 text-base hover:bg-surface">{e.name}</Link>)}
              <p className="px-3 pb-1 pt-3 text-xs text-muted">{u.transversal}</p>
              <Link href={href(locale, `/expertises/${IT_SERVICES.slug}`)} className="block rounded-lg px-3 py-3 text-base hover:bg-surface">{IT_SERVICES.name}</Link>
              <details className="group/s mt-2">
                <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-3 text-base font-medium hover:bg-surface [&::-webkit-details-marker]:hidden">
                  {u.sectors}
                  <svg viewBox="0 0 12 12" className="size-3.5 opacity-60 transition-transform group-open/s:rotate-180" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden><path d="m3 4.5 3 3 3-3" /></svg>
                </summary>
                <div className="ml-3 border-l border-line pl-2">
                  <Link href={href(locale, "/secteurs-dactivite")} className="block rounded-lg px-3 py-2.5 text-base font-medium text-accent hover:bg-surface">{u.sectorsAll}</Link>
                  {SECTORS.map(s => <Link key={s.id} href={`${href(locale, "/secteurs-dactivite")}#${s.id}`} className="block rounded-lg px-3 py-2.5 text-base hover:bg-surface">{s.title}</Link>)}
                </div>
              </details>
              <Link href={href(locale, "/solutions")} className="block px-3 pb-1 pt-4 text-xs font-medium uppercase tracking-wider text-muted hover:text-accent">{u.solutions}</Link>
              <div className="grid grid-cols-2 gap-1">
                {SOLUTIONS.map(s => <Link key={s.slug} href={href(locale, `/solutions/${s.slug}`)} className="block rounded-lg px-3 py-3 text-base hover:bg-surface">{s.name}</Link>)}
              </div>
              <div className="my-3 border-t border-line" />
              <Link href={href(locale, "/a-propos")} className="block rounded-lg px-3 py-3 text-base hover:bg-surface">{u.about}</Link>
              <Link href={href(locale, "/actualites")} className="block rounded-lg px-3 py-3 text-base hover:bg-surface">{u.news}</Link>
              <Link href={href(locale, "/carrieres")} className="block rounded-lg px-3 py-3 text-base hover:bg-surface">{u.careers}</Link>
              <Link href={href(locale, "/contact")} className="mt-3 block rounded-full bg-btn px-3 py-3.5 text-center text-base font-medium text-white">{u.cta}</Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

const tel = (n: string) => `tel:${n.replace(/\s/g, "")}`;

function Footer({ locale }: { locale: Locale }) {
  const { ALL_EXPERTISES, SOLUTIONS } = getContent(locale);
  const u = UI[locale];
  const h = (p: string) => href(locale, p);
  return (
    <footer className="bg-deep-2 text-on-deep">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:px-8">
        <div>
          <Logo tone="white" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-on-deep-2">{u.footerLine}</p>
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
          <p className="text-sm font-semibold text-white">{u.expertises}</p>
          <ul className="mt-4 space-y-2.5 text-sm text-on-deep-2">
            {ALL_EXPERTISES.map(e => <li key={e.slug}><Link href={h(`/expertises/${e.slug}`)} className="hover:text-white">{e.name}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{u.solutions}</p>
          <ul className="mt-4 space-y-2.5 text-sm text-on-deep-2">
            {SOLUTIONS.map(s => <li key={s.slug}><Link href={h(`/solutions/${s.slug}`)} className="hover:text-white">{s.name}</Link></li>)}
          </ul>
          <p className="mt-7 text-sm font-semibold text-white">Wayzure</p>
          <ul className="mt-4 space-y-2.5 text-sm text-on-deep-2">
            <li><Link href={h("/secteurs-dactivite")} className="hover:text-white">{u.sectors}</Link></li>
            <li><Link href={h("/references")} className="hover:text-white">{u.references}</Link></li>
            <li><Link href={h("/a-propos")} className="hover:text-white">{u.about}</Link></li>
            <li><Link href={h("/nos-valeurs")} className="hover:text-white">{u.values}</Link></li>
            <li><Link href={h("/actualites")} className="hover:text-white">{u.news}</Link></li>
            <li><Link href={h("/carrieres")} className="hover:text-white">{u.careers}</Link></li>
            <li><Link href={h("/contact")} className="hover:text-white">{u.contact}</Link></li>
          </ul>
        </div>
        <div className="text-sm text-on-deep-2">
          <p className="font-semibold text-white">{u.reach}</p>
          <p className="mt-4"><a href={`mailto:${COMPANY.email}`} className="text-white hover:text-[#7cc4ec]">{COMPANY.email}</a></p>
          <p className="mt-4 text-xs uppercase tracking-wider text-on-deep-2/80">{u.france}</p>
          <p className="mt-1">{COMPANY.address}</p>
          {COMPANY.phone && <p className="mt-1"><a href={tel(COMPANY.phone)} className="hover:text-white">{COMPANY.phone}</a></p>}
          <p className="mt-4 text-xs uppercase tracking-wider text-on-deep-2/80">{u.guinea}</p>
          <p className="mt-1">{GUINEA.office}</p>
          {COMPANY.phoneGuinea && <p className="mt-1"><a href={tel(COMPANY.phoneGuinea)} className="hover:text-white">{COMPANY.phoneGuinea}</a></p>}
          {COMPANY.whatsappGuinea && <p className="mt-2"><a href={whatsappHref(COMPANY.whatsappGuinea, u.whatsappHello)} rel="noopener" className="inline-flex items-center gap-2 text-white hover:text-[#7cc4ec]"><SocialIcon name="WhatsApp" />{u.whatsapp}</a></p>}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-on-deep-2 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {COMPANY.legalName} · {GUINEA.legalName}</p>
          <p className="flex gap-5"><Link href="/mentions-legales" className="hover:text-white">{u.legal}</Link><Link href="/confidentialite" className="hover:text-white">{u.privacy}</Link></p>
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

export function CtaBand({ title, text, locale = "fr" }: { title?: string; text?: string; locale?: Locale }) {
  const u = UI[locale];
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[linear-gradient(120deg,#0670aa_0%,#0773b0_55%,#0a7ab9_100%)] px-6 py-16 text-center text-white sm:px-12" data-reveal>
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-32 size-96 rounded-full bg-white opacity-[0.12] blur-3xl" />
          <div className="absolute -bottom-40 -left-20 size-96 rounded-full bg-[#7cc4ec] opacity-25 blur-3xl" />
        </div>
        <div className="relative">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">{title ?? u.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white">{text ?? u.ctaText}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href={href(locale, "/contact")} className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-[#0670aa] shadow-lg shadow-black/10 transition-colors hover:bg-[#eef7fd]">{u.write} <Arrow /></Link>
            {COMPANY.booking && <a href={COMPANY.booking} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-white/60 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10">{u.book}</a>}
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

export function SocialIcon({ name }: { name: SocialName | "WhatsApp" }) {
  const d = {
    LinkedIn: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z",
    Facebook: "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z",
    Instagram: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38A5.86 5.86 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.12a5.86 5.86 0 0 0 2.13 1.38c.76.3 1.63.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.86 5.86 0 0 0 2.12-1.38 5.86 5.86 0 0 0 1.38-2.12c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.86 5.86 0 0 0-1.38-2.13A5.86 5.86 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z",
    WhatsApp: "M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35ZM12.04 21.8h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.72.98 1-3.63-.24-.37a9.8 9.8 0 0 1-1.5-5.22c0-5.42 4.41-9.83 9.84-9.83a9.83 9.83 0 0 1 9.83 9.84c0 5.42-4.42 9.83-9.84 9.83Zm8.37-18.2A11.76 11.76 0 0 0 12.04.13C5.5.13.17 5.46.17 12a11.8 11.8 0 0 0 1.58 5.93L.07 24l6.22-1.63a11.82 11.82 0 0 0 5.75 1.46h.01c6.54 0 11.87-5.32 11.87-11.86 0-3.17-1.23-6.15-3.47-8.39Z",
    YouTube: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z",
    X: "M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.82l4.71 6.23 5.46-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z",
  }[name];
  return <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden><path d={d} /></svg>;
}
