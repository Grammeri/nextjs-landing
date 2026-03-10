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
