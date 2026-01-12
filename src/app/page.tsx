import styles from './page.module.css';
import { AuthForgeCard } from '@/components/authforge-card/AuthForgeCard';
import { TestAssignmentKitCard } from '@/components/test-assignment-kit-card/TestAssignmentKitCard';
import { PlaceholderProductCard } from '@/components/placeholder-product-card/PlaceholderProductCard';

export default function HomePage() {
  return (
    <main className={styles.page}>
      <section id="hero-section" className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.headline}>Production-ready SaaS & Boilerplates</h1>
            <p className={styles.lead}>
              We build and sell modern boilerplates and production-ready SaaS applications for
              developers, startups, and product teams — designed to be easy to learn from and ready
              for real production.
            </p>
          </div>
        </div>
      </section>
      <section className={styles.productsSection}>
        <div className="container-wide">
          <div className={styles.productsGrid}>
            <AuthForgeCard />
            <TestAssignmentKitCard />
            <PlaceholderProductCard />
            <PlaceholderProductCard />
          </div>
        </div>
      </section>
      <section className={styles.nextSection}></section>
      <footer className={styles.footer}>
        <div className="container">
          <span>© 2026 Software Forge</span>
          <span>Engineered in Texas. Used worldwide.</span>
        </div>
      </footer>
    </main>
  );
}
