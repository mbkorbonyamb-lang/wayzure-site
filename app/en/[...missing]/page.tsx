// Adresse inconnue sous /en : page 404 en anglais (app/en/not-found.tsx).
import { notFound } from "next/navigation";

export default function Missing() {
  notFound();
}
