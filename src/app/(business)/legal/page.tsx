import styles from './page.module.css';
import { ArticleLayout } from '@/shared/ui/article';

export const metadata = {
  title: 'Legal — Software Forge',
  description:
    'Terms of Service, Privacy Policy, Refund Policy, License Agreement and Liability Disclaimer for Software Forge products.',
};

export default function LegalPage() {
  return (
    <ArticleLayout>
      <div className={styles.content}>
        <h1 className={styles.title}>Legal</h1>
        <nav className={styles.legalNav} aria-label="Legal sections">
          <a href="#terms">Terms</a>
          <a href="#privacy">Privacy</a>
          <a href="#refund">Refund</a>
          <a href="#license">License</a>
          <a href="#liability">Liability</a>
        </nav>

        <section id="terms" className={styles.section}>
          <h2 className={styles.heading}>Terms of Service</h2>

          <p className={styles.body}>
            By purchasing, downloading, or using any product provided by Software Forge
            (&quot;Product&quot;), you agree to these Terms of Service.
          </p>

          <p className={styles.body}>
            The Product is provided as a digital software asset. You are responsible for ensuring
            compliance with applicable laws and regulations in your jurisdiction.
          </p>

          <p className={styles.body}>
            Software Forge reserves the right to modify these terms at any time. Continued use of
            the Product constitutes acceptance of the updated terms.
          </p>
        </section>

        <section id="privacy" className={styles.section}>
          <h2 className={styles.heading}>Privacy Policy</h2>

          <p className={styles.body}>
            We respect your privacy and do not sell personal data. We collect only the information
            necessary to process purchases and manage licenses.
          </p>

          <p className={styles.body}>
            Payments are securely processed via Stripe. We do not store payment card details.
          </p>

          <p className={styles.body}>
            We may store basic order information such as name, email address, transaction ID, and
            license data for operational and support purposes.
          </p>
        </section>

        <section id="refund" className={styles.section}>
          <h2 className={styles.heading}>Refund Policy</h2>

          <p className={styles.body}>
            Due to the nature of digital products, all sales are generally final. However, we may
            review refund requests on a case-by-case basis at our sole discretion.
          </p>
        </section>

        <section id="license" className={styles.section}>
          <h2 className={styles.heading}>License Agreement</h2>

          <p className={styles.body}>
            Each purchase grants a non-exclusive, non-transferable, revocable license to use the
            Product in one project unless otherwise specified.
          </p>

          <p className={styles.body}>
            You may modify the source code for your own project needs. Redistribution, resale,
            sublicensing, or sharing of the Product in original or modified form is strictly
            prohibited.
          </p>

          <p className={styles.body}>
            All intellectual property rights remain the sole property of Software Forge.
          </p>
        </section>

        <section id="liability" className={styles.section}>
          <h2 className={styles.heading}>Disclaimer &amp; Limitation of Liability</h2>

          <p className={styles.body}>
            The Product is provided &quot;as is&quot; without warranties of any kind. Software Forge
            shall not be liable for any direct, indirect, incidental, or consequential damages
            arising from the use of the Product.
          </p>
        </section>

        <section id="contact" className={styles.section}>
          <h2 className={styles.heading}>Contact</h2>

          <p className={styles.body}>
            For legal inquiries, contact us at <strong>support@software-forge.dev</strong>
          </p>
        </section>
      </div>
    </ArticleLayout>
  );
}
