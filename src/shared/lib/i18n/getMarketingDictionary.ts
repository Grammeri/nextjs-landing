import type { Locale } from '@/shared/config/i18n';
import { marketingEn } from '@/shared/config/marketing/en';
import { marketingRu } from '@/shared/config/marketing/ru';
import type { MarketingDictionary } from '@/shared/config/marketing/types';

const marketingDictionaries: Record<Locale, MarketingDictionary> = {
  en: marketingEn,
  ru: marketingRu,
};

export function getMarketingDictionary(locale: Locale): MarketingDictionary {
  return marketingDictionaries[locale];
}
