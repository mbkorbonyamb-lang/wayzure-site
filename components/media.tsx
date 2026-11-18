// Cadres d'affichage des captures (navigateur, téléphone, document) et lecteur vidéo léger.
import Image from "next/image";
import type { Shot } from "@/lib/media";

export function ShotFrame({ shot, sizes, priority = false, className = "" }: { shot: Shot; sizes: string; priority?: boolean; className?: string }) {
  const img = <Image src={shot.src} width={shot.w} height={shot.h} alt={shot.alt} sizes={sizes} priority={priority} className="block h-auto w-full" />;
  if (shot.frame === "phone") {
    return (
      <div className={`mx-auto w-full max-w-[17rem] rounded-[2.4rem] bg-[#0b1820] p-2.5 shadow-2xl shadow-black/30 ring-1 ring-white/10 ${className}`}>
        <div className="overflow-hidden rounded-[1.9rem]">{img}</div>
      </div>
    );
  }
  if (shot.frame === "document") {
    return <div className={`overflow-hidden rounded-xl bg-white shadow-2xl shadow-black/20 ring-1 ring-black/5 ${className}`}>{img}</div>;
  }
  return (
    <div className={`overflow-hidden rounded-xl bg-white shadow-2xl shadow-black/20 ring-1 ring-black/10 ${className}`}>
      <div className="flex items-center gap-2 border-b border-black/[0.07] bg-[#f4f6f8] px-3 py-2">
        <span className="flex gap-1.5" aria-hidden><i className="size-2.5 rounded-full bg-[#ff5f57]" /><i className="size-2.5 rounded-full bg-[#febc2e]" /><i className="size-2.5 rounded-full bg-[#28c840]" /></span>
        {shot.url && <span className="mx-auto truncate rounded-md bg-white px-3 py-0.5 text-[0.7rem] text-[#5f6c74] ring-1 ring-black/5">{shot.url}</span>}
      </div>
      {img}
    </div>
  );
}

export function ShotFigure({ shot, sizes, className = "" }: { shot: Shot; sizes: string; className?: string }) {
  return (
    <figure data-reveal className={className}>
      <ShotFrame shot={shot} sizes={sizes} />
      <figcaption className="mt-4 text-sm leading-relaxed text-muted">{shot.caption}</figcaption>
    </figure>
  );
}
