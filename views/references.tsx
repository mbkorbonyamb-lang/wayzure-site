// Page Références : les projets réellement menés, repris des blocs « Références » des expertises (lib/content.ts),
// pour n'avoir qu'une seule source. Aucun résultat, chiffre ou avis ajouté ici : seuls le cas WayPilot de JAARAY
// (publié avec l'accord de la boutique) et son témoignage, repris mot pour mot, sont cités.
import Image from "next/image";
import Link from "next/link";
import { Arrow, CtaBand, Page, PageHero, SectionTitle } from "@/components/chrome";
import { JsonLd, breadcrumb } from "@/components/json-ld";
import { Testimonial } from "@/components/testimonial";
import { getContent, type Case } from "@/lib/content";
import { DOSSIER_PDF } from "@/lib/company";
import { href, type Locale, UI } from "@/lib/i18n";
import { PAGE_SEO } from "@/lib/page-seo";
import { meta } from "@/lib/seo";

const TX = {
  fr: {
    title: "Références",
    h1: "Ils nous ont confié leurs projets.",
    intro: "Administrations, groupes privés, PME et organisations, en Guinée, en France et au-delà. Voici ce que nous avons réalisé pour eux, décrit tel quel, sans exagération.",
    featured: "Références principales", featuredTitle: "Du secteur public à l'e-commerce.",
    others: "Autres références", othersTitle: "Ils nous font aussi confiance.",
    expertise: "Expertise", product: "Logiciel utilisé", brands: "Marques du groupe dont nous avons créé le logo",
    review: "Avis client",
    ctaTitle: "Votre projet pourrait être le prochain.",
    ctaText: "Décrivez-nous votre situation. Nous vous répondons avec des questions précises ou une première analyse.",
  },
  en: {
    title: "References",
    h1: "They trusted us with their projects.",
    intro: "Public administrations, private groups, SMEs and organisations, in Guinea, France and beyond. Here is what we did for them, described as it was, without exaggeration.",
    featured: "Key references", featuredTitle: "From the public sector to e-commerce.",
    others: "Other references", othersTitle: "They trust us too.",
    expertise: "Expertise", product: "Software used", brands: "Group brands whose logos we designed",
    review: "Customer review",
    ctaTitle: "Your project could be next.",
    ctaText: "Tell us about your situation. We will reply with precise questions or a first analysis.",
  },
};

// Ordre d'affichage (début du nom du client dans lib/content.ts). Les six premières sont mises en avant.
const FEATURED = ["Direction générale du Fonds", "Tastout", "Africa Fight League", "ASKALIA", "Modpresco", "JAARAY"];
const TASTOUT_BRANDS = [
  { name: "Villa Kijani", src: "/clients/villa-kijani.webp" },
  { name: "Écarlate", src: "/clients/ecarlate.webp" },
  { name: "Khuru", src: "/clients/khuru.webp" },
];
// Référence confirmée par Moussa (création du logo, 2022) qui n'appartient à aucun bloc d'expertise.
const EXTRA: Record<Locale, { c: Case; pole?: undefined }[]> = {
  fr: [{ c: { client: "Bald Engineer", logo: "/clients/bald-engineer.webp", context: "Électricité, France · 2022", text: "Création du logo." } }],
  en: [{ c: { client: "Bald Engineer", logo: "/clients/bald-engineer.webp", context: "Electrical engineering, France · 2022", text: "Logo design." } }],
};

type Ref = { c: Case; pole?: { name: string; slug: string } };

function collect(locale: Locale) {
  const { ALL_EXPERTISES } = getContent(locale);
  const all: Ref[] = ALL_EXPERTISES.flatMap(e => (e.cases ?? []).map(c => ({ c, pole: { name: e.short, slug: e.slug } })));
  const rank = (r: Ref) => { const i = FEATURED.findIndex(f => r.c.client.startsWith(f)); return i < 0 ? 99 : i; };
  const featured = all.filter(r => rank(r) < 99).sort((a, b) => rank(a) - rank(b));
  const others = [...all.filter(r => rank(r) === 99), ...EXTRA[locale]];
  return { featured, others };
}

export const referencesMeta = (locale: Locale) => meta("/references", PAGE_SEO[locale].references.title, PAGE_SEO[locale].references.desc, locale);

