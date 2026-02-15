import 'server-only';

import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { sendPurchaseEmail } from '@/shared/lib/email/send-purchase-email';
import { TERMS_VERSION } from '@/shared/config/legal';

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
  'charge.refunded',
  'payment_intent.canceled',
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
    // ======================================================
    // 🔁 REFUND HANDLING
    // ======================================================

    if (event.type === 'charge.refunded' || event.type === 'payment_intent.canceled') {
      let paymentIntentId: string | null = null;

      if (event.type === 'charge.refunded') {
        const charge = event.data.object as Stripe.Charge;
        paymentIntentId = charge.payment_intent?.toString() ?? null;
      }

      if (event.type === 'payment_intent.canceled') {
        const pi = event.data.object as Stripe.PaymentIntent;
        paymentIntentId = pi.id;
      }

      if (!paymentIntentId) {
        return NextResponse.json({ received: true });
      }

      const order = await prisma.order.findFirst({
        where: {
          providerPaymentIntentId: paymentIntentId,
        },
      });

      if (!order) {
        console.warn('[webhook] refund received but order not found', {
          paymentIntentId,
        });
        return NextResponse.json({ received: true });
      }

      if (order.status === 'REFUNDED') {
        return NextResponse.json({ received: true });
      }

      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: 'REFUNDED',
        },
      });

      console.log('[webhook] order marked as REFUNDED', {
        orderId: order.id,
        paymentIntentId,
      });

      return NextResponse.json({ received: true });
    }

    // ======================================================
    // 💳 CHECKOUT HANDLING
    // ======================================================

    const session = event.data.object as Stripe.Checkout.Session;

    const sessionId = session.id;
    const email = session.customer_details?.email;
    const paymentIntentId = session.payment_intent?.toString();
    const eventId = event.id;

    if (!sessionId || !email) {
      console.warn('[webhook] skipped — missing sessionId or email', {
        sessionId,
        email,
      });
      return NextResponse.json({ received: true });
    }

    // 🔹 Idempotency check
    const existingOrder = await prisma.order.findUnique({
      where: {
        providerSessionId: sessionId,
      },
    });

    if (existingOrder) {
      console.log('[webhook] duplicate event ignored', { sessionId });
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

    // Получаем IP и UA из metadata
    const ip = session.metadata?.clientIp ?? null;
    const userAgent = session.metadata?.clientUserAgent ?? null;

    const termsVersion = session.metadata?.termsVersion ?? TERMS_VERSION;

    await prisma.order.create({
      data: {
        productId,
        buyerEmail: email,

        provider: 'STRIPE',
        providerSessionId: sessionId,
        providerEventId: eventId,
        providerPaymentIntentId: paymentIntentId,

        amount: session.amount_total ?? 0,
        currency: session.currency ?? 'usd',

        status: 'PAID',

        // Legal data
        termsAccepted: true,
        termsAcceptedAt: new Date(),
        termsVersion,
        termsAcceptedIp: ip,
        termsAcceptedUserAgent: userAgent,
      },
    });

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
