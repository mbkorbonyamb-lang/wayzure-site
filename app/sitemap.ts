import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/company";
import { ALL_EXPERTISES, SOLUTIONS } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [string, number][] = [
    ["", 1],
    ["/expertises", 0.9],
    ...ALL_EXPERTISES.map(e => [`/expertises/${e.slug}`, 0.8] as [string, number]),
    ["/solutions", 0.9],
    ...SOLUTIONS.map(s => [`/solutions/${s.slug}`, 0.7] as [string, number]),
    ["/a-propos", 0.6],
    ["/contact", 0.8],
    ["/mentions-legales", 0.2],
    ["/confidentialite", 0.2],
  ];
  return pages.map(([path, priority]) => ({ url: `${SITE_URL}${path}`, priority, changeFrequency: "monthly", lastModified: new Date("2026-11-18") }));
}
