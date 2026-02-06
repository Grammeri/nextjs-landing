'use client';

import { AUTHFORGE_PRICING_CARD } from '@/shared/config/products/authforge';
import { PricingCard } from '@/shared/ui/pricing-card';

export default function AuthForgePricingCard() {
  const handleBuyAuthForge = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/billing/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product: 'authforge',
        type: 'lifetime',
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
      {...AUTHFORGE_PRICING_CARD}
      ctaHref={AUTHFORGE_PRICING_CARD.ctaHref}
      onCtaClick={handleBuyAuthForge}
    />
  );
}
