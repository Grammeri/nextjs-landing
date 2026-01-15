import { ReactNode } from 'react';
import styles from './ProductSection.module.css';

type ProductSectionProps = {
  title?: string;
  children: ReactNode;
};

export function ProductSection({ title, children }: ProductSectionProps) {
  return (
    <section className={styles.section}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.content}>{children}</div>
    </section>
  );
}
