import type { BillingProduct, BillingProvider } from '@/lib/billing';
import type { ProductId } from '@/shared/config/products/types';

import { AUTHFORGE_PRODUCT_COPY } from '@/shared/config/products/authforge';
import { STARTER_PRODUCT_COPY } from './starter';

export type BillingCatalogItem = {
  provider: BillingProvider;
  product: BillingProduct;
};

export const BILLING_CATALOG: Record<ProductId, BillingCatalogItem> = {
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
    title: 'AuthForge',
    description:
      'A production-ready authentication starter for SaaS apps with email/password auth, email verification, password reset, secure sessions, rate limiting, and a Prisma + PostgreSQL reference implementation.',
  },
  {
    href: '/products/starter',
    title: 'Next.js Professional Starter',
    description:
      'A clean Next.js starter kit for real projects and technical assignments, with TypeScript, ESLint, Prettier, Husky, and a CI-ready project structure built for maintainable development.',
  },
];
