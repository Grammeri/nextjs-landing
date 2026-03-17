import type { PricingCardProps } from '@/shared/ui/pricing-card';
import { AUTHFORGE_PRICING_CARD } from './authforge';
import { STARTER_PRICING_CARD } from './starter';

export type PricingPageItem = {
  productId: string;
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
