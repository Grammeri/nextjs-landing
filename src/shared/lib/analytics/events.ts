import { sendGAEvent } from '@next/third-parties/google';
import type { Locale } from '@/shared/config/i18n';
import { hasGrantedAnalyticsConsent, readAnalyticsConsent } from '@/shared/lib/analytics/consent';

export const STARTER_PRODUCT_VERSION = '1.0.0';

/**
 * Fires once per Starter free-download click when analytics consent is granted.
 * Never throws and never blocks the ZIP download navigation.
 */
export function trackStarterFreeDownload(locale: Locale): void {
  if (!hasGrantedAnalyticsConsent(readAnalyticsConsent())) {
    return;
  }

  try {
    sendGAEvent('event', 'starter_free_download', {
      product_id: 'starter',
      product_version: STARTER_PRODUCT_VERSION,
      locale,
    });
  } catch {
    // Ignore analytics failures so download UX stays unaffected.
  }
}
