import 'server-only';

import fs from 'node:fs/promises';
import path from 'node:path';
import { notFound } from 'next/navigation';
import { marked } from 'marked';

import { getDocsProductConfig } from './products';
import type { DocsProduct, OutlineItem } from './types';

const normalizeSlug = (slug: string) => {
  const trimmed = slug.replace(/^\/+|\/+$/g, '');

  if (!trimmed || trimmed.includes('..')) {
    notFound();
  }

  return trimmed;
};

const getDocsRoot = (product: DocsProduct) => {
  const { contentDir } = getDocsProductConfig(product);

  return path.join(process.cwd(), 'content', contentDir, 'docs', 'site');
};

const resolveDocPath = async (product: DocsProduct, slug: string): Promise<string | null> => {
  const normalized = normalizeSlug(slug);
  const docsRoot = getDocsRoot(product);
  const candidate = path.join(docsRoot, ...normalized.split('/')) + '.md';

  try {
    await fs.access(candidate);
    return candidate;
  } catch {
    return null;
  }
};

const resolveInternalHref = (
  href: string,
  currentSlug: string,
  product: DocsProduct,
): string | null => {
  const cleaned = href.split('#')[0]?.split('?')[0] ?? '';

  if (!cleaned || cleaned.startsWith('#')) {
    return null;
  }

  if (cleaned.startsWith('/docs/')) {
    const productPrefix = `/docs/${product}/`;

    if (!cleaned.startsWith(productPrefix) && cleaned !== `/docs/${product}`) {
      return null;
    }

    const stripped = cleaned.replace(new RegExp(`^/docs/${product}/?`), '').replace(/^\/+/, '');

    return stripped || null;
  }

  if (!cleaned.startsWith('./') && !cleaned.startsWith('../')) {
    return null;
  }

  const baseParts = currentSlug.split('/').filter(Boolean).slice(0, -1);
  const stack = [...baseParts];

  for (const part of cleaned.split('/')) {
    if (!part || part === '.') {
      continue;
    }

    if (part === '..') {
      if (!stack.length) {
        return null;
      }

      stack.pop();
      continue;
    }

    stack.push(part);
  }

  return stack.join('/') || null;
};

export const getDocMarkdown = async (
  product: DocsProduct,
  slug: string,
): Promise<{ title: string | null; html: string; outline: OutlineItem[] }> => {
  const normalizedSlug = normalizeSlug(slug);
  const docPath = await resolveDocPath(product, slug);

  if (!docPath) {
    notFound();
  }

  try {
    const markdown = await fs.readFile(docPath, 'utf8');
    const { html, outline } = await renderMarkdown(markdown, normalizedSlug, product);

    const match = html.match(/<h1.*?>(.*?)<\/h1>/i);

    let title: string | null = null;
    let htmlWithoutTitle = html;

    if (match) {
      title = match[1];
      htmlWithoutTitle = html.replace(match[0], '');
    }

    return {
      title,
      html: htmlWithoutTitle,
      outline,
    };
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

const renderMarkdown = async (
  markdown: string,
  currentSlug: string,
  product: DocsProduct,
): Promise<{ html: string; outline: OutlineItem[] }> => {
  const renderer = new marked.Renderer();
  const outline: OutlineItem[] = [];
  const internalDocLinks = new Set<string>();

  type HeadingToken = {
    depth: number;
    text?: string;
    tokens?: unknown;
  };

  type LinkToken = {
    href?: string;
    title?: string | null;
    text?: string;
    tokens?: unknown;
  };

  renderer.heading = (token: HeadingToken) => {
    const headingText = extractText(token.text ?? token.tokens);
    const id = slugifyHeading(headingText);
    const idAttr = id ? ` id="${id}"` : '';

    if (token.depth === 2 && headingText && id) {
      outline.push({ id, label: headingText });
    }

    return `<h${token.depth}${idAttr}>${headingText}</h${token.depth}>`;
  };

  renderer.link = (token: LinkToken) => {
    const href = token.href ?? '';
    const title = token.title ? ` title="${token.title}"` : '';
    const isExternal = /^https?:\/\//i.test(href);
    const isGitHub = href.includes('github.com');
    const isInternalDoc = !isExternal && /^(?:\.\/|\.\.\/|\/docs\/)/.test(href);
    const label = token.text ?? '';

    const externalAttr = isExternal && !isGitHub ? ' data-external="true"' : '';
    const internalAttr = !isExternal && isInternalDoc ? ' data-internal="true"' : '';

    if (isInternalDoc) {
      internalDocLinks.add(href);
    }

    return `<a href="${href}"${title}${externalAttr}${internalAttr}>${label}</a>`;
  };

  const html = await marked.parse(markdown, { renderer });

  const cleanedHtml = html.replaceAll('href="./', 'href="').replaceAll('href="../', 'href="');

  const brokenLinks: string[] = [];

  for (const href of internalDocLinks) {
    const resolvedSlug = resolveInternalHref(href, currentSlug, product);

    if (!resolvedSlug) {
      brokenLinks.push(href);
      continue;
    }

    const docPath = await resolveDocPath(product, resolvedSlug);

    if (!docPath) {
      brokenLinks.push(href);
    }
  }

  if (brokenLinks.length) {
    const message =
      '[docs] Broken internal link(s):\n' + brokenLinks.map((href) => `- ${href}`).join('\n');

    if (process.env.NODE_ENV === 'production') {
      throw new Error(message);
    }

    console.warn(message);
  }

  return { html: cleanedHtml, outline };
};
