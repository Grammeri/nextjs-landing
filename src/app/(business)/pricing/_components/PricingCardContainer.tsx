'use client';

import { BILLING_PROVIDERS } from '@/shared/config/billing';
import { useCheckout } from '@/shared/lib/billing/useCheckout';
import { PricingCard } from '@/shared/ui/pricing-card';
import type { PRICING_PAGE_ITEMS } from '@/shared/config/products/pricing';
import { UI_TEXT } from '@/shared/config/ui';

type PricingCardContainerProps = {
  productId: string;
  card: (typeof PRICING_PAGE_ITEMS)[number]['card'];
};

export default function PricingCardContainer({ productId, card }: PricingCardContainerProps) {
  const { checkoutWithStripe, checkoutWithPaypal } = useCheckout(productId);

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
