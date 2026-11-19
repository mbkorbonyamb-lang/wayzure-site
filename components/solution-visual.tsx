// Composition visuelle d'un logiciel : ses vraies captures, mises en scène sur un fond bleu clair.
import { ShotFrame } from "@/components/media";
import type { Locale } from "@/lib/i18n";
import { SHOTS } from "@/lib/media";

export function SolutionVisual({ slug, sizes = "(min-width: 1024px) 560px, 100vw", compact = false, locale = "fr" }: { slug: string; sizes?: string; compact?: boolean; locale?: Locale }) {
  const shots = SHOTS[slug] ?? [];
  const phone = shots.find(s => s.frame === "phone");
  const flat = shots.filter(s => s.frame !== "phone");
  const pad = compact ? "p-5 sm:p-6" : "p-6 sm:p-10";
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-[linear-gradient(140deg,var(--sky)_0%,var(--sky-2)_100%)] ${pad}`} aria-hidden={compact || undefined}>
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_85%_0%,rgba(7,130,198,.22),transparent_65%)]" />
      <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(var(--sky-2)_1px,transparent_1px),linear-gradient(90deg,var(--sky-2)_1px,transparent_1px)] [background-size:40px_40px]" />
      <div className="relative">
        {phone && flat[0] ? (
          <div className="relative pb-6 pr-[34%] sm:pr-[30%]">
            <ShotFrame locale={locale} shot={flat[0]} sizes={sizes} />
            <div className="absolute -bottom-2 right-0 w-[38%] sm:w-[32%]"><ShotFrame locale={locale} shot={phone} sizes="(min-width: 1024px) 200px, 40vw" className="!max-w-none !rounded-[1.6rem] !p-1.5 [&>div]:!rounded-[1.25rem]" /></div>
          </div>
        ) : phone ? (
          <div className="mx-auto w-[58%] max-w-[15rem]"><ShotFrame locale={locale} shot={phone} sizes="(min-width: 1024px) 240px, 60vw" /></div>
        ) : flat[0] ? (
          <ShotFrame locale={locale} shot={flat[0]} sizes={sizes} />
        ) : null}
      </div>
    </div>
  );
}
