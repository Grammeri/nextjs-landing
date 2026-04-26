import type { Metadata } from 'next';

import { DEFAULT_LOCALE, isSupportedLocale } from '@/shared/config/i18n';
import AuthForgeProductPageClient from './AuthForgeProductPageClient';

type PageProps = {
  params: Promise<{
    locale?: string;
  }>;
};

const AUTHFORGE_SEO = {
  en: {
    title: 'AuthForge — Next.js auth starter for SaaS',
    description:
      'Production-ready authentication starter with email/password auth, email verification, password reset, secure server-side sessions via HttpOnly cookies, route-level rate limiting, Prisma + PostgreSQL, a Resend email example, and demo mode for local evaluation.',
    ogLocale: 'en_US',
  },
  ru: {
    title: 'AuthForge — аутентификация для Next.js SaaS',
    description:
      'Готовая основа аутентификации: email/пароль, подтверждение email, сброс пароля, безопасные серверные сессии через HttpOnly cookies, rate limiting на уровне маршрутов, пример на Prisma + PostgreSQL, отправка писем через Resend и демо-режим для локальной проверки.',
    ogLocale: 'ru_RU',
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isSupportedLocale(rawLocale ?? DEFAULT_LOCALE)
    ? (rawLocale ?? DEFAULT_LOCALE)
    : DEFAULT_LOCALE;

  const seo = locale === 'ru' ? AUTHFORGE_SEO.ru : AUTHFORGE_SEO.en;
  const canonical = `/${locale}/products/authforge`;

  return {
    title: seo.title,
    description: seo.description,

    alternates: {
      canonical,
      languages: {
        en: '/en/products/authforge',
        ru: '/ru/products/authforge',
      },
    },

    openGraph: {
      title: seo.title,
      description: seo.description,
      type: 'website',
      url: canonical,
      locale: seo.ogLocale,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: ['/og-image.png'],
    },
  };
}

export default function AuthForgeProductPage() {
  return <AuthForgeProductPageClient />;
}