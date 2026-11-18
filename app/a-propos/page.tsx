import Link from "next/link";
import { Arrow, Hero, Page } from "@/components/chrome";
import { COMPANY } from "@/lib/company";
import { meta } from "@/lib/seo";

export const metadata = meta("/a-propos", "À propos", "Wayzure est une société de services numériques créée en 2021 à Clamart, présente en France et en Guinée.");

const PRINCIPLES = [
  { t: "Dire ce qu'on livre, livrer ce qu'on dit", d: "Nous n'affichons que ce que nous savons faire aujourd'hui. Quand un besoin sort de notre champ, nous le disons et nous orientons vers quelqu'un de mieux placé." },
  { t: "Un interlocuteur qui connaît le dossier", d: "La personne qui cadre votre projet est celle qui le suit. Vous n'avez pas à tout réexpliquer à chaque étape." },
  { t: "Des outils simples à reprendre", d: "Code documenté, accès remis au client, équipes formées. Vous devez pouvoir continuer sans nous si vous le souhaitez." },
];

export default function APropos() {
  return (
    <Page>
      <Hero eyebrow="À propos" title="Une société de services numériques à taille humaine.">
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-2">Wayzure a été créée en 2021 à Clamart, dans les Hauts de Seine. Nous accompagnons des PME et des organisations sur leurs données, leurs outils et la formation de leurs équipes, et nous développons nos propres produits.</p>
      </Hero>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">France et Guinée</h2>
            <p className="mt-4 leading-relaxed text-fg-2">Le siège est à Clamart. Une seconde société, Wayzure SASU, est installée à Conakry et porte les projets en Guinée, dont WayLog.</p>
            <p className="mt-4 leading-relaxed text-fg-2">Wayzure est dirigée par {COMPANY.publisher.split(",")[0]}, son fondateur.</p>
          </div>
          <div className="space-y-6">
            {PRINCIPLES.map(p => (
              <div key={p.t} className="rounded-2xl border border-line p-6">
                <p className="font-semibold">{p.t}</p>
                <p className="mt-2 leading-relaxed text-fg-2">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
        <Link href="/contact" className="mt-14 inline-flex items-center gap-2 rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-85">Nous écrire <Arrow /></Link>
      </section>
    </Page>
  );
}
