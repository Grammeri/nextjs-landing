import type { Locale } from '@/shared/config/i18n';
import type { ProductId } from '@/shared/config/products/types';

export const routes = {
  home: (locale: Locale) => `/${locale}`,
  demo: (locale: Locale) => `/${locale}/demo`,
  docs: (locale: Locale) => `/${locale}/docs`,
  pricing: (locale: Locale) => `/${locale}/pricing`,
  checkoutSuccess: (locale: Locale) => `/${locale}/checkout/success`,
  product: (locale: Locale, productId: ProductId) => `/${locale}/products/${productId}`,
  legal: '/legal',
} as const;
