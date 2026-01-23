import styles from './PageOutline.module.css';

type PageOutlineItem = {
  id: string;
  label: string;
};

type PageOutlineProps = {
  items: PageOutlineItem[];
};

export default function PageOutline({ items }: PageOutlineProps) {
  if (!items.length) {
    return null;
  }

  return (
    <nav className={styles.outline} aria-label="On this page">
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id} className={styles.item}>
            <span className={styles.marker}>•</span>
            <a className={styles.link} href={`#${item.id}`}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
