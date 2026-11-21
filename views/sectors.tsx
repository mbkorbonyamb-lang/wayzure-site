// Page « Secteurs d'activité » : les domaines que Wayzure accompagne.
// À distinguer des Expertises (nos compétences) et des Solutions (nos logiciels).
// Règle : aucune référence, aucun client ni aucune réalisation sectorielle inventés. Les liens ne renvoient
// qu'à des expertises et à des produits existants.
import Link from "next/link";
import { Arrow, Check, Page, PageHero } from "@/components/chrome";
import { JsonLd, breadcrumb } from "@/components/json-ld";
import { HeroPhoto, Photo } from "@/components/photo";
import { href, type Locale } from "@/lib/i18n";
import { PHOTOS, SECTOR_PHOTOS } from "@/lib/photos";
import { meta } from "@/lib/seo";
import { PAGE_SEO } from "@/lib/page-seo";

// Ancres identiques en français et en anglais (demande de Moussa) : /en/secteurs-dactivite#secteur-public.
type Sector = { id: string; title: string; issues: string; items: string[]; links: [string, string][] };

const EXP = {
  fr: { data: "Data & Intelligence artificielle", conseil: "Conseil", dev: "Développement numérique", formation: "Formation", it: "Services IT" },
  en: { data: "Data & Artificial intelligence", conseil: "Consulting", dev: "Software development", formation: "Training", it: "IT services" },
};
const L = (locale: Locale) => {
  const e = EXP[locale];
  return {
    data: [e.data, "/expertises/data-intelligence-artificielle"] as [string, string],
    conseil: [e.conseil, "/expertises/conseil"] as [string, string],
    dev: [e.dev, "/expertises/developpement-numerique"] as [string, string],
    formation: [e.formation, "/expertises/formation"] as [string, string],
    it: [e.it, "/expertises/services-it"] as [string, string],
    waylog: ["WayLog", "/solutions/waylog"] as [string, string],
    waypilot: ["WayPilot", "/solutions/waypilot"] as [string, string],
    waypulse: ["WayPulse", "/solutions/waypulse"] as [string, string],
    waycare: ["Waycare", "/solutions/waycare"] as [string, string],
  };
};

const TX = {
  fr: {
    title: "Secteurs d'activité",
    h1: "Le numérique au service des secteurs qui font avancer l'économie.",
    intro: "Chaque secteur possède ses propres enjeux et contraintes. Wayzure accompagne les administrations, les institutions et les entreprises dans leur transformation numérique, en mobilisant le conseil, la technologie, la donnée et la formation pour améliorer leurs organisations et leurs performances.",
    jump: "Accès direct",
    issues: "Les enjeux",
    how: "Nos domaines d'intervention",
    related: "Pour aller plus loin",
    endTitle: "Votre secteur, vos enjeux, notre accompagnement.",
    endText: "Prenons le temps de comprendre votre environnement et vos objectifs pour construire une réponse adaptée.",
    endCta: "Parlons de votre projet",
    note: "Vous ne voyez pas votre secteur ? Les méthodes restent les mêmes : comprendre le terrain, puis outiller.",
  },
  en: {
    title: "Industries",
    h1: "Digital technology for the industries that move the economy forward.",
    intro: "Every industry has its own issues and constraints. Wayzure supports administrations, institutions and companies in their digital transformation, bringing together consulting, technology, data and training to improve how they are organised and how they perform.",
    jump: "Jump to",
    issues: "The issues",
    how: "Where we step in",
    related: "Learn more",
    endTitle: "Your industry, your issues, our support.",
    endText: "Let's take the time to understand your environment and your goals, so we can build the right response.",
    endCta: "Let's talk about your project",
    note: "Don't see your industry? The method stays the same: understand the ground first, then provide the tools.",
  },
};

