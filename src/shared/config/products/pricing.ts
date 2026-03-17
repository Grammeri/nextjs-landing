import type { PricingCardProps } from '@/shared/ui/pricing-card';
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
