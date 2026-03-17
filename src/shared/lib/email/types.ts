import type { ProductId } from '@/shared/config/products/types';

export type EmailProduct = ProductId;

export type PurchaseEmailPayload = {
  to: string;
  product: EmailProduct;
};
