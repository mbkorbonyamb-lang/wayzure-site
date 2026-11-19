import { Sectors, sectorsMeta } from "@/views/sectors";

export const metadata = sectorsMeta("en");

export default function Page() {
  return <Sectors locale="en" />;
}
