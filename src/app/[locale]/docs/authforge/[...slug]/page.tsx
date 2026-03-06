import DocPage from '../_components/DocPage';

type PageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  return <DocPage slug={slug} />;
}
