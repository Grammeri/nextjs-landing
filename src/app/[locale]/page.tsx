import styles from './page.module.css';
import layoutStyles from '@/app/(marketing)/layout.module.css';
import { ProductsGrid } from '@/components/products-grid/ProductsGrid';
import { getMarketingDictionary } from '@/shared/lib/i18n/getMarketingDictionary';
import { getLocale } from '@/shared/lib/i18n/getLocale';

type HomePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

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
