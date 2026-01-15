import { ReactNode } from 'react';
import styles from './ProductCTA.module.css';

type ProductCTAProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function ProductCTA({ title, description, actions }: ProductCTAProps) {
  return (
    <div className={styles.cta}>
      <div className={styles.text}>
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
}
