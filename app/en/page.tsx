import { Home, homeMeta } from "@/views/home";

export const metadata = homeMeta("en");

export default function Page() {
  return <Home locale="en" />;
}
