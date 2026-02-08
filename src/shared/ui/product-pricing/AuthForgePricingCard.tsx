'use client';

import { AUTHFORGE_PRICING_CARD } from '@/shared/config/products/authforge';
import { PricingCard } from '@/shared/ui/pricing-card';

export default function AuthForgePricingCard() {
  const handleBuyAuthForge = async (provider: 'stripe' | 'paypal') => {
    const res = await fetch('/api/billing/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: 'authforge', provider }),
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
      paymentLayout="centered"
      {...AUTHFORGE_PRICING_CARD}
      paymentTitle="Select payment method"
      onPayWithStripe={() => handleBuyAuthForge('stripe')}
      onPayWithPaypal={() => handleBuyAuthForge('paypal')}
    />
  );
}
