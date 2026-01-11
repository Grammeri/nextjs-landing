import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.inner}>
          <Link href="/" className={styles.brand}>
            Software Forge
          </Link>
          <nav className={styles.nav}>
            <a href="#" className={styles.navLink}>
              Products
            </a>
            <a href="#" className={styles.navLink}>
              Docs
            </a>
            <a href="#" className={styles.navLink}>
              Pricing
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
