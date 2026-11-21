// Rendu Markdown volontairement simple pour les actualités : titres (## et ###), paragraphes, listes (- ou 1.),
// citations (>), images (![texte](/chemin)), liens, **gras** et *italique*. Pas de HTML brut : le texte est échappé par React.
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

function inline(text: string, key = 0): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0, m: RegExpExecArray | null, k = key;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) {
      const url = m[2];
      out.push(url.startsWith("/") ? <Link key={k++} href={url}>{m[1]}</Link> : <a key={k++} href={url} rel="noopener">{m[1]}</a>);
    } else if (m[3]) out.push(<strong key={k++}>{m[3]}</strong>);
    else if (m[4]) out.push(<em key={k++}>{m[4]}</em>);
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Markdown({ source }: { source: string }) {
  const blocks = source.split(/\n{2,}/).map(b => b.trim()).filter(Boolean);
  return (
    <>
      {blocks.map((b, i) => {
        const lines = b.split("\n");
        if (b.startsWith("### ")) return <h3 key={i}>{inline(b.slice(4))}</h3>;
        if (b.startsWith("## ")) return <h2 key={i}>{inline(b.slice(3))}</h2>;
        const img = b.match(/^!\[([^\]]*)\]\((\/[^)\s]+)\)$/);
        if (img) return <figure key={i}><Image src={img[2]} alt={img[1]} width={1600} height={1000} sizes="(min-width: 768px) 720px, 100vw" className="h-auto w-full rounded-2xl" />{img[1] && <figcaption>{img[1]}</figcaption>}</figure>;
        if (lines.every(l => /^[-*] /.test(l))) return <ul key={i}>{lines.map((l, j) => <li key={j}>{inline(l.slice(2))}</li>)}</ul>;
        if (lines.every(l => /^\d+\. /.test(l))) return <ol key={i}>{lines.map((l, j) => <li key={j}>{inline(l.replace(/^\d+\. /, ""))}</li>)}</ol>;
        if (lines.every(l => l.startsWith(">"))) return <blockquote key={i}>{inline(lines.map(l => l.replace(/^>\s?/, "")).join(" "))}</blockquote>;
        return <p key={i}>{inline(lines.join(" "))}</p>;
      })}
    </>
  );
}
