import { Home, homeMeta } from "@/views/home";

export const metadata = homeMeta("fr");

export default function Page() {
  return <Home locale="fr" />;
}
