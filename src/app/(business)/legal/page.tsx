import LegalNav from './LegalNav';
import { PageShell, ContentSurface } from '@/shared/ui/layout';
import { ArticleLayout, ArticleTitle, ArticleSection, ArticleText } from '@/shared/ui/article';

import {
  LEGAL_PAGE_TITLE,
  LEGAL_PAGE_DESCRIPTION,
  LEGAL_SECTIONS,
  LEGAL_CONTACT,
} from '@/shared/config/legal';

export const metadata = {
  title: `${LEGAL_PAGE_TITLE} — Software Forge`,
  description: LEGAL_PAGE_DESCRIPTION,
};

export default function LegalPage() {
  return (
    <PageShell>
      <ContentSurface>
        <ArticleLayout>
          <ArticleTitle>{LEGAL_PAGE_TITLE}</ArticleTitle>

          <LegalNav />

          {LEGAL_SECTIONS.map((section) => (
            <ArticleSection key={section.id} anchorId={section.id} title={section.title}>
              {section.paragraphs.map((paragraph, i) => (
                <ArticleText key={i}>{paragraph}</ArticleText>
              ))}
            </ArticleSection>
          ))}

          <ArticleSection anchorId="contact" title="Contact">
            <ArticleText>
              Seller: <strong>{LEGAL_CONTACT.seller}</strong>
            </ArticleText>

            <ArticleText>
              Brand: <strong>{LEGAL_CONTACT.brand}</strong>
            </ArticleText>

            <ArticleText>
              Mailing Address: <strong>{LEGAL_CONTACT.mailingAddress}</strong>
            </ArticleText>

            <ArticleText>
              Governing Law: <strong>{LEGAL_CONTACT.governingLaw}</strong>
            </ArticleText>

            <ArticleText>
              For legal, privacy, licensing, or compliance inquiries, contact us at{' '}
              <strong>{LEGAL_CONTACT.supportEmail}</strong>
            </ArticleText>
          </ArticleSection>
        </ArticleLayout>
      </ContentSurface>
    </PageShell>
  );
}
