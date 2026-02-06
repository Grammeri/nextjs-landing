import Stripe from 'stripe';
import type { CreateCheckoutParams, CreateCheckoutResult } from './types';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
});

export async function createStripeCheckout(
  params: CreateCheckoutParams,
): Promise<CreateCheckoutResult> {
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
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
  });

  if (!session.url) {
    throw new Error('Stripe session URL missing');
  }

  return { checkoutUrl: session.url };
}
