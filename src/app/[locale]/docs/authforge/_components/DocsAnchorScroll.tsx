'use client';

import { useEffect } from 'react';

const getCssPx = (varName: string, fallback: number) => {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  const value = Number.parseInt(raw, 10);
  return Number.isFinite(value) ? value : fallback;
};

export default function DocsAnchorScroll() {
  useEffect(() => {
    const scopeEl = document.querySelector('[data-docs-scope="authforge"]');
    if (!(scopeEl instanceof HTMLElement)) {
      return;
    }

    const onClick = (ev: MouseEvent) => {
      const target = ev.target;
      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest('a[href^="#"]');
      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      if (!scopeEl.contains(anchor)) {
        return;
      }

      const href = anchor.getAttribute('href');
      if (!href || href === '#') {
        return;
      }

      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) {
        return;
      }

      ev.preventDefault();

      const header = getCssPx('--header-height', 72);
      const spacing = getCssPx('--spacing-md', 16);
      const offset = header + spacing;

      const top = window.scrollY + el.getBoundingClientRect().top - offset;

      window.scrollTo({ top, behavior: 'smooth' });
      history.replaceState(null, '', `#${id}`);
    };

    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
    };
  }, []);

  return null;
}
