import Link from 'next/link';
import type { Metadata } from 'next';
import { routes } from '@/shared/config/routes';
import type { ProductId } from '@/shared/config/products/types';
import { getLocale } from '@/shared/lib/i18n/getLocale';
import { getCheckoutSuccessText } from '@/shared/lib/i18n/getCheckoutSuccessText';

type LocalizedCheckoutSuccessPageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    productId?: string;
  }>;
};

function isProductId(value: string): value is ProductId {
  return value === 'authforge' || value === 'starter';
}

const CHECKOUT_SUCCESS_METADATA = {
  en: {
    title: 'Payment successful — Software Forge',
  },
  ru: {
    title: 'Оплата прошла успешно — Software Forge',
  },
} as const;

export async function generateMetadata({
  params,
}: Pick<LocalizedCheckoutSuccessPageProps, 'params'>): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getLocale(localeParam);

  const title = locale === 'ru' ? CHECKOUT_SUCCESS_METADATA.ru.title : CHECKOUT_SUCCESS_METADATA.en.title;

  return {
    title,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function LocalizedCheckoutSuccessPage({
  params,
  searchParams,
}: LocalizedCheckoutSuccessPageProps) {
  const { locale: localeParam } = await params;
  const { productId } = await searchParams;
  const locale = getLocale(localeParam);
  const text = getCheckoutSuccessText(locale);

  const productTitle = productId && isProductId(productId) ? text.productTitles[productId] : text.fallbackProductTitle;

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '96px 24px', textAlign: 'center' }}>
      <h1 style={{ fontSize: 32, marginBottom: 16 }}>{text.title}</h1>

      <p style={{ fontSize: 18, marginBottom: 32 }}>
        {text.thankYouPrefix} <strong>{productTitle}</strong>.
        <br />
        {text.accessInstructions}
      </p>

      <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
        <Link href={routes.docs(locale)}>
          <button>{text.actions.readDocumentation}</button>
        </Link>

        <Link href={routes.pricing(locale)}>
          <button>{text.actions.backToPricing}</button>
        </Link>
      </div>
    </main>
  );
}
