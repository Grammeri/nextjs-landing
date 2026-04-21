import type { DocsProduct, DocsProductConfig } from './types';

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

export const getDocsRoute = (product: DocsProduct, slug?: string | string[]): string => {
  const normalizedSlug = normalizeSlug(slug);

  if (!normalizedSlug) {
    return `/docs/${product}`;
  }

  return `/docs/${product}/${normalizedSlug}`;
};

export const getDocsEntryRoute = (product: DocsProduct): string => {
  return getDocsRoute(product);
};

export const getDefaultDocRoute = (product: DocsProduct): string => {
  return getDocsRoute(product, getDocsProductConfig(product).defaultDocSlug);
};
