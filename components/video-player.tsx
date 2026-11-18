"use client";

// Lecteur vidéo léger : seule l'affiche est chargée avec la page. La vidéo n'est téléchargée
// qu'au clic, puis lue avec les contrôles natifs (sous-titres inutiles : film sans parole).
import Image from "next/image";
import { useState } from "react";
import type { Video } from "@/lib/media";

export function VideoPlayer({ video, sizes, className = "" }: { video: Video; sizes: string; className?: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className={`relative aspect-video overflow-hidden rounded-2xl bg-deep-2 shadow-2xl shadow-black/30 ring-1 ring-white/10 ${className}`}>
      {playing ? (
        <video className="absolute inset-0 size-full" controls autoPlay playsInline poster={video.poster} aria-label={video.title}>
          <source src={video.webm} type="video/webm" />
          <source src={video.mp4} type="video/mp4" />
        </video>
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 size-full cursor-pointer text-left" aria-label={`Lire la vidéo : ${video.title}`}>
          <Image src={video.poster} alt="" fill sizes={sizes} className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
          <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <span className="absolute bottom-4 left-4 right-4 flex items-center gap-3 text-sm font-medium text-white sm:bottom-6 sm:left-6 sm:right-6">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white/95 text-[#0670aa] shadow-xl transition-transform group-hover:scale-110 sm:size-14">
              <svg viewBox="0 0 24 24" className="ml-0.5 size-5 sm:size-6" fill="currentColor" aria-hidden><path d="M8 5.5v13a.8.8 0 0 0 1.2.7l10.4-6.5a.8.8 0 0 0 0-1.4L9.2 4.8A.8.8 0 0 0 8 5.5Z" /></svg>
            </span>
            <span className="flex-1">{video.title}</span>
            <span className="rounded-full bg-black/40 px-2.5 py-1 text-xs tabular-nums">{video.duration.replace("PT", "").replace("S", " s")}</span>
          </span>
        </button>
      )}
    </div>
  );
}
