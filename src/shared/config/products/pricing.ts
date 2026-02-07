import type { PricingCardProps } from '@/shared/ui/pricing-card';
import { AUTHFORGE_PRICING_CARD } from './authforge';

export const PRICING_CARDS: PricingCardProps[] = [
  AUTHFORGE_PRICING_CARD,
  {
    title: 'Next.js Test Assignment Kit',
    description: 'Ready-to-use Next.js project for technical interviews',
    price: '$39 — One-time license',
    features: [
      { text: 'Real-world architecture' },
      { text: 'Clean tooling & setup' },
      { text: 'Hiring-focused structure' },
      { text: 'Includes evaluation criteria & solution guide' },
    ],
  },
];
