'use client';

import { useEffect, useRef, useState } from 'react';
import { CopyIcon } from '@/shared/ui/icons';
import styles from '../page.module.css';

const SUPPORT_EMAIL = 'support@authforge.dev';

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
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    try {
      await copyToClipboard(SUPPORT_EMAIL);
      setCopied(true);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className={styles.supportCopyButton}
        onClick={handleCopy}
        aria-label="Copy support email"
      >
        <CopyIcon className={styles.supportCopyIcon} />
      </button>
      {copied ? (
        <span className={styles.supportCopied} aria-live="polite">
          Copied
        </span>
      ) : null}
    </>
  );
}
