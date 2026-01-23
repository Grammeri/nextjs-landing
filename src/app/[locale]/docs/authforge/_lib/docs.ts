import 'server-only';

import fs from 'node:fs/promises';
import path from 'node:path';
import { notFound } from 'next/navigation';
import { marked } from 'marked';

const DOCS_ROOT = path.join(process.cwd(), 'content', 'authforge', 'docs');

export type DocNavItem = {
  title: string;
  slug?: string;
  children?: DocNavItem[];
};

export const DOCS_NAV_ITEMS: DocNavItem[] = [
  { title: 'Getting Started', slug: 'getting-started' },
  { title: 'Architecture', slug: 'architecture' },
  { title: 'Demo Mode', slug: 'demo-mode' },
  { title: 'Environment', slug: 'environment' },
  {
    title: 'Adapting',
    children: [
      { title: 'After Login', slug: 'adapting/after-login' },
      { title: 'Email', slug: 'adapting/email' },
    ],
  },
];

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

export const renderMarkdown = async (markdown: string): Promise<string> => {
  return marked.parse(markdown);
};
