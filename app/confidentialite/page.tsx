import { Hero, Page } from "@/components/chrome";
import { COMPANY } from "@/lib/company";
import { meta } from "@/lib/seo";

export const metadata = meta("/confidentialite", "Confidentialité", "Quelles données le site wayzure.com traite, pourquoi, et comment exercer vos droits.");

export default function Confidentialite() {
  return (
    <Page>
      <Hero title="Politique de confidentialité" />
      <section className="prose-legal mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p>Dernière mise à jour : 18 novembre 2026.</p>

        <h2>En bref</h2>
        <p>Ce site ne dépose aucun cookie de mesure d&apos;audience ou de publicité et ne contient aucun bouton de réseau social qui vous suit. Il n&apos;y a donc pas de bandeau cookies. Les seules données que nous recevons sont celles que vous nous envoyez par e-mail.</p>

        <h2>Responsable du traitement</h2>
        <p>{COMPANY.legalName}, {COMPANY.address}. Contact : <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.</p>

        <h2>Données traitées</h2>
        <ul>
          <li><strong>Vos messages</strong> : quand vous nous écrivez, nous recevons votre adresse e-mail, votre nom et le contenu du message. Base légale : notre intérêt légitime à répondre aux demandes, puis les mesures précontractuelles si un projet se concrétise.</li>
          <li><strong>Journaux techniques</strong> : l&apos;hébergeur enregistre, pour la sécurité et le bon fonctionnement du site, des informations comme l&apos;adresse IP et la page demandée. Ces journaux sont conservés quelques jours par l&apos;hébergeur.</li>
        </ul>

        <h2>Durée de conservation</h2>
        <p>Les échanges avec un prospect sont conservés trois ans après le dernier contact, puis supprimés. Ceux liés à un contrat suivent les durées légales de conservation des pièces comptables et contractuelles.</p>

        <h2>Destinataires et transferts</h2>
        <p>Vos données ne sont ni vendues ni louées. Elles sont accessibles à l&apos;équipe Wayzure et à nos prestataires techniques : notre messagerie (IONOS, hébergée dans l&apos;Union européenne) et l&apos;hébergeur du site (Vercel, société américaine). Les transferts vers les États Unis sont encadrés par les clauses contractuelles types de la Commission européenne ou par le cadre de protection des données UE États Unis.</p>

        <h2>Vos droits</h2>
        <p>Vous pouvez demander l&apos;accès, la rectification, l&apos;effacement ou la limitation de vos données, et vous opposer à leur traitement, en écrivant à <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>. Nous répondons dans un délai d&apos;un mois. Si la réponse ne vous satisfait pas, vous pouvez saisir la CNIL (<a href="https://www.cnil.fr" rel="noopener">cnil.fr</a>).</p>
      </section>
    </Page>
  );
}
