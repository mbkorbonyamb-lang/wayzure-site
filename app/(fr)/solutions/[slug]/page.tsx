import { Solution, solutionMeta, solutionSlugs } from "@/views/solution";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = solutionSlugs;

export async function generateMetadata({ params }: Props) {
  return solutionMeta("fr", (await params).slug);
}

export default async function Page({ params }: Props) {
  return <Solution locale="fr" slug={(await params).slug} />;
}
