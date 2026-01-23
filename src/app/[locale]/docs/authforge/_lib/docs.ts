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

const extractText = (value: unknown): string => {
  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(extractText).join('');
  }

  if (typeof value === 'object' && value && 'text' in value) {
    return String((value as { text: unknown }).text);
  }

  return '';
};

const slugifyHeading = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

export const renderMarkdown = async (markdown: string): Promise<string> => {
  const renderer = new marked.Renderer();

  type HeadingToken = {
    depth: number;
    text?: string;
    tokens?: unknown;
  };

  renderer.heading = (token: HeadingToken) => {
    const headingText = extractText(token.text ?? token.tokens);
    const id = slugifyHeading(headingText);
    const idAttr = id ? ` id="${id}"` : '';
    return `<h${token.depth}${idAttr}>${headingText}</h${token.depth}>`;
  };

  return marked.parse(markdown, { renderer });
};
