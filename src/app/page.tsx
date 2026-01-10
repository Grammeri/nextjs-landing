import styles from './page.module.css';

export default function HomePage() {
  return (
    <main>
      <section className={`${styles.container} ${styles.hero}`}>
        <h1>Build reliable products faster</h1>
        <p>A clean foundation for SaaS and web platforms.</p>
      </section>
    </main>
  );
}
