import type { CreateCheckoutParams, CreateCheckoutResult } from './types';

export async function createPaypalCheckout(
  _params: CreateCheckoutParams,
): Promise<CreateCheckoutResult> {
  throw new Error('PayPal checkout not implemented yet');
}
