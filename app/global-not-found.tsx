// Adresse inconnue hors de /en (aucune page ne correspond) : page 404 complète, en français.
import { NotFound } from "@/views/not-found";
import { Shell, baseMetadata } from "./shell";

export const metadata = { ...baseMetadata("fr"), title: "Page introuvable · Wayzure", robots: { index: false } };

export default function GlobalNotFound() {
  return <Shell locale="fr"><NotFound locale="fr" /></Shell>;
}
