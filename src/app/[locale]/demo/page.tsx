import { DEMO_URL } from '@/shared/config/demo';
import { routes } from '@/shared/config/routes';
import type { Metadata } from 'next';
import { getLocale } from '@/shared/lib/i18n/getLocale';
import { getDemoText } from '@/shared/lib/i18n/getDemoText';
import { Button } from '@/shared/ui/button';
import styles from './page.module.css';

type AuthForgeDemoPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: Pick<AuthForgeDemoPageProps, 'params'>): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getLocale(localeParam);
  const demoText = getDemoText(locale);

  const title = demoText.title;
  const description = demoText.subtitle;
  const canonical = routes.demo(locale);

  return {
    title,
    description,

    alternates: {
      canonical,
      languages: {
        en: routes.demo('en'),
        ru: routes.demo('ru'),
      },
    },

    openGraph: {
      title,
      description,
      type: 'website',
      url: canonical,
      locale: locale === 'ru' ? 'ru_RU' : 'en_US',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  };
}

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

        <Button as="a" href={routes.product(locale, 'authforge')} variant="secondary">
          {demoText.actions.backToProductOverview}
        </Button>
      </div>
    </section>
  );
}
