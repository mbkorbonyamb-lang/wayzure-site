import { Expertises, expertisesMeta } from "@/views/expertises";

export const metadata = expertisesMeta("en");

export default function Page() {
  return <Expertises locale="en" />;
}
