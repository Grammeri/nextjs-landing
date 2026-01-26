import Link from 'next/link';
import styles from './page.module.css';

type DocsIndexPageProps = {
  params: {
    locale: string;
  };
};

export default function DocsIndexPage({ params }: DocsIndexPageProps) {
  const { locale } = params;

  return (
    <main className={styles.page}>
      <div className="container">
        <section className={styles.panel} aria-labelledby="docs-index-title">
          <h1 id="docs-index-title" className={styles.title}>
            Documentation
          </h1>
          <ol className={styles.list}>
            <li className={styles.item}>
              <Link className={styles.link} href={`/${locale}/docs/authforge`}>
                AuthForge
              </Link>
            </li>
          </ol>
        </section>
      </div>
    </main>
  );
}
