import DocContent from '../../_components/DocContent';
import PageOutline from '../../_components/PageOutline';

export default function EmailAdaptingPage() {
  return (
    <DocContent
      slug="adapting/email"
      outline={
        <PageOutline
          items={[
            { id: 'purpose', label: 'Purpose' },
            { id: 'demo-mode-behavior', label: 'Demo Mode Behavior' },
            { id: 'production-email-delivery', label: 'Production Email Delivery' },
            { id: 'supported-providers', label: 'Supported Providers' },
            { id: 'configuration-overview', label: 'Configuration Overview' },
            { id: 'integration-principles', label: 'Integration Principles' },
            { id: 'customizing-email-content', label: 'Customizing Email Content' },
            { id: 'error-handling', label: 'Error Handling' },
            { id: 'security-considerations', label: 'Security Considerations' },
            { id: 'summary', label: 'Summary' },
          ]}
        />
      }
    />
  );
}
