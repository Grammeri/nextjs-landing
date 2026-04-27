import { useCallback } from 'react';
import type { Locale } from '@/shared/config/i18n';

type CheckoutProvider = 'stripe' | 'paypal';

const ENABLED_PROVIDERS = {
  stripe: true,
  paypal: false,
} as const;

type CheckoutResponse = {
  checkoutUrl?: string;
};

export function useCheckout(productId: string, locale: Locale) {
  const checkout = useCallback(
    async (provider: CheckoutProvider, termsAccepted: boolean) => {
      // ✅ Feature flag guard
      if (!ENABLED_PROVIDERS[provider]) {
        alert(`${provider} checkout is not available yet.`);
        return;
      }

      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, provider, locale, termsAccepted }),
      });

      const data = (await res.json()) as CheckoutResponse;

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert('Failed to start checkout. Please try again.');
      }
    },
    [locale, productId],
  );

  return {
    checkoutWithStripe: (termsAccepted: boolean) => checkout('stripe', termsAccepted),
    checkoutWithPaypal: (termsAccepted: boolean) => checkout('paypal', termsAccepted),
  };
}
