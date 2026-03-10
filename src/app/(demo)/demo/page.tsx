import { Button } from '@/shared/ui/button';
import { DEMO_URL } from '@/shared/config/demo';
import { AUTHFORGE_PRODUCT_COPY } from '@/shared/config/products/authforge';
import styles from './page.module.css';

export default function AuthForgeDemoPage() {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h1>{AUTHFORGE_PRODUCT_COPY.name} Demo</h1>
        <p className={styles.subtitle}>
          Explore a working demo environment of AuthForge in a separate deployment.
        </p>
      </header>
      <p className={styles.bodyText}>
        This demo lets you review the core authentication journey, including registration, login,
        logout, password reset, and session-based authentication flow.
      </p>
      <p className={styles.demoNote}>
        The demo uses PostgreSQL as a reference database, while AuthForge itself is designed to stay
        database-agnostic in real projects.
      </p>

      <div className={styles.grid}>
        <p className={styles.redirectNote}>You will be redirected to the live demo application.</p>
      </div>

      <div className={styles.actions}>
        <Button as="a" href={DEMO_URL} variant="primary" target="_blank" rel="noopener noreferrer">
          Open Live Demo
        </Button>

        <Button as="a" href="/products/authforge" variant="secondary">
          Back to Product Overview
        </Button>
      </div>
    </section>
  );
}
