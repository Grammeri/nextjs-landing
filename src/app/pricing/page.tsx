import { AuthForgePricingCard, NextJsTestKitPricingCard } from '@/shared/ui/product-pricing';
import styles from './page.module.css';

type PricingPageProps = {
  searchParams?: {
    product?: string;
  };
};

export default function PricingPage({ searchParams }: PricingPageProps) {
  const product = searchParams?.product;

  return (
    <section className={styles.page}>
      <div className={styles.grid}>
        {(!product || product === 'authforge') && (
          <div className={styles.card}>
            <AuthForgePricingCard />
          </div>
        )}

        {(!product || product === 'nextjs-test-kit') && (
          <div className={styles.card}>
            <NextJsTestKitPricingCard />
          </div>
        )}
      </div>
    </section>
  );
}
