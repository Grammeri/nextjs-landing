'use client';

import { PRICING_CARDS } from '@/shared/config/products/pricing';
import { PricingCard } from '@/shared/ui/pricing-card';

export default function NextJsTestKitPricingCard() {
  const card = PRICING_CARDS.find((c) => c.title === 'Next.js Test Assignment Kit');

  if (!card) return null;

  const handleBuyNextJsTestKit = async (provider: 'stripe' | 'paypal') => {
    const res = await fetch('/api/billing/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: 'nextjs-test-kit',
        provider,
      }),
    });

    const data = await res.json();

    if (data.checkoutUrl) {
      window.location.href = data.checkoutUrl;
    } else {
      alert('Failed to start checkout. Please try again.');
    }
  };

  return (
    <PricingCard
      {...card}
      paymentTitle="Select payment method"
      onPayWithStripe={() => handleBuyNextJsTestKit('stripe')}
      onPayWithPaypal={() => handleBuyNextJsTestKit('paypal')}
      footerNote="Access instructions will be sent by email after purchase"
    />
  );
}
