import 'server-only';

import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sendPurchaseEmail } from '@/shared/lib/email/send-purchase-email';
import { createIfNotExists } from '@/shared/lib/billing/entitlement.store';

export const runtime = 'nodejs';

function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not defined');
  }

  return new Stripe(secretKey, {
    apiVersion: '2026-01-28.clover',
  });
}

const HANDLED_EVENTS = new Set<string>([
  'checkout.session.completed',
  'checkout.session.async_payment_succeeded',
  'checkout.session.async_payment_failed',
]);

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json({ error: 'STRIPE_WEBHOOK_SECRET is not defined' }, { status: 500 });
  }

  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  const body = await request.text();

  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('[webhook] signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Если событие не из allowlist — молча подтверждаем (чтобы не засорять логи)
  if (!HANDLED_EVENTS.has(event.type)) {
    return NextResponse.json({ received: true });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        const sessionId = session.id;
        const email = session.customer_details?.email;

        if (!sessionId || !email) {
          console.warn('[webhook] checkout.session.completed skipped', {
            sessionId,
            email,
          });
          break;
        }

        const product = session.metadata?.productId ?? 'authforge';
        const provider = session.metadata?.provider ?? 'stripe';

        const result = await createIfNotExists({
          email,
          product,
          provider,
          checkoutSessionId: sessionId,
          access: true,
        });

        if (result.created) {
          await sendPurchaseEmail({ to: email, product });
        }

        console.log('[webhook] checkout.session.completed', {
          sessionId,
          payment_status: session.payment_status,
          created: result.created,
        });

        break;
      }

      case 'checkout.session.async_payment_succeeded': {
        const session = event.data.object as Stripe.Checkout.Session;

        const sessionId = session.id;
        const email = session.customer_details?.email;

        if (!sessionId || !email) {
          console.warn('[webhook] async_payment_succeeded skipped', {
            sessionId,
            email,
          });
          break;
        }

        const product = session.metadata?.productId ?? 'authforge';
        const provider = session.metadata?.provider ?? 'stripe';

        const result = await createIfNotExists({
          email,
          product,
          provider,
          checkoutSessionId: sessionId,
          access: true,
        });

        if (result.created) {
          await sendPurchaseEmail({ to: email, product });
        }

        console.log('[webhook] async_payment_succeeded', {
          sessionId,
          payment_status: session.payment_status,
          created: result.created,
        });

        break;
      }

      case 'checkout.session.async_payment_failed': {
        const session = event.data.object as Stripe.Checkout.Session;

        console.warn('[webhook] async_payment_failed', {
          sessionId: session.id,
          payment_status: session.payment_status,
          amount_total: session.amount_total,
          currency: session.currency,
        });

        break;
      }

      default:
        return NextResponse.json({ received: true });
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('[webhook] handler error:', err);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
