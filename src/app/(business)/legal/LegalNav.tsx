'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

const SECTIONS = [
  { id: 'terms', label: 'Terms' },
  { id: 'license', label: 'License' },
  { id: 'refund', label: 'Refund' },
  { id: 'privacy', label: 'Privacy' },
  { id: 'liability', label: 'Liability' },
  { id: 'contact', label: 'Contact' },
] as const;

export default function LegalNav() {
  const [active, setActive] = useState<string>('terms');

  useEffect(() => {
    const setFromHash = () => {
      const hash = window.location.hash.replace('#', '');
      setActive(hash || 'terms');
    };

    setFromHash();

    window.addEventListener('hashchange', setFromHash);
    return () => window.removeEventListener('hashchange', setFromHash);
  }, []);

  return (
    <div className={styles.legalNav}>
      <div className={styles.legalNavInner}>
        <nav className={styles.legalNavScroll} aria-label="Legal sections">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={active === section.id ? styles.active : ''}
            >
              {section.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
