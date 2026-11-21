// Index de recherche en JSON statique : /recherche-index/fr et /recherche-index/en.
import { LOCALES, type Locale } from "@/lib/i18n";
import { buildSearchIndex } from "@/lib/search-index";

export const dynamic = "force-static";
export const dynamicParams = false;
export const generateStaticParams = () => LOCALES.map(locale => ({ locale }));

export async function GET(_: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return Response.json(buildSearchIndex(locale as Locale), { headers: { "Cache-Control": "public, max-age=3600" } });
}
