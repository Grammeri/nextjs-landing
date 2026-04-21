import { PRICING_PAGE_ITEMS } from '@/shared/config/products/pricing';
import PricingCardContainer from '@/app/(business)/pricing/_components/PricingCardContainer';
import styles from '@/app/(business)/pricing/page.module.css';

type PricingPageProps = {
  searchParams?: Promise<{
    product?: string;
  }>;
};

export default async function PricingPage({ searchParams }: PricingPageProps) {
  const params = await searchParams;
  const product = params?.product;

  const visibleItems = PRICING_PAGE_ITEMS.filter((item) => !product || item.productId === product);

  return (
    <section className={styles.page}>
      <div className={styles.grid}>
        {visibleItems.map((item) => (
          <div key={item.productId} className={styles.card}>
            <PricingCardContainer productId={item.productId} card={item.card} />
          </div>
        ))}
      </div>
    </section>
  );
}
