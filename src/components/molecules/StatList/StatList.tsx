import { formatNumber } from '@/utils';
import styles from './StatList.module.css';

export interface Stat {
  value: number;
  label: string;
}

export interface StatListProps {
  stats: Stat[];
  /** Sobre fondo claro invierte los colores de las píldoras. */
  onLight?: boolean;
}

/** "36 ciudades · 41 referentes · 24 provincias" del hero. */
export const StatList = ({ stats, onLight }: StatListProps) => (
  <ul className={[styles.list, onLight ? styles.onLight : null].filter(Boolean).join(' ')}>
    {stats.map((stat) => (
      <li key={stat.label} className={styles.stat}>
        <span className={styles.value}>{formatNumber(stat.value)}</span>
        <span className={styles.label}>{stat.label}</span>
      </li>
    ))}
  </ul>
);
