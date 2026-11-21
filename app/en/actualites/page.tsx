import { News, newsMeta } from "@/views/news";

export const metadata = newsMeta("en");

export default function Page() {
  return <News locale="en" />;
}
