import { NewsPost, newsPostMeta, newsSlugs } from "@/views/news";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = newsSlugs("fr");

export async function generateMetadata({ params }: Props) {
  return newsPostMeta("fr", (await params).slug);
}

export default async function Page({ params }: Props) {
  return <NewsPost locale="fr" slug={(await params).slug} />;
}
