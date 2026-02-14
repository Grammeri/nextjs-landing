import styles from './page.module.css';

export const metadata = {
  title: 'Legal — Software Forge',
  description:
    'Terms of Service, Privacy Policy, Refund Policy, License Agreement and Liability Disclaimer for Software Forge products.',
};

export default function LegalPage() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Legal</h1>

        {/* Anchor navigation */}
        <nav className={styles.legalNav} aria-label="Legal sections">
          <a href="#terms">Terms</a>
          <a href="#privacy">Privacy</a>
          <a href="#refund">Refund</a>
          <a href="#license">License</a>
          <a href="#liability">Liability</a>
        </nav>

        {/* Terms */}
        <section id="terms" className={styles.section}>
          <h2 className={styles.heading}>Terms of Service</h2>
          <p>
            By purchasing, downloading, or using any product provided by Software Forge
            (&quot;Product&quot;), you agree to these Terms of Service.
          </p>
          <p>
            The Product is provided as a digital software asset. You are responsible for ensuring
            compliance with applicable laws and regulations in your jurisdiction.
          </p>
          <p>
            Software Forge reserves the right to modify these terms at any time. Continued use of
            the Product constitutes acceptance of the updated terms.
          </p>
        </section>

        {/* Privacy */}
        <section id="privacy" className={styles.section}>
          <h2 className={styles.heading}>Privacy Policy</h2>
          <p>
            We respect your privacy and do not sell personal data. We collect only the information
            necessary to process purchases and manage licenses.
          </p>
          <p>Payments are securely processed via Stripe. We do not store payment card details.</p>
          <p>
            We may store basic order information such as name, email address, transaction ID, and
            license data for operational and support purposes.
          </p>
        </section>

        {/* Refund */}
        <section id="refund" className={styles.section}>
          <h2 className={styles.heading}>Refund Policy</h2>
          <p>
            Due to the nature of digital products, all sales are generally final. However, we may
            review refund requests on a case-by-case basis at our sole discretion.
          </p>
        </section>

        {/* License */}
        <section id="license" className={styles.section}>
          <h2 className={styles.heading}>License Agreement</h2>
          <p>
            Each purchase grants a non-exclusive, non-transferable, revocable license to use the
            Product in one project unless otherwise specified.
          </p>
          <p>
            You may modify the source code for your own project needs. Redistribution, resale,
            sublicensing, or sharing of the Product in original or modified form is strictly
            prohibited.
          </p>
          <p>All intellectual property rights remain the sole property of Software Forge.</p>
        </section>

        {/* Liability */}
        <section id="liability" className={styles.section}>
          <h2 className={styles.heading}>Disclaimer &amp; Limitation of Liability</h2>
          <p>
            The Product is provided &quot;as is&quot; without warranties of any kind. Software Forge
            shall not be liable for any direct, indirect, incidental, or consequential damages
            arising from the use of the Product.
          </p>
        </section>

        {/* Contact */}
        <section id="contact" className={styles.section}>
          <h2 className={styles.heading}>Contact</h2>
          <p>
            For legal inquiries, contact us at <strong>support@software-forge.dev</strong>
          </p>
        </section>
      </div>
    </main>
  );
}
