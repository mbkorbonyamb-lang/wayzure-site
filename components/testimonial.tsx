// Avis client, tel que publié à la source (lien en bas de carte).
import Link from "next/link";
import { JAARAY } from "@/lib/testimonials";

const Star = () => <svg viewBox="0 0 20 20" className="size-5" fill="currentColor" aria-hidden><path d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8L10 1.6Z" /></svg>;

export function Testimonial({ linkProduct = true }: { linkProduct?: boolean }) {
  const t = JAARAY;
  return (
    <figure data-reveal className="relative overflow-hidden rounded-[2rem] border border-sky-2 bg-sky p-7 sm:p-10 lg:p-12">
      <svg aria-hidden viewBox="0 0 64 48" className="absolute right-6 top-6 h-16 w-20 text-accent opacity-15 sm:right-10 sm:top-8 sm:h-24 sm:w-32" fill="currentColor"><path d="M0 48V28C0 12 8 2 24 0l3 6C17 9 13 15 13 22h11v26H0Zm37 0V28c0-16 8-26 24-28l3 6c-10 3-14 9-14 16h11v26H37Z" /></svg>
      <div className="flex items-center gap-3">
        <span className="flex text-[#f5a524]" role="img" aria-label={`Note : ${t.rating} sur 5`}>{Array.from({ length: t.rating }, (_, i) => <Star key={i} />)}</span>
        <span className="text-sm font-semibold">{t.rating}/5</span>
      </div>
      <blockquote className="relative mt-6 max-w-4xl font-display text-xl leading-relaxed tracking-tight text-fg sm:text-2xl sm:leading-relaxed">« {t.quote} »</blockquote>
      <figcaption className="mt-8 flex flex-wrap items-center gap-4">
        <span aria-hidden className="grid size-12 place-items-center rounded-full bg-btn font-semibold text-white">FD</span>
        <span className="flex-1">
          <span className="block font-semibold">{t.author}</span>
          <span className="block text-sm text-fg-2">{t.role}</span>
        </span>
        <span className="text-sm text-muted">
          Avis publié sur <a href={t.source} rel="noopener" className="text-accent underline underline-offset-2">waypilot.wayzure.com</a>
          {linkProduct && <> · <Link href="/solutions/waypilot" className="text-accent underline underline-offset-2">voir WayPilot</Link></>}
        </span>
      </figcaption>
    </figure>
  );
}
