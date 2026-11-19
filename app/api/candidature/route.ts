// Réception des candidatures spontanées et transmission par e-mail (Resend), CV en pièce jointe.
// Sécurité : le CV n'est jamais écrit sur disque ni stocké par le site ; il transite chiffré (HTTPS) jusqu'à la messagerie.
// Contrôles : PDF uniquement (signature %PDF- vérifiée, pas seulement l'extension), 4 Mo au plus, nom de fichier réécrit,
// champs bornés et échappés, champ piège anti-robots, 3 envois par tranche de 10 minutes et par adresse IP.
// Variables d'environnement (Vercel) : RESEND_API_KEY (obligatoire), CANDIDATURE_TO (sinon CONTACT_TO, sinon contact@), CONTACT_FROM.
import { NextResponse } from "next/server";
import { CV_MAX_BYTES, DOMAINS } from "@/lib/candidature";
import { COMPANY } from "@/lib/company";

export const runtime = "nodejs";

const LIMITS = { lastName: 80, firstName: 80, email: 160, country: 80, domain: 80, link: 300, message: 2000 } as const;
type Field = keyof typeof LIMITS;

const hits = new Map<string, number[]>();
function tooMany(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(t => now - t < 600_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 3;
}

const MSG = {
  fr: {
    tooBig: "Le fichier dépasse 4 Mo.", invalid: "Requête invalide.", missing: "Merci de renseigner vos nom, prénom, e-mail et pays.",
    email: "L'adresse e-mail ne semble pas valide.", domain: "Merci de choisir un domaine d'expertise.",
    link: "Le lien LinkedIn ou portfolio doit commencer par https://", consent: "Merci de cocher la case d'information sur le traitement de votre candidature.",
    noCv: "Merci de joindre votre CV au format PDF.", notPdf: "Le CV doit être un fichier PDF.", tooMany: "Trop d'envois. Réessayez dans quelques minutes.",
    off: "Le formulaire n'est pas encore relié à notre messagerie.", failed: "L'envoi n'a pas abouti.",
  },
  en: {
    tooBig: "The file is larger than 4 MB.", invalid: "Invalid request.", missing: "Please enter your last name, first name, email and country.",
    email: "The email address does not look valid.", domain: "Please choose a field of expertise.",
    link: "The LinkedIn or portfolio link must start with https://", consent: "Please tick the box confirming you have read how your application is handled.",
    noCv: "Please attach your CV as a PDF.", notPdf: "The CV must be a PDF file.", tooMany: "Too many submissions. Please try again in a few minutes.",
    off: "The form is not yet connected to our mailbox.", failed: "Sending failed.",
  },
};

const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const slug = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "candidat";

export async function POST(req: Request) {
  const isForm = !(req.headers.get("accept") || "").includes("application/json");
  // Langue de la page d'origine (champ caché « lang ») : messages d'erreur et page de retour.
  let lang: "fr" | "en" = "fr";
  const reply = (status: number, error?: string) =>
    isForm
      ? NextResponse.redirect(new URL(`${lang === "en" ? "/en" : ""}/carrieres?envoi=${error ? "erreur" : "ok"}#candidature`, req.url), 303)
      : NextResponse.json(error ? { error } : { ok: true }, { status });

  const len = Number(req.headers.get("content-length") || 0);
  if (len > CV_MAX_BYTES + 200_000) return reply(413, `${MSG.fr.tooBig} / ${MSG.en.tooBig}`);

  let fd: FormData;
  try { fd = await req.formData(); } catch { return reply(400, MSG.fr.invalid); }
  if (fd.get("lang") === "en") lang = "en";
  const M = MSG[lang];

  if (String(fd.get("website") || "")) return reply(200); // robot : on ne dit rien

  const data = {} as Record<Field, string>;
  for (const k of Object.keys(LIMITS) as Field[]) data[k] = String(fd.get(k) ?? "").trim().slice(0, LIMITS[k]);

  if (!data.lastName || !data.firstName || !data.email || !data.country) return reply(400, M.missing);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) return reply(400, M.email);
  if (!DOMAINS.includes(data.domain as (typeof DOMAINS)[number])) return reply(400, M.domain);
  if (data.link && !/^https:\/\/[^\s]+$/i.test(data.link)) return reply(400, M.link);
  if (fd.get("consent") !== "oui") return reply(400, M.consent);

  const cv = fd.get("cv");
  if (!(cv instanceof File) || cv.size === 0) return reply(400, M.noCv);
  if (cv.size > CV_MAX_BYTES) return reply(413, M.tooBig);
  const bytes = Buffer.from(await cv.arrayBuffer());
  if (bytes.subarray(0, 5).toString("latin1") !== "%PDF-") return reply(415, M.notPdf);

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "inconnue";
  if (tooMany(ip)) return reply(429, M.tooMany);

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("[candidature] RESEND_API_KEY absente : candidature non transmise");
    return reply(503, M.off);
  }

  const to = process.env.CANDIDATURE_TO || process.env.CONTACT_TO || COMPANY.email;
  const from = process.env.CONTACT_FROM || "Site Wayzure <site@wayzure.com>";
  const name = `${data.firstName} ${data.lastName}`;
  const rows: [string, string][] = [["Nom", data.lastName], ["Prénom", data.firstName], ["E-mail", data.email], ["Pays", data.country], ["Domaine", data.domain], ["LinkedIn / portfolio", data.link], ["Langue du site", lang === "en" ? "anglais" : "français"]];
  const text = rows.filter(([, v]) => v).map(([k, v]) => `${k} : ${v}`).join("\n") + (data.message ? `\n\n${data.message}\n` : "\n");
  const html =
    `<table cellpadding="4" style="font-family:sans-serif;font-size:14px">${rows.filter(([, v]) => v).map(([k, v]) => `<tr><td style="color:#6f7c84">${k}</td><td>${esc(v)}</td></tr>`).join("")}</table>` +
    (data.message ? `<p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${esc(data.message)}</p>` : "");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from, to: [to], reply_to: data.email,
        subject: `[Candidature${lang === "en" ? " EN" : ""}] ${name} · ${data.domain} · ${data.country}`,
        text, html,
        attachments: [{ filename: `CV-${slug(data.lastName)}-${slug(data.firstName)}.pdf`, content: bytes.toString("base64") }],
      }),
    });
    if (!res.ok) {
      console.error("[candidature] Resend", res.status, await res.text());
      return reply(502, M.failed);
    }
  } catch (e) {
    console.error("[candidature] Resend injoignable", e);
    return reply(502, M.failed);
  }
  return reply(200);
}
