"use client";

import { useEffect, useState } from "react";
import { TOPICS, TOPICS_EN } from "@/lib/contact";
import type { Locale } from "@/lib/i18n";

type State = { kind: "idle" | "sending" | "sent" | "error"; message?: string };

const field = "mt-1.5 block w-full rounded-xl border border-line bg-bg px-4 py-3 text-[0.95rem] text-fg placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25";

const TX = {
  fr: {
    sent: "Message envoyé.",
    sentText: "Merci. Nous l'avons bien reçu et nous revenons vers vous à l'adresse indiquée. Une copie de votre message ne vous est pas envoyée : pensez à le noter si besoin.",
    again: "Écrire un autre message",
    name: "Nom et prénom", company: "Organisation", email: "E-mail professionnel", phone: "Téléphone", topic: "Sujet",
    need: "Votre besoin", needPh: "La situation actuelle, ce que vous voulez changer, l'échéance éventuelle.",
    privacy: "Vos informations servent uniquement à répondre à votre demande. Voir la", privacyLink: "politique de confidentialité",
    sending: "Envoi en cours…", send: "Envoyer le message",
    failed: "L'envoi n'a pas abouti.", direct: "Vous pouvez aussi écrire directement à",
  },
  en: {
    sent: "Message sent.",
    sentText: "Thank you. We have received it and will reply to the address you gave. No copy of your message is sent to you, so keep a note of it if needed.",
    again: "Write another message",
    name: "Full name", company: "Organisation", email: "Work email", phone: "Phone", topic: "Subject",
    need: "What you need", needPh: "The current situation, what you want to change, any deadline.",
    privacy: "Your information is only used to answer your request. See our", privacyLink: "privacy policy (in French)",
    sending: "Sending…", send: "Send message",
    failed: "Sending failed.", direct: "You can also write directly to",
  },
};

export function ContactForm({ email, locale = "fr" }: { email: string; locale?: Locale }) {
  const T = TX[locale];
  const [state, setState] = useState<State>({ kind: "idle" });
  const [topic, setTopic] = useState<string>(TOPICS[0]);

  // Retour de l'envoi sans JavaScript (formulaire classique) : /contact?envoi=ok ou ?envoi=erreur.
  useEffect(() => {
    const envoi = new URLSearchParams(window.location.search).get("envoi");
    if (envoi === "ok") setState({ kind: "sent" });
    if (envoi === "erreur") setState({ kind: "error" });
    // Sujet présélectionné depuis une page (ex. /contact?sujet=Formation).
    const sujet = new URLSearchParams(window.location.search).get("sujet");
    if (sujet && (TOPICS as readonly string[]).includes(sujet)) setTopic(sujet);
  }, []);

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.ok) { form.reset(); setState({ kind: "sent" }); return; }
      setState({ kind: "error", message: data.error });
    } catch {
      setState({ kind: "error" });
    }
  }

  if (state.kind === "sent") {
    return (
      <div role="status" className="rounded-3xl border border-line bg-surface p-8">
        <p className="font-display text-2xl font-semibold">{T.sent}</p>
        <p className="mt-3 leading-relaxed text-fg-2">{T.sentText}</p>
        <button type="button" onClick={() => setState({ kind: "idle" })} className="mt-6 text-sm font-medium text-accent underline underline-offset-4">{T.again}</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} action="/api/contact" method="post" className="grid gap-5 sm:grid-cols-2" noValidate={false}>
      <input type="hidden" name="lang" value={locale} />
      <label className="block text-sm font-medium">{T.name}<span aria-hidden className="text-accent"> *</span>
        <input name="name" required maxLength={120} autoComplete="name" className={field} />
      </label>
      <label className="block text-sm font-medium">{T.company}
        <input name="company" maxLength={160} autoComplete="organization" className={field} />
      </label>
      <label className="block text-sm font-medium">{T.email}<span aria-hidden className="text-accent"> *</span>
        <input name="email" type="email" required maxLength={160} autoComplete="email" className={field} />
      </label>
      <label className="block text-sm font-medium">{T.phone}
        <input name="phone" type="tel" maxLength={40} autoComplete="tel" className={field} />
      </label>
      <label className="block text-sm font-medium sm:col-span-2">{T.topic}
        <select name="topic" className={field} value={topic} onChange={e => setTopic(e.target.value)}>
          {TOPICS.map(t => <option key={t} value={t}>{locale === "en" ? TOPICS_EN[t] : t}</option>)}
        </select>
      </label>
      <label className="block text-sm font-medium sm:col-span-2">{T.need}<span aria-hidden className="text-accent"> *</span>
        <textarea name="message" required minLength={20} maxLength={5000} rows={6} placeholder={T.needPh} className={field} />
      </label>
      {/* Champ piège pour les robots, invisible pour les visiteurs. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 overflow-hidden">
        <label>Site web<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <p className="text-xs leading-relaxed text-muted sm:col-span-2">{T.privacy} <a href="/confidentialite" className="underline underline-offset-2">{T.privacyLink}</a>.</p>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" disabled={state.kind === "sending"} className="inline-flex items-center gap-2 rounded-full bg-btn px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#055e8f] disabled:opacity-60">
          {state.kind === "sending" ? T.sending : T.send}
        </button>
        {state.kind === "error" && (
          <p role="alert" className="text-sm text-[#c2410c]">
            {state.message || T.failed} {T.direct} <a href={`mailto:${email}`} className="font-medium underline underline-offset-2">{email}</a>.
          </p>
        )}
      </div>
    </form>
  );
}
