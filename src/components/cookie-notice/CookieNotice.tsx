'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAnalyticsConsent } from '@/components/analytics/AnalyticsConsentProvider';
import { routes } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button';
import styles from './CookieNotice.module.css';

export default function CookieNotice() {
  const pathname = usePathname();
  const { isReady, isConsentPromptVisible, acceptAnalytics, rejectNonEssential } =
    useAnalyticsConsent();

  if (!isReady || pathname?.startsWith('/demo') || !isConsentPromptVisible) {
    return null;
  }

  return (
    <div className={styles.notice} role="region" aria-live="polite" aria-label="Analytics consent">
      <div className={styles.inner}>
        <p className={styles.text}>
          We use essential technologies to keep this site working. With your permission, we also use
          Google Analytics to understand how visitors use Software Forge and improve the site. See our{' '}
          <Link href={`${routes.legal}#privacy`} className={styles.privacyLink}>
            Privacy Policy
          </Link>
          .
        </p>

        <div className={styles.actions}>
          <Button
            className={styles.cookieButton}
            onClick={rejectNonEssential}
            aria-label="Reject non-essential analytics"
          >
            Reject non-essential
          </Button>

          <Button
            className={styles.cookieButton}
            onClick={acceptAnalytics}
            aria-label="Accept analytics"
          >
            Accept analytics
          </Button>
        </div>
      </div>
    </div>
  );
}
