import type { ReactNode } from 'react';

import SidebarNav from './_components/SidebarNav';
import { DOCS_NAV_ITEMS } from './_lib/docs';
import styles from './layout.module.css';

type AuthForgeDocsLayoutProps = {
  children: ReactNode;
  params: {
    locale: string;
  };
};

export default async function AuthForgeDocsLayout({ children, params }: AuthForgeDocsLayoutProps) {
  const { locale } = await params;

  return (
    <section className={styles.pageShell}>
      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label="AuthForge documentation">
          <div className={styles.sidebarInner}>
            <SidebarNav locale={locale} items={DOCS_NAV_ITEMS} />
          </div>
        </aside>
        <div className={styles.divider} aria-hidden="true" />
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
}
