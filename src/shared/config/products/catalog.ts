import type { BillingProduct, BillingProvider } from '@/lib/billing';
import type { ProductId } from '@/shared/config/products/types';
import type { MarketingProductCardCopy } from '@/shared/config/marketing/types';

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
      priceCents: 9900,
      currency: 'usd',
    },
  },

  starter: {
    provider: 'stripe',
    product: {
      productId: 'starter',
      name: STARTER_PRODUCT_COPY.name,
      description: STARTER_PRODUCT_COPY.shortDescription,
      priceCents: 500,
      currency: 'usd',
    },
  },
};

export type ProductGridItem = MarketingProductCardCopy;
