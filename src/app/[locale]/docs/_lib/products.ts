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
    defaultDocSlug: 'getting-started',
  },
};

export const isDocsProduct = (value: string): value is DocsProduct => {
  return value in DOCS_PRODUCTS;
};

export const getDocsProductConfig = (product: DocsProduct): DocsProductConfig => {
  return DOCS_PRODUCTS[product];
};

export const getDocsRoute = (product: DocsProduct, slug?: string | string[]) => {
  if (!slug || (Array.isArray(slug) && slug.length === 0)) {
    return `/docs/${product}`;
  }

  const slugPath = Array.isArray(slug) ? slug.join('/') : slug;

  return `/docs/${product}/${slugPath}`;
};

export const getDocsEntryRoute = (product: DocsProduct) => {
  return getDocsRoute(product);
};

export const getDefaultDocRoute = (product: DocsProduct) => {
  return getDocsRoute(product, getDocsProductConfig(product).defaultDocSlug);
};
