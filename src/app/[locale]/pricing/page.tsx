import { getPricingPageItems } from '@/shared/config/products/pricing';
import PricingCardContainer from '@/components/pricing/PricingCardContainer';
import styles from './page.module.css';
import { getLocale } from '@/shared/lib/i18n/getLocale';

type PricingPageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams?: Promise<{
    product?: string;
  }>;
};

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
