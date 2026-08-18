import { divIcon, type DivIcon } from 'leaflet';
import styles from './ArgentinaMap.module.css';

/**
 * Pin naranja de la marca, hecho con `divIcon` en lugar de una imagen:
 * se estila con los tokens CSS y puede mostrar la cantidad de referentes.
 */
export const cityPinIcon = (count: number, selected: boolean): DivIcon => {
  const size = count > 1 ? 32 : 26;
  const classNames = [
    styles.pin,
    count > 1 ? styles.pinLarge : '',
    selected ? styles.pinSelected : '',
  ]
    .filter(Boolean)
    .join(' ');

  return divIcon({
    className: styles.pinIcon ?? '',
    html: `<span class="${classNames}"><span class="${styles.pinCount}">${
      count > 1 ? count : ''
    }</span></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    tooltipAnchor: [0, -size + 4],
  });
};

/** Punto azul de "estás acá". */
export const userLocationIcon = (): DivIcon =>
  divIcon({
    className: styles.pinIcon ?? '',
    html: `<span class="${styles.userDot}"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
