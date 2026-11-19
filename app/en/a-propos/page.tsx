import { About, aboutMeta } from "@/views/about";

export const metadata = aboutMeta("en");

export default function Page() {
  return <About locale="en" />;
}
