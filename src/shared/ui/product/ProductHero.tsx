import { ReactNode } from 'react';
import styles from './ProductHero.module.css';

type ProductHeroProps = {
  title: string;
  subtitle?: string;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
};

export function ProductHero({ title, subtitle, primaryAction, secondaryAction }: ProductHeroProps) {
  const hasActions = Boolean(primaryAction || secondaryAction);

  return (
    <div className={styles.hero}>
      <div className={styles.text}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      {hasActions && (
        <div className={styles.actions}>
          {primaryAction && <div className={styles.action}>{primaryAction}</div>}
          {secondaryAction && <div className={styles.action}>{secondaryAction}</div>}
        </div>
      )}
    </div>
  );
}
