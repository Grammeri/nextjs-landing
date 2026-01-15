import styles from './UnderDevelopment.module.css';

type UnderDevelopmentProps = {
  title: string;
  subtitle?: string;
};

export function UnderDevelopment({ title, subtitle }: UnderDevelopmentProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      <p className={styles.message}>Under development / Stay tuned</p>
    </div>
  );
}
