'use client';

import { PRICING_CARDS } from '@/shared/config/products/pricing';
import { PricingCard } from '@/shared/ui/pricing-card';

export default function NextJsTestKitPricingCard() {
  const card = PRICING_CARDS.find((c) => c.ctaHref === '/products/nextjs-test-kit');

  if (!card) return null;

  return <PricingCard {...card} />;
}
