import { MetadataRoute } from 'next';
import { SITE_SITEMAP_URL } from '@/shared/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: SITE_SITEMAP_URL,
  };
}