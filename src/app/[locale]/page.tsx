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
              <h1 className={styles.headline}>
                Production-ready SaaS auth starter and Next.js starter kit
              </h1>
              <p className={styles.lead}>
                Software Forge builds production-ready developer foundations for teams shipping real
                products: a secure authentication starter for SaaS apps and a clean Next.js starter
                kit designed for fast setup, maintainable code, and confident extension.
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
