import { Contact, contactMeta } from "@/views/contact";

export const metadata = contactMeta("fr");

export default function Page() {
  return <Contact locale="fr" />;
}
