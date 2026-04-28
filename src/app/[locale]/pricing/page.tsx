import { getPricingPageItems } from '@/shared/config/products/pricing';
import PricingCardContainer from '@/components/pricing/PricingCardContainer';
import styles from './page.module.css';
import type { Metadata } from 'next';
import { getLocale } from '@/shared/lib/i18n/getLocale';
import { routes } from '@/shared/config/routes';

type PricingPageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams?: Promise<{
    product?: string;
  }>;
};

const PRICING_SEO = {
  en: {
    title: 'Pricing',
    description:
      'Choose a Software Forge product and purchase production-ready Next.js foundations for SaaS, authentication, and professional project setup.',
    ogLocale: 'en_US',
  },
  ru: {
    title: 'Цены',
    description:
      'Выберите продукт Software Forge и купите готовую основу для Next.js SaaS, аутентификации и профессионального старта проекта.',
    ogLocale: 'ru_RU',
  },
} as const;

export async function generateMetadata({ params }: Pick<PricingPageProps, 'params'>): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getLocale(localeParam);

  const seo = locale === 'ru' ? PRICING_SEO.ru : PRICING_SEO.en;
  const canonical = routes.pricing(locale);

  return {
    title: seo.title,
    description: seo.description,

    alternates: {
      canonical,
      languages: {
        en: routes.pricing('en'),
        ru: routes.pricing('ru'),
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

export default async function PricingPage({ params, searchParams }: PricingPageProps) {
  const { locale: localeParam } = await params;
  const resolvedSearchParams = await searchParams;
  const product = resolvedSearchParams?.product;
  const locale = getLocale(localeParam);
  const pricingItems = getPricingPageItems(locale);

  const visibleItems = pricingItems.filter((item) => !product || item.productId === product);

  return (
    <section className={styles.page}>
      <div className={styles.grid}>
        {visibleItems.map((item) => (
          <div key={item.productId} className={styles.card}>
            <PricingCardContainer productId={item.productId} card={item.card} locale={locale} />
          </div>
        ))}
      </div>
    </section>
  );
}
