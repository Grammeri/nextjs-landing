import { AuthForgePricingCard, NextJsTestKitPricingCard } from '@/shared/ui/product-pricing';
import styles from './page.module.css';

type PricingPageProps = {
  searchParams?: Promise<{
    product?: string;
  }>;
};

export default async function PricingPage({ searchParams }: PricingPageProps) {
  const params = await searchParams;
  const product = params?.product;

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
