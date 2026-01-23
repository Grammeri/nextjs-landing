import DocContent from '../_components/DocContent';
import PageOutline from '../_components/PageOutline';

export default function DemoModePage() {
  return (
    <DocContent
      slug="demo-mode"
      outline={
        <PageOutline
          items={[
            { id: 'purpose-of-demo-mode', label: 'Purpose of Demo Mode' },
            { id: 'what-demo-mode-is', label: 'What Demo Mode Is' },
            { id: 'what-changes-in-demo-mode', label: 'What Changes in Demo Mode' },
            { id: 'what-does-not-change', label: 'What Does NOT Change' },
            { id: 'configuration', label: 'Configuration' },
            { id: 'security-considerations', label: 'Security Considerations' },
            { id: 'deployment-guidance', label: 'Deployment Guidance' },
            { id: 'summary', label: 'Summary' },
          ]}
        />
      }
    />
  );
}
