import styles from './page.module.css';
import layoutStyles from './home-layout.module.css';
import { ProductsGrid } from '@/components/products-grid/ProductsGrid';
import type { Metadata } from 'next';
import { getMarketingDictionary } from '@/shared/lib/i18n/getMarketingDictionary';
import { getLocale } from '@/shared/lib/i18n/getLocale';
import { routes } from '@/shared/config/routes';

type HomePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getLocale(localeParam);
  const dictionary = getMarketingDictionary(locale);

  const title = `${dictionary.home.hero.headline} — Software Forge`;
  const description = dictionary.home.hero.lead;
  const canonical = routes.home(locale);

  return {
    title,
    description,

    alternates: {
      canonical,
      languages: {
        en: routes.home('en'),
        ru: routes.home('ru'),
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

export default async function HomePage({ params }: HomePageProps) {
  const { locale: localeParam } = await params;
  const dictionary = getMarketingDictionary(getLocale(localeParam));

  return (
    <div className={layoutStyles.marketingLayout}>
      <main className={styles.page}>
        <section id="hero-section" className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1 className={styles.headline}>{dictionary.home.hero.headline}</h1>
              <p className={styles.lead}>{dictionary.home.hero.lead}</p>
            </div>
          </div>
        </section>
        <section className={styles.productsSection}>
          <div className="container-wide">
            <div className={styles.productsGrid}>
              <ProductsGrid items={dictionary.home.products} />
            </div>
          </div>
        </section>
        <section className={styles.nextSection}></section>
      </main>
    </div>
  );
}
