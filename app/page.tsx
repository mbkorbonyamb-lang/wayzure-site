import Link from "next/link";
import { Arrow, Page } from "@/components/chrome";
import { ProductMark } from "@/components/marks";
import { POLES, PRODUCTS } from "@/lib/content";

const STEPS = [
  { t: "Un premier échange", d: "30 minutes, par visio ou par téléphone. Vous expliquez le problème, nous posons des questions. Pas de présentation commerciale." },
  { t: "Une proposition écrite", d: "Ce qui sera fait, ce qui ne le sera pas, le délai et le prix. Si le projet ne nous paraît pas utile, nous vous le disons." },
  { t: "Des livraisons courtes", d: "Le travail avance par étapes de quelques semaines. Vous voyez le résultat et vous validez avant la suite." },
  { t: "Un suivi après la livraison", d: "Les outils que nous livrons sont maintenus. Vos équipes sont formées pour s'en servir sans nous." },
];

export default function Home() {
  return (
    <Page>
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
          <p className="text-sm font-medium text-accent">Data · Conseil · Développement numérique · Formation</p>
          <h1 className="mt-4 max-w-3xl font-display text-[2.4rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl">Des outils numériques qui servent votre métier.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-2">Wayzure aide les PME et les organisations à mieux utiliser leurs données, à choisir les bons outils, à construire ceux qui manquent et à former les équipes qui s&apos;en servent.</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-85">Parler de votre projet <Arrow /></Link>
            <Link href="/realisations" className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium text-fg transition-colors hover:bg-surface">Voir nos réalisations</Link>
          </div>
        </div>
      </section>

      <section id="expertises" className="scroll-mt-20 border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Quatre expertises</h2>
          <p className="mt-3 max-w-2xl text-fg-2">Elles se complètent souvent sur un même projet : on cadre, on construit, on branche les données, on forme.</p>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
            {POLES.map((p, i) => (
              <article key={p.id} id={p.id} className="scroll-mt-24 bg-bg p-7 sm:p-9">
                <p className="font-mono text-xs text-muted">0{i + 1}</p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{p.name}</h3>
                <p className="mt-1 font-medium text-accent">{p.lead}</p>
                <p className="mt-4 leading-relaxed text-fg-2">{p.text}</p>
                <ul className="mt-5 space-y-2 text-[0.95rem]">
                  {p.items.map(it => (
                    <li key={it} className="flex gap-3"><span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" /><span>{it}</span></li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Ce que nous avons construit</h2>
              <p className="mt-3 max-w-2xl text-fg-2">Nos propres produits, conçus, développés et exploités par Wayzure. Ils montrent ce que nous savons faire mieux qu&apos;une liste de compétences.</p>
            </div>
            <Link href="/realisations" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover">Toutes les réalisations <Arrow /></Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map(p => (
              <a key={p.slug} href={p.url} rel="noopener" className="group flex flex-col rounded-2xl border border-line bg-bg p-6 transition-shadow hover:shadow-md">
                <ProductMark slug={p.slug} />
                <p className="mt-4 font-semibold">{p.name}</p>
                <p className="text-sm text-muted">{p.tagline}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-2">{p.text}</p>
                <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">Voir le site <Arrow /></p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Comment nous travaillons</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.t}>
                <p className="grid size-8 place-items-center rounded-full bg-accent-soft text-sm font-semibold text-accent">{i + 1}</p>
                <p className="mt-4 font-semibold">{s.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-fg-2">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="rounded-3xl bg-night px-6 py-14 text-center sm:px-12">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">Un projet, une question ?</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/70">Décrivez la situation en quelques lignes. Nous vous répondons avec une première analyse, sans engagement.</p>
            <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-[#0d1b2a] transition-opacity hover:opacity-90">Nous écrire <Arrow /></Link>
          </div>
        </div>
      </section>
    </Page>
  );
}
