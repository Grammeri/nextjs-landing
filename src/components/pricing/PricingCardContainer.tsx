'use client';

import { BILLING_PROVIDERS } from '@/shared/config/billing';
import { useCheckout } from '@/shared/lib/billing/useCheckout';
import { PricingCard, type PricingCardProps } from '@/shared/ui/pricing-card';
import type { Locale } from '@/shared/config/i18n';
import { getUiText } from '@/shared/lib/i18n/getUiText';

type PricingCardContainerProps = {
  productId: string;
  card: PricingCardProps;
  locale: Locale;
};

export default function PricingCardContainer({ productId, card, locale }: PricingCardContainerProps) {
  const { checkoutWithStripe, checkoutWithPaypal } = useCheckout(productId, locale);
  const uiText = getUiText(locale);
  const paymentText = uiText.payment;
  const pricingText = uiText.pricing;

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
      footerNote={undefined}
    />
  );
}
