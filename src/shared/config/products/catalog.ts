import type { BillingProduct, BillingProvider } from '@/lib/billing';

export type BillingCatalogItem = {
  provider: BillingProvider;
  product: BillingProduct;
};

export const BILLING_CATALOG: Record<string, BillingCatalogItem> = {
  authforge: {
    provider: 'stripe',
    product: {
      productId: 'authforge',
      name: 'AuthForge',
      description: 'Production-ready authentication system for modern SaaS products',
      amount: 9900,
      currency: 'usd',
    },
  },
  // future products go here
};
