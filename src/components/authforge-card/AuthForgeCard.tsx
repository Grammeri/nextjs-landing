import styles from './AuthForgeCard.module.css';

export function AuthForgeCard() {
  return (
    <div className={styles.card}>
      <h3>AuthForge</h3>
      <p>
        Production-ready authentication boilerplate with sessions, roles, security best practices
        and clean architecture.
      </p>
    </div>
  );
}
