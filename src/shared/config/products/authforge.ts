import type { PricingCardProps } from '@/shared/ui/pricing-card';

export const AUTHFORGE_PRODUCT_COPY = {
  name: 'AuthForge',
  shortDescription: 'Production-ready authentication system for modern SaaS products',
  supportEmail: 'support@software-forge.dev',
} as const;

export const AUTHFORGE_SUPPORT_EMAIL = AUTHFORGE_PRODUCT_COPY.supportEmail;

export const AUTHFORGE_PRICING_CARD: PricingCardProps = {
  title: AUTHFORGE_PRODUCT_COPY.name,
  description: AUTHFORGE_PRODUCT_COPY.shortDescription,
  price: '$99 — One-time license',
  features: [
    { text: '1 project' },
    { text: 'Lifetime access' },
    { text: 'Updates included' },
    { text: '14-day refund if access was not used' },
    { text: `Support via email (${AUTHFORGE_SUPPORT_EMAIL})` },
  ],
  footerNote: 'Access instructions will be sent by email after purchase',
};
