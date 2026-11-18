"use client";

// Photo responsive servie par le CDN d'Unsplash : largeur adaptée à l'écran, format AVIF ou WebP automatique.
import Image, { type ImageLoaderProps } from "next/image";
import { type Photo as PhotoT, photoSrc } from "@/lib/photos";

const unsplash = ({ src, width, quality }: ImageLoaderProps) => `${src}?w=${width}&q=${quality ?? 70}&auto=format&fit=max`;

export function Photo({ photo, sizes, priority = false, className = "" }: { photo: PhotoT; sizes: string; priority?: boolean; className?: string }) {
  return (
    <Image
      loader={unsplash}
      src={photoSrc(photo)}
      alt={photo.alt}
      width={photo.w}
      height={photo.h}
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
    />
  );
}

/** Photo d'en-tête : coins arrondis, ombre douce, fondu à l'arrivée. */
export function HeroPhoto({ photo, sizes = "(min-width: 1024px) 560px, 100vw", priority = true, className = "", children }: { photo: PhotoT; sizes?: string; priority?: boolean; className?: string; children?: React.ReactNode }) {
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
