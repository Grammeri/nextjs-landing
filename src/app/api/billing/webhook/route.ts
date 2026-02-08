import 'server-only';

import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { grantAccessFromCheckoutSession } from '@/lib/billing/grant-access';

export const runtime = 'nodejs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
});

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

        await grantAccessFromCheckoutSession(session);

        console.log('[webhook] checkout.session.completed', {
          id: session.id,
          customer_email: session.customer_details?.email ?? null,
          payment_status: session.payment_status,
        });

        break;
      }

      case 'checkout.session.async_payment_succeeded': {
        const session = event.data.object as Stripe.Checkout.Session;

        await grantAccessFromCheckoutSession(session);

        console.log('[webhook] async_payment_succeeded', {
          id: session.id,
          customer_email: session.customer_details?.email ?? null,
          payment_status: session.payment_status,
        });

        break;
      }

      case 'checkout.session.async_payment_failed': {
        const session = event.data.object as Stripe.Checkout.Session;

        console.warn('[webhook] async_payment_failed', {
          id: session.id,
          customer_email: session.customer_details?.email ?? null,
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
