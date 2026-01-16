import { Button } from '@/shared/ui/button';
import { DEMO_URL } from '@/shared/config/demo';
import styles from './page.module.css';

export default function AuthForgeDemoPage() {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h1>AuthForge Demo</h1>
        <p className={styles.bodyText}>Production-ready authentication system for SaaS</p>
      </header>
      <p className={styles.bodyText}>
        This demo runs a real instance of AuthForge in a separate environment.
      </p>

      <div className={styles.grid}>
        <p className={styles.bodyText}>You will be redirected to the live application.</p>
      </div>

      <div className={styles.actions}>
        <Button as="a" href={DEMO_URL} variant="primary">
          Open Live Demo
        </Button>
        <Button as="a" href="/products/authforge" variant="secondary">
          Back to Product Overview
        </Button>
      </div>
      <small>Demo data is temporary and may be reset.</small>
    </section>
  );
}
