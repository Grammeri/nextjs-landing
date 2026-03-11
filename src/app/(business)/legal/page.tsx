import styles from './page.module.css';
import { PageShell, ContentSurface } from '@/shared/ui/layout';

import { ArticleLayout, ArticleTitle, ArticleSection, ArticleText } from '@/shared/ui/article';

export const metadata = {
  title: 'Legal — Software Forge',
  description:
    'Terms of Service, Privacy Policy, Refund Policy, License Agreement and Liability Disclaimer for Software Forge products.',
};

export default function LegalPage() {
  return (
    <PageShell>
      <ContentSurface>
        <ArticleLayout>
          <ArticleTitle>Legal</ArticleTitle>

          <nav className={styles.legalNav} aria-label="Legal sections">
            <a href="#terms">Terms</a>
            <a href="#privacy">Privacy</a>
            <a href="#refund">Refund</a>
            <a href="#license">License</a>
            <a href="#liability">Liability</a>
          </nav>

          <ArticleSection id="terms" title="Terms of Service">
            <ArticleText>
              By purchasing, downloading, or using any product provided by Software Forge
              (&quot;Product&quot;), you agree to these Terms of Service.
            </ArticleText>

            <ArticleText>
              The Product is provided as a digital software asset. You are responsible for ensuring
              compliance with applicable laws and regulations in your jurisdiction.
            </ArticleText>

            <ArticleText>
              Software Forge reserves the right to modify these terms at any time. Continued use of
              the Product constitutes acceptance of the updated terms.
            </ArticleText>
          </ArticleSection>

          <ArticleSection id="privacy" title="Privacy Policy">
            <ArticleText>
              We respect your privacy and do not sell personal data. We collect only the information
              necessary to process purchases and manage licenses.
            </ArticleText>

            <ArticleText>
              Payments are securely processed via Stripe. We do not store payment card details.
            </ArticleText>

            <ArticleText>
              We may store basic order information such as name, email address, transaction ID, and
              license data for operational and support purposes.
            </ArticleText>
          </ArticleSection>

          <ArticleSection id="refund" title="Refund Policy">
            <ArticleText>
              Due to the nature of digital products, all sales are generally final. However, we may
              review refund requests on a case-by-case basis at our sole discretion.
            </ArticleText>
          </ArticleSection>

          <ArticleSection id="license" title="License Agreement">
            <ArticleText>
              Each purchase grants a non-exclusive, non-transferable, revocable license to use the
              Product in one project unless otherwise specified.
            </ArticleText>

            <ArticleText>
              You may modify the source code for your own project needs. Redistribution, resale,
              sublicensing, or sharing of the Product in original or modified form is strictly
              prohibited.
            </ArticleText>

            <ArticleText>
              All intellectual property rights remain the sole property of Software Forge.
            </ArticleText>
          </ArticleSection>

          <ArticleSection id="liability" title="Disclaimer & Limitation of Liability">
            <ArticleText>
              The Product is provided &quot;as is&quot; without warranties of any kind. Software
              Forge shall not be liable for any direct, indirect, incidental, or consequential
              damages arising from the use of the Product.
            </ArticleText>
          </ArticleSection>

          <ArticleSection id="contact" title="Contact">
            <ArticleText>
              For legal inquiries, contact us at <strong>support@software-forge.dev</strong>
            </ArticleText>
          </ArticleSection>
        </ArticleLayout>
      </ContentSurface>
    </PageShell>
  );
}
