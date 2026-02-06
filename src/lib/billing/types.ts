export type BillingProvider = 'stripe' | 'paypal';

export type BillingProduct = {
  productId: string;
  name: string;
  description?: string;
  amount: number; // cents
  currency: 'usd';
};

export type CreateCheckoutParams = {
  provider: BillingProvider;
  product: BillingProduct;
  successUrl: string;
  cancelUrl: string;
};

export type CreateCheckoutResult = {
  checkoutUrl: string;
};
