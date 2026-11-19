// Photo d'illustration. L'image d'origine (Unsplash) est récupérée et redimensionnée par l'optimiseur d'images
// de Next.js sur Vercel, puis servie depuis wayzure.com : le navigateur du visiteur ne contacte jamais Unsplash
// (aucune requête ni cookie tiers).
import Image from "next/image";
import type { ReactNode } from "react";
import { type Photo as PhotoT, photoSrc } from "@/lib/photos";

export function Photo({ photo, sizes, priority = false, className = "" }: { photo: PhotoT; sizes: string; priority?: boolean; className?: string }) {
  return (
    <Image
      src={photoSrc(photo)}
      alt={photo.alt}
      width={photo.w}
      height={photo.h}
      sizes={sizes}
      priority={priority}
      quality={72}
      className={`object-cover ${className}`}
    />
  );
}

/** Photo d'en-tête : coins arrondis, ombre douce, fondu à l'arrivée. */
export function HeroPhoto({ photo, sizes = "(min-width: 1024px) 560px, 100vw", priority = true, className = "", children }: { photo: PhotoT; sizes?: string; priority?: boolean; className?: string; children?: ReactNode }) {
  return (
    <div className={`relative ${className}`}>
      <div aria-hidden className="absolute -inset-3 rounded-[2.4rem] bg-[linear-gradient(135deg,#0782c6,#7cc4ec)] opacity-20 blur-xl" />
      <div className="photo-in relative overflow-hidden rounded-[2rem] shadow-2xl shadow-[#0670aa]/15 ring-1 ring-black/5">
        <Photo photo={photo} sizes={sizes} priority={priority} className="aspect-[4/3] w-full" />
      </div>
      {children}
    </div>
  );
}