function Logo({ src, name, className = "" }: { src?: string; name: string; className?: string }) {
  return (
    <span className={`grid place-items-center rounded-2xl bg-white p-3 ring-1 ring-black/10 ${className}`}>
      {src
        ? <span className="relative block size-full"><Image src={src} alt={name} fill sizes="200px" className="object-contain" /></span>
        : <span className="font-display text-lg font-semibold text-[#19323E]">{name.split(" ")[0]}</span>}
    </span>
  );
}

export function References({ locale = "fr" }: { locale?: Locale }) {
  const T = TX[locale];
  const { SOLUTIONS } = getContent(locale);
  const waypilot = SOLUTIONS.find(s => s.slug === "waypilot");
  const { featured, others } = collect(locale);
  return (
    <Page locale={locale} path="/references">
      <JsonLd data={breadcrumb([[T.title, "/references"]], locale)} />
      <PageHero eyebrow={T.title} title={T.h1}>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-2">{T.intro}</p>
        <div className="mt-8"><a href={DOSSIER_PDF} download className="group inline-flex items-center gap-2 rounded-full border border-line bg-bg px-5 py-3 text-sm font-medium hover:border-accent hover:text-accent">{UI[locale].dossier} <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M8 2v9M4 7l4 4 4-4M3 14h10" /></svg></a></div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle eyebrow={T.featured} title={T.featuredTitle} />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {featured.map(({ c, pole }, i) => {
            const isJaaray = c.client.startsWith("JAARAY");
            const isTastout = c.client.startsWith("Tastout");
            return (
              <article key={c.client} data-reveal style={{ "--d": `${(i % 2) * 80}ms` } as React.CSSProperties} className="flex flex-col rounded-3xl border border-line bg-bg p-7 sm:p-8">
                <div className="flex items-start gap-5">
                  <Logo src={c.logo} name={c.client} className="h-16 w-28 shrink-0" />
                  <div>
                    <h3 className="font-display text-xl font-semibold leading-snug">{c.client}</h3>
                    {c.context && <p className="mt-1 text-sm text-muted">{c.context}</p>}
                  </div>
                </div>
                <p className="mt-5 leading-relaxed text-fg-2">{c.text}</p>
                {isJaaray && waypilot?.proof && <p className="mt-3 leading-relaxed text-fg-2">{waypilot.proof}</p>}
                {isTastout && (
                  <div className="mt-5">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted">{T.brands}</p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {TASTOUT_BRANDS.map(b => <Logo key={b.name} src={b.src} name={b.name} className="h-12 w-24" />)}
                    </div>
                  </div>
                )}
                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  {pole && <Link href={href(locale, `/expertises/${pole.slug}`)} className="group inline-flex items-center gap-1.5 rounded-full bg-sky px-3.5 py-1.5 text-xs font-medium text-accent">{T.expertise} : {pole.name} <Arrow className="size-3" /></Link>}
                  {isJaaray && <Link href={href(locale, "/solutions/waypilot")} className="group inline-flex items-center gap-1.5 rounded-full bg-sky px-3.5 py-1.5 text-xs font-medium text-accent">{T.product} : WayPilot <Arrow className="size-3" /></Link>}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-accent">{T.review}</p>
          <div className="mt-6"><Testimonial locale={locale} /></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle eyebrow={T.others} title={T.othersTitle} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {others.map(({ c, pole }) => (
            <article key={c.client} data-reveal className="flex flex-col rounded-3xl border border-line p-6">
              <Logo src={c.logo} name={c.client} className="h-16 w-full" />
              <h3 className="mt-5 font-display font-semibold leading-snug">{c.client}</h3>
              {c.context && <p className="mt-1 text-xs text-muted">{c.context}</p>}
              <p className="mt-3 text-sm leading-relaxed text-fg-2">{c.text}</p>
              {pole && <Link href={href(locale, `/expertises/${pole.slug}`)} className="group mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-medium text-accent">{pole.name} <Arrow className="size-3" /></Link>}
            </article>
          ))}
        </div>
      </section>

      <CtaBand locale={locale} title={T.ctaTitle} text={T.ctaText} />
    </Page>
  );
}
