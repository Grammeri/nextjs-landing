'use client';

import { BILLING_PROVIDERS } from '@/shared/config/billing';
import { useCheckout } from '@/shared/lib/billing/useCheckout';
import { PricingCard } from '@/shared/ui/pricing-card';
import type { PRICING_PAGE_ITEMS } from '@/shared/config/products/pricing';
import { UI_TEXT } from '@/shared/config/ui';
import type { Locale } from '@/shared/config/i18n';

type PricingCardContainerProps = {
  productId: string;
  card: (typeof PRICING_PAGE_ITEMS)[number]['card'];
  locale: Locale;
};

export default function PricingCardContainer({ productId, card, locale }: PricingCardContainerProps) {
  const { checkoutWithStripe, checkoutWithPaypal } = useCheckout(productId);
  const paymentText = UI_TEXT.payment[locale];
  const pricingText = UI_TEXT.pricing[locale];

  return (
    <PricingCard
      {...card}
      paymentTitle={BILLING_PROVIDERS.paypal ? paymentText.multiple : paymentText.single}
      deliveryNotice={pricingText.deliveryNotice}
      termsPrefix={pricingText.termsPrefix}
      termsLabel={pricingText.termsLabel}
      termsError={pricingText.termsError}
      onPayWithStripe={checkoutWithStripe}
      onPayWithPaypal={BILLING_PROVIDERS.paypal ? checkoutWithPaypal : undefined}
      footerNote={pricingText.footerNote}
    />
  );
}
