import type { PricingCardProps } from '@/shared/ui/pricing-card';
import { authforgeEn } from '@/shared/config/products/copy/authforge.en';

export const AUTHFORGE_PRODUCT_COPY = authforgeEn;

export const AUTHFORGE_SUPPORT_EMAIL = AUTHFORGE_PRODUCT_COPY.supportEmail;

export const AUTHFORGE_PRICING_CARD: PricingCardProps = {
  title: AUTHFORGE_PRODUCT_COPY.name,
  description: AUTHFORGE_PRODUCT_COPY.pricing.description,
  price: AUTHFORGE_PRODUCT_COPY.pricing.price,
  features: AUTHFORGE_PRODUCT_COPY.pricing.features.map((text) => ({ text })),
  footerNote: AUTHFORGE_PRODUCT_COPY.pricing.footerNote,
};
