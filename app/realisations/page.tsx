import { Arrow, Hero, Page } from "@/components/chrome";
import { ProductMark } from "@/components/marks";
import { PRODUCTS } from "@/lib/content";
import { meta } from "@/lib/seo";

export const metadata = meta("/realisations", "Réalisations", "WayPulse, WayPilot, WayLog et Waycare : les produits conçus, développés et exploités par Wayzure.");

export default function Realisations() {
  return (
    <Page>
      <Hero eyebrow="Réalisations" title="Nos produits, en service.">
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-2">Nous les avons conçus, développés et mis en ligne nous-mêmes, et nous les faisons tourner tous les jours. Les mêmes méthodes servent sur les projets de nos clients.</p>
      </Hero>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-5 md:grid-cols-2">
          {PRODUCTS.map(p => (
            <article key={p.slug} className="flex flex-col rounded-2xl border border-line p-7">
              <div className="flex items-center gap-4">
                <ProductMark slug={p.slug} className="size-12" />
                <div>
                  <h2 className="text-xl font-semibold">{p.name}</h2>
                  <p className="text-sm text-muted">{p.tagline}</p>
                </div>
              </div>
              <p className="mt-5 flex-1 leading-relaxed text-fg-2">{p.text}</p>
              <p className="mt-5 text-xs uppercase tracking-wide text-muted">Pôle : {p.pole}</p>
              <a href={p.url} rel="noopener" className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover">{p.url.replace(/^https:\/\/(www\.)?/, "")} <Arrow /></a>
            </article>
          ))}
        </div>
      </section>
    </Page>
  );
}
