import { PRICING_CARDS } from '@/shared/config/products/pricing';
import { PricingCard } from '@/shared/ui/pricing-card';
import AuthForgePricingCard from '@/shared/ui/product-pricing/AuthForgePricingCard';
import styles from './page.module.css';

type PricingPageProps = {
  searchParams?: {
    product?: string;
  };
};

export default function PricingPage({ searchParams }: PricingPageProps) {
  const product = searchParams?.product;
  const nextJsTestKitCard = PRICING_CARDS.find(
    (card) => card.ctaHref === '/products/nextjs-test-kit',
  );

  return (
    <section className={styles.page}>
      <div className={styles.grid}>
        {(!product || product === 'authforge') && (
          <div className={styles.card}>
            <AuthForgePricingCard />
          </div>
        )}

        {(!product || product === 'nextjs-test-kit') && nextJsTestKitCard && (
          <div className={styles.card}>
            <PricingCard {...nextJsTestKitCard} />
          </div>
        )}
      </div>
    </section>
  );
}
