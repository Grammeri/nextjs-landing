import styles from './page.module.css';

export default function HomePage() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Test Assignment</h1>

        <p className={styles.description}>
          This project is used as a base for a technical test assignment.
          <br />
          Please follow the task requirements provided separately.
        </p>
      </div>
    </main>
  );
}
