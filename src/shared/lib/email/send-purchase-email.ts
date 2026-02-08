import { PurchaseEmailPayload } from './types';

export async function sendPurchaseEmail(payload: PurchaseEmailPayload) {
  console.log('[email] purchase email sent', payload);
}
