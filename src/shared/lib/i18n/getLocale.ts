import { notFound } from 'next/navigation';
import { isSupportedLocale, type Locale } from '@/shared/config/i18n';

export function getLocale(value: string): Locale {
  if (!isSupportedLocale(value)) {
    notFound();
  }

  return value;
}
