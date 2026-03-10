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
          Explore a working AuthForge demo in a separate deployment.
        </p>
      </header>

      <ul className={styles.points}>
        <li className={styles.point}>
          Review the core authentication journey, including registration, login, logout, password
          reset, and session-based authentication flow.
        </li>
        <li className={styles.point}>
          Inspect session behavior and cookie handling in the browser while evaluating the same auth
          architecture used by the product.
        </li>
        <li className={styles.point}>
          Demo mode is a runtime configuration, not a separate codebase. External email side effects
          are stubbed, while the main authentication flow stays aligned with production behavior.
        </li>
        <li className={styles.point}>
          Demo behavior is controlled through environment configuration, including the
          `AUTH_DEMO_MODE` flag.
        </li>
      </ul>

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
