import { Children, ReactNode, isValidElement } from 'react';
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
  const childrenArray = Children.toArray(children);
  const titleIndex = childrenArray.findIndex(
    (child) => isValidElement(child) && child.type === 'h3',
  );
  const content = childrenArray.map((child, index) => {
    if (index === titleIndex && isValidElement(child) && child.type === 'h3') {
      return (
        <div className={styles.title} key={`product-card-title-${index}`}>
          {child}
        </div>
      );
    }

    return child;
  });

  return (
    <div className={`${styles.card} ${isPlaceholder ? styles.placeholder : ''}`}>
      <div className={styles.content}>{content}</div>
    </div>
  );
}
