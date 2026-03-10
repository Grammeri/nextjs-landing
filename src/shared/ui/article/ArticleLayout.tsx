import styles from './ArticleLayout.module.css';
import { PageShell, ContentSurface } from '@/shared/ui/layout';

type Props = {
  children: React.ReactNode;
};

export function ArticleLayout({ children }: Props) {
  return (
    <PageShell>
      <ContentSurface>
        <div className={styles.article}>{children}</div>
      </ContentSurface>
    </PageShell>
  );
}
