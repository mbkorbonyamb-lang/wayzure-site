import { Values, valuesMeta } from "@/views/values";

export const metadata = valuesMeta("en");

export default function Page() {
  return <Values locale="en" />;
}
