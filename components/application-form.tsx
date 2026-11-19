"use client";

// Formulaire de candidature spontanée. Sans JavaScript, il est envoyé comme un formulaire classique.
import { useEffect, useState } from "react";
import { COUNTRIES, CV_MAX_BYTES, DOMAINS, RETENTION } from "@/lib/candidature";

type State = { kind: "idle" | "sending" | "sent" | "error"; message?: string };

const field = "mt-1.5 block w-full rounded-xl border border-line bg-bg px-4 py-3 text-[0.95rem] text-fg placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25";
const Req = () => <span aria-hidden className="text-accent"> *</span>;

export function ApplicationForm({ email }: { email: string }) {
  const [state, setState] = useState<State>({ kind: "idle" });
  const [file, setFile] = useState<string>("");

  useEffect(() => {
    const envoi = new URLSearchParams(window.location.search).get("envoi");
    if (envoi === "ok") setState({ kind: "sent" });
    if (envoi === "erreur") setState({ kind: "error" });
  }, []);

  function checkFile(f: File | undefined): string | null {
    if (!f) return "Merci de joindre votre CV au format PDF.";
    if (f.size > CV_MAX_BYTES) return "Le fichier dépasse 4 Mo.";
    if (!/\.pdf$/i.test(f.name) && f.type !== "application/pdf") return "Le CV doit être un fichier PDF.";
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
        <p className="font-display text-2xl font-semibold">Candidature envoyée.</p>
        <p className="mt-3 leading-relaxed text-fg-2">Merci. Nous lisons chaque candidature et revenons vers vous si votre profil correspond à un besoin, actuel ou à venir.</p>
        <button type="button" onClick={() => setState({ kind: "idle" })} className="mt-6 text-sm font-medium text-accent underline underline-offset-4">Envoyer une autre candidature</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} action="/api/candidature" method="post" encType="multipart/form-data" className="grid gap-5 sm:grid-cols-2">
      <label className="block text-sm font-medium">Nom<Req />
        <input name="lastName" required maxLength={80} autoComplete="family-name" className={field} />
      </label>
      <label className="block text-sm font-medium">Prénom<Req />
        <input name="firstName" required maxLength={80} autoComplete="given-name" className={field} />
      </label>
      <label className="block text-sm font-medium">E-mail<Req />
        <input name="email" type="email" required maxLength={160} autoComplete="email" className={field} />
      </label>
      <label className="block text-sm font-medium">Pays de résidence<Req />
        <input name="country" required maxLength={80} list="pays" autoComplete="country-name" className={field} />
        <datalist id="pays">{COUNTRIES.map(c => <option key={c} value={c} />)}</datalist>
      </label>
      <label className="block text-sm font-medium">Domaine d&apos;expertise<Req />
        <select name="domain" required defaultValue="" className={field}>
          <option value="" disabled>Choisir…</option>
          {DOMAINS.map(d => <option key={d}>{d}</option>)}
        </select>
      </label>
      <label className="block text-sm font-medium">Profil LinkedIn ou portfolio
        <input name="link" type="url" maxLength={300} placeholder="https://" pattern="https://.+" className={field} />
      </label>
      <label className="block text-sm font-medium sm:col-span-2">Quelques mots sur vous
        <textarea name="message" maxLength={2000} rows={4} placeholder="Votre parcours, ce que vous cherchez, vos disponibilités." className={field} />
      </label>
      <div className="sm:col-span-2">
        <p className="text-sm font-medium">CV<Req /> <span className="font-normal text-muted">PDF, 4 Mo au plus</span></p>
        <label className="mt-1.5 flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-line bg-bg px-4 py-4 transition-colors hover:border-accent focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/25">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
            <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M10 13V3M6 7l4-4 4 4M4 13v3h12v-3" /></svg>
          </span>
          <span className="min-w-0 flex-1 truncate text-sm text-fg-2">{file || "Choisir un fichier PDF"}</span>
          <input name="cv" type="file" required accept="application/pdf,.pdf" className="sr-only"
            onChange={e => { const f = e.target.files?.[0]; setFile(f ? `${f.name} · ${(f.size / 1048576).toFixed(1)} Mo` : ""); const p = checkFile(f); setState(p ? { kind: "error", message: p } : { kind: "idle" }); }} />
        </label>
      </div>
      <div aria-hidden className="absolute -left-[9999px] h-0 overflow-hidden">
        <label>Site web<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <label className="flex gap-3 text-sm leading-relaxed text-fg-2 sm:col-span-2">
        <input name="consent" type="checkbox" value="oui" required className="mt-1 size-4 shrink-0 accent-[#0670aa]" />
        <span>J&apos;ai pris connaissance du traitement de ma candidature : elle sert uniquement au recrutement chez Wayzure, est conservée {RETENTION}, et je peux en demander la suppression à tout moment (<a href="/confidentialite#candidatures" className="underline underline-offset-2">détails</a>).</span>
      </label>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" disabled={state.kind === "sending"} className="inline-flex items-center gap-2 rounded-full bg-btn px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#055e8f] disabled:opacity-60">
          {state.kind === "sending" ? "Envoi en cours…" : "Envoyer ma candidature"}
        </button>
        {state.kind === "error" && (
          <p role="alert" className="text-sm text-[#c2410c]">
            {state.message || "L'envoi n'a pas abouti."} Vous pouvez aussi écrire à <a href={`mailto:${email}?subject=${encodeURIComponent("Candidature spontanée")}`} className="font-medium underline underline-offset-2">{email}</a>.
          </p>
        )}
      </div>
    </form>
  );
}
