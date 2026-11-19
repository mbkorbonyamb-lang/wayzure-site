// Réception du formulaire de contact et envoi par e-mail via l'API Resend.
// Variables d'environnement (Vercel) : RESEND_API_KEY (obligatoire), CONTACT_TO, CONTACT_FROM.
import { NextResponse } from "next/server";
import { COMPANY } from "@/lib/company";
import { TOPICS } from "@/lib/contact";

export const runtime = "nodejs";

const LIMITS = { name: 120, company: 160, email: 160, phone: 40, topic: 80, message: 5000 } as const;
type Field = keyof typeof LIMITS;

// Limite simple par adresse IP, par instance : 5 messages par tranche de 10 minutes.
const hits = new Map<string, number[]>();
function tooMany(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(t => now - t < 600_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const MSG = {
  fr: {
    invalid: "Requête invalide.", missing: "Merci de renseigner votre nom, votre e-mail et un message d'au moins 20 caractères.",
    email: "L'adresse e-mail ne semble pas valide.", tooMany: "Trop de messages envoyés. Réessayez dans quelques minutes.",
    off: "Le formulaire n'est pas encore relié à notre messagerie.", failed: "L'envoi n'a pas abouti.",
  },
  en: {
    invalid: "Invalid request.", missing: "Please enter your name, your email and a message of at least 20 characters.",
    email: "The email address does not look valid.", tooMany: "Too many messages sent. Please try again in a few minutes.",
    off: "The form is not yet connected to our mailbox.", failed: "Sending failed.",
  },
};

const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function readBody(req: Request): Promise<Record<string, string>> {
  const type = req.headers.get("content-type") || "";
  if (type.includes("application/json")) return (await req.json()) as Record<string, string>;
  const fd = await req.formData();
  return Object.fromEntries([...fd.entries()].map(([k, v]) => [k, String(v)]));
}

export async function POST(req: Request) {
  const isForm = !(req.headers.get("content-type") || "").includes("application/json");
  // Langue de la page d'origine (champ caché « lang ») : messages d'erreur et page de retour.
  let lang: "fr" | "en" = "fr";
  const reply = (status: number, error?: string) =>
    isForm
      ? NextResponse.redirect(new URL(`${lang === "en" ? "/en" : ""}/contact?envoi=${error ? "erreur" : "ok"}`, req.url), 303)
      : NextResponse.json(error ? { error } : { ok: true }, { status });

  let raw: Record<string, string>;
  try { raw = await readBody(req); } catch { return reply(400, MSG.fr.invalid); }
  if (raw.lang === "en") lang = "en";
  const M = MSG[lang];

  // Robot : le champ piège est rempli. On répond comme si tout allait bien.
  if (raw.website) return reply(200);

  const data = {} as Record<Field, string>;
  for (const k of Object.keys(LIMITS) as Field[]) data[k] = String(raw[k] ?? "").trim().slice(0, LIMITS[k]);

  if (!data.name || !data.email || data.message.length < 20) return reply(400, M.missing);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) return reply(400, M.email);
  if (!TOPICS.includes(data.topic as (typeof TOPICS)[number])) data.topic = "Autre demande";

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "inconnue";
  if (tooMany(ip)) return reply(429, M.tooMany);

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("[contact] RESEND_API_KEY absente : message non envoyé");
    return reply(503, M.off);
  }

  const to = process.env.CONTACT_TO || COMPANY.email;
  const from = process.env.CONTACT_FROM || "Site Wayzure <site@wayzure.com>";
  const rows: [string, string][] = [["Nom", data.name], ["Organisation", data.company], ["E-mail", data.email], ["Téléphone", data.phone], ["Sujet", data.topic], ["Langue du site", lang === "en" ? "anglais" : "français"]];
  const text = rows.filter(([, v]) => v).map(([k, v]) => `${k} : ${v}`).join("\n") + `\n\n${data.message}\n`;
  const html =
    `<table cellpadding="4" style="font-family:sans-serif;font-size:14px">${rows.filter(([, v]) => v).map(([k, v]) => `<tr><td style="color:#6f7c84">${k}</td><td>${esc(v)}</td></tr>`).join("")}</table>` +
    `<p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${esc(data.message)}</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: data.email, subject: `[wayzure.com${lang === "en" ? " EN" : ""}] ${data.topic} · ${data.name}${data.company ? ` (${data.company})` : ""}`, text, html }),
    });
    if (!res.ok) {
      console.error("[contact] Resend", res.status, await res.text());
      return reply(502, M.failed);
    }
  } catch (e) {
    console.error("[contact] Resend injoignable", e);
    return reply(502, M.failed);
  }
  return reply(200);
}
