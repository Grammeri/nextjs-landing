'use client';

import { useState, type ReactNode } from 'react';

import styles from '../_styles/layout.module.css';
import SidebarNav from './SidebarNav';
import type { DocNavItem, DocsProduct } from '../_lib/types';

type Props = {
  nav: DocNavItem[];
  product: DocsProduct;
  sidebarTitle: string;
  sidebarAriaLabel: string;
  children: ReactNode;
};

export default function DocsLayoutClient({
  nav,
  product,
  sidebarTitle,
  sidebarAriaLabel,
  children,
}: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className={styles.mobileTopbar}>
        <button
          className={styles.mobileMenuButton}
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open navigation"
        >
          <span className={styles.mobileMenuIcon} aria-hidden="true">
            <span className={styles.mobileMenuLine} />
            <span className={styles.mobileMenuLine} />
            <span className={styles.mobileMenuLine} />
          </span>
        </button>
      </div>

      <div className={styles.layout}>
        <aside
          className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}
          aria-label={sidebarAriaLabel}
        >
          <div className={styles.sidebarInner}>
            <div className={styles.sidebarTitle}>{sidebarTitle}</div>
            <div className={styles.sidebarTitleDivider} />

            <SidebarNav items={nav} product={product} onLinkClick={() => setIsSidebarOpen(false)} />
          </div>
        </aside>

        {isSidebarOpen && (
          <div className={styles.overlay} onClick={() => setIsSidebarOpen(false)} />
        )}

        <div className={styles.divider} aria-hidden="true" />

        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
}
