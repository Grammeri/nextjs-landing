import { NEXTJS_TEST_KIT_PRODUCT_COPY } from '@/shared/config/products/nextjs-test-kit';
import NextJsTestKitPricingCard from '@/shared/ui/product-pricing/NextJsTestKitPricingCard';
import { UnderDevelopment } from '@/shared/ui/under-development';
import styles from './page.module.css';

export default function NextJsTestKitPage() {
  return (
    <main className={styles.page}>
      <section className={styles.statusSection}>
        <UnderDevelopment
          title={NEXTJS_TEST_KIT_PRODUCT_COPY.underDevelopment.title}
          subtitle={NEXTJS_TEST_KIT_PRODUCT_COPY.underDevelopment.subtitle}
        />
      </section>

      <section className={styles.pricingSection}>
        <div className="container-wide">
          <div className={styles.pricingWrapper}>
            <NextJsTestKitPricingCard />
          </div>
        </div>
      </section>
    </main>
  );
}
