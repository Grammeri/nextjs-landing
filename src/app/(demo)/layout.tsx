import type { ReactNode } from 'react';
import styles from './layout.module.css';

type DemoLayoutProps = {
  children: ReactNode;
};

export default function DemoLayout({ children }: DemoLayoutProps) {
  return (
    <main className={`${styles.main} container`}>
      <aside role="note" aria-live="polite" className={styles.notice}>
        <strong>⚠️ This is a demo environment.</strong>
        <div>This demo shows how AuthForge works in production.</div>
      </aside>
      {children}
    </main>
  );
}
