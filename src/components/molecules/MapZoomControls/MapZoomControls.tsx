import { Icon } from '@/components/atoms';
import styles from './MapZoomControls.module.css';

export interface MapZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  /** Botón "cerca mío". Si no se pasa, no se muestra. */
  onLocate?: () => void;
  isLocating?: boolean;
}

/**
 * Controles propios en lugar de los de Leaflet: targets de 44px, pensados
 * para el pulgar en un celular.
 */
export const MapZoomControls = ({
  onZoomIn,
  onZoomOut,
  onReset,
  onLocate,
  isLocating,
}: MapZoomControlsProps) => (
  <div className={styles.controls}>
    {onLocate && (
      <button
        type="button"
        className={[styles.button, styles.locate].join(' ')}
        onClick={onLocate}
        disabled={isLocating}
        aria-label="Encontrar referentes cerca mío"
        title="Referentes cerca mío"
      >
        <Icon name="target" />
      </button>
    )}
    <button
      type="button"
      className={styles.button}
      onClick={onReset}
      aria-label="Ver todo el país"
      title="Ver todo el país"
    >
      <Icon name="map" />
    </button>
    <button type="button" className={styles.button} onClick={onZoomIn} aria-label="Acercar">
      <Icon name="plus" />
    </button>
    <button type="button" className={styles.button} onClick={onZoomOut} aria-label="Alejar">
      <Icon name="minus" />
    </button>
  </div>
);
