import { useCallback } from 'react';

type CheckoutProvider = 'stripe' | 'paypal';

type CheckoutResponse = {
  checkoutUrl?: string;
};

export function useCheckout(productId: string) {
  const checkout = useCallback(
    async (provider: CheckoutProvider) => {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, provider }),
      });

      const data = (await res.json()) as CheckoutResponse;

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert('Failed to start checkout. Please try again.');
      }
    },
    [productId],
  );

  return {
    checkoutWithStripe: () => checkout('stripe'),
    checkoutWithPaypal: () => checkout('paypal'),
  };
}
