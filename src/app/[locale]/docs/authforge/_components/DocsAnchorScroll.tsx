'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { appendCopyIcon, createIconElement, externalLinkIconDefinition } from '@/shared/ui/icons';

export default function DocsAnchorScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const scopeEl =
      document.querySelector('[data-docs-scope="authforge"]') ?? document.querySelector('main');

    if (!(scopeEl instanceof HTMLElement)) return;

    // ---------------------------------------
    // Utils
    // ---------------------------------------

    const isShellLike = (text: string) =>
      /^(pnpm|npm|yarn|npx|git|curl|wget|docker|docker-compose)\b/i.test(text);

    const createCopyButton = (value: string) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'docs-copy-button docs-copy-button--inline';
      button.setAttribute('aria-label', 'Copy command');
      button.setAttribute('data-docs-copy', value);
      appendCopyIcon(button);
      return button;
    };

    // ---------------------------------------
    // Copy Injection (universal)
    // ---------------------------------------

    const enhanceCopySupport = () => {
      const articles = scopeEl.querySelectorAll('article[data-docs-slug]');

      articles.forEach((article) => {
        if (!(article instanceof HTMLElement)) return;

        // === 1️⃣ pre > code blocks ===
        const codeBlocks = article.querySelectorAll('pre > code');

        codeBlocks.forEach((code) => {
          if (!(code instanceof HTMLElement)) return;

          const text = code.textContent?.trim() ?? '';
          if (!text) return;

          if (!isShellLike(text)) return;

          if (code.parentElement?.classList.contains('docs-copy-inline')) {
            return;
          }

          const pre = code.parentElement;
          if (!pre) return;

          const wrapper = document.createElement('span');
          wrapper.className = 'docs-copy-inline';
          wrapper.setAttribute('data-docs-copy-inline', 'true');

          wrapper.appendChild(code);
          wrapper.appendChild(createCopyButton(text));

          pre.appendChild(wrapper);
        });

        // === 2️⃣ Inline code (outside pre) ===
        const inlineCodes = Array.from(article.querySelectorAll('code')).filter(
          (code) => !code.closest('pre'),
        );

        inlineCodes.forEach((code) => {
          if (!(code instanceof HTMLElement)) return;

          const text = code.textContent?.trim() ?? '';
          if (!text) return;

          if (!isShellLike(text)) return;

          if (code.parentElement?.classList.contains('docs-copy-inline')) {
            return;
          }

          const wrapper = document.createElement('span');
          wrapper.className = 'docs-copy-inline';
          wrapper.setAttribute('data-docs-copy-inline', 'true');

          code.parentNode?.insertBefore(wrapper, code);
          wrapper.appendChild(code);
          wrapper.appendChild(createCopyButton(text));
        });
      });
    };

    // ---------------------------------------
    // External Links
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
    // Injection trigger
    // ---------------------------------------

    const inject = () => {
      const hasCode = scopeEl.querySelectorAll('code').length > 0;
      if (!hasCode) return false;

      enhanceCopySupport();
      enhanceExternalLinks();

      return true;
    };

    const observer = new MutationObserver(() => {
      if (inject()) observer.disconnect();
    });

    observer.observe(scopeEl, { childList: true, subtree: true });

    if (inject()) observer.disconnect();

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
