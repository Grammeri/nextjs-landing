import type { Locale } from '@/shared/config/i18n';
import { checkoutSuccessEn } from '@/shared/config/checkout-success/en';
import { checkoutSuccessRu } from '@/shared/config/checkout-success/ru';
import type { CheckoutSuccessText } from '@/shared/config/checkout-success/types';

const checkoutSuccessText: Record<Locale, CheckoutSuccessText> = {
  en: checkoutSuccessEn,
  ru: checkoutSuccessRu,
};

export function getCheckoutSuccessText(locale: Locale): CheckoutSuccessText {
  return checkoutSuccessText[locale];
}
