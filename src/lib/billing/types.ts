export type BillingProvider = 'stripe' | 'paypal';

export type BillingProduct = {
  productId: string;
  name: string;
  description?: string;
  priceCents: number;
  currency: 'usd';
};

export type CreateCheckoutParams = {
  provider: BillingProvider;
  product: BillingProduct;
  successUrl: string;
  cancelUrl: string;

  metadata?: Record<string, string>;
  customerEmail?: string;
  clientReferenceId?: string;
};

export type CreateCheckoutResult = {
  checkoutUrl: string;
};
