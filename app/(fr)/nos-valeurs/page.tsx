import { Values, valuesMeta } from "@/views/values";

export const metadata = valuesMeta("fr");

export default function Page() {
  return <Values locale="fr" />;
}
