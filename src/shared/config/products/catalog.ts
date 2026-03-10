import type { BillingProduct, BillingProvider } from '@/lib/billing';
import { AUTHFORGE_PRODUCT_COPY } from '@/shared/config/products/authforge';
import { NEXTJS_TEST_KIT_PRODUCT_COPY } from '@/shared/config/products/nextjs-test-kit';

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
    title: NEXTJS_TEST_KIT_PRODUCT_COPY.name,
    description: NEXTJS_TEST_KIT_PRODUCT_COPY.cardDescription,
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
