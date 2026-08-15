import type { ProductCopy } from '@/shared/config/marketing/types';

export const starterEn: ProductCopy = {
  productId: 'starter',
  name: 'Next.js Professional Starter',
  shortDescription:
    'Clean Next.js starter kit and project template for real apps, MVPs, and technical assignments: App Router, TypeScript, ESLint, Prettier, Husky, and CI-ready structure',
  hero: {
    trustTitle: 'Built for fast Next.js project setup',
    trustDescription:
      'Next.js Professional Starter gives you a ready-to-use Next.js project setup for real applications, MVPs, technical assignments, and learning-focused builds without spending hours configuring TypeScript, ESLint, Prettier, Husky, and CI by hand.\n\n' +
      'The package includes a clean App Router setup, strict TypeScript configuration, predictable folder organization, formatting, linting, Git hooks, commit validation, and CI-ready project structure.\n\n' +
      'The result is a practical Next.js starter kit and project template that is easy to understand at the beginning and organized enough to grow into a serious project.',
  },
  actions: {
    readDocs: 'Read Docs',
    viewTooling: 'View Tooling',
    downloadFree: 'Download Free',
  },
  audience: {
    title: 'Who is this starter for',
    items: [
      'Developers starting a new Next.js project who want a ready-to-use setup without extra manual configuration',
      'Students and developers completing technical assignments with a clean Next.js project template',
      'Engineers who want TypeScript, ESLint, Prettier, Git hooks, commit checks, and CI already organized',
      'Developers learning Next.js App Router, modern project structure, and maintainable development conventions',
    ],
  },
  included: {
    title: 'What’s included',
    groups: [
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
  },
  howItWorks: {
    title: 'How it works',
    items: [
      'Download the Next.js Professional Starter source package',
      'Install dependencies with pnpm',
      'Run the project checks with pnpm check',
      'Review the App Router structure and tooling setup',
      'Run the development workflow locally',
      'Start building your project or technical assignment on a clean foundation',
    ],
  },
  tryBeforeYouBuy: {
    title: 'Explore the starter',
    description:
      'Review the documentation, tooling, and project structure before downloading. The starter is completely free and ready to use for real projects, MVPs, technical assignments, and learning-focused builds.',
    links: [
      { key: 'docs', label: 'Starter documentation' },
      { key: 'tooling', label: 'Tooling overview' },
      { key: 'structure', label: 'Project structure overview' },
    ],
    contactPrefix: 'Questions about the starter?',
    contactLead: 'Contact us at',
  },
  supportEmail: 'support@software-forge.dev',
  pricing: {
    description:
      'Ready-to-use Next.js project setup with App Router, TypeScript, ESLint, Prettier, Husky, conventional commits, and CI configuration for real apps and technical assignments.',
    price: 'FREE',
    features: [
      'Includes Next.js Professional Starter v1.0.0',
      'Clean App Router project structure',
      'Strict TypeScript configuration',
      'ESLint + Prettier setup',
      'Husky Git hooks',
      'Conventional commits',
      'CI-ready workflow',
      'Useful for real projects and technical assignments',
    ],
    footerNote: 'No checkout. Instant ZIP download.',
    downloadCta: 'Download Free Starter',
    downloadNote: 'No checkout. Instant ZIP download.',
  },
  underDevelopment: {
    title: 'Next.js Professional Starter',
    subtitle: 'This product is currently under development.',
  },
};
