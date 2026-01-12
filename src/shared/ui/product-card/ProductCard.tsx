import { ReactNode } from 'react';
import styles from './ProductCard.module.css';

type ProductCardProps = {
  children: ReactNode;
  interactive?: boolean;
  variant?: 'default' | 'placeholder';
};

export function ProductCard({
  children,
  interactive = true,
  variant = 'default',
}: ProductCardProps) {
  const isPlaceholder = variant === 'placeholder';

  return (
    <div className={`${styles.card} ${isPlaceholder ? styles.placeholder : ''}`}>{children}</div>
  );
}
