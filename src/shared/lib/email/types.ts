export type EmailProduct = 'authforge' | 'nextjs-test-kit';

export type PurchaseEmailPayload = {
  to: string;
  product: EmailProduct;
};
