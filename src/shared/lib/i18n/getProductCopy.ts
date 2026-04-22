import type { Locale } from '@/shared/config/i18n';
import { authforgeEn } from '@/shared/config/products/copy/authforge.en';
import { authforgeRu } from '@/shared/config/products/copy/authforge.ru';
import { starterEn } from '@/shared/config/products/copy/starter.en';
import { starterRu } from '@/shared/config/products/copy/starter.ru';
import type { ProductCopy } from '@/shared/config/marketing/types';
import type { ProductId } from '@/shared/config/products/types';

const productCopy: Record<Locale, Record<ProductId, ProductCopy>> = {
  en: {
    authforge: authforgeEn,
    starter: starterEn,
  },
  ru: {
    authforge: authforgeRu,
    starter: starterRu,
  },
};

export function getProductCopy(productId: ProductId, locale: Locale): ProductCopy {
  return productCopy[locale][productId];
}
