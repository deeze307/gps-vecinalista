import type { ReactNode } from 'react';
import styles from './Badge.module.css';

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'outline';

export interface BadgeProps {
  tone?: BadgeTone;
  /** Muestra un punto de color al inicio (estado). */
  withDot?: boolean;
  className?: string;
  children: ReactNode;
}

export const Badge = ({ tone = 'neutral', withDot, className, children }: BadgeProps) => (
  <span className={[styles.badge, styles[tone], className].filter(Boolean).join(' ')}>
    {withDot && <span className={styles.dot} aria-hidden="true" />}
    {children}
  </span>
);
