'use client';

import { useEffect } from 'react';
import {
  copyIconDefinition,
  createIconElement,
  externalLinkIconDefinition,
} from '@/shared/ui/icons';

const getCssPx = (varName: string, fallback: number) => {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  const value = Number.parseInt(raw, 10);
  return Number.isFinite(value) ? value : fallback;
};

export default function DocsAnchorScroll() {
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
      button.appendChild(createIconElement(copyIconDefinition, 'docs-copy-icon'));
      return button;
    };

    const enhanceExternalLinks = () => {
      const links = Array.from(scopeEl.querySelectorAll('a[data-external="true"]'));
      if (process.env.NODE_ENV !== 'production') {
        console.debug('[docs] external links found', links.length);
      }
      links.forEach((link) => {
        const existing = link.querySelector<HTMLSpanElement>('.docs-external-icon');
        const iconWrapper = existing ?? document.createElement('span');
        iconWrapper.className = 'docs-external-icon';
        iconWrapper.textContent = '';
        iconWrapper.appendChild(
          createIconElement(externalLinkIconDefinition, 'docs-external-icon-svg'),
        );
        if (!existing) {
          link.appendChild(iconWrapper);
        }
        if (process.env.NODE_ENV !== 'production') {
          console.debug('[docs] external icon applied', {
            href: link.getAttribute('href'),
            hadIcon: Boolean(existing),
          });
        }
      });
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
        const code = pre.querySelector('code');
        if (!(code instanceof HTMLElement)) {
          return;
        }
        const codeClass = code?.className ?? '';
        if (!/(?:language|lang)-(bash|sh|shell)/i.test(codeClass)) {
          return;
        }
        if (code.parentElement?.classList.contains('docs-copy-inline')) {
          return;
        }
        const rawText = code?.textContent ?? '';
        const text = rawText.trim();
        if (!text) {
          return;
        }
        const wrapper = document.createElement('span');
        wrapper.className = 'docs-copy-inline';
        wrapper.setAttribute('data-docs-copy-inline', 'true');
        wrapper.appendChild(code);
        const button = createCopyButton(text, 'Copy command', true);
        wrapper.appendChild(button);
        pre.appendChild(wrapper);
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

    const tryInject = () => {
      const blocks = scopeEl.querySelectorAll('pre > code');
      if (blocks.length === 0) {
        return false;
      }
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
      return;
    }
    document.addEventListener('click', onClick);
    document.addEventListener('click', onCopyClick);

    return () => {
      observer.disconnect();
      document.removeEventListener('click', onClick);
      document.removeEventListener('click', onCopyClick);
    };
  }, []);

  return null;
}
