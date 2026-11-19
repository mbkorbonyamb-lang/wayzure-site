import { Contact, contactMeta } from "@/views/contact";

export const metadata = contactMeta("en");

export default function Page() {
  return <Contact locale="en" />;
}
