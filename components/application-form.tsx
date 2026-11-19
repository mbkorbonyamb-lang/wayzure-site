"use client";

// Formulaire de candidature spontanée. Sans JavaScript, il est envoyé comme un formulaire classique.
import { useEffect, useState } from "react";
import { COUNTRIES, COUNTRIES_EN, CV_MAX_BYTES, DOMAINS, DOMAINS_EN, RETENTION, RETENTION_EN } from "@/lib/candidature";
import type { Locale } from "@/lib/i18n";

const TX = {
  fr: {
    noCv: "Merci de joindre votre CV au format PDF.", tooBig: "Le fichier dépasse 4 Mo.", notPdf: "Le CV doit être un fichier PDF.",
    sent: "Candidature envoyée.", sentText: "Merci. Nous lisons chaque candidature et revenons vers vous si votre profil correspond à un besoin, actuel ou à venir.",
    again: "Envoyer une autre candidature",
    last: "Nom", first: "Prénom", email: "E-mail", country: "Pays de résidence", domain: "Domaine d'expertise", choose: "Choisir…",
    link: "Profil LinkedIn ou portfolio", about: "Quelques mots sur vous", aboutPh: "Votre parcours, ce que vous cherchez, vos disponibilités.",
    cvHint: "PDF, 4 Mo au plus", pick: "Choisir un fichier PDF", mb: "Mo",
    consent: `J'ai pris connaissance du traitement de ma candidature : elle sert uniquement au recrutement chez Wayzure, est conservée ${RETENTION}, et je peux en demander la suppression à tout moment`, details: "détails",
    sending: "Envoi en cours…", send: "Envoyer ma candidature", failed: "L'envoi n'a pas abouti.", direct: "Vous pouvez aussi écrire à", subject: "Candidature spontanée",
  },
  en: {
    noCv: "Please attach your CV as a PDF.", tooBig: "The file is larger than 4 MB.", notPdf: "The CV must be a PDF file.",
    sent: "Application sent.", sentText: "Thank you. We read every application and will get back to you if your profile matches a current or future need.",
    again: "Send another application",
    last: "Last name", first: "First name", email: "Email", country: "Country of residence", domain: "Field of expertise", choose: "Choose…",
    link: "LinkedIn profile or portfolio", about: "A few words about you", aboutPh: "Your background, what you are looking for, your availability.",
    cvHint: "PDF, 4 MB max", pick: "Choose a PDF file", mb: "MB",
    consent: `I have read how my application is handled: it is used only for recruitment at Wayzure, kept ${RETENTION_EN}, and I can ask for it to be deleted at any time`, details: "details, in French",
    sending: "Sending…", send: "Send my application", failed: "Sending failed.", direct: "You can also write to", subject: "Speculative application",
  },
};

type State = { kind: "idle" | "sending" | "sent" | "error"; message?: string };

const field = "mt-1.5 block w-full rounded-xl border border-line bg-bg px-4 py-3 text-[0.95rem] text-fg placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25";
const Req = () => <span aria-hidden className="text-accent"> *</span>;

