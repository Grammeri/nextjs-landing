import Stripe from 'stripe';
import { hasEntitlementBySession, saveEntitlement } from './entitlement.store';
import { Entitlement } from './entitlement.types';
import { sendPurchaseEmail } from '@/shared/lib/email/send-purchase-email';

export async function grantAccessFromCheckoutSession(session: Stripe.Checkout.Session) {
  if (!session.id) {
    throw new Error('Checkout session has no id');
  }

  if (hasEntitlementBySession(session.id)) {
    console.log('[entitlement] already granted', session.id);
    return;
  }

  const email = session.customer_details?.email;
  if (!email) {
    throw new Error('No customer email in checkout session');
  }

  const entitlement: Entitlement = {
    email,
    product: 'authforge',
    access: 'lifetime',
    source: 'stripe',
    checkoutSessionId: session.id,
    createdAt: new Date(),
  };

  saveEntitlement(entitlement);

  console.log('[entitlement] granted', entitlement);
  await sendPurchaseEmail({
    to: email,
    product: 'authforge',
  });
}
