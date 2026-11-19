import { Page, PageHero } from "@/components/chrome";
import { COMPANY, GUINEA, HOST } from "@/lib/company";
import { meta } from "@/lib/seo";

export const metadata = meta("/mentions-legales", "Mentions légales", "Éditeur, hébergeur et informations légales du site wayzure.com.", "fr", false);

export default function MentionsLegales() {
  return (
    <Page>
      <PageHero eyebrow="Informations légales" title="Mentions légales" />
      <section className="prose-legal mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h2>Éditeur du site</h2>
        <p>{COMPANY.legalName}, {COMPANY.form.toLowerCase()}{COMPANY.capital ? ` au capital de ${COMPANY.capital}` : ""}.</p>
        <p>Siège social : {COMPANY.address}.</p>
        <p>{COMPANY.rcs}. TVA intracommunautaire : {COMPANY.vat}.</p>
        <p>Contact : <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>{COMPANY.phone ? `, ${COMPANY.phone}` : ""}.</p>
        <p>Directeur de la publication : {COMPANY.publisher}.</p>

        <h2>Société en Guinée</h2>
        <p>{GUINEA.legalName}, {GUINEA.address}, {GUINEA.rccm}. Bureau : {GUINEA.office}.{COMPANY.phoneGuinea ? ` Téléphone : ${COMPANY.phoneGuinea}.` : ""} Société distincte de {COMPANY.legalName}.</p>

        <h2>Hébergement</h2>
        <p>{HOST.name}, {HOST.address}. <a href={HOST.url} rel="noopener">{HOST.url.replace("https://", "")}</a></p>
        <p>Le nom de domaine wayzure.com est enregistré auprès d&apos;Automattic Inc. (WordPress.com).</p>

        <h2>Propriété intellectuelle</h2>
        <p>Les textes, illustrations et logos de ce site appartiennent à {COMPANY.legalName}, sauf mention contraire. Les noms WayPulse, WayPilot, WayLog et Waycare désignent des produits de Wayzure. Toute reproduction sans accord écrit préalable est interdite.</p>

        <h2>Photographies</h2>
        <p>Les photographies de personnes sont des images d&apos;illustration issues de la banque d&apos;images Unsplash (licence Unsplash), notamment de la série WOCinTech Chat de Christina Morillo. Les personnes représentées ne sont ni des collaborateurs ni des clients de Wayzure. Les captures d&apos;écran, elles, montrent nos logiciels réels avec des données d&apos;exemple.</p>

        <h2>Données personnelles</h2>
        <p>Voir la <a href="/confidentialite">politique de confidentialité</a>.</p>
      </section>
    </Page>
  );
}
