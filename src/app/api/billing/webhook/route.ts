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
    // 🔁 REFUND HANDLING (SAFE PARTIAL SUPPORT)
    // ======================================================

    if (event.type === 'charge.refunded') {
      const charge = event.data.object as Stripe.Charge;

      const paymentIntentId = charge.payment_intent?.toString() ?? null;

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

      /**
       * IMPORTANT:
       * Stripe charge.amount_refunded is cumulative.
       * We do NOT add it again.
       * We clamp to order.amount to prevent overflow.
       */
      const cumulativeRefunded = charge.amount_refunded ?? 0;

      const newRefundedAmount = Math.min(cumulativeRefunded, order.amount);

      let newStatus: 'PAID' | 'PARTIALLY_REFUNDED' | 'REFUNDED';

      if (newRefundedAmount === 0) {
        newStatus = 'PAID';
      } else if (newRefundedAmount < order.amount) {
        newStatus = 'PARTIALLY_REFUNDED';
      } else {
        newStatus = 'REFUNDED';
      }

      await prisma.order.update({
        where: { id: order.id },
        data: {
          refundedAmount: newRefundedAmount,
          status: newStatus,
        },
      });

      console.log('[webhook] refund processed', {
        orderId: order.id,
        paymentIntentId,
        refundedAmount: newRefundedAmount,
        status: newStatus,
      });

      return NextResponse.json({ received: true });
    }

    // ======================================================
    // ❌ CANCELED PAYMENT INTENT
    // ======================================================

    if (event.type === 'payment_intent.canceled') {
      const pi = event.data.object as Stripe.PaymentIntent;

      const order = await prisma.order.findFirst({
        where: {
          providerPaymentIntentId: pi.id,
        },
      });

      if (!order) {
        return NextResponse.json({ received: true });
      }

      await prisma.order.update({
        where: { id: order.id },
        data: {
          refundedAmount: order.amount,
          status: 'REFUNDED',
        },
      });

      console.log('[webhook] payment_intent.canceled → order marked REFUNDED');

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
        refundedAmount: 0,

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
