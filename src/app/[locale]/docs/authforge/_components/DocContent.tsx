import 'server-only';

import { getDocMarkdown, renderMarkdown } from '../_lib/docs';

type DocContentProps = {
  slug: string;
};

export default async function DocContent({ slug }: DocContentProps) {
  const markdown = await getDocMarkdown(slug);
  const html = renderMarkdown(markdown);

  return <article dangerouslySetInnerHTML={{ __html: html }} />;
}
