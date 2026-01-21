import Link from 'next/link';
import styles from './page.module.css';

export default function DocsHomePage() {
  return (
    <section className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>Documentation</h1>
        <p className={styles.subtitle}>Technical documentation for Software Forge products.</p>

        <h2 className={styles.sectionTitle}>Content</h2>
        <ol className={styles.list}>
          <li>
            <Link href="/docs/authforge" className={styles.link}>
              AuthForge
            </Link>
          </li>
        </ol>
      </div>
    </section>
  );
}