export function sectors(locale: Locale): Sector[] {
  const l = L(locale);
  if (locale === "en") return [
    { id: "secteur-public", title: "Public sector and institutions", links: [l.conseil, l.dev, l.formation],
      issues: "Paper-based procedures, slow processing times, data scattered across departments, and projects that are hard to monitor once they are launched. Users expect simpler services, and decision-makers need reliable figures.",
      items: ["Digitising administrative procedures", "Administrative platforms and online services", "Paperless processes and document management", "Monitoring and evaluation of projects and programmes", "Dashboards for management", "Training staff on new tools"] },
    { id: "banque-finance-assurance", title: "Banking, finance and insurance", links: [l.data, l.dev],
      issues: "High volumes of transactions, repetitive tasks, strict regulatory requirements and the need to see performance clearly. Data exists, but it is often under-used.",
      items: ["Process automation", "Business applications", "Making use of data", "Dashboards", "Performance monitoring", "Training teams"] },
    { id: "mines-energie-industrie", title: "Mining, energy and industry", links: [l.data, l.dev, l.conseil],
      issues: "Remote sites, critical equipment, complex logistics and growing expectations on social and environmental commitments. Information from the field often arrives late or incomplete.",
      items: ["Equipment monitoring", "Maintenance management", "Logistics", "Field data collection", "Performance management", "Digital monitoring of CSR commitments"] },
    { id: "agriculture-agro-industrie", title: "Agriculture, agribusiness and rural development", links: [l.data, l.dev],
      issues: "Scattered producers, harvests that are hard to estimate, stocks tracked on paper and traceability requirements from buyers. Rural development projects also need to report on their results.",
      items: ["Farm and cooperative management", "Production and stock tracking", "Traceability", "Supply management", "Dashboards", "Digitising rural development projects"] },
    { id: "transport-logistique", title: "Transport and logistics", links: [l.waylog, l.dev],
      issues: "Vehicles on the road, drivers to coordinate, deliveries to prove and fuel costs to control. Without reliable data, losses and disputes are hard to explain.",
      items: ["Fleet management", "Driver and delivery tracking", "Stock management", "Digital delivery notes", "Fuel and maintenance tracking", "Reporting"] },
    { id: "telecommunications-services-numeriques", title: "Telecoms and digital services", links: [l.dev, l.it],
      issues: "Services that must stay available, many internal processes and users who expect quick answers. Teams need tools that keep pace with the business.",
      items: ["Application development", "Process digitisation", "Data and reporting", "IT service management", "User support", "IT maintenance"] },
    { id: "commerce-distribution", title: "Retail and distribution", links: [l.waypilot, l.waypulse, l.dev],
      issues: "Online and in-store sales, large catalogues, customers to keep and margins to protect. A wrong price or a missing product page costs sales without anyone noticing.",
      items: ["E-commerce platforms", "Catalogue management and checks", "Customer relationship management (CRM)", "Sales automation", "Sales analysis", "Distribution"] },
    { id: "sante-education", title: "Health and education", links: [l.waycare, l.formation],
      issues: "Facilities to organise, records to keep, patients or learners to follow over time, often with limited resources and an unreliable internet connection.",
      items: ["Digital health platforms", "Appointments and teleconsultation", "Facility management", "Online learning", "Activity monitoring", "Dashboards"] },
  ];
  return [
    { id: "secteur-public", title: "Secteur public et institutions", links: [l.conseil, l.dev, l.formation],
      issues: "Des procédures encore sur papier, des délais de traitement longs, des données dispersées entre services et des projets difficiles à suivre une fois lancés. Les usagers attendent des démarches plus simples, les décideurs ont besoin de chiffres fiables.",
      items: ["Digitalisation des procédures", "Plateformes administratives", "Dématérialisation", "Suivi-évaluation des projets", "Tableaux de bord", "Formation des agents"] },
    { id: "banque-finance-assurance", title: "Banque, finance et assurance", links: [l.data, l.dev],
      issues: "Des volumes d'opérations importants, des tâches répétitives, des exigences réglementaires fortes et le besoin de voir clairement la performance. Les données existent, mais elles restent souvent sous-exploitées.",
      items: ["Automatisation des processus", "Applications métiers", "Exploitation des données", "Tableaux de bord", "Suivi de la performance", "Formation"] },
    { id: "mines-energie-industrie", title: "Mines, énergie et industrie", links: [l.data, l.dev, l.conseil],
      issues: "Des sites éloignés, des équipements critiques, une logistique lourde et des attentes croissantes sur les engagements sociaux et environnementaux. L'information du terrain arrive souvent tard, ou incomplète.",
      items: ["Suivi des équipements", "Maintenance", "Logistique", "Collecte des données terrain", "Pilotage des performances", "Suivi numérique des engagements RSE"] },
    { id: "agriculture-agro-industrie", title: "Agriculture, agro-industrie et développement rural", links: [l.data, l.dev],
      issues: "Des producteurs dispersés, des récoltes difficiles à estimer, des stocks suivis sur cahier et des acheteurs qui demandent de la traçabilité. Les projets de développement rural doivent, eux aussi, rendre compte de leurs résultats.",
      items: ["Gestion des exploitations et des coopératives", "Suivi des productions et des stocks", "Traçabilité", "Approvisionnements", "Tableaux de bord", "Digitalisation des projets de développement rural"] },
    { id: "transport-logistique", title: "Transport et logistique", links: [l.waylog, l.dev],
      issues: "Des véhicules sur la route, des chauffeurs à coordonner, des livraisons à prouver et un poste carburant à maîtriser. Sans données fiables, les pertes et les litiges restent difficiles à expliquer.",
      items: ["Gestion des flottes", "Suivi des conducteurs et des livraisons", "Gestion des stocks", "Bons de livraison numériques", "Suivi du carburant et de la maintenance", "Reporting"] },
    { id: "telecommunications-services-numeriques", title: "Télécommunications et services numériques", links: [l.dev, l.it],
      issues: "Des services qui doivent rester disponibles, de nombreux processus internes et des utilisateurs qui attendent une réponse rapide. Les équipes ont besoin d'outils qui suivent le rythme de l'activité.",
      items: ["Développement d'applications", "Digitalisation des processus", "Data et reporting", "Gestion des services IT", "Support utilisateurs", "Maintenance informatique"] },
    { id: "commerce-distribution", title: "Commerce et distribution", links: [l.waypilot, l.waypulse, l.dev],
      issues: "Des ventes en ligne et en magasin, des catalogues volumineux, des clients à fidéliser et des marges à protéger. Un prix erroné ou une fiche produit manquante coûte des ventes sans que personne ne le voie.",
      items: ["Plateformes e-commerce", "Gestion et contrôle des catalogues", "Gestion de la relation client (CRM)", "Automatisation commerciale", "Analyse des ventes", "Distribution"] },
    { id: "sante-education", title: "Santé et éducation", links: [l.waycare, l.formation],
      issues: "Des établissements à organiser, des dossiers à tenir, des patients ou des apprenants à suivre dans la durée, souvent avec des moyens limités et une connexion internet irrégulière.",
      items: ["Plateformes de santé numériques", "Prise de rendez-vous et téléconsultation", "Gestion des établissements", "Formation en ligne", "Suivi des activités", "Tableaux de bord"] },
  ];
}

