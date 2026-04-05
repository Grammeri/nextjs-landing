import fs from 'fs';
import path from 'path';
import { MetadataRoute } from 'next';
import { DOCS_PRODUCTS, getDocsRoute } from './[locale]/docs/_lib/products';

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
    const docsDir = path.join(process.cwd(), 'content', product.contentDir, 'docs', 'site');
    const slugs = collectMarkdownSlugs(docsDir);

    const entryPage: MetadataRoute.Sitemap[number] = {
      url: `${baseUrl}${getDocsRoute(product.slug)}`,
      lastModified: now,
    };

    const productDocPages = slugs.map((slug) => ({
      url: `${baseUrl}${getDocsRoute(product.slug, slug)}`,
      lastModified: now,
    }));

    return [entryPage, ...productDocPages];
  });

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/products/authforge`,
      lastModified: now,
    },
  ];

  return [...staticPages, ...docPages];
}
