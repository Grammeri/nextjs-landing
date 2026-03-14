import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import DocPage from '../../_components/DocPage';
import { getDocMetadata } from '../../_lib/getDocMetadata';
import { getDocsProductConfig, getDocsRoute, isDocsProduct } from '../../_lib/products';

type PageProps = {
  params: Promise<{
    product: string;
    slug: string[];
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { product, slug } = await params;

  if (!isDocsProduct(product)) {
    notFound();
  }

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
  const { product, slug } = await params;

  if (!isDocsProduct(product)) {
    notFound();
  }

  return <DocPage product={product} slug={slug} />;
}
