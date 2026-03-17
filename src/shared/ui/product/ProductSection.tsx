import { ReactNode } from 'react';
import styles from './ProductSection.module.css';

type ProductSectionProps = {
  title?: string;
  align?: 'left' | 'center';
  children: ReactNode;
};

export function ProductSection({ title, align = 'left', children }: ProductSectionProps) {
  return (
    <section className={styles.section} data-align={align}>
      <div className={styles.container}>
        {title && <h3 className={styles.title}>{title}</h3>}
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
}
