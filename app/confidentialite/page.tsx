import { Page, PageHero } from "@/components/chrome";
import { COMPANY } from "@/lib/company";
import { RETENTION } from "@/lib/candidature";
import { meta } from "@/lib/seo";

export const metadata = meta("/confidentialite", "Confidentialité", "Quelles données le site wayzure.com traite, pourquoi, et comment exercer vos droits.");

export default function Confidentialite() {
  return (
    <Page>
      <PageHero eyebrow="Informations légales" title="Politique de confidentialité" />
      <section className="prose-legal mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p>Dernière mise à jour : 19 novembre 2026.</p>

        <h2>En bref</h2>
        <p>Ce site ne dépose aucun cookie. Il n&apos;utilise ni outil de mesure d&apos;audience, ni publicité, ni pixel, ni vidéo ou bouton de réseau social hébergés chez un tiers : toutes les ressources (textes, polices, images, vidéos) sont servies depuis wayzure.com. Aucun traceur soumis à consentement n&apos;étant utilisé, il n&apos;y a pas de bandeau cookies. Les seules données que nous recevons sont celles que vous nous envoyez, par un formulaire ou par e-mail.</p>

        <h2>Cookies et stockage local</h2>
        <p>Si vous choisissez l&apos;apparence claire ou sombre avec le bouton prévu à cet effet, ce choix est enregistré dans votre navigateur (stockage local, clé « theme ») pour être appliqué aux pages suivantes. Il ne contient aucune donnée personnelle, n&apos;est jamais transmis au site et s&apos;efface avec les données de navigation. Ce stockage, demandé par vous et nécessaire au service, n&apos;est pas soumis à consentement. Les liens vers nos réseaux sociaux (LinkedIn, Facebook, Instagram, YouTube, X) et vers WhatsApp sont de simples liens : rien n&apos;est chargé depuis ces services tant que vous ne cliquez pas.</p>

        <h2>Responsable du traitement</h2>
        <p>{COMPANY.legalName}, {COMPANY.address}. Contact : <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.</p>

        <h2>Données traitées</h2>
        <ul>
          <li><strong>Vos messages</strong> : quand vous nous écrivez, par le formulaire ou par e-mail, nous recevons votre nom, votre adresse e-mail, et selon ce que vous renseignez votre organisation, votre téléphone et le contenu du message. Base légale : notre intérêt légitime à répondre aux demandes, puis les mesures précontractuelles si un projet se concrétise.</li>
          <li><strong>Journaux techniques</strong> : l&apos;hébergeur enregistre, pour la sécurité et le bon fonctionnement du site, des informations comme l&apos;adresse IP et la page demandée. Ces journaux sont conservés quelques jours par l&apos;hébergeur.</li>
          <li id="candidatures"><strong>Candidatures</strong> : par le formulaire de la page <a href="/carrieres">Carrières</a> ou par e-mail, nous recevons vos nom, prénom, adresse e-mail, pays, domaine d&apos;expertise, et selon ce que vous transmettez un lien LinkedIn ou portfolio, un message et votre CV. Ces données servent uniquement au recrutement chez Wayzure. Base légale : les mesures précontractuelles prises à votre demande. Le CV est transmis chiffré (HTTPS) directement à notre messagerie et n&apos;est pas enregistré sur le site ; seuls les fichiers PDF authentiques de 4 Mo au plus sont acceptés.</li>
        </ul>

        <h2>Durée de conservation</h2>
        <p>Les candidatures sont conservées {RETENTION}, puis supprimées ; vous pouvez en demander la suppression plus tôt. Une candidature retenue rejoint le dossier du collaborateur. Les échanges avec un prospect sont conservés trois ans après le dernier contact, puis supprimés. Ceux liés à un contrat suivent les durées légales de conservation des pièces comptables et contractuelles.</p>

        <h2>Destinataires et transferts</h2>
        <p>Vos données ne sont ni vendues ni louées. Elles sont accessibles à l&apos;équipe Wayzure et à nos prestataires techniques : notre messagerie (IONOS, hébergée dans l&apos;Union européenne), le service d&apos;envoi des formulaires de contact et de candidature (Resend, société américaine) et l&apos;hébergeur du site (Vercel, société américaine). Les transferts vers les États Unis sont encadrés par les clauses contractuelles types de la Commission européenne ou par le cadre de protection des données UE États Unis.</p>

        <h2>Vos droits</h2>
        <p>Vous pouvez demander l&apos;accès, la rectification, l&apos;effacement ou la limitation de vos données, et vous opposer à leur traitement, en écrivant à <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>. Nous répondons dans un délai d&apos;un mois. Si la réponse ne vous satisfait pas, vous pouvez saisir la CNIL (<a href="https://www.cnil.fr" rel="noopener">cnil.fr</a>).</p>
      </section>
    </Page>
  );
}
