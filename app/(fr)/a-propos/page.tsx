import { About, aboutMeta } from "@/views/about";

export const metadata = aboutMeta("fr");

export default function Page() {
  return <About locale="fr" />;
}
