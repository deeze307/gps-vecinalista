import type { ReactNode } from 'react';
import styles from './MapExplorerTemplate.module.css';

export interface MapExplorerTemplateProps {
  map: ReactNode;
  panel: ReactNode;
}

/**
 * Layout del explorador.
 * En celular el mapa ocupa la parte de arriba y el panel se apoya encima como
 * una hoja inferior; en desktop pasa a ser mapa + columna derecha.
 */
export const MapExplorerTemplate = ({ map, panel }: MapExplorerTemplateProps) => (
  <div className={styles.explorer}>
    <div className={styles.mapArea}>{map}</div>
    <div className={styles.panelArea}>
      <span className={styles.grabber} aria-hidden="true" />
      <div className={styles.panelBody}>{panel}</div>
    </div>
  </div>
);
