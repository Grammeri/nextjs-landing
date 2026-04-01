import 'server-only';

import fs from 'node:fs/promises';
import path from 'node:path';

import { getDocsProductConfig } from './products';
import type { DocMetadata, DocsProduct } from './types';

const getDocsRoot = (product: DocsProduct) => {
  return path.join(process.cwd(), 'src', 'content', 'docs-site', product);
};

export async function getDocMetadata(product: DocsProduct, slug: string[]): Promise<DocMetadata> {
  const docsRoot = getDocsRoot(product);
  const filePath = path.join(docsRoot, ...slug) + '.md';
  const content = await fs.readFile(filePath, 'utf8');

  const { defaultTitle, defaultDescription } = getDocsProductConfig(product);

  const lines = content
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const title = lines.find((line) => line.startsWith('# '))?.replace(/^# /, '') ?? defaultTitle;

  const description =
    lines.find((line) => !line.startsWith('#') && line.length > 40) ?? defaultDescription;

  return {
    title,
    description,
  };
}
