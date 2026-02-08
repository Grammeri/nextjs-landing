import type { ReactNode } from 'react';
import styles from './Selectable.module.css';
import { RadioIndicator } from './RadioIndicator';

type Variant = 'default' | 'stripe' | 'paypal';

type SelectableItemProps = {
  selected: boolean;
  onSelect: () => void;
  children: ReactNode;
  variant?: Variant;
};

export function SelectableItem({
  selected,
  onSelect,
  children,
  variant = 'default',
}: SelectableItemProps) {
  return (
    <button
      type="button"
      className={[styles.item, styles[variant], selected && styles.selected].join(' ')}
      aria-pressed={selected}
      onClick={onSelect}
    >
      <RadioIndicator checked={selected} />
      <span className={styles.label}>{children}</span>
    </button>
  );
}
