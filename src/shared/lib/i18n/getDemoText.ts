import type { Locale } from '@/shared/config/i18n';
import { demoEn } from '@/shared/config/demo/en';
import { demoRu } from '@/shared/config/demo/ru';
import type { DemoText } from '@/shared/config/demo/types';

const demoText: Record<Locale, DemoText> = {
  en: demoEn,
  ru: demoRu,
};

export function getDemoText(locale: Locale): DemoText {
  return demoText[locale];
}
