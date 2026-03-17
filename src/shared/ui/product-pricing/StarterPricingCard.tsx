'use client';

import { BILLING_PROVIDERS } from '@/shared/config/billing';
import { PRICING_PAGE_ITEMS } from '@/shared/config/products/pricing';
import { useCheckout } from '@/shared/lib/billing/useCheckout';
import { PricingCard } from '@/shared/ui/pricing-card';

export default function NextJsTestKitPricingCard() {
  const { checkoutWithStripe, checkoutWithPaypal } = useCheckout('nextjs-test-kit');

  const item = PRICING_PAGE_ITEMS.find((p) => p.productId === 'nextjs-test-kit');
  const card = item?.card;

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
