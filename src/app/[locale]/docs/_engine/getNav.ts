import 'server-only';

import fs from 'node:fs/promises';
import path from 'node:path';

import type { DocNavItem } from '../authforge/_lib/docs';

/**
 * Source of truth:
 * AuthForge documentation file structure
 */
const DOCS_ROOT = path.join(process.cwd(), 'content', 'authforge', 'docs', 'site');

/**
 * Deterministic order for top-level documents
 * (UX policy, not content configuration)
 */
const ROOT_ORDER = ['quick-start', 'getting-started', 'architecture', 'demo-mode', 'environment'];

/**
 * Friendly titles for section directories (folders)
 */
const SECTION_TITLES: Record<string, string> = {
  integration: 'Integration',
};

/**
 * Friendly titles for standalone documents (.md files)
 */
const DOC_TITLES: Record<string, string> = {
  'ui-principles': 'UI Principles',
};

/**
 * Utilities
 */
const isMarkdown = (file: string) => file.endsWith('.md');

const titleFromSlug = (slug: string) =>
  slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

/**
 * Recursive filesystem-based navigation builder
 */
async function readDirRecursive(dir: string, baseSlug = '', isRoot = false): Promise<DocNavItem[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const items: DocNavItem[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;

    const fullPath = path.join(dir, entry.name);
    const slug = entry.name.replace(/\.md$/, '');
    const fullSlug = baseSlug ? `${baseSlug}/${slug}` : slug;

    // 📁 Directory = section
    if (entry.isDirectory()) {
      const children = await readDirRecursive(fullPath, fullSlug, false);

      if (children.length === 0) continue;

      // 🔥 FLATTEN integration
      if (entry.name === 'integration') {
        items.push(...children);
        continue;
      }

      items.push({
        title: SECTION_TITLES[entry.name] ?? titleFromSlug(entry.name),
        children,
      });
    }

    // 📄 Markdown file = document
    if (entry.isFile() && isMarkdown(entry.name)) {
      items.push({
        title: DOC_TITLES[slug] ?? titleFromSlug(slug),
        slug: fullSlug,
      });
    }
  }

  /**
   * Stable ordering for top-level documents only
   */
  if (isRoot) {
    const withSlug = items.filter((item) => item.slug);
    const withoutSlug = items.filter((item) => !item.slug);

    withSlug.sort((a, b) => {
      const ia = ROOT_ORDER.indexOf(a.slug!);
      const ib = ROOT_ORDER.indexOf(b.slug!);

      if (ia === -1 && ib === -1) {
        return a.title.localeCompare(b.title);
      }

      if (ia === -1) return 1;
      if (ib === -1) return -1;

      return ia - ib;
    });

    items.length = 0;
    items.push(...withSlug, ...withoutSlug);
  }

  return items;
}

/**
 * Public API
 */
export async function getNav(): Promise<DocNavItem[]> {
  return readDirRecursive(DOCS_ROOT, '', true);
}
