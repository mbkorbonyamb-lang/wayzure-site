import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/company";

const PAGES: [string, number][] = [["", 1], ["/realisations", 0.8], ["/a-propos", 0.7], ["/contact", 0.8], ["/mentions-legales", 0.2], ["/confidentialite", 0.2]];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(([path, priority]) => ({ url: `${SITE_URL}${path}`, priority, changeFrequency: "monthly" }));
}
