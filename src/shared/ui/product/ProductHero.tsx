import { ReactNode } from 'react';
import styles from './ProductHero.module.css';

type ProductHeroProps = {
  title: string;
  subtitle?: string;
  trustTitle?: string;
  trustDescription?: string;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
};

export function ProductHero({
  title,
  subtitle,
  trustTitle,
  trustDescription,
  primaryAction,
  secondaryAction,
}: ProductHeroProps) {
  const hasActions = Boolean(primaryAction || secondaryAction);
  const hasTrust = Boolean(trustTitle || trustDescription);

  return (
    <div className={styles.hero}>
      <div className={styles.text}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {hasTrust && (
          <div className={styles.trust}>
            {trustTitle && <h2 className={styles.trustTitle}>{trustTitle}</h2>}
            {trustDescription && <p className={styles.trustDescription}>{trustDescription}</p>}
          </div>
        )}
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
