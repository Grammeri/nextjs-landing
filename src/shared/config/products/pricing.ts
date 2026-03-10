import type { PricingCardProps } from '@/shared/ui/pricing-card';
import { AUTHFORGE_PRICING_CARD } from './authforge';
import { NEXTJS_TEST_KIT_PRICING_CARD } from './nextjs-test-kit';

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
    productId: 'nextjs-test-kit',
    card: NEXTJS_TEST_KIT_PRICING_CARD,
  },
];
