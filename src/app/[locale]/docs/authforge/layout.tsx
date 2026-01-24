import type { ReactNode } from 'react';

import DocsAnchorScroll from './_components/DocsAnchorScroll';
import SidebarNav from './_components/SidebarNav';
import { getNav } from '../_engine/getNav';
import styles from './layout.module.css';

type AuthForgeDocsLayoutProps = {
  children: ReactNode;
};

export default async function AuthForgeDocsLayout({ children }: AuthForgeDocsLayoutProps) {
  const nav = await getNav('authforge');

  return (
    <section className={styles.pageShell} data-docs-scope="authforge">
      <DocsAnchorScroll />
      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label="AuthForge documentation">
          <div className={styles.sidebarInner}>
            <SidebarNav items={nav} />
          </div>
        </aside>
        <div className={styles.divider} aria-hidden="true" />
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
}
