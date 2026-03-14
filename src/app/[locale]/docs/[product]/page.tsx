import { notFound, redirect } from 'next/navigation';

import { isDocsProduct } from '../_lib/products';

type DocsProductIndexPageProps = {
  params: Promise<{
    locale: string;
    product: string;
  }>;
};

export default async function DocsProductIndexPage({ params }: DocsProductIndexPageProps) {
  const { locale, product } = await params;

  if (!isDocsProduct(product)) {
    notFound();
  }

  redirect(`/${locale}/docs/${product}/quick-start`);
}
