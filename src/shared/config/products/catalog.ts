import type { BillingProduct, BillingProvider } from '@/lib/billing';
import type { ProductId } from '@/shared/config/products/types';

import { AUTHFORGE_PRODUCT_COPY } from '@/shared/config/products/authforge';

export type BillingCatalogItem = {
  provider: BillingProvider;
  product: BillingProduct;
};

/** Products that can create a paid checkout session. Free products are excluded. */
export type BillableProductId = 'authforge';

export const BILLING_CATALOG: Record<BillableProductId, BillingCatalogItem> = {
  authforge: {
    provider: 'stripe',
    product: {
      productId: 'authforge',
      name: AUTHFORGE_PRODUCT_COPY.name,
      description: AUTHFORGE_PRODUCT_COPY.shortDescription,
      priceCents: 199,
      currency: 'usd',
    },
  },
};

const FREE_DOWNLOAD_PRODUCT_IDS = new Set<ProductId>(['starter']);

export function isFreeDownloadProduct(productId: string): productId is 'starter' {
  return FREE_DOWNLOAD_PRODUCT_IDS.has(productId as ProductId);
}

export function isBillableProduct(productId: string): productId is BillableProductId {
  return Object.prototype.hasOwnProperty.call(BILLING_CATALOG, productId);
}

export function getBillingCatalogItem(productId: string): BillingCatalogItem | undefined {
  if (!isBillableProduct(productId)) {
    return undefined;
  }

  return BILLING_CATALOG[productId];
}

export function getFreeDownloadHref(productId: Extract<ProductId, 'starter'>): string {
  return `/api/download/${productId}`;
}
