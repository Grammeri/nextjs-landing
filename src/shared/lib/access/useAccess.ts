export function useAccess() {
  const isDemo = process.env.NEXT_PUBLIC_AUTH_DEMO_MODE === 'true';

  return {
    hasAccess: isDemo,
    loading: false,
  };
}
