import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <span className={styles.copyright}>© 2026 Software Forge</span>
          <span className={styles.origin}>Made in Texas</span>
        </div>
      </div>
    </footer>
  );
}
