'use client';

import { useEffect } from 'react';

const parsePxVar = (value: string): number => {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

export default function DocsAnchorScroll() {
  useEffect(() => {
    const scope = document.querySelector('[data-docs-anchor-scope="authforge"]');
    if (!scope) {
      return;
    }

    const root = document.documentElement;
    const body = document.body;
    const prevRootScrollBehavior = root.style.scrollBehavior;
    const prevRootScrollPadding = root.style.scrollPaddingTop;
    const prevBodyScrollBehavior = body.style.scrollBehavior;
    const prevBodyScrollPadding = body.style.scrollPaddingTop;

    root.style.scrollBehavior = 'auto';
    root.style.scrollPaddingTop = '0px';
    body.style.scrollBehavior = 'auto';
    body.style.scrollPaddingTop = '0px';

    const getOffset = () => {
      const computed = getComputedStyle(root);
      const headerHeight = parsePxVar(computed.getPropertyValue('--header-height'));
      const spacingMd = parsePxVar(computed.getPropertyValue('--spacing-md'));
      return headerHeight + spacingMd;
    };

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) {
        return;
      }

      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target as Element | null;
      const link = target?.closest('a[href^="#"]');
      if (!link || !scope.contains(link)) {
        return;
      }

      const href = link.getAttribute('href') ?? '';
      if (href.length < 2) {
        return;
      }

      const id = decodeURIComponent(href.slice(1));
      const heading = document.getElementById(id);
      if (!heading) {
        return;
      }

      event.preventDefault();

      const offset = getOffset();
      const top = heading.getBoundingClientRect().top + window.scrollY - offset;

      history.pushState(null, '', `#${id}`);
      window.scrollTo({ top, behavior: 'smooth' });
    };

    scope.addEventListener('click', handleClick);

    return () => {
      scope.removeEventListener('click', handleClick);
      root.style.scrollBehavior = prevRootScrollBehavior;
      root.style.scrollPaddingTop = prevRootScrollPadding;
      body.style.scrollBehavior = prevBodyScrollBehavior;
      body.style.scrollPaddingTop = prevBodyScrollPadding;
    };
  }, []);

  return null;
}
