import type { ReactNode } from 'react';
import styles from './Selectable.module.css';

export function SelectableGroup({ children }: { children: ReactNode }) {
  return <div className={styles.group}>{children}</div>;
}
