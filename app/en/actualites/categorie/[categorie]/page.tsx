import { News, categorySlugs, newsCategoryMeta } from "@/views/news";

type Props = { params: Promise<{ categorie: string }> };

export const dynamicParams = false;
export const generateStaticParams = categorySlugs;

export async function generateMetadata({ params }: Props) {
  return newsCategoryMeta("en", (await params).categorie);
}

export default async function Page({ params }: Props) {
  return <News locale="en" category={(await params).categorie} />;
}
