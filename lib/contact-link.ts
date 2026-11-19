// Lien « nous écrire » : vers le formulaire s'il est actif (clé Resend présente au build),
// sinon un e-mail direct avec l'objet déjà rempli. À n'utiliser que côté serveur.
import { COMPANY } from "@/lib/company";
import { href, type Locale } from "@/lib/i18n";

export const FORM_ENABLED = Boolean(process.env.RESEND_API_KEY);

/** topic : sujet du formulaire, toujours en français (valeurs de TOPICS, attendues par l'API). */
export function contactHref(subject: string, topic?: string, locale: Locale = "fr") {
  const page = href(locale, "/contact");
  if (FORM_ENABLED) return topic ? `${page}?sujet=${encodeURIComponent(topic)}` : page;
  return `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}`;
}
