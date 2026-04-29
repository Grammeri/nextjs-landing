const DEFAULT_SITE_URL = 'https://software-forge.dev';

export function normalizeSiteUrl(siteUrl: string): string {
    return siteUrl.replace(/\/+$/, '');
}

export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL);

export const SITE_NAME = 'Software Forge';

export const SITE_DEFAULT_TITLE =
    'Software Forge — Production-ready SaaS foundations and developer products';

export const SITE_TITLE_TEMPLATE = '%s | Software Forge';

export const SITE_DEFAULT_DESCRIPTION =
    'Software Forge builds production-ready SaaS foundations and developer products, including AuthForge and Starter, with a focus on modern architecture, security, and clean implementation.';

export const SITE_OG_IMAGE = '/og-image.png';

export const SITE_OG_IMAGE_ALT =
    'Software Forge — Production-ready SaaS foundations and developer products';

export const SITE_SITEMAP_URL = `${SITE_URL}/sitemap.xml`;