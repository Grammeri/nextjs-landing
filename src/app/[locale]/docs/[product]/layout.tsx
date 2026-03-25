import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';

import DocsAnchorScroll from '../_components/DocsAnchorScroll';
import DocsLayoutClient from '../_components/DocsLayoutClient';
import { getNav } from '../_engine/getNav';
import { getDocsProductConfig, isDocsProduct } from '../_lib/products';
import styles from '../_styles/layout.module.css';

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

      <DocsLayoutClient
        nav={nav}
        product={product}
        sidebarTitle={config.sidebarTitle}
        sidebarAriaLabel={config.sidebarAriaLabel}
      >
        {children}
      </DocsLayoutClient>
    </section>
  );
}
