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

    const createCopyIcon = () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'docs-copy-icon');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('focusable', 'false');

      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', '9');
      rect.setAttribute('y', '9');
      rect.setAttribute('width', '11');
      rect.setAttribute('height', '11');
      rect.setAttribute('rx', '2');

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M5 15V5a2 2 0 0 1 2-2h10');

      svg.appendChild(rect);
      svg.appendChild(path);
      return svg;
    };

    const createCopyButton = (value: string, label: string, isInline = false) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = isInline
        ? 'docs-copy-button docs-copy-button--inline'
        : 'docs-copy-button';
      button.setAttribute('aria-label', label);
      button.setAttribute('data-docs-copy', value);
      button.appendChild(createCopyIcon());
      return button;
    };

    const enhanceQuickStartCopy = () => {
      const article = scopeEl.querySelector('article[data-docs-slug="quick-start"]');
      if (!(article instanceof HTMLElement)) {
        return;
      }

      const codeBlocks = article.querySelectorAll('pre');
      codeBlocks.forEach((pre) => {
        if (!(pre instanceof HTMLElement)) {
          return;
        }
        if (pre.querySelector('[data-docs-copy]')) {
          return;
        }
        const code = pre.querySelector('code');
        const rawText = code?.textContent ?? '';
        const text = rawText.trim();
        if (!text) {
          return;
        }
        pre.classList.add('docs-copy-host');
        const button = createCopyButton(text, 'Copy code');
        pre.appendChild(button);
      });

      const email = 'support@authforge.dev';
      const walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT);
      const emailNodes: Text[] = [];

      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (node instanceof Text && node.nodeValue?.includes(email)) {
          emailNodes.push(node);
        }
      }

      emailNodes.forEach((node) => {
        const text = node.nodeValue ?? '';
        const index = text.indexOf(email);
        if (index === -1) {
          return;
        }
        const parent = node.parentNode;
        if (!parent) {
          return;
        }
        const wrapper = document.createElement('span');
        wrapper.className = 'docs-copy-inline';
        wrapper.setAttribute('data-docs-copy-inline', 'true');

        const before = text.slice(0, index);
        const after = text.slice(index + email.length);

        const emailText = document.createElement('span');
        emailText.textContent = email;
        wrapper.appendChild(emailText);

        const button = createCopyButton(email, 'Copy email to clipboard', true);
        wrapper.appendChild(button);

        const fragment = document.createDocumentFragment();
        if (before) {
          fragment.appendChild(document.createTextNode(before));
        }
        fragment.appendChild(wrapper);
        if (after) {
          fragment.appendChild(document.createTextNode(after));
        }

        parent.replaceChild(fragment, node);
      });
    };

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

    const onCopyClick = async (ev: MouseEvent) => {
      const target = ev.target;
      if (!(target instanceof Element)) {
        return;
      }

      const button = target.closest('[data-docs-copy]');
      if (!(button instanceof HTMLButtonElement)) {
        return;
      }

      if (!scopeEl.contains(button)) {
        return;
      }

      ev.preventDefault();
      const value = button.getAttribute('data-docs-copy') ?? '';
      if (!value) {
        return;
      }

      try {
        await copyToClipboard(value);
        button.setAttribute('data-copied', 'true');
        window.setTimeout(() => {
          button.removeAttribute('data-copied');
        }, 1500);
      } catch {
        button.removeAttribute('data-copied');
      }
    };

    enhanceQuickStartCopy();
    document.addEventListener('click', onClick);
    document.addEventListener('click', onCopyClick);

    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('click', onCopyClick);
    };
  }, []);

  return null;
}
