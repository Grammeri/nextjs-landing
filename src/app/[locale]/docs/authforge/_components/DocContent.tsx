import 'server-only';

import { getDocMarkdown, renderMarkdown } from '../_lib/docs';
import styles from './DocContent.module.css';

type DocContentProps = {
  slug: string;
};

export default async function DocContent({ slug }: DocContentProps) {
  const markdown = await getDocMarkdown(slug);
  const html = renderMarkdown(markdown);

  return <article className={styles.content} dangerouslySetInnerHTML={{ __html: html }} />;
}
