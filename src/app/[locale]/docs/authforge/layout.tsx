import type { ReactNode } from 'react';

import SidebarNav from '../_components/SidebarNav';
import { getNav } from '../_engine/getNav';
import { getDocsProductConfig } from '../_lib/products';
import DocsAnchorScroll from './_components/DocsAnchorScroll';
import styles from './layout.module.css';

type AuthForgeDocsLayoutProps = {
  children: ReactNode;
};

export default async function AuthForgeDocsLayout({ children }: AuthForgeDocsLayoutProps) {
  const product = 'authforge';
  const nav = await getNav(product);
  const config = getDocsProductConfig(product);

  return (
    <section className={styles.pageShell} data-docs-scope={product}>
      <DocsAnchorScroll />
      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label={config.sidebarAriaLabel}>
          <div className={styles.sidebarInner}>
            <div className={styles.sidebarTitle}>{config.sidebarTitle}</div>
            <div className={styles.sidebarTitleDivider} />
            <SidebarNav items={nav} product={product} />
          </div>
        </aside>
        <div className={styles.divider} aria-hidden="true" />
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
}
