import type { ReactNode } from 'react';
import { Icon, type IconName } from '@/components/atoms';
import styles from './StateMessage.module.css';

export interface StateMessageProps {
  icon?: IconName;
  title: string;
  description?: string;
  tone?: 'neutral' | 'error';
  /** Acción de salida: reintentar, limpiar filtros, volver al mapa… */
  action?: ReactNode;
}

/** Estado vacío / de error unificado, para no inventar uno distinto por pantalla. */
export const StateMessage = ({
  icon = 'search',
  title,
  description,
  tone = 'neutral',
  action,
}: StateMessageProps) => (
  <div className={[styles.state, tone === 'error' ? styles.error : null].filter(Boolean).join(' ')}>
    <span className={styles.iconWrap}>
      <Icon name={tone === 'error' ? 'alert' : icon} size={26} />
    </span>
    <h3 className={styles.title}>{title}</h3>
    {description && <p className={styles.description}>{description}</p>}
    {action}
  </div>
);
