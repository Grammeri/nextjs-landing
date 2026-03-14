import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';

import SidebarNav from '../_components/SidebarNav';
import { getNav } from '../_engine/getNav';
import { getDocsProductConfig, isDocsProduct } from '../_lib/products';
import DocsAnchorScroll from '../authforge/_components/DocsAnchorScroll';
import styles from '../authforge/layout.module.css';

type DocsProductLayoutProps = {
  children: ReactNode;
  params: Promise<{
    product: string;
  }>;
};

export default async function DocsProductLayout({ children, params }: DocsProductLayoutProps) {
  const { product } = await params;

  if (!isDocsProduct(product)) {
    notFound();
  }

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
