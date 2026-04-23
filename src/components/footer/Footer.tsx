'use client';

import styles from './Footer.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const footerLabels = {
  en: {
    origin: 'Engineered in Texas. Used worldwide.',
    contact: 'Contact us: support@software-forge.dev',
    legal: 'Legal',
  },
  ru: {
    origin: 'Разработано в Техасе. Используется по всему миру.',
    contact: 'Свяжитесь с нами: support@software-forge.dev',
    legal: 'Правовая информация',
  },
};

export default function Footer() {
  const pathname = usePathname();
  const locale = pathname.startsWith('/ru') ? 'ru' : 'en';
  const labels = footerLabels[locale];

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.center}>
          <span className={styles.copyright}>© 2025 Software Forge</span>
          <span className={styles.origin}>{labels.origin}</span>
          <span className={styles.contact}>{labels.contact}</span>
        </div>
        <div className={styles.right}>
          <Link href="/legal" className={styles.legalLink}>
            {labels.legal}
          </Link>
        </div>
      </div>
    </footer>
  );
}
