import { DEMO_URL } from '@/shared/config/demo';
import { getLocale } from '@/shared/lib/i18n/getLocale';
import { getDemoText } from '@/shared/lib/i18n/getDemoText';
import { Button } from '@/shared/ui/button';
import styles from '@/app/(demo)/demo/page.module.css';

type AuthForgeDemoPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function AuthForgeDemoPage({ params }: AuthForgeDemoPageProps) {
  const { locale: localeParam } = await params;
  const locale = getLocale(localeParam);
  const demoText = getDemoText(locale);

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h1>{demoText.title}</h1>
        <p className={styles.subtitle}>{demoText.subtitle}</p>
      </header>

      <ul className={styles.points}>
        {demoText.points.map((point) => (
          <li key={point} className={styles.point}>
            {point}
          </li>
        ))}
      </ul>

      <div className={styles.actions}>
        <Button as="a" href={DEMO_URL} variant="primary" rel="noopener noreferrer">
          {demoText.actions.openLiveDemo}
        </Button>

        <Button as="a" href={`/${locale}/products/authforge`} variant="secondary">
          {demoText.actions.backToProductOverview}
        </Button>
      </div>
    </section>
  );
}
