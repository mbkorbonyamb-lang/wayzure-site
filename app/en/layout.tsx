import { Shell, baseMetadata } from "../shell";

export { viewport } from "../shell";
export const metadata = baseMetadata("en");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <Shell locale="en">{children}</Shell>;
}
