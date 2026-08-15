'use client';

import { GoogleAnalytics } from '@next/third-parties/google';
import { GA_MEASUREMENT_ID } from '@/shared/config/analytics';
import { useAnalyticsConsent } from '@/components/analytics/AnalyticsConsentProvider';

/**
 * Loads GA4 only after analytics consent is granted.
 * Does not render the GoogleAnalytics tag before consent or when consent is denied.
 */
export default function ConsentedGoogleAnalytics() {
  const { isReady, isAnalyticsAllowed } = useAnalyticsConsent();

  if (!isReady || !isAnalyticsAllowed) {
    return null;
  }

  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
}
