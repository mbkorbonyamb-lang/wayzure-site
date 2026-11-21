import { CaseAfl, caseAflMeta } from "@/views/case-afl";

export const metadata = caseAflMeta("en");

export default function Page() {
  return <CaseAfl locale="en" />;
}
