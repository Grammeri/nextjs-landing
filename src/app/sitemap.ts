import fs from 'fs';
import path from 'path';
import { MetadataRoute } from 'next';
import { DOCS_PRODUCTS, getDocsRoute } from './[locale]/docs/_lib/products';

const DOCS_LOCALE = 'en';

function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}

function collectMarkdownSlugs(dirPath: string, parentSegments: string[] = []): string[] {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const absolutePath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      return collectMarkdownSlugs(absolutePath, [...parentSegments, entry.name]);
    }

    if (!entry.isFile() || !entry.name.endsWith('.md')) {
      return [];
    }

    const fileSlug = entry.name.replace(/\.md$/, '');

    if (fileSlug === 'index') {
      return [parentSegments.join('/')].filter(Boolean);
    }

    return [[...parentSegments, fileSlug].join('/')];
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const now = new Date();

  const docPages: MetadataRoute.Sitemap = Object.values(DOCS_PRODUCTS).flatMap((product) => {
    const docsDir = path.join(process.cwd(), 'src', 'content', 'docs-site', product.contentDir);
    const slugs = collectMarkdownSlugs(docsDir);

    return slugs.map((slug) => ({
      url: `${baseUrl}/${DOCS_LOCALE}${getDocsRoute(product.slug, slug)}`,
      lastModified: now,
    }));
  });

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/en`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/ru`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/en/pricing`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/ru/pricing`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/en/demo`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/ru/demo`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/en/products/authforge`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/ru/products/authforge`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/en/products/starter`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/ru/products/starter`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/legal`,
      lastModified: now,
    },
  ];

  return [...staticPages, ...docPages];
}
