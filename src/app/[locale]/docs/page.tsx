import { use } from 'react';
import Link from 'next/link';
import { getDocsEntryRoute } from './_lib/products';
import styles from './page.module.css';

type DocsIndexPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default function DocsIndexPage({ params }: DocsIndexPageProps) {
  const { locale } = use(params);

  const authforgeDocsHref = `/${locale}${getDocsEntryRoute('authforge')}`;
  const starterDocsHref = `/${locale}${getDocsEntryRoute('starter')}`;

  return (
    <main className={styles.page}>
      <div className="container">
        <section className={styles.panel} aria-labelledby="docs-index-title">
          <h1 id="docs-index-title" className={styles.title}>
            Documentation
          </h1>

          <ul className={styles.list}>
            <li className={styles.item}>
              <Link className={styles.link} href={authforgeDocsHref}>
                AuthForge
              </Link>
            </li>

            <li className={styles.item}>
              <Link className={styles.link} href={starterDocsHref}>
                Starter
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
