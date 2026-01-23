import DocContent from '../../_components/DocContent';
import PageOutline from '../../_components/PageOutline';

export default function AfterLoginPage() {
  return (
    <DocContent
      slug="adapting/after-login"
      outline={
        <PageOutline
          items={[
            { id: 'default-behavior', label: 'Default Behavior' },
            { id: 'where-post-login-logic-lives', label: 'Where Post-Login Logic Lives' },
            { id: 'redirecting-after-login', label: 'Redirecting After Login' },
            { id: 'role-based-navigation', label: 'Role-Based Navigation' },
            { id: 'onboarding-flows', label: 'Onboarding Flows' },
            { id: 'notifications-and-side-effects', label: 'Notifications and Side Effects' },
            { id: 'what-not-to-do', label: 'What Not to Do' },
            { id: 'summary', label: 'Summary' },
          ]}
        />
      }
    />
  );
}
