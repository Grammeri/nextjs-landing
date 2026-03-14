import type { Metadata } from 'next';

import DocPage from '../../_components/DocPage';
import { getDocMetadata } from '../../_lib/getDocMetadata';
import { getDocsProductConfig, getDocsRoute } from '../../_lib/products';

type PageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const product = 'authforge';
  const { title, description } = await getDocMetadata(product, slug);
  const { titleSuffix } = getDocsProductConfig(product);
  const route = getDocsRoute(product, slug);

  return {
    title: `${title} | ${titleSuffix}`,
    description,

    alternates: {
      canonical: route,
    },

    openGraph: {
      title: `${title} | ${titleSuffix}`,
      description,
      type: 'article',
      url: route,
    },

    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${titleSuffix}`,
      description,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  return <DocPage product="authforge" slug={slug} />;
}
