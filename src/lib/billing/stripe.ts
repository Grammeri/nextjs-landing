import Stripe from 'stripe';
import type { CreateCheckoutParams, CreateCheckoutResult } from './types';

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;

  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not defined');
  }

  return new Stripe(key, {
    apiVersion: '2026-01-28.clover',
  });
}

export async function createStripeCheckout(
  params: CreateCheckoutParams,
): Promise<CreateCheckoutResult> {
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: params.product.currency,
          product_data: {
            name: params.product.name,
            description: params.product.description,
          },
          unit_amount: params.product.amount,
        },
        quantity: 1,
      },
    ],

    // 🔗 связь с пользователем / заказом
    client_reference_id: params.clientReferenceId,

    // 📧 email попадёт в customer_details + receipt
    customer_email: params.customerEmail,

    // 🧠 metadata читаем в webhook
    metadata: params.metadata,

    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
  });

  if (!session.url) {
    throw new Error('Stripe session URL missing');
  }

  return { checkoutUrl: session.url };
}
