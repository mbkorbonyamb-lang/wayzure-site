import { Expertise, expertiseMeta, expertiseSlugs } from "@/views/expertise";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = expertiseSlugs;

export async function generateMetadata({ params }: Props) {
  return expertiseMeta("en", (await params).slug);
}

export default async function Page({ params }: Props) {
  return <Expertise locale="en" slug={(await params).slug} />;
}
