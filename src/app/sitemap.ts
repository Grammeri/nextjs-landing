import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'http://localhost:3000';

  const docsDir = path.join(process.cwd(), 'content/authforge/docs/site');

  let docPages: MetadataRoute.Sitemap = [];

  if (fs.existsSync(docsDir)) {
    const files = fs.readdirSync(docsDir);

    docPages = files
      .filter((file) => file.endsWith('.md'))
      .map((file) => {
        const slug = file.replace('.md', '');

        return {
          url: `${baseUrl}/docs/authforge/${slug}`,
          lastModified: new Date(),
        };
      });
  }

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/products/authforge`,
      lastModified: new Date(),
    },
  ];

  return [...staticPages, ...docPages];
}
