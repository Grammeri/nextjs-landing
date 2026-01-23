import 'server-only';

import fs from 'node:fs/promises';
import path from 'node:path';
import { notFound } from 'next/navigation';
import { marked } from 'marked';

const DOCS_ROOT = path.join(process.cwd(), 'content', 'authforge', 'docs');

const resolveSlug = (slug: string) => {
  const trimmed = slug.replace(/^\/+|\/+$/g, '');

  if (!trimmed || trimmed.includes('..')) {
    notFound();
  }

  if (trimmed === 'environment') {
    return 'env';
  }

  return trimmed;
};

export const getDocMarkdown = async (slug: string): Promise<string> => {
  const resolvedSlug = resolveSlug(slug);
  const docPath = path.join(DOCS_ROOT, `${resolvedSlug}.md`);

  try {
    return await fs.readFile(docPath, 'utf8');
  } catch (error) {
    const nodeError = error as NodeJS.ErrnoException;

    if (nodeError.code === 'ENOENT') {
      notFound();
    }

    throw error;
  }
};

export const renderMarkdown = (markdown: string): string => marked.parse(markdown);
