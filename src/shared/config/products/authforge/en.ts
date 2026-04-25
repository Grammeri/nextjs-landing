import type { ProductCopy } from '@/shared/config/marketing/types';

export const authforgeEn: ProductCopy = {
  productId: 'authforge',
  name: 'AuthForge',
  shortDescription:
    'Production-ready authentication starter for SaaS apps with email/password auth, email verification, password reset, secure sessions, rate limiting, and a Prisma + PostgreSQL reference implementation',
  supportEmail: 'support@software-forge.dev',
  actions: {
    viewDemo: 'View Demo',
    readDocs: 'Read Docs',
    buyLicense: 'Buy license',
  },
  sectionTitles: {
    audience: 'Who is AuthForge for',
    included: 'What’s included',
    howItWorks: 'How it works',
    tryBeforeYouBuy: 'Try before you buy',
  },
  hero: {
    trustTitle: 'Built for SaaS teams shipping real products',
    trustDescription:
      'AuthForge gives you a production-ready authentication foundation without forcing your team to build the core auth layer from scratch.\n\n' +
      'It includes the flows most SaaS products need from day one: email/password sign-up, email verification, password reset, secure server-side sessions, HttpOnly cookies, and route-level rate limiting.\n\n' +
      'The architecture is designed to stay adaptable as your product grows. AuthForge ships with a Prisma + PostgreSQL reference implementation, a production email path with a Resend example, and a domain structure you can extend inside your own SaaS product.',
  },
  audience: [
    'SaaS founders who need production-ready authentication without building every flow from scratch',
    'Developers shipping MVPs, internal tools, and production SaaS apps',
    'Teams that want secure sessions, verification, reset flows, and abuse protection handled early',
    'Engineers learning how modern authentication architecture fits into a real Next.js product',
  ],
  featureGroups: [
    {
      title: 'Authentication',
      items: ['Email/password authentication', 'Email verification flow', 'Password reset flow', 'Strong password rules with inline strength feedback'],
    },
    {
      title: 'Sessions & Security',
      items: [
        'Server-side sessions with HttpOnly cookies',
        'bcrypt password hashing',
        'Route-level rate limiting for auth endpoints',
        'Optional leaked-password checks outside local development',
        'Zod-based runtime validation',
      ],
    },
    {
      title: 'Architecture',
      items: [
        'Production-oriented authentication domain structure',
        'Prisma + PostgreSQL reference implementation',
        'Production email path with a Resend example',
        'Demo mode for local evaluation without real email delivery',
        'Token-driven UI styling approach',
      ],
    },
  ],
  howItWorks: [
    'Download the AuthForge ZIP archive',
    'Configure environment variables for database and email',
    'Connect PostgreSQL and run Prisma migrations',
    'Use demo mode for local evaluation without real email delivery',
    'Launch the authentication flows locally',
    'Extend the foundation inside your SaaS product',
  ],
  tryBeforeYouBuy: {
    description:
      'Before purchasing, you can review the documentation, inspect the architecture, and test a live demo. The demo covers the core authentication journey: registration, email verification, login, logout, password reset, secure cookie-based sessions, and demo-mode evaluation.',
    links: [
      { key: 'demo', label: 'Live demo' },
      { key: 'docs', label: 'Full documentation' },
      { key: 'architecture', label: 'Architecture overview' },
    ],
    contactPrefix: 'Questions before or after purchase?',
    contactLead: 'Contact us at',
  },
  pricing: {
    description:
      'Production-ready authentication starter for SaaS apps with secure sessions, verification flows, reset flows, rate limiting, and a Prisma + PostgreSQL reference implementation.',
    price: '$99 — One-time license',
    features: [
      'License for 1 project',
      'Lifetime access to the source package',
      'Includes AuthForge v1.0.0',
      'Email support at support@software-forge.dev',
    ],
    footerNote: 'Access instructions are sent by email after purchase.',
  },
};
