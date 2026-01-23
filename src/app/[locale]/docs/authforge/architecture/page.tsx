import DocContent from '../_components/DocContent';
import PageOutline from '../_components/PageOutline';

export default function ArchitecturePage() {
  return (
    <DocContent
      slug="architecture"
      outline={
        <PageOutline
          items={[
            { id: 'purpose-of-this-document', label: 'Purpose of This Document' },
            { id: 'architectural-approach', label: 'Architectural Approach' },
            { id: 'high-level-structure', label: 'High-Level Structure' },
            { id: 'authentication-domain', label: 'Authentication Domain' },
            { id: 'api-layer', label: 'API Layer' },
            { id: 'ui-layer', label: 'UI Layer' },
            { id: 'session-and-security-policy', label: 'Session and Security Policy' },
            { id: 'database-layer', label: 'Database Layer' },
            { id: 'extension-points', label: 'Extension Points' },
            { id: 'summary', label: 'Summary' },
          ]}
        />
      }
    />
  );
}
