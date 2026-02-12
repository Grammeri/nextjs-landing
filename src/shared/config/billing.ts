// src/shared/config/billing.ts

export const BILLING_PROVIDERS = {
  stripe: true,
  paypal: false,
} as const;

export type BillingProvider = keyof typeof BILLING_PROVIDERS;
