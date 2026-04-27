import type { ReactNode } from 'react';
import styles from './layout.module.css';

type DemoLayoutProps = {
  children: ReactNode;
};

export default function DemoLayout({ children }: DemoLayoutProps) {
  return (
    <main className={styles.layout}>
      <div className={styles.surface}>{children}</div>
    </main>
  );
}
