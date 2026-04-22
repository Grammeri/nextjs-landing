import type { PricingCardProps } from '@/shared/ui/pricing-card';
import type { Locale } from '@/shared/config/i18n';
import { getProductCopy } from '@/shared/lib/i18n/getProductCopy';
import type { ProductId } from '@/shared/config/products/types';

import { AUTHFORGE_PRICING_CARD } from './authforge';
import { STARTER_PRICING_CARD } from './starter';

export type PricingPageItem = {
  productId: ProductId;
  card: PricingCardProps;
};

export const PRICING_PAGE_ITEMS: PricingPageItem[] = [
  {
    productId: 'authforge',
    card: AUTHFORGE_PRICING_CARD,
  },
  {
    productId: 'starter',
    card: STARTER_PRICING_CARD,
  },
];

export function createPricingCard(productId: ProductId, locale: Locale): PricingCardProps {
  const product = getProductCopy(productId, locale);

  return {
    title: product.name,
    description: product.pricing.description,
    price: product.pricing.price,
    features: product.pricing.features.map((text) => ({ text })),
    footerNote: product.pricing.footerNote,
  };
}

export function getPricingPageItems(locale: Locale): PricingPageItem[] {
  return PRICING_PAGE_ITEMS.map((item) => ({
    productId: item.productId,
    card: createPricingCard(item.productId, locale),
  }));
}
