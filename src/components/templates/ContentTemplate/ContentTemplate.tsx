import type { ReactNode } from 'react';
import { Button } from '@/components/atoms';
import styles from './ContentTemplate.module.css';

export interface ContentTemplateProps {
  /** Línea corta arriba del título ("Ficha de ciudad", "Congreso"). */
  eyebrow?: ReactNode;
  title: string;
  description?: string;
  /** Acciones a la derecha del título. */
  actions?: ReactNode;
  backTo?: string;
  backLabel?: string;
  children: ReactNode;
}

/** Estructura común de todas las páginas de contenido del sitio público. */
export const ContentTemplate = ({
  eyebrow,
  title,
  description,
  actions,
  backTo,
  backLabel = 'Volver',
  children,
}: ContentTemplateProps) => (
  <div className={`container ${styles.page}`}>
    <header className={styles.header}>
      {backTo && (
        <Button
          as="link"
          to={backTo}
          variant="ghost"
          size="sm"
          iconLeft="arrowLeft"
          className={styles.back}
        >
          {backLabel}
        </Button>
      )}
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <div className={styles.titleRow}>
        <h1 className={styles.title}>{title}</h1>
        {actions}
      </div>
      {description && <p className={styles.description}>{description}</p>}
    </header>
    {children}
  </div>
);
