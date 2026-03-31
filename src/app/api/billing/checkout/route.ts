import 'server-only';

import { NextResponse } from 'next/server';
import { BILLING_PROVIDERS } from '@/shared/config/billing';
import { BILLING_CATALOG } from '@/shared/config/products/catalog';
import { createCheckout } from '@/lib/billing';
import { TERMS_VERSION } from '@/shared/config/legal';
import type { ProductId } from '@/shared/config/products/types';

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

    let body: CheckoutRequestBody;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    if (!body?.productId) {
      return NextResponse.json({ error: 'productId is required' }, { status: 400 });
    }

    if (!body?.provider) {
      return NextResponse.json({ error: 'provider is required' }, { status: 400 });
    }

    if (!body?.termsAccepted) {
      return NextResponse.json(
        { error: 'You must accept Terms of Service before checkout' },
        { status: 400 },
      );
    }

    // ----------------------------
    // Extract real client IP + UA
    // ----------------------------
    const forwarded = request.headers.get('x-forwarded-for');

    const ip = forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';

    const userAgent = request.headers.get('user-agent') ?? 'unknown';

    if (!BILLING_PROVIDERS[body.provider]) {
      return NextResponse.json(
        { error: `${body.provider} checkout is not enabled yet` },
        { status: 400 },
      );
    }

    const catalogItem = BILLING_CATALOG[body.productId as ProductId];

    if (!catalogItem) {
      return NextResponse.json({ error: 'Unknown productId' }, { status: 400 });
    }

    if (catalogItem.provider !== body.provider) {
      return NextResponse.json(
        {
          error: `Provider ${body.provider} is not enabled for product ${body.productId}`,
        },
        { status: 400 },
      );
    }

    const successUrl = `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&productId=${body.productId}`;
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
        clientIp: ip,
        clientUserAgent: userAgent,
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
