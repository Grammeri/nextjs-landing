import type { PricingCardProps } from '@/shared/ui/pricing-card';

export const STARTER_PRODUCT_COPY = {
  productId: 'starter',

  name: 'Next.js Professional Starter',

  shortDescription:
    'Clean, production-ready Next.js project foundation for developers and students.',

  cardDescription:
    'A polished Next.js project starter with clean architecture, modern tooling, and a predictable project structure. Perfect for new projects, learning modern practices, or completing technical assignments.',

  underDevelopment: {
    title: 'Next.js Professional Starter',
    subtitle: 'This product is currently under development.',
  },

  pricing: {
    price: '$5 — One-time license',

    features: [
      'Clean project architecture',
      'TypeScript strict configuration',
      'ESLint + Prettier setup',
      'Husky Git hooks',
      'Conventional commits',
      'CI workflow included',
      'Production-ready project structure',
      'Great starting point for projects and technical assignments',
    ],
  },
} as const;

export const STARTER_PRICING_CARD: PricingCardProps = {
  title: STARTER_PRODUCT_COPY.name,
  description: STARTER_PRODUCT_COPY.shortDescription,
  price: STARTER_PRODUCT_COPY.pricing.price,
  features: STARTER_PRODUCT_COPY.pricing.features.map((text) => ({ text })),
};
