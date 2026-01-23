import DocContent from '../_components/DocContent';
import PageOutline from '../_components/PageOutline';

export default function GettingStartedPage() {
  return (
    <DocContent
      slug="getting-started"
      outline={
        <PageOutline
          items={[
            { id: 'what-is-authforge', label: 'What is AuthForge' },
            { id: 'requirements', label: 'Requirements' },
            { id: 'installation', label: 'Installation' },
            { id: 'docker-setup', label: 'Docker Setup' },
            { id: 'database-prisma', label: 'Database & Prisma' },
            { id: 'environment-variables', label: 'Environment Variables' },
            { id: 'running-locally', label: 'Running Locally' },
            { id: 'first-login-demo-mode', label: 'First Login (Demo Mode)' },
            { id: 'whats-next', label: 'What’s Next' },
          ]}
        />
      }
    />
  );
}
