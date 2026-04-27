import type { ProductId } from '@/shared/config/products/types';

export type CheckoutSuccessText = {
  title: string;
  thankYouPrefix: string;
  accessInstructions: string;
  actions: {
    readDocumentation: string;
    backToPricing: string;
  };
  fallbackProductTitle: string;
  productTitles: Record<ProductId, string>;
};
