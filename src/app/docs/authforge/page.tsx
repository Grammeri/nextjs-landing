import styles from './page.module.css';

export default function AuthForgeDocsPage() {
  return (
    <section className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>AuthForge</h1>
        <p className={styles.subtitle}>
          Production-ready authentication system for modern SaaS products.
        </p>

        <h2 className={styles.sectionTitle}>Overview</h2>
        <p className={styles.paragraph}>
          AuthForge is a production-ready authentication system designed for modern SaaS products,
          with a clean architecture and practical implementation details.
        </p>

        <h2 className={styles.sectionTitle}>What this documentation covers</h2>
        <ul className={styles.list}>
          <li>Architecture overview</li>
          <li>Authentication flows</li>
          <li>Demo vs production differences</li>
          <li>Environment variables</li>
          <li>Local development setup</li>
        </ul>

        <h2 className={styles.sectionTitle}>Getting started</h2>
        <p className={styles.paragraph}>Coming next</p>
      </div>
    </section>
  );
}
