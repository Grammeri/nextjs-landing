'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { DocNavItem } from '../_lib/docs';
import styles from '../layout.module.css';

type SidebarNavProps = {
  items: DocNavItem[];
};

const resolveLocale = (pathname: string | null) => {
  const segments = pathname?.split('/').filter(Boolean) ?? [];
  return segments[0] ?? 'en';
};

const buildHref = (locale: string, slug?: string) => {
  if (!slug) {
    return null;
  }

  return `/${locale}/docs/authforge/${slug}`;
};

const isActivePath = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

export default function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname();
  const locale = resolveLocale(pathname);

  return (
    <ul className={styles.navList}>
      {items.map((item) => {
        const href = buildHref(locale, item.slug);
        const active = href ? isActivePath(pathname, href) : false;

        return (
          <li key={item.title} className={styles.navItem}>
            {href ? (
              <Link
                href={href}
                className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`}
              >
                {item.title}
              </Link>
            ) : (
              <span className={styles.navGroup}>{item.title}</span>
            )}

            {item.children?.length ? (
              <ul className={styles.navSubList}>
                {item.children.map((child) => {
                  const childHref = buildHref(locale, child.slug);
                  const childActive =
                    childHref && pathname ? isActivePath(pathname, childHref) : false;

                  return (
                    <li key={child.title}>
                      {childHref ? (
                        <Link
                          href={childHref}
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
