import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.css';

export interface CardProps extends HTMLAttributes<HTMLElement> {
  /** Elemento a renderizar: `article` por defecto, `button` si es clickeable. */
  as?: ElementType;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  elevated?: boolean;
  interactive?: boolean;
  selected?: boolean;
  children: ReactNode;
}

/** Contenedor base de contenido. Todo lo que es "una tarjeta" pasa por acá. */
export const Card = ({
  as: Component = 'article',
  padding = 'md',
  elevated,
  interactive,
  selected,
  className,
  children,
  ...rest
}: CardProps) => (
  <Component
    className={[
      styles.card,
      styles[padding],
      elevated ? styles.elevated : null,
      interactive ? styles.interactive : null,
      selected ? styles.selected : null,
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...rest}
  >
    {children}
  </Component>
);
