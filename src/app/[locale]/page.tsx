import styles from '@/app/(marketing)/page.module.css';
import layoutStyles from '@/app/(marketing)/layout.module.css';
import { ProductsGrid } from '@/components/products-grid/ProductsGrid';

export default function HomePage() {
  return (
    <div className={layoutStyles.marketingLayout}>
      <main className={styles.page}>
        <section id="hero-section" className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1 className={styles.headline}>Production-ready Foundations & Developer Products</h1>
              <p className={styles.lead}>
                We build and sell production-ready foundations and developer products for engineers,
                startups, and product teams — designed to be easy to adopt, extend, and use in real
                production.
              </p>
            </div>
          </div>
        </section>
        <section className={styles.productsSection}>
          <div className="container-wide">
            <div className={styles.productsGrid}>
              <ProductsGrid />
            </div>
          </div>
        </section>
        <section className={styles.nextSection}></section>
      </main>
    </div>
  );
}
