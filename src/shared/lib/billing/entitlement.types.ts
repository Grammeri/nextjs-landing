export type Entitlement = {
  email: string;
  product: 'authforge';
  access: 'lifetime';
  source: 'stripe';
  checkoutSessionId: string;
  createdAt: Date;
};
