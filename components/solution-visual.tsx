// Composition visuelle d'un logiciel : ses vraies captures, mises en scène sur un fond de marque.
import { ShotFrame } from "@/components/media";
import { SHOTS } from "@/lib/media";

export function SolutionVisual({ slug, sizes = "(min-width: 1024px) 560px, 100vw", compact = false }: { slug: string; sizes?: string; compact?: boolean }) {
  const shots = SHOTS[slug] ?? [];
  const phone = shots.find(s => s.frame === "phone");
  const flat = shots.filter(s => s.frame !== "phone");
  const pad = compact ? "p-5 sm:p-6" : "p-6 sm:p-10";
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-deep ${pad}`} aria-hidden={compact || undefined}>
      <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_80%_10%,rgba(7,130,198,.55),transparent_60%)]" />
      <div className="absolute inset-0 opacity-[.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:40px_40px]" />
      <div className="relative">
        {phone && flat[0] ? (
          <div className="relative pb-6 pr-[34%] sm:pr-[30%]">
            <ShotFrame shot={flat[0]} sizes={sizes} />
            <div className="absolute -bottom-2 right-0 w-[38%] sm:w-[32%]"><ShotFrame shot={phone} sizes="(min-width: 1024px) 200px, 40vw" className="!max-w-none !rounded-[1.6rem] !p-1.5 [&>div]:!rounded-[1.25rem]" /></div>
          </div>
        ) : phone ? (
          <div className="mx-auto w-[58%] max-w-[15rem]"><ShotFrame shot={phone} sizes="(min-width: 1024px) 240px, 60vw" /></div>
        ) : flat[0] ? (
          <ShotFrame shot={flat[0]} sizes={sizes} />
        ) : null}
      </div>
    </div>
  );
}
