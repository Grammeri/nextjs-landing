import type { DocsProduct, DocsProductConfig } from './types';

const DEFAULT_DOCS_LOCALE = 'en';

export const DOCS_PRODUCTS: Record<DocsProduct, DocsProductConfig> = {
  authforge: {
    slug: 'authforge',
    label: 'AuthForge',
    titleSuffix: 'AuthForge',
    defaultTitle: 'AuthForge Documentation',
    defaultDescription: 'AuthForge developer documentation.',
    sidebarTitle: 'AuthForge Documentation',
    sidebarAriaLabel: 'AuthForge documentation',
    contentDir: 'authforge',
    defaultDocSlug: 'getting-started',
  },

  starter: {
    slug: 'starter',
    label: 'Starter',
    titleSuffix: 'Starter',
    defaultTitle: 'Starter Documentation',
    defaultDescription: 'Starter developer documentation.',
    sidebarTitle: 'Starter Documentation',
    sidebarAriaLabel: 'Starter documentation',
    contentDir: 'starter',
    defaultDocSlug: 'quick-start',
  },
};

export const isDocsProduct = (value: string): value is DocsProduct => {
  return value in DOCS_PRODUCTS;
};

export const getDocsProductConfig = (product: DocsProduct): DocsProductConfig => {
  return DOCS_PRODUCTS[product];
};

const normalizeSlug = (slug?: string | string[]): string => {
  if (!slug) {
    return '';
  }

  const slugPath = Array.isArray(slug) ? slug.join('/') : slug;

  return slugPath.trim().replace(/^\/+|\/+$/g, '');
};

export const getDocsRoute = (
  product: DocsProduct,
  slug?: string | string[],
  locale: string = DEFAULT_DOCS_LOCALE,
): string => {
  const normalizedSlug = normalizeSlug(slug);
  const normalizedLocale = locale.trim() || DEFAULT_DOCS_LOCALE;

  if (!normalizedSlug) {
    return `/${normalizedLocale}/docs/${product}`;
  }

  return `/${normalizedLocale}/docs/${product}/${normalizedSlug}`;
};

export const getDocsEntryRoute = (product: DocsProduct, locale?: string): string => {
  return getDocsRoute(product, undefined, locale);
};

export const getDefaultDocRoute = (product: DocsProduct, locale?: string): string => {
  return getDocsRoute(product, getDocsProductConfig(product).defaultDocSlug, locale);
};
