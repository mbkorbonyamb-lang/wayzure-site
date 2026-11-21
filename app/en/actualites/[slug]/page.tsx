import { NewsPost, newsPostMeta, newsSlugs } from "@/views/news";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = newsSlugs("en");

export async function generateMetadata({ params }: Props) {
  return newsPostMeta("en", (await params).slug);
}

export default async function Page({ params }: Props) {
  return <NewsPost locale="en" slug={(await params).slug} />;
}
