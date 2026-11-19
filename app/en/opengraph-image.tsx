import { ImageResponse } from "next/og";
import { MARK_D, WORD_REST_D, WORD_W_D } from "@/lib/logo-paths";

export const alt = "Wayzure: digital that moves your business forward";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const svg = (body: string, vb: string) => `data:image/svg+xml;base64,${Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}">${body}</svg>`).toString("base64")}`;
const mark = svg(`<path fill="#fff" fill-rule="evenodd" d="${MARK_D}"/>`, "0 0 286 191");
const word = svg(`<path fill="#fff" fill-rule="evenodd" d="${WORD_W_D}${WORD_REST_D}"/>`, "0 0 396 92");

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: "linear-gradient(135deg, #19323E 0%, #0f222b 60%, #0b3c58 100%)", color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <img src={mark} width={84} height={56} alt="" />
          <img src={word} width={172} height={40} alt="" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.5 }}>Digital that moves your business forward.</span>
          <span style={{ fontSize: 30, marginTop: 30, color: "#7cc4ec" }}>Data & AI · Consulting · Software development · Training</span>
        </div>
      </div>
    ),
    size,
  );
}
