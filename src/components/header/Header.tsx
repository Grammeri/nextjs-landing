'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

function getHeaderHeightPx() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--header-height').trim();
  const value = Number.parseInt(raw, 10);
  return Number.isFinite(value) ? value : 72;
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

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

    update(); // initial state (important for reload on scrolled page)
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
          <Link href="/" className={styles.brand}>
            Software Forge
          </Link>
          <nav className={styles.nav}>
            <Link href="/docs" className={styles.navLink}>
              Docs
            </Link>
            <Link href="/pricing" className={styles.navLink}>
              Pricing
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