/** Ancres et titres des huit secteurs, pour les menus. */
export const sectorNav = (locale: Locale) => sectors(locale).map(({ id, title }) => ({ id, title }));

export const sectorsMeta = (locale: Locale) => meta("/secteurs-dactivite", PAGE_SEO[locale].sectors.title, PAGE_SEO[locale].sectors.desc, locale);

export function Sectors({ locale = "fr" }: { locale?: Locale }) {
  const T = TX[locale];
  const list = sectors(locale);
  return (
    <Page locale={locale} path="/secteurs-dactivite">
      <JsonLd data={breadcrumb([[T.title, "/secteurs-dactivite"]], locale)} />
      <PageHero eyebrow={T.title} title={T.h1} aside={<HeroPhoto locale={locale} photo={PHOTOS.equipe} />}>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-2">{T.intro}</p>
        <nav aria-label={T.jump} className="mt-8">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">{T.jump}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {list.map(s => (
              <li key={s.id}><a href={`#${s.id}`} className="inline-flex rounded-full border border-sky-2 bg-bg/70 px-3.5 py-1.5 text-sm text-fg-2 transition-colors hover:border-accent hover:text-accent">{s.title}</a></li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="space-y-20 sm:space-y-28">
          {list.map((s, i) => {
            const photo = SECTOR_PHOTOS[i];
            const flip = i % 2 === 1;
            return (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-t`} className="scroll-mt-24 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div data-reveal className={`relative ${flip ? "lg:order-2" : ""}`}>
                  <div aria-hidden className={`absolute -inset-3 rounded-[2.2rem] bg-[linear-gradient(135deg,#0782c6,#7cc4ec)] opacity-15 blur-xl ${flip ? "rotate-1" : "-rotate-1"}`} />
                  <div className="relative overflow-hidden rounded-[1.8rem] shadow-xl shadow-[#0670aa]/10 ring-1 ring-black/5">
                    <Photo photo={photo} locale={locale} sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw" className="aspect-[4/3] w-full" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-mono text-xs font-medium text-[#19323e] backdrop-blur">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                </div>
                <div data-reveal className={flip ? "lg:order-1" : ""}>
                  <h2 id={`${s.id}-t`} className="font-display text-3xl font-semibold leading-tight tracking-tight text-fg sm:text-[2.3rem]">{s.title}</h2>
                  <p className="mt-5 text-xs font-medium uppercase tracking-wider text-accent">{T.issues}</p>
                  <p className="mt-2 text-lg leading-relaxed text-fg-2">{s.issues}</p>
                  <p className="mt-7 text-xs font-medium uppercase tracking-wider text-accent">{T.how}</p>
                  <ul className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                    {s.items.map(it => <li key={it} className="flex gap-2 text-fg"><Check />{it}</li>)}
                  </ul>
                  <div className="mt-7 flex flex-wrap items-center gap-2">
                    <span className="mr-1 text-sm text-muted">{T.related}</span>
                    {s.links.map(([label, path]) => (
                      <Link key={path} href={href(locale, path)} className="group inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3.5 py-1.5 text-sm font-medium text-accent transition-colors hover:bg-sky-2">{label} <Arrow className="size-3" /></Link>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
        <p data-reveal className="mt-20 text-center text-fg-2">{T.note}</p>
      </div>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#19323e] px-6 py-16 text-center text-white sm:px-12" data-reveal>
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -right-24 -top-32 size-96 rounded-full bg-[#0782c6] opacity-40 blur-3xl" />
            <div className="absolute -bottom-40 -left-20 size-96 rounded-full bg-[#0782c6] opacity-25 blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="mx-auto max-w-3xl font-display text-3xl font-semibold tracking-tight sm:text-5xl">{T.endTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">{T.endText}</p>
            <Link href={href(locale, "/contact")} className="group mt-9 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-[#0670aa] shadow-lg shadow-black/10 transition-colors hover:bg-[#eef7fd]">{T.endCta} <Arrow /></Link>
          </div>
        </div>
      </section>
    </Page>
  );
}
