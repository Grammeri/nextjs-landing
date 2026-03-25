'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { getDocsRoute } from '../_lib/products';
import type { DocNavItem, DocsProduct } from '../_lib/types';
import styles from '../_styles/layout.module.css';

type SidebarNavProps = {
  items: DocNavItem[];
  product: DocsProduct;
  onLinkClick?: () => void;
};

const resolveLocale = (pathname: string | null) => {
  const segments = pathname?.split('/').filter(Boolean) ?? [];
  return segments[0] ?? 'en';
};

const buildHref = (locale: string, product: DocsProduct, slug?: string) => {
  if (!slug) {
    return null;
  }

  return `/${locale}${getDocsRoute(product, slug)}`;
};

const isActivePath = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

export default function SidebarNav({ items, product, onLinkClick }: SidebarNavProps) {
  const pathname = usePathname();
  const locale = resolveLocale(pathname);

  return (
    <ul className={styles.navList}>
      {items.map((item) => {
        const href = buildHref(locale, product, item.slug);
        const active = href ? isActivePath(pathname, href) : false;

        const hasActiveChild =
          item.children?.some((child) => {
            const childHref = buildHref(locale, product, child.slug);
            return childHref && pathname ? isActivePath(pathname, childHref) : false;
          }) ?? false;

        return (
          <li key={item.title} className={styles.navItem}>
            {href ? (
              <Link
                href={href}
                onClick={onLinkClick}
                className={`${styles.navGroup} ${styles.navLink} ${
                  active && !hasActiveChild ? styles.navLinkActive : ''
                }`}
              >
                {item.title}
              </Link>
            ) : (
              <span className={styles.navGroup}>{item.title}</span>
            )}

            {item.children?.length ? (
              <ul className={styles.navSubList}>
                {item.children.map((child) => {
                  const childHref = buildHref(locale, product, child.slug);
                  const childActive =
                    childHref && pathname ? isActivePath(pathname, childHref) : false;

                  return (
                    <li key={child.title}>
                      {childHref ? (
                        <Link
                          href={childHref}
                          onClick={onLinkClick}
                          className={`${styles.navLink} ${childActive ? styles.navLinkActive : ''}`}
                        >
                          {child.title}
                        </Link>
                      ) : (
                        <span className={styles.navGroup}>{child.title}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
