import { PurchaseEmailPayload } from './types';

const PRODUCT_TITLES = {
  authforge: 'AuthForge',
  starter: 'Next.js Professional Starter',
} as const;

export async function sendPurchaseEmail(payload: PurchaseEmailPayload) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl || !siteUrl.startsWith('http')) {
    throw new Error('NEXT_PUBLIC_SITE_URL must include scheme (http/https)');
  }

  const productTitle = PRODUCT_TITLES[payload.product];
  const downloadUrl = `${siteUrl}/api/download/${payload.product}?token=${payload.downloadToken}`;

  console.log('[email] purchase email prepared', {
    to: payload.to,
    product: payload.product,
    productTitle,
    downloadUrl,
  });
}
