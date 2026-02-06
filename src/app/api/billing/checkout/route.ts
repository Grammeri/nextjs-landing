import { NextResponse } from 'next/server';
import { BILLING_CATALOG } from '@/shared/config/products/catalog';
import { createCheckout } from '@/lib/billing';

type CheckoutRequestBody = {
  productId: string;
  provider: 'stripe' | 'paypal';
};

export async function POST(request: Request) {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    if (!siteUrl || !siteUrl.startsWith('http')) {
      return NextResponse.json(
        { error: 'NEXT_PUBLIC_SITE_URL must include scheme (http/https)' },
        { status: 500 },
      );
    }

    const body = (await request.json()) as CheckoutRequestBody;

    if (!body?.productId) {
      return NextResponse.json({ error: 'productId is required' }, { status: 400 });
    }

    if (!body?.provider) {
      return NextResponse.json({ error: 'provider is required' }, { status: 400 });
    }

    const catalogItem = BILLING_CATALOG[body.productId];

    if (!catalogItem) {
      return NextResponse.json({ error: 'Unknown productId' }, { status: 400 });
    }

    if (catalogItem.provider !== body.provider) {
      return NextResponse.json(
        { error: `Provider ${body.provider} is not enabled for product ${body.productId}` },
        { status: 400 },
      );
    }

    const successUrl = `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${siteUrl}/pricing`;

    const result = await createCheckout({
      provider: catalogItem.provider,
      product: catalogItem.product,
      successUrl,
      cancelUrl,
    });

    return NextResponse.json({ checkoutUrl: result.checkoutUrl });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
