import type { ProductCopy } from '@/shared/config/marketing/types';

export const starterEn: ProductCopy = {
  productId: 'starter',
  name: 'Next.js Professional Starter',
  shortDescription:
    'Clean Next.js starter kit and project template for real apps, MVPs, and technical assignments: App Router, TypeScript, ESLint, Prettier, Husky, and CI-ready structure',
  supportEmail: 'support@software-forge.dev',
  actions: {
    readDocs: 'Read Docs',
    viewTooling: 'View Tooling',
    buyLicense: 'Buy license',
  },
  sectionTitles: {
    audience: 'Who is this starter for',
    included: 'What’s included',
    howItWorks: 'How it works',
    tryBeforeYouBuy: 'Try before you buy',
  },
  hero: {
    trustTitle: 'Built for fast Next.js project setup',
    trustDescription:
      'Next.js Professional Starter gives you a ready-to-use Next.js project setup for real applications, MVPs, technical assignments, and learning-focused builds without spending hours configuring TypeScript, ESLint, Prettier, Husky, and CI by hand.\n\n' +
      'The package includes a clean App Router setup, strict TypeScript configuration, predictable folder organization, formatting, linting, Git hooks, commit validation, and CI-ready project structure.\n\n' +
      'The result is a practical Next.js starter kit and project template that is easy to understand at the beginning and organized enough to grow into a serious project.',
  },
  audience: [
    'Developers starting a new Next.js project who want a ready-to-use setup without extra manual configuration',
    'Students and developers completing technical assignments with a clean Next.js project template',
    'Engineers who want TypeScript, ESLint, Prettier, Git hooks, commit checks, and CI already organized',
    'Developers learning Next.js App Router, modern project structure, and maintainable development conventions',
  ],
  featureGroups: [
    {
      title: 'Project structure',
      items: [
        'Clean Next.js App Router setup',
        'Predictable folder organization',
        'Clear separation between app routes, components, shared UI, and libraries',
      ],
    },
    {
      title: 'Developer tooling',
      items: [
        'Strict TypeScript configuration',
        'ESLint for code quality',
        'Prettier for consistent formatting',
        'Husky Git hooks',
        'Lint-staged checks for staged files',
        'Conventional commit validation',
        'VS Code workspace settings and recommended extensions',
        'EditorConfig for consistent formatting',
      ],
    },
    {
      title: 'Automation',
      items: [
        'CI-ready workflow structure',
        'Automated repository checks',
        'One-command validation with pnpm check',
        'Repeatable development workflow for real projects and assignments',
      ],
    },
  ],
  howItWorks: [
    'Download the Next.js Professional Starter source package',
    'Install dependencies with pnpm',
    'Run the project checks with pnpm check',
    'Review the App Router structure and tooling setup',
    'Run the development workflow locally',
    'Start building your project or technical assignment on a clean foundation',
  ],
  tryBeforeYouBuy: {
    description:
      'Before purchasing, you can review the documentation, inspect the project structure, and understand the tooling included in the package. It is designed as a practical Next.js starter kit and project template that is easy to read, quick to run, and useful for real projects, MVPs, and technical assignments.',
    links: [
      { key: 'docs', label: 'Starter documentation' },
      { key: 'tooling', label: 'Tooling overview' },
      { key: 'structure', label: 'Project structure overview' },
    ],
    contactPrefix: 'Questions before or after purchase?',
    contactLead: 'Contact us at',
  },
  pricing: {
    description:
      'Ready-to-use Next.js project setup with App Router, TypeScript, ESLint, Prettier, Husky, conventional commits, and CI configuration for real apps and technical assignments.',
    price: '$5 — One-time license',
    features: [
      'License for 1 project',
      'Lifetime access to the source package',
      'Includes Next.js Professional Starter v1.0.0',
      'Clean App Router project structure',
      'Strict TypeScript configuration',
      'ESLint + Prettier setup',
      'Husky Git hooks',
      'Conventional commits',
      'CI-ready workflow included',
      'Useful for real projects and technical assignments',
    ],
    footerNote: 'Access instructions are sent by email after purchase.',
  },
  underDevelopment: {
    title: 'Next.js Professional Starter',
    subtitle: 'This product is currently under development.',
  },
};
