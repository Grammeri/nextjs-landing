import styles from './page.module.css';

export default function HomePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.headline}>AuthForge</h1>
          <p className={styles.subtitle}>
            Enterprise-grade authentication infrastructure for modern applications. Secure,
            scalable, and developer-friendly.
          </p>
          <ul className={styles.bullets}>
            <li>Enterprise-grade security standards</li>
            <li>Scalable infrastructure for any workload</li>
            <li>Developer-friendly APIs and integrations</li>
          </ul>
          <div className={styles.ctaRow}>
            <button type="button" className={styles.ctaButton}>
              Get started
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
