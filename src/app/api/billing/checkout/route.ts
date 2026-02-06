import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY is not defined');
}

if (!siteUrl) {
  throw new Error('NEXT_PUBLIC_SITE_URL is not defined');
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
});

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',

      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'AuthForge',
              description: 'Production-ready authentication system for modern SaaS products',
            },
            unit_amount: 9900, // $99.00
          },
          quantity: 1,
        },
      ],

      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/pricing`,
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);

    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
