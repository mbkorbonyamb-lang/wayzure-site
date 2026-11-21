import { CaseAfl, caseAflMeta } from "@/views/case-afl";

export const metadata = caseAflMeta("fr");

export default function Page() {
  return <CaseAfl locale="fr" />;
}
