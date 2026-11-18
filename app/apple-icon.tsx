import { ImageResponse } from "next/og";
import { MARK_D } from "@/lib/logo-paths";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const mark = `data:image/svg+xml;base64,${Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 286 191"><path fill="#fff" fill-rule="evenodd" d="${MARK_D}"/></svg>`).toString("base64")}`;

export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0782C6" }}>
      <img src={mark} width={120} height={80} alt="" />
    </div>,
    size,
  );
}
