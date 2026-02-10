import Stripe from 'stripe';
import { hasEntitlementBySession, saveEntitlement } from './entitlement.store';
import { Entitlement } from './entitlement.types';
import { sendPurchaseEmail } from '@/shared/lib/email/send-purchase-email';

/**
 * Результат выдачи доступа.
 * Явный контракт = наблюдаемость + тестируемость.
 */
export type GrantAccessResult =
  | {
      status: 'granted';
      product: string;
      email: string;
      checkoutSessionId: string;
    }
  | {
      status: 'already_granted';
      checkoutSessionId: string;
    }
  | {
      status: 'skipped';
      reason: string;
      checkoutSessionId?: string;
    };

export async function grantAccessFromCheckoutSession(
  session: Stripe.Checkout.Session,
): Promise<GrantAccessResult> {
  const sessionId = session.id;

  if (!sessionId) {
    return {
      status: 'skipped',
      reason: 'checkout session has no id',
    };
  }

  // 🔒 Idempotency — ключевое правило
  if (hasEntitlementBySession(sessionId)) {
    console.log('[grant-access] already granted', { sessionId });

    return {
      status: 'already_granted',
      checkoutSessionId: sessionId,
    };
  }

  const email = session.customer_details?.email;
  if (!email) {
    return {
      status: 'skipped',
      reason: 'no customer email in checkout session',
      checkoutSessionId: sessionId,
    };
  }

  const entitlement: Entitlement = {
    email,
    product: 'authforge',
    access: 'lifetime',
    source: 'stripe',
    checkoutSessionId: sessionId,
    createdAt: new Date(),
  };

  // 1️⃣ Сначала фиксируем доступ (критично)
  saveEntitlement(entitlement);

  console.log('[grant-access] granted', {
    product: entitlement.product,
    email,
    sessionId,
  });

  // 2️⃣ Email — best-effort
  try {
    await sendPurchaseEmail({
      to: email,
      product: entitlement.product,
    });

    console.log('[grant-access] purchase email sent', {
      email,
      sessionId,
    });
  } catch (err) {
    console.error('[grant-access] failed to send purchase email', {
      email,
      sessionId,
      error: err,
    });
  }

  return {
    status: 'granted',
    product: entitlement.product,
    email,
    checkoutSessionId: sessionId,
  };
}
