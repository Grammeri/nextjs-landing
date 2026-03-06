import type { Metadata } from 'next';
import DocPage from '../_components/DocPage';
import { getDocMetadata } from '../_lib/getDocMetadata';

type PageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const { title, description } = await getDocMetadata(slug);

  return {
    title: `${title} | AuthForge`,
    description,

    alternates: {
      canonical: `/docs/authforge/${slug.join('/')}`,
    },

    openGraph: {
      title: `${title} | AuthForge`,
      description,
      type: 'article',
      url: `/docs/authforge/${slug.join('/')}`,
    },

    twitter: {
      card: 'summary_large_image',
      title: `${title} | AuthForge`,
      description,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  return <DocPage slug={slug} />;
}
