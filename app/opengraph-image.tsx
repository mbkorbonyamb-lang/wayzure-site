import { ImageResponse } from "next/og";

export const alt = "Wayzure : data, conseil, développement numérique et formation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: "#0d1b2a", color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#0a84c6" /><path d="M7 10l4 13 5-9 5 9 4-13" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
