import { Shell, baseMetadata } from "../shell";

export { viewport } from "../shell";
export const metadata = baseMetadata("fr");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <Shell locale="fr">{children}</Shell>;
}
