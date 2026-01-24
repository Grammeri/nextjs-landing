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

export type OutlineItem = {
  id: string;
  label: string;
};

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

export const getDocMarkdown = async (
  slug: string,
): Promise<{ html: string; outline: OutlineItem[] }> => {
  const resolvedSlug = resolveSlug(slug);
  const docPath = path.join(DOCS_ROOT, `${resolvedSlug}.md`);

  try {
    const markdown = await fs.readFile(docPath, 'utf8');
    return renderMarkdown(markdown);
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

export const renderMarkdown = async (
  markdown: string,
): Promise<{ html: string; outline: OutlineItem[] }> => {
  const renderer = new marked.Renderer();
  const outline: OutlineItem[] = [];

  type HeadingToken = {
    depth: number;
    text?: string;
    tokens?: unknown;
  };

  renderer.heading = (token: HeadingToken) => {
    const headingText = extractText(token.text ?? token.tokens);
    const id = slugifyHeading(headingText);
    const idAttr = id ? ` id="${id}"` : '';

    if ((token.depth === 2 || token.depth === 3) && headingText && id) {
      outline.push({ id, label: headingText });
    }

    return `<h${token.depth}${idAttr}>${headingText}</h${token.depth}>`;
  };

  const html = marked.parse(markdown, { renderer });
  return { html, outline };
};
