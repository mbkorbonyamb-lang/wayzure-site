"use client";

import { useEffect, useState } from "react";
import { TOPICS } from "@/lib/contact";

type State = { kind: "idle" | "sending" | "sent" | "error"; message?: string };

const field = "mt-1.5 block w-full rounded-xl border border-line bg-bg px-4 py-3 text-[0.95rem] text-fg placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25";

export function ContactForm({ email }: { email: string }) {
  const [state, setState] = useState<State>({ kind: "idle" });

  // Retour de l'envoi sans JavaScript (formulaire classique) : /contact?envoi=ok ou ?envoi=erreur.
  useEffect(() => {
    const envoi = new URLSearchParams(window.location.search).get("envoi");
    if (envoi === "ok") setState({ kind: "sent" });
    if (envoi === "erreur") setState({ kind: "error" });
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
        <p className="font-display text-2xl font-semibold">Message envoyé.</p>
        <p className="mt-3 leading-relaxed text-fg-2">Merci. Nous l&apos;avons bien reçu et nous revenons vers vous à l&apos;adresse indiquée. Une copie de votre message ne vous est pas envoyée : pensez à le noter si besoin.</p>
        <button type="button" onClick={() => setState({ kind: "idle" })} className="mt-6 text-sm font-medium text-accent underline underline-offset-4">Écrire un autre message</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} action="/api/contact" method="post" className="grid gap-5 sm:grid-cols-2" noValidate={false}>
      <label className="block text-sm font-medium">Nom et prénom<span aria-hidden className="text-accent"> *</span>
        <input name="name" required maxLength={120} autoComplete="name" className={field} />
      </label>
      <label className="block text-sm font-medium">Organisation
        <input name="company" maxLength={160} autoComplete="organization" className={field} />
      </label>
      <label className="block text-sm font-medium">E-mail professionnel<span aria-hidden className="text-accent"> *</span>
        <input name="email" type="email" required maxLength={160} autoComplete="email" className={field} />
      </label>
      <label className="block text-sm font-medium">Téléphone
        <input name="phone" type="tel" maxLength={40} autoComplete="tel" className={field} />
      </label>
      <label className="block text-sm font-medium sm:col-span-2">Sujet
        <select name="topic" className={field} defaultValue={TOPICS[0]}>
          {TOPICS.map(t => <option key={t}>{t}</option>)}
        </select>
      </label>
      <label className="block text-sm font-medium sm:col-span-2">Votre besoin<span aria-hidden className="text-accent"> *</span>
        <textarea name="message" required minLength={20} maxLength={5000} rows={6} placeholder="La situation actuelle, ce que vous voulez changer, l'échéance éventuelle." className={field} />
      </label>
      {/* Champ piège pour les robots, invisible pour les visiteurs. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 overflow-hidden">
        <label>Site web<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <p className="text-xs leading-relaxed text-muted sm:col-span-2">Vos informations servent uniquement à répondre à votre demande. Voir la <a href="/confidentialite" className="underline underline-offset-2">politique de confidentialité</a>.</p>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" disabled={state.kind === "sending"} className="inline-flex items-center gap-2 rounded-full bg-btn px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#055e8f] disabled:opacity-60">
          {state.kind === "sending" ? "Envoi en cours…" : "Envoyer le message"}
        </button>
        {state.kind === "error" && (
          <p role="alert" className="text-sm text-[#c2410c]">
            {state.message || "L'envoi n'a pas abouti."} Vous pouvez aussi écrire directement à <a href={`mailto:${email}`} className="font-medium underline underline-offset-2">{email}</a>.
          </p>
        )}
      </div>
    </form>
  );
}
