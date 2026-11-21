import { References, referencesMeta } from "@/views/references";

export const metadata = referencesMeta("en");

export default function Page() {
  return <References locale="en" />;
}
