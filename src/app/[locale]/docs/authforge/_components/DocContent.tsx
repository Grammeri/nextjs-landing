import 'server-only';

import { getDocMarkdown } from '../_lib/docs';
import PageOutline from './PageOutline';
import styles from './DocContent.module.css';

type DocContentProps = {
  slug: string;
};

export default async function DocContent({ slug }: DocContentProps) {
  const { title, html, outline } = await getDocMarkdown(slug);

  return (
    <article className={`${styles.content} docs`} data-docs-slug={slug}>
      {title && <h1 className={styles.title}>{title}</h1>}

      {outline.length ? (
        <div className={styles.outline}>
          <PageOutline items={outline} />
        </div>
      ) : null}

      <div className={styles.markdown} dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
