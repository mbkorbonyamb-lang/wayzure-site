import { Sectors, sectorsMeta } from "@/views/sectors";

export const metadata = sectorsMeta("fr");

export default function Page() {
  return <Sectors locale="fr" />;
}
