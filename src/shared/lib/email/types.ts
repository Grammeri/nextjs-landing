export type EmailProduct = 'authforge' | 'starter';

export type PurchaseEmailPayload = {
  to: string;
  product: EmailProduct;
  downloadToken: string;
};
