import type { CreateCheckoutParams, CreateCheckoutResult } from './types';
import { createStripeCheckout } from './stripe';
import { createPaypalCheckout } from './paypal';

export async function createCheckout(params: CreateCheckoutParams): Promise<CreateCheckoutResult> {
  switch (params.provider) {
    case 'stripe':
      return createStripeCheckout(params);
    case 'paypal':
      return createPaypalCheckout(params);
    default: {
      const _exhaustive: never = params.provider;
      return _exhaustive;
    }
  }
}

export type {
  BillingProvider,
  BillingProduct,
  CreateCheckoutParams,
  CreateCheckoutResult,
} from './types';
