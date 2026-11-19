import { Expertises, expertisesMeta } from "@/views/expertises";

export const metadata = expertisesMeta("fr");

export default function Page() {
  return <Expertises locale="fr" />;
}
