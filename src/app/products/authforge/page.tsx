import { ProductCTA, ProductHero, ProductSection } from '@/shared/ui/product';

export default function AuthForgeProductPage() {
  return (
    <main>
      <ProductHero
        title="AuthForge"
        subtitle="Production-ready authentication system for modern SaaS products."
        primaryAction={<a href="#">View Demo</a>}
        secondaryAction={<a href="#">Read Docs</a>}
      />

      <ProductSection title="Who is AuthForge for">
        <ul>
          <li>SaaS founders who don’t want to build authentication from scratch</li>
          <li>Developers shipping MVPs and production apps</li>
          <li>Teams that need a real-world auth reference</li>
          <li>Engineers learning modern authentication architecture</li>
        </ul>
      </ProductSection>

      <ProductSection title="What’s included">
        <h3>Authentication</h3>
        <ul>
          <li>Email &amp; password authentication</li>
          <li>Email verification</li>
          <li>Password reset flows</li>
        </ul>

        <h3>Sessions &amp; Security</h3>
        <ul>
          <li>Access and refresh sessions</li>
          <li>HttpOnly cookies</li>
          <li>Secure session handling</li>
        </ul>

        <h3>Architecture</h3>
        <ul>
          <li>Clean and scalable structure</li>
          <li>Prisma + PostgreSQL</li>
          <li>Production-ready setup</li>
        </ul>
      </ProductSection>

      <ProductSection title="How it works">
        <ol>
          <li>Clone the repository</li>
          <li>Configure environment variables</li>
          <li>Connect your database</li>
          <li>Run migrations</li>
          <li>Start building your product</li>
        </ol>
      </ProductSection>

      <ProductSection title="Try before you buy">
        <p>
          Before purchasing, you can explore the code, review the documentation, and see the
          authentication flows in action.
        </p>
        <ul>
          <li>Live demo</li>
          <li>Full documentation</li>
          <li>Architecture overview</li>
        </ul>
      </ProductSection>

      <ProductSection title="Built for real production use">
        <p>
          AuthForge is not a toy example. It is built using the same patterns and constraints found
          in real-world SaaS products.
        </p>
      </ProductSection>

      <ProductCTA
        title="Ready to build with AuthForge?"
        description="AuthForge will be available as a one-time purchase with lifetime access."
        actions={<a href="#">Coming soon</a>}
      />
    </main>
  );
}
