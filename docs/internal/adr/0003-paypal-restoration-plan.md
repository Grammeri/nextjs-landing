# ADR-0003 — PayPal Restoration Plan

This document records an architectural decision regarding temporarily deferring PayPal support while keeping the integration code preserved and ready for restoration.

---

## Context

The project currently ships with Stripe as the only enabled payment provider.

PayPal integration code is intentionally preserved in the codebase but disabled.

Reasons:

- Stripe is sufficient for initial launch
- PayPal requires additional business verification and setup
- Launch must remain minimal and stable
- Removing PayPal completely would create unnecessary rework later

Therefore, PayPal support is treated as a deferred feature, not deleted.

## Decision

PayPal is disabled at the configuration level.

The code remains present but is not exposed in the UI.

This ensures:

- no broken imports
- no dead code removal risk
- fast restoration once PayPal is ready

## Current State (Stripe-only)

PayPal is currently disabled via the billing configuration.

In `src/shared/config/billing.ts`:

```ts
export const BILLING_PROVIDERS = {
  stripe: true,
  paypal: false,
} as const;
```

All PayPal buttons are conditionally rendered based on this flag.

## Restoration Plan (Re-enable PayPal)

To restore PayPal support, follow these steps.

### Step 1 — Enable provider flag

File: `src/shared/config/billing.ts`

Change:

```ts
paypal: false
```

To:

```ts
paypal: true
```

### Step 2 — Re-enable PayPal button in pricing cards

File: `src/shared/ui/product-pricing/AuthForgePricingCard.tsx`

Ensure PayPal is passed only when enabled:

```ts
onPayWithPaypal={BILLING_PROVIDERS.paypal ? checkoutWithPaypal : undefined}
```

Apply the same pattern in:

- `src/shared/ui/product-pricing/NextJsTestKitPricingCard.tsx`

### Step 3 — Ensure checkout API accepts PayPal

File: `src/app/api/billing/checkout/route.ts`

Provider must allow:

```ts
provider: 'stripe' | 'paypal'
```

And PayPal catalog entries must be valid.

### Step 4 — Restore PayPal billing implementation

File: `src/lib/billing/paypal.ts`

Ensure the PayPal checkout creator is implemented and returns:

- `checkoutUrl`
- metadata support

### Step 5 — Restore webhook support (if needed)

If PayPal webhooks are introduced later, add:

- verification
- purchase entitlement logic

File location:

- `src/app/api/billing/webhook/route.ts`

## Status

Accepted (temporarily deferred).

Notes:

- PayPal is not removed, only hidden
- The codebase remains PayPal-ready
- Stripe launch remains clean and stable
- Restoration is a 5–10 minute change once PayPal is operational

Outcome:

The project ships with Stripe-only billing today, while keeping PayPal integration safely deferred for a future release.

