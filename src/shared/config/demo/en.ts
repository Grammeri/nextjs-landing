import type { DemoText } from './types';

export const demoEn: DemoText = {
  title: 'AuthForge Demo',
  subtitle: 'Explore a working AuthForge demo in a separate deployment.',
  points: [
    'Review the core authentication journey, including registration, login, logout, password reset, and session-based authentication flow.',
    'Inspect session behavior and cookie handling in the browser while evaluating the same auth architecture used by the product.',
    'Demo mode is a runtime configuration, not a separate codebase. External email side effects are stubbed, while the main authentication flow stays aligned with production behavior.',
    'Demo behavior is controlled through environment configuration, including the `AUTH_DEMO_MODE` flag.',
  ],
  actions: {
    openLiveDemo: 'Open Live Demo',
    backToProductOverview: 'Back to Product Overview',
  },
};
