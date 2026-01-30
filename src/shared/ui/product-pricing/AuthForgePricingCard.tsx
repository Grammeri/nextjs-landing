import { AUTHFORGE_PRICING_CARD } from '@/shared/config/products/authforge';
import { PricingCard } from '@/shared/ui/pricing-card';

export default function AuthForgePricingCard() {
  return <PricingCard {...AUTHFORGE_PRICING_CARD} />;
}
