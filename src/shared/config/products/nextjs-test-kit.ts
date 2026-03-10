import type { PricingCardProps } from '@/shared/ui/pricing-card';

export const NEXTJS_TEST_KIT_PRODUCT_COPY = {
  name: 'Next.js Test Assignment Kit',
  shortDescription: 'Ready-to-use Next.js project for technical interviews',
  cardDescription:
    'Ready-to-use Next.js project for technical interviews and test assignments — with clean architecture, tooling, and real-world setup.',

  underDevelopment: {
    title: 'Next.js Test Assignment Kit',
    subtitle: 'This product is currently under development.',
  },

  pricing: {
    price: '$39 — One-time license',
    features: [
      'Real-world architecture',
      'Clean tooling & setup',
      'Hiring-focused structure',
      'Includes evaluation criteria & solution guide',
    ],
  },
} as const;

export const NEXTJS_TEST_KIT_PRICING_CARD: PricingCardProps = {
  title: NEXTJS_TEST_KIT_PRODUCT_COPY.name,
  description: NEXTJS_TEST_KIT_PRODUCT_COPY.shortDescription,
  price: NEXTJS_TEST_KIT_PRODUCT_COPY.pricing.price,
  features: NEXTJS_TEST_KIT_PRODUCT_COPY.pricing.features.map((text) => ({ text })),
};
