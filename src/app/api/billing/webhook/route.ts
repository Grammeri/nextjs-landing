import 'server-only';

import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sendPurchaseEmail } from '@/shared/lib/email/send-purchase-email';

export const runtime = 'nodejs';

// ----------------------------
// Stripe instance
// ----------------------------

function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not defined');
  }

  return new Stripe(secretKey, {
    apiVersion: '2026-01-28.clover',
  });
}

// ----------------------------
// Supported products
// ----------------------------

const ALLOWED_PRODUCTS = ['authforge', 'nextjs-test-kit'] as const;
type AllowedProduct = (typeof ALLOWED_PRODUCTS)[number];

// ----------------------------
// Supported events
// ----------------------------

const HANDLED_EVENTS = new Set<string>([
  'checkout.session.completed',
  'checkout.session.async_payment_succeeded',
]);

// ----------------------------
// Webhook handler
// ----------------------------

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

  if (!HANDLED_EVENTS.has(event.type)) {
    return NextResponse.json({ received: true });
  }

  try {
    const session = event.data.object as Stripe.Checkout.Session;

    const sessionId = session.id;
    const email = session.customer_details?.email;

    if (!sessionId || !email) {
      console.warn('[webhook] skipped — missing sessionId or email', {
        sessionId,
        email,
      });
      return NextResponse.json({ received: true });
    }

    const rawProductId = session.metadata?.productId;

    if (!rawProductId || !ALLOWED_PRODUCTS.includes(rawProductId as AllowedProduct)) {
      console.warn('[webhook] unknown or missing productId', {
        sessionId,
        rawProductId,
      });
      return NextResponse.json({ received: true });
    }

    const productId = rawProductId as AllowedProduct;

    // 🔹 Send email with ZIP link
    await sendPurchaseEmail({
      to: email,
      product: productId,
    });

    console.log('[webhook] purchase processed', {
      sessionId,
      product: productId,
      payment_status: session.payment_status,
      email_sent: true,
    });

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('[webhook] handler error:', err);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
