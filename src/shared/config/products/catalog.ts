import type { BillingProduct, BillingProvider } from '@/lib/billing';
import { AUTHFORGE_PRODUCT_COPY } from '@/shared/config/products/authforge';

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
  // future products go here
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
    href: '/products/nextjs-test-kit',
    title: 'Next.js Test Assignment Kit',
    description:
      'Ready-to-use Next.js project for technical interviews and test assignments — with clean architecture, tooling, and real-world setup.',
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
