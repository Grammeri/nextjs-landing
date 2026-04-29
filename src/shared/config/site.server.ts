import 'server-only';

import { normalizeSiteUrl } from './site';

export function getRequiredSiteUrl(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl || !siteUrl.startsWith('http')) {
    throw new Error('NEXT_PUBLIC_SITE_URL must include scheme (http/https)');
  }

  return normalizeSiteUrl(siteUrl);
}
