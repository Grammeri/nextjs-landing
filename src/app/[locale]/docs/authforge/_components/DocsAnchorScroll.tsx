'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { appendCopyIcon, createIconElement, externalLinkIconDefinition } from '@/shared/ui/icons';

const getCssPx = (varName: string, fallback: number) => {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  const value = Number.parseInt(raw, 10);
  return Number.isFinite(value) ? value : fallback;
};

const COPY_ENABLED_DOCS = ['quick-start', 'getting-started', 'development-setup', 'environment'];

export default function DocsAnchorScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const scopeEl =
      document.querySelector('[data-docs-scope="authforge"]') ?? document.querySelector('main');

    if (!(scopeEl instanceof HTMLElement)) {
      return;
    }

    const copyToClipboard = async (value: string) => {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        return;
      }

      const textarea = document.createElement('textarea');
      textarea.value = value;
      textarea.style.position = 'fixed';
      textarea.style.top = '-9999px';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    };

    const createCopyButton = (value: string, label: string, isInline = false) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = isInline
        ? 'docs-copy-button docs-copy-button--inline'
        : 'docs-copy-button';

      button.setAttribute('aria-label', label);
      button.setAttribute('data-docs-copy', value);
      appendCopyIcon(button);

      return button;
    };

    const enhanceExternalLinks = () => {
      const isPathLike = (value: string) => value.includes('/') && !/\s/.test(value);

      const ensureHintIcon = (element: HTMLElement) => {
        const parent = element.parentElement;
        const wrapper =
          parent && parent.classList.contains('docs-external-inline')
            ? parent
            : document.createElement('span');

        if (wrapper !== parent) {
          wrapper.className = 'docs-external-inline';
          element.parentNode?.insertBefore(wrapper, element);
          wrapper.appendChild(element);
        }

        if (wrapper.querySelector('.docs-external-icon--hint')) {
          return;
        }

        const hintIcon = document.createElement('span');
        hintIcon.className = 'docs-external-icon docs-external-icon--hint';
        hintIcon.setAttribute('aria-hidden', 'true');
        hintIcon.appendChild(
          createIconElement(externalLinkIconDefinition, 'docs-external-icon-svg'),
        );

        wrapper.appendChild(hintIcon);
      };

      const links = Array.from(scopeEl.querySelectorAll('a'));

      links.forEach((link) => {
        const href = link.getAttribute('href') ?? '';
        const text = link.textContent?.trim() ?? '';

        // 🚫 ПОЛНОСТЬЮ исключаем GitHub
        if (href.includes('github.com')) {
          const wrapper = link.closest('.docs-external-inline');
          if (wrapper) {
            wrapper.replaceWith(link);
          }

          const icon = link.querySelector('.docs-external-icon');
          if (icon) {
            icon.remove();
          }

          return;
        }

        const isExternal = link.dataset.external === 'true';
        const isPath = isPathLike(text);

        if (!isExternal && !isPath) {
          return;
        }

        const existingIcon = link.querySelector('.docs-external-icon');
        if (existingIcon) {
          existingIcon.remove();
        }

        ensureHintIcon(link);
      });
    };

    const enhanceQuickStartCopy = () => {
      COPY_ENABLED_DOCS.forEach((slug) => {
        const article = scopeEl.querySelector(`article[data-docs-slug="${slug}"]`);

        if (!(article instanceof HTMLElement)) {
          return;
        }

        const codeBlocks = article.querySelectorAll('pre');

        codeBlocks.forEach((pre) => {
          if (!(pre instanceof HTMLElement)) return;

          const code = pre.querySelector('code');
          if (!(code instanceof HTMLElement)) return;

          const codeClass = code.className ?? '';

          const isShellBlock = /(?:language|lang)-(bash|sh|shell)/i.test(codeClass);

          const isEnvBlock =
            slug === 'environment' &&
            (!codeClass || /(?:language|lang)-(env|bash|sh|shell)/i.test(codeClass));

          if (!isShellBlock && !isEnvBlock) {
            return;
          }

          if (code.parentElement?.classList.contains('docs-copy-inline')) {
            return;
          }

          const rawText = code.textContent ?? '';
          const text = rawText.trim();
          if (!text) return;

          const wrapper = document.createElement('span');
          wrapper.className = 'docs-copy-inline';
          wrapper.setAttribute('data-docs-copy-inline', 'true');

          wrapper.appendChild(code);

          const button = createCopyButton(text, 'Copy command', true);
          wrapper.appendChild(button);

          pre.appendChild(wrapper);
        });
      });
    };

    const tryInject = () => {
      const blocks = scopeEl.querySelectorAll('pre > code');
      if (blocks.length === 0) return false;

      enhanceQuickStartCopy();
      enhanceExternalLinks();

      return true;
    };

    const observer = new MutationObserver(() => {
      if (tryInject()) {
        observer.disconnect();
      }
    });

    observer.observe(scopeEl, { childList: true, subtree: true });

    if (tryInject()) {
      observer.disconnect();
    }

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
