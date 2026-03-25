'use client';

import { BILLING_PROVIDERS } from '@/shared/config/billing';
import { AUTHFORGE_PRICING_CARD } from '@/shared/config/products/authforge';
import { useCheckout } from '@/shared/lib/billing/useCheckout';
import { PricingCard } from '@/shared/ui/pricing-card';
import { UI_TEXT } from '@/shared/config/ui';

export default function AuthForgePricingCard() {
  const { checkoutWithStripe, checkoutWithPaypal } = useCheckout('authforge');

  return (
    <PricingCard
      {...AUTHFORGE_PRICING_CARD}
      paymentTitle={BILLING_PROVIDERS.paypal ? UI_TEXT.payment.multiple : UI_TEXT.payment.single}
      onPayWithStripe={checkoutWithStripe}
      onPayWithPaypal={BILLING_PROVIDERS.paypal ? checkoutWithPaypal : undefined}
    />
  );
}
