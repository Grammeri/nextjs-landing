import DocContent from '../_components/DocContent';
import PageOutline from '../_components/PageOutline';

export default function EnvironmentPage() {
  return (
    <DocContent
      slug="environment"
      outline={
        <PageOutline
          items={[
            { id: 'overview', label: 'Overview' },
            { id: 'required-variables', label: 'Required Variables' },
            { id: 'demo-mode-variables', label: 'Demo Mode Variables' },
            { id: 'email-configuration-production', label: 'Email Configuration (Production)' },
            { id: 'optional-variables', label: 'Optional Variables' },
            { id: 'environment-files', label: 'Environment Files' },
            { id: 'production-notes', label: 'Production Notes' },
            { id: 'summary', label: 'Summary' },
          ]}
        />
      }
    />
  );
}
