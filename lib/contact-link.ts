// Lien « nous écrire » : vers le formulaire s'il est actif (clé Resend présente au build),
// sinon un e-mail direct avec l'objet déjà rempli. À n'utiliser que côté serveur.
import { COMPANY } from "@/lib/company";

export const FORM_ENABLED = Boolean(process.env.RESEND_API_KEY);

export function contactHref(subject: string, topic?: string) {
  if (FORM_ENABLED) return topic ? `/contact?sujet=${encodeURIComponent(topic)}` : "/contact";
  return `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}`;
}
