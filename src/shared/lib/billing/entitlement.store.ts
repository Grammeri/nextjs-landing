import { Entitlement } from './entitlement.types';

const entitlements = new Map<string, Entitlement>();

export function hasEntitlementBySession(sessionId: string): boolean {
  return entitlements.has(sessionId);
}

export function saveEntitlement(entitlement: Entitlement) {
  entitlements.set(entitlement.checkoutSessionId, entitlement);
}

export function getEntitlements() {
  return Array.from(entitlements.values());
}
