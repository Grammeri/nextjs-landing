import 'server-only';

import { ReactNode } from 'react';

import { getDocMarkdown, renderMarkdown } from '../_lib/docs';
import styles from './DocContent.module.css';

type DocContentProps = {
  slug: string;
  outline?: ReactNode;
};

export default async function DocContent({ slug, outline }: DocContentProps) {
  const markdown = await getDocMarkdown(slug);
  const html = await renderMarkdown(markdown);

  return (
    <article className={styles.content}>
      <div className={styles.markdown} dangerouslySetInnerHTML={{ __html: html }} />
      {outline ? <div className={styles.outline}>{outline}</div> : null}
    </article>
  );
}
