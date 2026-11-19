import { Careers, careersMeta } from "@/views/careers";

export const metadata = careersMeta("en");

export default function Page() {
  return <Careers locale="en" />;
}
