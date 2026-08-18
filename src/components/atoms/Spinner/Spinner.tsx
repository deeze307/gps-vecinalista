import styles from './Spinner.module.css';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  /** Texto visible al lado del spinner. Siempre se anuncia por accesibilidad. */
  label?: string;
  centered?: boolean;
}

export const Spinner = ({ size = 'md', label = 'Cargando…', centered }: SpinnerProps) => (
  <div className={centered ? styles.centered : undefined}>
    <span className={styles.wrapper} role="status" aria-live="polite">
      <span className={[styles.spinner, styles[size]].join(' ')} />
      {label && <span>{label}</span>}
    </span>
  </div>
);
