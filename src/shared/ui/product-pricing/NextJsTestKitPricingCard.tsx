'use client';

import { BILLING_PROVIDERS } from '@/shared/config/billing';
import { PRICING_CARDS } from '@/shared/config/products/pricing';
import { useCheckout } from '@/shared/lib/billing/useCheckout';
import { PricingCard } from '@/shared/ui/pricing-card';

export default function NextJsTestKitPricingCard() {
  const { checkoutWithStripe, checkoutWithPaypal } = useCheckout('nextjs-test-kit');

  const card = PRICING_CARDS.find((c) => c.title === 'Next.js Test Assignment Kit');

  if (!card) return null;

  return (
    <PricingCard
      {...card}
      paymentTitle="Select payment method"
      onPayWithStripe={checkoutWithStripe}
      onPayWithPaypal={BILLING_PROVIDERS.paypal ? checkoutWithPaypal : undefined}
      footerNote="Access instructions will be sent by email after purchase"
    />
  );
}
