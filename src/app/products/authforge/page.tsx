export default function AuthForgeProductPage() {
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 16px' }}>
      {/* HERO */}
      <section style={{ marginBottom: 48 }}>
        <h1 style={{ fontSize: 48, lineHeight: 1.1, marginBottom: 12 }}>AuthForge</h1>
        <p style={{ fontSize: 18, opacity: 0.8, marginBottom: 24 }}>
          Production-ready authentication boilerplate for modern SaaS products.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="#" style={buttonStylePrimary}>
            View Demo
          </a>
          <a href="#" style={buttonStyleSecondary}>
            Read Docs
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={sectionTitleStyle}>Why AuthForge</h2>
        <ul style={{ paddingLeft: 18, margin: 0, display: 'grid', gap: 10 }}>
          <li>Secure sessions (access / refresh)</li>
          <li>Role-based access control</li>
          <li>Email verification & password reset</li>
          <li>Clean, scalable architecture</li>
          <li>Ready for production</li>
        </ul>
      </section>

      {/* DEMO / PROOF */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={sectionTitleStyle}>Proof of work</h2>
        <p style={{ opacity: 0.85, marginBottom: 12 }}>
          Source code and real production-ready setup (links will be added later).
        </p>
        <a href="#" style={linkStyle}>
          View source code →
        </a>
      </section>

      {/* CTA */}
      <section style={ctaStyle}>
        <h2 style={{ margin: 0, marginBottom: 10 }}>Ready to use AuthForge in your project?</h2>
        <p style={{ margin: 0, opacity: 0.85, marginBottom: 18 }}>
          We&apos;ll add billing and onboarding later. For now — the structure is ready.
        </p>
        <button type="button" style={buttonStyleDisabled} disabled>
          Coming soon
        </button>
      </section>
    </main>
  );
}

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 22,
  marginBottom: 14,
};

const buttonBase: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px 14px',
  borderRadius: 10,
  textDecoration: 'none',
  fontWeight: 600,
  border: '1px solid transparent',
};

const buttonStylePrimary: React.CSSProperties = {
  ...buttonBase,
  background: '#111',
  color: '#fff',
};

const buttonStyleSecondary: React.CSSProperties = {
  ...buttonBase,
  background: 'transparent',
  color: '#111',
  borderColor: '#ddd',
};

const buttonStyleDisabled: React.CSSProperties = {
  ...buttonBase,
  background: '#eee',
  color: '#777',
  borderColor: '#e5e5e5',
  cursor: 'not-allowed',
};

const linkStyle: React.CSSProperties = {
  display: 'inline-block',
  textDecoration: 'none',
  fontWeight: 600,
};

const ctaStyle: React.CSSProperties = {
  padding: 20,
  borderRadius: 16,
  border: '1px solid #eee',
};
