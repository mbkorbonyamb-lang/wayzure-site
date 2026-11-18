import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Wayzure : data, conseil, développement numérique et formation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const mark = `data:image/png;base64,${(await readFile(join(process.cwd(), "public/logo-mark.png"))).toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: "#0d1b2a", color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", background: "#fff", borderRadius: 16, padding: "10px 14px" }}><img src={mark} width={84} height={56} alt="" /></div>
          <span style={{ fontSize: 44, fontWeight: 600 }}>Wayzure</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 68, fontWeight: 600, lineHeight: 1.1 }}>Des outils numériques qui servent votre métier.</span>
          <span style={{ fontSize: 30, marginTop: 28, color: "#7fc4ea" }}>Data · Conseil · Développement numérique · Formation</span>
        </div>
      </div>
    ),
    size,
  );
}
