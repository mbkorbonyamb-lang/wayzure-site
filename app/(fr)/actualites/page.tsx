import { News, newsMeta } from "@/views/news";

export const metadata = newsMeta("fr");

export default function Page() {
  return <News locale="fr" />;
}
