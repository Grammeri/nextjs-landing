import type { ReactNode } from 'react';

import DocsAnchorScroll from './_components/DocsAnchorScroll';
import SidebarNav from './_components/SidebarNav';
import { DOCS_NAV_ITEMS } from './_lib/docs';
import styles from './layout.module.css';

type AuthForgeDocsLayoutProps = {
  children: ReactNode;
};

export default function AuthForgeDocsLayout({ children }: AuthForgeDocsLayoutProps) {
  return (
    <section className={styles.pageShell} data-docs-anchor-scope="authforge">
      <DocsAnchorScroll />
      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label="AuthForge documentation">
          <div className={styles.sidebarInner}>
            <SidebarNav items={DOCS_NAV_ITEMS} />
          </div>
        </aside>
        <div className={styles.divider} aria-hidden="true" />
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
}
