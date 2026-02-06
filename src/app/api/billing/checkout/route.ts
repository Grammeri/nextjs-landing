import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],

      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'AuthForge',
              description: 'Production-ready authentication system for modern SaaS products',
            },
            unit_amount: 9900, // $99.00 в центах
          },
          quantity: 1,
        },
      ],

      success_url: 'http://localhost:3000/pricing?success=1',
      cancel_url: 'http://localhost:3000/pricing?canceled=1',
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);

    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
