import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.center}>
          <span className={styles.copyright}>© 2025 Software Forge</span>
          <span className={styles.origin}>Engineered in Texas. Used worldwide.</span>
          <span className={styles.contact}>Contact us: support@software-forge.dev</span>
        </div>
        <div className={styles.right}>
          <Link href="/legal" className={styles.legalLink}>
            Legal
          </Link>
        </div>
      </div>
    </footer>
  );
}
