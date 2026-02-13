import styles from './page.module.css';

export const metadata = {
  title: 'Legal — Software Forge',
  description: 'Terms, Privacy Policy, Refund Policy and License Agreement',
};

export default function LegalPage() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Legal</h1>

        {/* Terms */}
        <section id="terms" className={styles.section}>
          <h2>Terms of Service</h2>
          <p>By purchasing and using our products, you agree to the terms outlined below.</p>
        </section>

        {/* Privacy */}
        <section id="privacy" className={styles.section}>
          <h2>Privacy Policy</h2>
          <p>
            We do not sell personal data. Payments are processed securely via Stripe. We only store
            necessary order and license information.
          </p>
        </section>

        {/* Refund */}
        <section id="refund" className={styles.section}>
          <h2>Refund Policy</h2>
          <p>
            You may request a refund within 14 days of purchase if the product has not been
            materially used.
          </p>
        </section>

        {/* License */}
        <section id="license" className={styles.section}>
          <h2>License Agreement</h2>
          <p>
            Each purchase grants a non-exclusive, non-transferable license to use the product in one
            project.
          </p>
        </section>

        {/* Contact */}
        <section className={styles.section}>
          <h2>Contact</h2>
          <p>
            For legal inquiries, contact us at <strong>support@software-forge.dev</strong>
          </p>
        </section>
      </div>
    </main>
  );
}
