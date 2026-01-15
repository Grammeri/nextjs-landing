import { ReactNode } from 'react';
import styles from './layout.module.css';

type ProductsLayoutProps = {
  children: ReactNode;
};

export default function ProductsLayout({ children }: ProductsLayoutProps) {
  return (
    <div className={styles.productLayout}>
      <div className={styles.productSurface}>{children}</div>
    </div>
  );
}
