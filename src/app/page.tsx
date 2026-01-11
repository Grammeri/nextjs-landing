import styles from './page.module.css';

export default function HomePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroFooter}>
          <span>© 2026 Software Forge</span>
          <span>Made in Texas</span>
        </div>
      </section>
    </main>
  );
}
