import type { PricingCardProps } from '@/shared/ui/pricing-card';
import type { Locale } from '@/shared/config/i18n';
import { getProductCopy } from '@/shared/lib/i18n/getProductCopy';
import type { ProductId } from '@/shared/config/products/types';
import { isFreeDownloadProduct } from '@/shared/config/products/catalog';

export type PricingPageItem = {
  productId: ProductId;
  card: PricingCardProps;
};

const PRICING_PAGE_PRODUCT_IDS: ProductId[] = [
  'authforge',
  'starter',
];

export function createPricingCard(productId: ProductId, locale: Locale): PricingCardProps {
  const product = getProductCopy(productId, locale);

  const card: PricingCardProps = {
    title: product.name,
    description: product.pricing.description,
    price: product.pricing.price,
    features: product.pricing.features.map((text) => ({ text })),
    footerNote: product.pricing.footerNote,
  };

  if (isFreeDownloadProduct(productId) && product.pricing.downloadCta) {
    card.freeDownloadLabel = product.pricing.downloadCta;
    card.freeDownloadNote = product.pricing.downloadNote ?? product.pricing.footerNote;
  }

  return card;
}

export function getPricingPageItems(locale: Locale): PricingPageItem[] {
  return PRICING_PAGE_PRODUCT_IDS.map((productId) => ({
    productId,
    card: createPricingCard(productId, locale),
  }));
}
