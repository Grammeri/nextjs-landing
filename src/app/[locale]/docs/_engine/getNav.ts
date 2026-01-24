import 'server-only';

import fs from 'node:fs/promises';
import path from 'node:path';

import type { DocNavItem } from '../authforge/_lib/docs';

type NavSectionItem = {
  slug: string;
  label: string;
};

type NavSection = {
  title: string;
  items: NavSectionItem[];
};

const readNavConfig = async (product: string): Promise<NavSection[]> => {
  const navPath = path.join(process.cwd(), 'content', product, 'docs', 'nav.json');
  const raw = await fs.readFile(navPath, 'utf8');
  return JSON.parse(raw) as NavSection[];
};

const flattenSection = (section: NavSection): DocNavItem[] =>
  section.items.map((item) => ({
    title: item.label,
    slug: item.slug,
  }));

const groupSection = (section: NavSection): DocNavItem => ({
  title: section.title,
  children: section.items.map((item) => ({
    title: item.label,
    slug: item.slug,
  })),
});

export async function getNav(product: string): Promise<DocNavItem[]> {
  const sections = await readNavConfig(product);

  return sections.flatMap((section) => {
    if (section.title === 'Getting Started') {
      return flattenSection(section);
    }

    return [groupSection(section)];
  });
}
