export type AnalyticsConsent = 'granted' | 'denied';

export const ANALYTICS_CONSENT_STORAGE_KEY = 'software_forge_analytics_consent';

/** Legacy informational banner key — must not grant analytics consent. */
export const LEGACY_COOKIE_NOTICE_STORAGE_KEY = 'cookie_notice_accepted';

const consentListeners = new Set<() => void>();

export function isAnalyticsConsent(value: string | null): value is AnalyticsConsent {
  return value === 'granted' || value === 'denied';
}

export function readAnalyticsConsent(): AnalyticsConsent | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const value = window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY);
    return isAnalyticsConsent(value) ? value : null;
  } catch {
    return null;
  }
}

export function writeAnalyticsConsent(consent: AnalyticsConsent): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, consent);
  } catch {
    // Ignore quota / private-mode failures; in-memory listeners still update this session.
  }

  consentListeners.forEach((listener) => listener());
}

export function subscribeAnalyticsConsent(listener: () => void): () => void {
  consentListeners.add(listener);

  const onStorage = (event: StorageEvent) => {
    if (event.key === ANALYTICS_CONSENT_STORAGE_KEY || event.key === null) {
      listener();
    }
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', onStorage);
  }

  return () => {
    consentListeners.delete(listener);
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', onStorage);
    }
  };
}

export function hasGrantedAnalyticsConsent(consent: AnalyticsConsent | null): boolean {
  return consent === 'granted';
}

type GtagConsentState = 'granted' | 'denied';

/**
 * Best-effort in-session opt-out/opt-in for GA4 after consent changes.
 * Unmounting the GA component alone may leave previously loaded gtag active.
 */
export function setAnalyticsRuntimeEnabled(enabled: boolean, measurementId: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  const disableKey = `ga-disable-${measurementId}`;
  (window as Window & Record<string, boolean>)[disableKey] = !enabled;

  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== 'function') {
    return;
  }

  const analyticsState: GtagConsentState = enabled ? 'granted' : 'denied';

  gtag('consent', 'update', {
    analytics_storage: analyticsState,
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
}
