import Stripe from 'stripe';
import { hasEntitlementBySession, saveEntitlement } from './entitlement.store';
import { Entitlement } from './entitlement.types';
import { sendPurchaseEmail } from '@/shared/lib/email/send-purchase-email';

export async function grantAccessFromCheckoutSession(session: Stripe.Checkout.Session) {
  const sessionId = session.id;

  if (!sessionId) {
    throw new Error('Checkout session has no id');
  }

  // 🔒 Idempotency — самое важное правило
  if (hasEntitlementBySession(sessionId)) {
    console.log('[entitlement] already granted', sessionId);
    return;
  }

  const email = session.customer_details?.email;
  if (!email) {
    throw new Error(`No customer email in checkout session ${sessionId}`);
  }

  const entitlement: Entitlement = {
    email,
    product: 'authforge',
    access: 'lifetime',
    source: 'stripe',
    checkoutSessionId: sessionId,
    createdAt: new Date(),
  };

  // 1️⃣ СНАЧАЛА сохраняем доступ (критично)
  saveEntitlement(entitlement);

  console.log('[entitlement] granted', entitlement);

  // 2️⃣ Email — best-effort, НЕ ломает оплату
  try {
    await sendPurchaseEmail({
      to: email,
      product: 'authforge',
    });

    console.log('[email] purchase email sent', {
      to: email,
      sessionId,
    });
  } catch (err) {
    console.error('[email] failed to send purchase email', {
      to: email,
      sessionId,
      error: err,
    });
  }
}
