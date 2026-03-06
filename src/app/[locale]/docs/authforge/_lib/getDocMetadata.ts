import 'server-only';

import fs from 'node:fs/promises';
import path from 'node:path';

const DOCS_ROOT = path.join(process.cwd(), 'content', 'authforge', 'docs', 'site');

export type DocMetadata = {
  title: string;
  description: string;
};

export async function getDocMetadata(slug: string[]): Promise<DocMetadata> {
  const filePath = path.join(DOCS_ROOT, ...slug) + '.md';
  const content = await fs.readFile(filePath, 'utf8');

  const lines = content
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const title =
    lines.find((line) => line.startsWith('# '))?.replace(/^# /, '') ?? 'AuthForge Documentation';

  const description =
    lines.find((line) => !line.startsWith('#') && line.length > 40) ??
    'AuthForge developer documentation.';

  return {
    title,
    description,
  };
}
