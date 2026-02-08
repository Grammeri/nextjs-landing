'use client';

import { AUTHFORGE_PRICING_CARD } from '@/shared/config/products/authforge';
import { useCheckout } from '@/shared/lib/billing/useCheckout';
import { PricingCard } from '@/shared/ui/pricing-card';

export default function AuthForgePricingCard() {
  const { checkoutWithStripe, checkoutWithPaypal } = useCheckout('authforge');

  return (
    <PricingCard
      {...AUTHFORGE_PRICING_CARD}
      paymentTitle="Select payment method"
      onPayWithStripe={checkoutWithStripe}
      onPayWithPaypal={checkoutWithPaypal}
    />
  );
}
