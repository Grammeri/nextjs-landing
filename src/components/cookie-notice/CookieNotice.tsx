'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import styles from './CookieNotice.module.css';

const STORAGE_KEY = 'cookie_notice_accepted';

export default function CookieNotice() {
  const pathname = usePathname();
  const [hasAccepted, setHasAccepted] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const accepted = window.localStorage.getItem(STORAGE_KEY) === 'true';
      setHasAccepted(accepted);
    } finally {
      setIsReady(true);
    }
  }, []);

  const handleAccept = () => {
    setHasAccepted(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, 'true');
    } catch {}
  };

  if (!isReady || pathname?.startsWith('/demo') || hasAccepted) {
    return null;
  }

  return (
    <div className={styles.notice} role="region" aria-live="polite">
      <div className={styles.inner}>
        <p className={styles.text}>We use essential cookies to ensure this site works properly.</p>

        <Button
          className={styles.cookieButton}
          onClick={handleAccept}
          aria-label="Accept cookie notice"
        >
          Got it
        </Button>
      </div>
    </div>
  );
}
