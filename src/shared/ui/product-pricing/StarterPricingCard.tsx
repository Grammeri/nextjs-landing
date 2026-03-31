'use client';

import { BILLING_PROVIDERS } from '@/shared/config/billing';
import { PRICING_PAGE_ITEMS } from '@/shared/config/products/pricing';
import { useCheckout } from '@/shared/lib/billing/useCheckout';
import { PricingCard } from '@/shared/ui/pricing-card';
import { UI_TEXT } from '@/shared/config/ui';

export default function StarterPricingCard() {
  const { checkoutWithStripe, checkoutWithPaypal } = useCheckout('starter');

  const item = PRICING_PAGE_ITEMS.find((p) => p.productId === 'starter');
  const card = item?.card;

  if (!card) return null;

  return (
    <PricingCard
      {...card}
      paymentTitle={BILLING_PROVIDERS.paypal ? UI_TEXT.payment.multiple : UI_TEXT.payment.single}
      onPayWithStripe={checkoutWithStripe}
      onPayWithPaypal={BILLING_PROVIDERS.paypal ? checkoutWithPaypal : undefined}
      footerNote="Access instructions will be sent by email after purchase"
    />
  );
}
