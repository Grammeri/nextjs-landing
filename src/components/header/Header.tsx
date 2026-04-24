'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  getLocaleFromPathname,
  getLocalizedHref,
  type Locale,
} from '@/shared/lib/i18n/localizedHref';

import { LanguageDropdown } from './LanguageDropdown';
import styles from './Header.module.css';

const headerLabels = {
  en: {
    docs: 'Docs',
    pricing: 'Pricing',
  },
  ru: {
    docs: 'Документация',
    pricing: 'Цены',
  },
} as const satisfies Record<Locale, { docs: string; pricing: string }>;

function getHeaderHeightPx() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--header-height').trim();
  const value = Number.parseInt(raw, 10);

  return Number.isFinite(value) ? value : 72;
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const locale = getLocaleFromPathname(pathname);
  const labels = headerLabels[locale];

  const homeHref = getLocalizedHref(locale, '/');
  const docsHref = getLocalizedHref(locale, '/docs');
  const pricingHref = getLocalizedHref(locale, '/pricing');

  useEffect(() => {
    const headerHeight = getHeaderHeightPx();
    const threshold = Math.max(1, Math.floor(headerHeight / 2));

    let raf = 0;

    const update = () => {
      raf = 0;
      setIsScrolled(window.scrollY > threshold);
    };

    const onScroll = () => {
      if (raf) return;

      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      if (raf) window.cancelAnimationFrame(raf);

      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className="container">
        <div className={styles.inner}>
          <Link href={homeHref} className={styles.brand}>
            Software Forge
          </Link>

          <nav className={styles.nav} aria-label="Main navigation">
            <Link href={docsHref} className={styles.navLink}>
              {labels.docs}
            </Link>

            <Link href={pricingHref} className={styles.navLink}>
              {labels.pricing}
            </Link>

            <LanguageDropdown />
          </nav>
        </div>
      </div>
    </header>
  );
}