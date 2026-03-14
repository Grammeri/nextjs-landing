import 'server-only';

import { getDocMarkdown } from '../_lib/docs';
import type { DocsProduct } from '../_lib/types';
import PageOutline from '../authforge/_components/PageOutline';
import styles from '../authforge/_components/DocContent.module.css';

type DocContentProps = {
  product: DocsProduct;
  slug: string;
};

export default async function DocContent({ product, slug }: DocContentProps) {
  const { title, html, outline } = await getDocMarkdown(product, slug);

  return (
    <article className={`${styles.content} docs`} data-docs-slug={slug} data-docs-product={product}>
      {title ? <h1 className={styles.title}>{title}</h1> : null}

      {outline.length ? (
        <div className={styles.outline}>
          <PageOutline items={outline} />
        </div>
      ) : null}

      <div className={styles.markdown} dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
