import { Solution, solutionMeta, solutionSlugs } from "@/views/solution";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = solutionSlugs;

export async function generateMetadata({ params }: Props) {
  return solutionMeta("en", (await params).slug);
}

export default async function Page({ params }: Props) {
  return <Solution locale="en" slug={(await params).slug} />;
}
