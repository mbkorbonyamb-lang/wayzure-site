import { Careers, careersMeta } from "@/views/careers";

export const metadata = careersMeta("fr");

export default function Page() {
  return <Careers locale="fr" />;
}
