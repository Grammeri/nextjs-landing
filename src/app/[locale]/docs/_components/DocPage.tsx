import type { DocsProduct } from '../_lib/types';
import DocContent from './DocContent';

type DocPageProps = {
  product: DocsProduct;
  slug: string[];
};

export default function DocPage({ product, slug }: DocPageProps) {
  const slugPath = slug.join('/');

  return <DocContent product={product} slug={slugPath} />;
}
