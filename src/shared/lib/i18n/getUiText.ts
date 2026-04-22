import type { Locale } from '@/shared/config/i18n';
import { uiTextEn } from '@/shared/config/ui/en';
import { uiTextRu } from '@/shared/config/ui/ru';
import type { UiText } from '@/shared/config/ui/types';

const uiText: Record<Locale, UiText> = {
  en: uiTextEn,
  ru: uiTextRu,
};

export function getUiText(locale: Locale): UiText {
  return uiText[locale];
}
