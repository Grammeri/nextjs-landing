import type { PricingCardProps } from '@/shared/ui/pricing-card';
import { AUTHFORGE_PRICING_CARD } from './authforge';
import { NEXTJS_TEST_KIT_PRICING_CARD } from './nextjs-test-kit';

export const PRICING_CARDS: PricingCardProps[] = [
  AUTHFORGE_PRICING_CARD,
  NEXTJS_TEST_KIT_PRICING_CARD,
];
