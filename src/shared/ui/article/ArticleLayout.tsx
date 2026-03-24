import styles from './ArticleLayout.module.css';

type Props = {
  children: React.ReactNode;
};

export function ArticleLayout({ children }: Props) {
  return <article className={styles.article}>{children}</article>;
}

export function ArticleTitle({ children }: Props) {
  return <h1 className={styles.title}>{children}</h1>;
}

type ArticleSectionProps = {
  anchorId?: string;
  title: string;
  children: React.ReactNode;
};

export function ArticleSection({ anchorId, title, children }: ArticleSectionProps) {
  return (
    <section className={styles.section}>
      <h2 id={anchorId} className={styles.heading}>
        {title}
      </h2>
      {children}
    </section>
  );
}

export function ArticleText({ children }: Props) {
  return <p className={styles.text}>{children}</p>;
}
