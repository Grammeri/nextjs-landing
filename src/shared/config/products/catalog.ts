import type { BillingProduct, BillingProvider } from '@/lib/billing';
import { AUTHFORGE_PRODUCT_COPY } from '@/shared/config/products/authforge';
import { STARTER_PRODUCT_COPY } from './starter';

export type BillingCatalogItem = {
  provider: BillingProvider;
  product: BillingProduct;
};

export const BILLING_CATALOG: Record<string, BillingCatalogItem> = {
  authforge: {
    provider: 'stripe',
    product: {
      productId: 'authforge',
      name: AUTHFORGE_PRODUCT_COPY.name,
      description: AUTHFORGE_PRODUCT_COPY.shortDescription,
      amount: 9900,
      currency: 'usd',
    },
  },

  starter: {
    provider: 'stripe',
    product: {
      productId: 'starter',
      name: STARTER_PRODUCT_COPY.name,
      description: STARTER_PRODUCT_COPY.shortDescription,
      amount: 500,
      currency: 'usd',
    },
  },
};
export type ProductGridItem = {
  href: string;
  title: string;
  description: string;
};

export const PRODUCTS_GRID_ITEMS: ProductGridItem[] = [
  {
    href: '/products/authforge',
    title: AUTHFORGE_PRODUCT_COPY.name,
    description: AUTHFORGE_PRODUCT_COPY.cardDescription,
  },
  {
    href: '/products/starter',
    title: STARTER_PRODUCT_COPY.name,
    description: STARTER_PRODUCT_COPY.cardDescription,
  },
  {
    href: '/products/coming-soon',
    title: 'Coming soon',
    description: 'This product is currently under development. Stay tuned.',
  },
  {
    href: '/products/coming-soon',
    title: 'Coming soon',
    description: 'This product is currently under development. Stay tuned.',
  },
];
