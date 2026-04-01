import { PurchaseEmailPayload } from './types';

const PRODUCT_TITLES = {
  authforge: 'AuthForge',
  starter: 'Next.js Professional Starter',
} as const;

type ResendSendEmailResponse = {
  id?: string;
  error?: {
    message?: string;
    name?: string;
  };
};

export async function sendPurchaseEmail(payload: PurchaseEmailPayload) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const resendApiKey = process.env.RESEND_API_KEY;
  const emailFrom = process.env.EMAIL_FROM;

  if (!siteUrl || !siteUrl.startsWith('http')) {
    throw new Error('NEXT_PUBLIC_SITE_URL must include scheme (http/https)');
  }

  if (!resendApiKey) {
    throw new Error('RESEND_API_KEY is not defined');
  }

  if (!emailFrom) {
    throw new Error('EMAIL_FROM is not defined');
  }

  const productTitle = PRODUCT_TITLES[payload.product];
  const downloadUrl = `${siteUrl}/api/download/${payload.product}?token=${payload.downloadToken}`;

  const subject = `${productTitle} — access instructions`;
  const text = [
    `Thank you for purchasing ${productTitle}.`,
    '',
    'Your download link:',
    downloadUrl,
    '',
    'If the link does not open directly, copy and paste it into your browser.',
    '',
    'Software Forge',
  ].join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
      <h2 style="margin-bottom: 16px;">Thank you for purchasing ${productTitle}</h2>
      <p>Your access instructions are ready.</p>
      <p>
        <a
          href="${downloadUrl}"
          style="
            display: inline-block;
            padding: 12px 18px;
            background: #0f62fe;
            color: #ffffff;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
          "
        >
          Download ${productTitle}
        </a>
      </p>
      <p style="margin-top: 16px;">
        Or use this link directly:<br />
        <a href="${downloadUrl}">${downloadUrl}</a>
      </p>
      <p style="margin-top: 24px;">Software Forge</p>
    </div>
  `;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: emailFrom,
      to: [payload.to],
      subject,
      text,
      html,
    }),
  });

  const result = (await response.json()) as ResendSendEmailResponse;

  if (!response.ok || result.error) {
    throw new Error(result.error?.message || 'Failed to send purchase email');
  }

  console.log('[email] purchase email sent', {
    to: payload.to,
    product: payload.product,
    resendId: result.id ?? null,
  });
}
