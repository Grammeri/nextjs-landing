import { marked } from 'marked';
import { getDocMarkdown, renderMarkdown } from './_lib/docs';

const buildOverviewMarkdown = (markdown: string) => {
  const tokens = marked.lexer(markdown);
  let heading: string | null = null;
  let paragraph: string | null = null;

  for (const token of tokens) {
    if (!heading && token.type === 'heading' && token.depth === 1) {
      heading = token.text;
    }

    if (!paragraph && token.type === 'paragraph') {
      paragraph = token.text;
    }

    if (heading && paragraph) {
      break;
    }
  }

  const pieces = [];

  if (heading) {
    pieces.push(`# ${heading}`);
  }

  if (paragraph) {
    pieces.push(paragraph);
  }

  return pieces.length > 0 ? pieces.join('\n\n') : markdown;
};

export default async function AuthForgeDocsOverviewPage() {
  const markdown = await getDocMarkdown('getting-started');
  const overviewMarkdown = buildOverviewMarkdown(markdown);
  const html = renderMarkdown(overviewMarkdown);

  return <article dangerouslySetInnerHTML={{ __html: html }} />;
}
