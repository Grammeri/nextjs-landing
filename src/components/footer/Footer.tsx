import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.copyright}>© 2026 Software Forge</span>
        <span className={styles.origin}>Engineered in Texas. Used worldwide.</span>
      </div>
    </footer>
  );
}
