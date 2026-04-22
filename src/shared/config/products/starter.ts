import type { PricingCardProps } from '@/shared/ui/pricing-card';
import { starterEn } from '@/shared/config/products/copy/starter.en';

export const STARTER_PRODUCT_COPY = starterEn;

export const STARTER_PRICING_CARD: PricingCardProps = {
  title: STARTER_PRODUCT_COPY.name,
  description: STARTER_PRODUCT_COPY.pricing.description,
  price: STARTER_PRODUCT_COPY.pricing.price,
  features: STARTER_PRODUCT_COPY.pricing.features.map((text) => ({ text })),
  footerNote: STARTER_PRODUCT_COPY.pricing.footerNote,
};
