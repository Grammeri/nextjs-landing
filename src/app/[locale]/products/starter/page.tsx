import { DEFAULT_LOCALE, isSupportedLocale } from '@/shared/config/i18n';
import type { Metadata } from 'next';

import StarterProductPageClient from './StarterProductPageClient';

type PageProps = {
  params: Promise<{
    locale?: string;
  }>;
};

const STARTER_SEO = {
  en: {
    title: 'Next.js Professional Starter — clean App Router baseline',
    description:
      'Clean Next.js App Router starter kit for real projects and technical assignments: TypeScript, ESLint, Prettier, Husky, lint-staged, Conventional Commits, pnpm check, CI-ready workflow, VS Code settings, and EditorConfig.',
    ogLocale: 'en_US',
  },
  ru: {
    title: 'Next.js Professional Starter — база для App Router проекта',
    description:
      'Чистая основа Next.js App Router для реальных проектов и тестовых заданий: TypeScript, ESLint, Prettier, Husky, lint-staged, Conventional Commits, pnpm check, готовый CI workflow, настройки VS Code и EditorConfig.',
    ogLocale: 'ru_RU',
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isSupportedLocale(rawLocale ?? DEFAULT_LOCALE)
    ? (rawLocale ?? DEFAULT_LOCALE)
    : DEFAULT_LOCALE;

  const seo = locale === 'ru' ? STARTER_SEO.ru : STARTER_SEO.en;
  const canonical = `/${locale}/products/starter`;

  return {
    title: seo.title,
    description: seo.description,

    alternates: {
      canonical,
      languages: {
        en: '/en/products/starter',
        ru: '/ru/products/starter',
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

export default function StarterPage() {
  return <StarterProductPageClient />;
}
