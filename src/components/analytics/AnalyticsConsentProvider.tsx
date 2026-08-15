'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { GA_MEASUREMENT_ID } from '@/shared/config/analytics';
import {
  type AnalyticsConsent,
  hasGrantedAnalyticsConsent,
  readAnalyticsConsent,
  setAnalyticsRuntimeEnabled,
  subscribeAnalyticsConsent,
  writeAnalyticsConsent,
} from '@/shared/lib/analytics/consent';

type AnalyticsConsentContextValue = {
  /** null until a stored decision exists (or after hydration with no decision). */
  consent: AnalyticsConsent | null;
  isReady: boolean;
  hasDecision: boolean;
  /** True when the consent banner should be visible (first visit or reopen). */
  isConsentPromptVisible: boolean;
  isAnalyticsAllowed: boolean;
  acceptAnalytics: () => void;
  rejectNonEssential: () => void;
  openPrivacyChoices: () => void;
};

const AnalyticsConsentContext = createContext<AnalyticsConsentContextValue | null>(null);

function getServerConsentSnapshot(): AnalyticsConsent | null {
  return null;
}

function subscribeNever(): () => void {
  return () => undefined;
}

function getClientTrue(): boolean {
  return true;
}

function getClientFalse(): boolean {
  return false;
}

export function AnalyticsConsentProvider({ children }: { children: ReactNode }) {
  const consent = useSyncExternalStore(
    subscribeAnalyticsConsent,
    readAnalyticsConsent,
    getServerConsentSnapshot,
  );

  // Avoid SSR/hydration flash: treat consent UI as ready only on the client.
  const isReady = useSyncExternalStore(subscribeNever, getClientTrue, getClientFalse);
  const [isPromptForced, setIsPromptForced] = useState(false);

  const acceptAnalytics = useCallback(() => {
    setAnalyticsRuntimeEnabled(true, GA_MEASUREMENT_ID);
    writeAnalyticsConsent('granted');
    setIsPromptForced(false);
  }, []);

  const rejectNonEssential = useCallback(() => {
    writeAnalyticsConsent('denied');
    setAnalyticsRuntimeEnabled(false, GA_MEASUREMENT_ID);
    setIsPromptForced(false);
  }, []);

  const openPrivacyChoices = useCallback(() => {
    setIsPromptForced(true);
  }, []);

  const value = useMemo<AnalyticsConsentContextValue>(
    () => ({
      consent,
      isReady,
      hasDecision: isReady && consent !== null,
      isConsentPromptVisible: isReady && (consent === null || isPromptForced),
      isAnalyticsAllowed: isReady && hasGrantedAnalyticsConsent(consent),
      acceptAnalytics,
      rejectNonEssential,
      openPrivacyChoices,
    }),
    [acceptAnalytics, consent, isPromptForced, isReady, openPrivacyChoices, rejectNonEssential],
  );

  return (
    <AnalyticsConsentContext.Provider value={value}>{children}</AnalyticsConsentContext.Provider>
  );
}

export function useAnalyticsConsent(): AnalyticsConsentContextValue {
  const context = useContext(AnalyticsConsentContext);

  if (!context) {
    throw new Error('useAnalyticsConsent must be used within AnalyticsConsentProvider');
  }

  return context;
}
