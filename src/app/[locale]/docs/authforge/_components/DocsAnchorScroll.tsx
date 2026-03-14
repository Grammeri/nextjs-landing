'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { appendCopyIcon, createIconElement, externalLinkIconDefinition } from '@/shared/ui/icons';

const COPY_LANGUAGES = ['bash', 'sh', 'shell', 'powershell', 'ps1', 'json', 'env', 'dotenv'];

export default function DocsAnchorScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const scopeEl = document.querySelector('[data-docs-scope]') ?? document.querySelector('main');

    if (!(scopeEl instanceof HTMLElement)) return;

    // ---------------------------------------
    // Copy Button Factory
    // ---------------------------------------

    const createCopyButton = (value: string) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'docs-copy-button';
      button.setAttribute('aria-label', 'Copy code');

      appendCopyIcon(button);

      button.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(value);

          button.setAttribute('data-copied', 'true');

          setTimeout(() => {
            button.removeAttribute('data-copied');
          }, 1500);
        } catch (err) {
          console.error('Copy failed', err);
        }
      });

      return button;
    };

    // ---------------------------------------
    // Copy Injection (All code blocks)
    // ---------------------------------------

    const enhanceCopySupport = () => {
      const articles = scopeEl.querySelectorAll('article[data-docs-slug]');

      articles.forEach((article) => {
        if (!(article instanceof HTMLElement)) return;

        const codeBlocks = article.querySelectorAll('pre > code');

        codeBlocks.forEach((code) => {
          if (!(code instanceof HTMLElement)) return;

          const className = code.className || '';
          const isCliBlock = COPY_LANGUAGES.some((lang) => className.includes(`language-${lang}`));

          const hasExplicitCopy = className.includes('copy');

          // allow copy for CLI blocks OR explicitly marked blocks
          if (!isCliBlock && !hasExplicitCopy) return;

          const text = code.textContent?.trim() ?? '';
          if (!text) return;

          // Prevent double injection
          if (code.parentElement?.querySelector('.docs-copy-button')) return;

          const pre = code.parentElement;
          if (!pre) return;

          pre.classList.add('docs-copy-host');
          const wrapper = document.createElement('div');
          wrapper.className = 'docs-code-block';

          pre.parentNode?.insertBefore(wrapper, pre);
          wrapper.appendChild(pre);
          wrapper.appendChild(createCopyButton(text));
        });
      });
    };

    // ---------------------------------------
    // External Links Icon
    // ---------------------------------------

    const enhanceExternalLinks = () => {
      const links = Array.from(scopeEl.querySelectorAll('a'));

      links.forEach((link) => {
        const href = link.getAttribute('href') ?? '';

        // Skip GitHub links
        if (href.includes('github.com')) {
          const wrapper = link.closest('.docs-external-inline');
          if (wrapper) wrapper.replaceWith(link);
          return;
        }

        if (link.dataset.external !== 'true') return;
        if (link.closest('.docs-external-inline')) return;

        const wrapper = document.createElement('span');
        wrapper.className = 'docs-external-inline';

        link.parentNode?.insertBefore(wrapper, link);
        wrapper.appendChild(link);

        const icon = document.createElement('span');
        icon.className = 'docs-external-icon docs-external-icon--hint';
        icon.setAttribute('aria-hidden', 'true');

        icon.appendChild(createIconElement(externalLinkIconDefinition, 'docs-external-icon-svg'));

        wrapper.appendChild(icon);
      });
    };

    // ---------------------------------------
    // Run once per route
    // ---------------------------------------

    enhanceCopySupport();
    enhanceExternalLinks();
  }, [pathname]);

  return null;
}
