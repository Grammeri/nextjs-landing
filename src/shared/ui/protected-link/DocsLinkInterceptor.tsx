'use client';

import * as React from 'react';
import { useAccess } from '@/shared/lib/access';
import { openPaywallModal } from '@/shared/ui/paywall-modal';

const GITHUB_HOSTS = ['github.com', 'www.github.com'];

/**
 * Intercepts clicks on <a> inside docs HTML rendered via dangerouslySetInnerHTML.
 * Protects valuable links (GitHub repo, source, clone) with client-side paywall.
 */
export default function DocsLinkInterceptor() {
  const { hasAccess, loading } = useAccess();

  React.useEffect(() => {
    console.log('[DocsLinkInterceptor] mounted');
    const root = document.querySelector<HTMLElement>('[data-protected-links-root]');
    if (!root) return;

    const onClick = (e: MouseEvent) => {
      if (loading) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest('a') as HTMLAnchorElement | null;
      if (!anchor || !anchor.href) return;

      // Only intercept links inside docs root
      if (!root.contains(anchor)) return;

      let url: URL;
      try {
        url = new URL(anchor.href);
      } catch {
        return;
      }

      // Only protect GitHub links for now
      if (!GITHUB_HOSTS.includes(url.hostname)) return;

      if (!hasAccess) {
        e.preventDefault();
        e.stopPropagation();
        openPaywallModal();
        return;
      }

      // Has access → open safely
      e.preventDefault();
      window.open(anchor.href, '_blank', 'noopener,noreferrer');
    };

    root.addEventListener('click', onClick);

    return () => {
      root.removeEventListener('click', onClick);
    };
  }, [hasAccess, loading]);

  return null;
}
