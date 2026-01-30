'use client';

import { useEffect, useRef } from 'react';
import { copyIconDefinition, createIconElement } from '@/shared/ui/icons';
import '@/app/[locale]/docs/authforge/_components/DocContent.module.css';

const SUPPORT_EMAIL = 'support@software-forge.dev';

async function copyToClipboard(value: string) {
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
}

export default function CopySupportEmail() {
  const timeoutRef = useRef<number | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (button && !button.querySelector('.docs-copy-icon')) {
      button.appendChild(createIconElement(copyIconDefinition, 'docs-copy-icon'));
    }
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    try {
      await copyToClipboard(SUPPORT_EMAIL);
      if (buttonRef.current) {
        buttonRef.current.setAttribute('data-copied', 'true');
      }
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        buttonRef.current?.removeAttribute('data-copied');
      }, 1500);
    } catch {
      buttonRef.current?.removeAttribute('data-copied');
    }
  };

  return (
    <>
      <button
        type="button"
        className="docs-copy-button docs-copy-button--inline"
        onClick={handleCopy}
        aria-label="Copy support email"
        ref={buttonRef}
      ></button>
    </>
  );
}
