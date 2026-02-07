import type { PricingCardProps } from '@/shared/ui/pricing-card';

export const AUTHFORGE_SUPPORT_EMAIL = 'support@software-forge.dev';

export const AUTHFORGE_PRICING_CARD: PricingCardProps = {
  title: 'AuthForge',
  description: 'Production-ready authentication system for modern SaaS products',
  price: '$99 — One-time license',
  features: [
    { text: '1 project' },
    { text: 'Lifetime access' },
    { text: 'Updates included' },
    { text: '14-day refund if access was not used' },
    { text: `Support via email (${AUTHFORGE_SUPPORT_EMAIL})` },
  ],
  ctaLabel: 'Buy license',
  ctaHref: '/pricing?product=authforge',
  footerNote: 'Access instructions will be sent by email after purchase',
};
