import 'server-only';

import fs from 'node:fs/promises';
import path from 'node:path';
import { notFound } from 'next/navigation';
import { marked } from 'marked';

const DOCS_ROOT = path.join(process.cwd(), 'content', 'authforge', 'docs', 'site');

export type DocNavItem = {
  title: string;
  slug?: string;
  children?: DocNavItem[];
};

export type OutlineItem = {
  id: string;
  label: string;
};

const normalizeSlug = (slug: string) => {
  const trimmed = slug.replace(/^\/+|\/+$/g, '');

  if (!trimmed || trimmed.includes('..')) {
    notFound();
  }

  return trimmed;
};

const resolveDocPath = async (slug: string): Promise<string | null> => {
  const normalized = normalizeSlug(slug);

  const candidate = path.join(DOCS_ROOT, ...normalized.split('/')) + '.md';

  try {
    await fs.access(candidate);
    return candidate;
  } catch {
    return null;
  }
};

const resolveInternalHref = (href: string, currentSlug: string): string | null => {
  const cleaned = href.split('#')[0]?.split('?')[0] ?? '';

  if (!cleaned || cleaned.startsWith('#')) {
    return null;
  }

  if (cleaned.startsWith('/docs/')) {
    const stripped = cleaned
      .replace(/^\/docs\/authforge\/?/, '')
      .replace(/^\/docs\/?/, '')
      .replace(/^\/+/, '');
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
  slug: string,
): Promise<{ html: string; outline: OutlineItem[] }> => {
  const normalizedSlug = normalizeSlug(slug);
  const docPath = await resolveDocPath(slug);

  if (!docPath) {
    notFound();
  }

  try {
    const markdown = await fs.readFile(docPath, 'utf8');
    return renderMarkdown(markdown, normalizedSlug);
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
  currentSlug: string,
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

    const externalAttr = isExternal && !isGitHub ? ' data-external="true"' : '';
    const internalAttr = !isExternal && isInternalDoc ? ' data-internal="true"' : '';

    const label = token.text ?? '';

    if (isInternalDoc) {
      internalDocLinks.add(href);
    }

    return `<a href="${href}"${title}${externalAttr}${internalAttr}>${label}</a>`;
  };

  // -----------------------------
  // Render markdown → HTML
  // -----------------------------
  const html = await marked.parse(markdown, { renderer });

  // ✅ Clean up ugly href="./demo-mode" → href="demo-mode"
  // Only visual cleanup, internal logic stays intact.
  const cleanedHtml = html
    // href="./demo-mode" → href="demo-mode"
    .replaceAll('href="./', 'href="')

    // href="../environment" → href="environment"
    .replaceAll('href="../', 'href="');

  // -----------------------------
  // Broken internal link check
  // -----------------------------
  const brokenLinks: string[] = [];

  for (const href of internalDocLinks) {
    const resolvedSlug = resolveInternalHref(href, currentSlug);

    if (!resolvedSlug) {
      brokenLinks.push(href);
      continue;
    }

    const docPath = await resolveDocPath(resolvedSlug);

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