export function ApplicationForm({ email, locale = "fr" }: { email: string; locale?: Locale }) {
  const T = TX[locale];
  const en = locale === "en";
  const [state, setState] = useState<State>({ kind: "idle" });
  const [file, setFile] = useState<string>("");

  useEffect(() => {
    const envoi = new URLSearchParams(window.location.search).get("envoi");
    if (envoi === "ok") setState({ kind: "sent" });
    if (envoi === "erreur") setState({ kind: "error" });
  }, []);

  function checkFile(f: File | undefined): string | null {
    if (!f) return T.noCv;
    if (f.size > CV_MAX_BYTES) return T.tooBig;
    if (!/\.pdf$/i.test(f.name) && f.type !== "application/pdf") return T.notPdf;
    return null;
  }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const fd = new FormData(form);
    const problem = checkFile(fd.get("cv") as File | undefined ?? undefined);
    if (problem) { setState({ kind: "error", message: problem }); return; }
    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/candidature", { method: "POST", headers: { Accept: "application/json" }, body: fd });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.ok) { form.reset(); setFile(""); setState({ kind: "sent" }); return; }
      setState({ kind: "error", message: data.error });
    } catch {
      setState({ kind: "error" });
    }
  }

  if (state.kind === "sent") {
    return (
      <div role="status" className="rounded-3xl border border-sky-2 bg-sky p-8">
        <p className="font-display text-2xl font-semibold">{T.sent}</p>
        <p className="mt-3 leading-relaxed text-fg-2">{T.sentText}</p>
        <button type="button" onClick={() => setState({ kind: "idle" })} className="mt-6 text-sm font-medium text-accent underline underline-offset-4">{T.again}</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} action="/api/candidature" method="post" encType="multipart/form-data" className="grid gap-5 sm:grid-cols-2">
      <input type="hidden" name="lang" value={locale} />
      <label className="block text-sm font-medium">{T.last}<Req />
        <input name="lastName" required maxLength={80} autoComplete="family-name" className={field} />
      </label>
      <label className="block text-sm font-medium">{T.first}<Req />
        <input name="firstName" required maxLength={80} autoComplete="given-name" className={field} />
      </label>
      <label className="block text-sm font-medium">{T.email}<Req />
        <input name="email" type="email" required maxLength={160} autoComplete="email" className={field} />
      </label>
      <label className="block text-sm font-medium">{T.country}<Req />
        <input name="country" required maxLength={80} list="pays" autoComplete="country-name" className={field} />
        <datalist id="pays">{(en ? COUNTRIES_EN : COUNTRIES).map(c => <option key={c} value={c} />)}</datalist>
      </label>
      <label className="block text-sm font-medium">{T.domain}<Req />
        <select name="domain" required defaultValue="" className={field}>
          <option value="" disabled>{T.choose}</option>
          {DOMAINS.map(d => <option key={d} value={d}>{en ? DOMAINS_EN[d] : d}</option>)}
        </select>
      </label>
      <label className="block text-sm font-medium">{T.link}
        <input name="link" type="url" maxLength={300} placeholder="https://" pattern="https://.+" className={field} />
      </label>
      <label className="block text-sm font-medium sm:col-span-2">{T.about}
        <textarea name="message" maxLength={2000} rows={4} placeholder={T.aboutPh} className={field} />
      </label>
      <div className="sm:col-span-2">
        <p className="text-sm font-medium">CV<Req /> <span className="font-normal text-muted">{T.cvHint}</span></p>
        <label className="mt-1.5 flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-line bg-bg px-4 py-4 transition-colors hover:border-accent focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/25">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
            <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M10 13V3M6 7l4-4 4 4M4 13v3h12v-3" /></svg>
          </span>
          <span className="min-w-0 flex-1 truncate text-sm text-fg-2">{file || T.pick}</span>
          <input name="cv" type="file" required accept="application/pdf,.pdf" className="sr-only"
            onChange={e => { const f = e.target.files?.[0]; setFile(f ? `${f.name} · ${(f.size / 1048576).toFixed(1)} ${T.mb}` : ""); const p = checkFile(f); setState(p ? { kind: "error", message: p } : { kind: "idle" }); }} />
        </label>
      </div>
      <div aria-hidden className="absolute -left-[9999px] h-0 overflow-hidden">
        <label>Site web<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <label className="flex gap-3 text-sm leading-relaxed text-fg-2 sm:col-span-2">
        <input name="consent" type="checkbox" value="oui" required className="mt-1 size-4 shrink-0 accent-[#0670aa]" />
        <span>{T.consent} (<a href="/confidentialite#candidatures" className="underline underline-offset-2">{T.details}</a>).</span>
      </label>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" disabled={state.kind === "sending"} className="inline-flex items-center gap-2 rounded-full bg-btn px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#055e8f] disabled:opacity-60">
          {state.kind === "sending" ? T.sending : T.send}
        </button>
        {state.kind === "error" && (
          <p role="alert" className="text-sm text-[#c2410c]">
            {state.message || T.failed} {T.direct} <a href={`mailto:${email}?subject=${encodeURIComponent(T.subject)}`} className="font-medium underline underline-offset-2">{email}</a>.
          </p>
        )}
      </div>
    </form>
  );
}
