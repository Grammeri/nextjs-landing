import 'server-only';

import { NextResponse } from 'next/server';
import { BILLING_PROVIDERS } from '@/shared/config/billing';
import { BILLING_CATALOG } from '@/shared/config/products/catalog';
import { createCheckout } from '@/lib/billing';
import { TERMS_VERSION } from '@/shared/config/legal';

type CheckoutRequestBody = {
  productId: string;
  provider: 'stripe' | 'paypal';
  customerEmail?: string;
  clientReferenceId?: string;
  termsAccepted: boolean;
};

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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

    // 🔹 Серверная проверка согласия
    if (!body?.termsAccepted) {
      return NextResponse.json(
        { error: 'You must accept Terms of Service before checkout' },
        { status: 400 },
      );
    }

    // ✅ Feature flag guard (Stripe-only launch)
    if (!BILLING_PROVIDERS[body.provider]) {
      return NextResponse.json(
        { error: `${body.provider} checkout is not enabled yet` },
        { status: 400 },
      );
    }

    const catalogItem = BILLING_CATALOG[body.productId];

    if (!catalogItem) {
      return NextResponse.json({ error: 'Unknown productId' }, { status: 400 });
    }

    // Product-level provider validation
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

      metadata: {
        productId: body.productId,
        provider: body.provider,
        termsVersion: TERMS_VERSION,
      },

      customerEmail: body.customerEmail,
      clientReferenceId: body.clientReferenceId,
    });

    return NextResponse.json({ checkoutUrl: result.checkoutUrl });
  } catch (error) {
    console.error('[checkout] error:', error);

    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
