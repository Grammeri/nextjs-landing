import 'server-only';

import { getDocMarkdown } from '../_lib/docs';
import PageOutline from './PageOutline';
import styles from './DocContent.module.css';

type DocContentProps = {
  slug: string;
};

export default async function DocContent({ slug }: DocContentProps) {
  const { html, outline } = await getDocMarkdown(slug);

  return (
    <article className={`${styles.content} docs`} data-docs-slug={slug}>
      <div className={styles.markdown} dangerouslySetInnerHTML={{ __html: html }} />
      {outline.length ? (
        <div className={styles.outline}>
          <PageOutline items={outline} />
        </div>
      ) : null}
    </article>
  );
}
