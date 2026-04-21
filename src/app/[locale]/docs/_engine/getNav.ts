import 'server-only';

import fs from 'node:fs/promises';
import path from 'node:path';

import {
  DOC_TITLES as AUTHFORGE_DOC_TITLES,
  FLATTEN_SECTIONS as AUTHFORGE_FLATTEN_SECTIONS,
  NAV_GROUPS as AUTHFORGE_NAV_GROUPS,
  ROOT_ORDER as AUTHFORGE_ROOT_ORDER,
  SECTION_TITLES as AUTHFORGE_SECTION_TITLES,
} from '@/content/docs-nav/authforge/nav';
import {
  DOC_TITLES as STARTER_DOC_TITLES,
  FLATTEN_SECTIONS as STARTER_FLATTEN_SECTIONS,
  NAV_GROUPS as STARTER_NAV_GROUPS,
  ROOT_ORDER as STARTER_ROOT_ORDER,
  SECTION_TITLES as STARTER_SECTION_TITLES,
} from '@/content/docs-nav/starter/nav';
import type { DocNavItem, DocsProduct } from '../_lib/types';

type NavGroupConfig = {
  title: string;
  slugs: string[];
};

type ProductNavConfig = {
  rootOrder: string[];
  sectionTitles: Record<string, string>;
  docTitles: Record<string, string>;
  flattenSections: string[];
  navGroups: NavGroupConfig[];
};

const PRODUCT_NAV_CONFIGS: Record<DocsProduct, ProductNavConfig> = {
  authforge: {
    rootOrder: AUTHFORGE_ROOT_ORDER,
    sectionTitles: AUTHFORGE_SECTION_TITLES,
    docTitles: AUTHFORGE_DOC_TITLES,
    flattenSections: AUTHFORGE_FLATTEN_SECTIONS,
    navGroups: AUTHFORGE_NAV_GROUPS,
  },

  starter: {
    rootOrder: STARTER_ROOT_ORDER,
    sectionTitles: STARTER_SECTION_TITLES,
    docTitles: STARTER_DOC_TITLES,
    flattenSections: STARTER_FLATTEN_SECTIONS,
    navGroups: STARTER_NAV_GROUPS,
  },
};

const isMarkdown = (file: string) => file.endsWith('.md');

const titleFromSlug = (slug: string) =>
  slug.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

const getDocsRoot = (product: DocsProduct) => {
  return path.join(process.cwd(), 'src', 'content', 'docs-site', product);
};

async function readDirRecursive(
  dir: string,
  config: ProductNavConfig,
  baseSlug = '',
  isRoot = false,
): Promise<DocNavItem[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const items: DocNavItem[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;

    const fullPath = path.join(dir, entry.name);
    const slug = entry.name.replace(/\.md$/, '');
    const fullSlug = baseSlug ? `${baseSlug}/${slug}` : slug;

    if (entry.isDirectory()) {
      const children = await readDirRecursive(fullPath, config, fullSlug, false);

      if (!children.length) continue;

      if (config.flattenSections.includes(entry.name)) {
        items.push(...children);
        continue;
      }

      items.push({
        title: config.sectionTitles[entry.name] ?? titleFromSlug(entry.name),
        children,
      });

      continue;
    }

    if (entry.isFile() && isMarkdown(entry.name)) {
      items.push({
        title: config.docTitles[slug] ?? titleFromSlug(slug),
        slug: fullSlug,
      });
    }
  }

  if (isRoot) {
    const withSlug = items.filter((item) => item.slug);
    const withoutSlug = items.filter((item) => !item.slug);

    withSlug.sort((a, b) => {
      const slugA = a.slug!.split('/').pop()!;
      const slugB = b.slug!.split('/').pop()!;

      const ia = config.rootOrder.indexOf(slugA);
      const ib = config.rootOrder.indexOf(slugB);

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

export async function getNav(product: DocsProduct = 'authforge'): Promise<DocNavItem[]> {
  const config = PRODUCT_NAV_CONFIGS[product];
  const docsRoot = getDocsRoot(product);
  const items = await readDirRecursive(docsRoot, config, '', true);

  if (!config.navGroups.length) {
    return items;
  }

  const flattenNavItems = (items: DocNavItem[]): DocNavItem[] => {
    return items.flatMap((item) => {
      if (item.children?.length) {
        return flattenNavItems(item.children);
      }

      return item.slug ? [item] : [];
    });
  };

  const groups: DocNavItem[] = config.navGroups
    .map((group) => {
      const flatItems = flattenNavItems(items);

      const children = group.slugs
        .map((groupSlug) => flatItems.find((item) => item.slug === groupSlug))
        .filter(Boolean) as DocNavItem[];

      if (!children.length) return null;

      return {
        title: group.title,
        slug: children[0]?.slug,
        children,
      };
    })
    .filter(Boolean) as DocNavItem[];

  return groups;
}
