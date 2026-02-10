'use client';

import * as React from 'react';
import { subscribePaywallModal } from './store';
import styles from './PaywallModal.module.css';

export function PaywallModal() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    return subscribePaywallModal(() => {
      setOpen(true);
    });
  }, []);

  if (!open) return null;

  return (
    <div className={styles.backdrop} onClick={() => setOpen(false)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>🔒 Source code access</h2>

        <p className={styles.description}>
          Full GitHub access is available after purchasing <strong>AuthForge</strong>.
        </p>

        <ul className={styles.list}>
          <li>One-time license</li>
          <li>Lifetime access</li>
          <li>Instant email delivery</li>
        </ul>

        <div className={styles.actions}>
          <a href="/pricing" className={styles.primary}>
            Buy AuthForge
          </a>

          <button type="button" className={styles.secondary} onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
