import type { Metadata } from 'next';

import { DEFAULT_LOCALE, isSupportedLocale, type Locale } from '@/shared/config/i18n';
import { routes } from '@/shared/config/routes';
import { getProductCopy } from '@/shared/lib/i18n/getProductCopy';
import AuthForgeProductPageClient from './AuthForgeProductPageClient';

type PageProps = {
  params: Promise<{
    locale?: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale =
    rawLocale && isSupportedLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  const productCopy = getProductCopy('authforge', locale);
  const title = `${productCopy.name} — Software Forge`;
  const description = productCopy.shortDescription;
  const canonical = routes.product(locale, 'authforge');
  const ogLocale = locale === 'ru' ? 'ru_RU' : 'en_US';

  return {
    title,
    description,

    alternates: {
      canonical,
      languages: {
        en: routes.product('en', 'authforge'),
        ru: routes.product('ru', 'authforge'),
      },
    },

    openGraph: {
      title,
      description,
      type: 'website',
      url: canonical,
      locale: ogLocale,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  };
}

export default function AuthForgeProductPage() {
  return <AuthForgeProductPageClient />;
}
