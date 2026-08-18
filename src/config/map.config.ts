import type { LatLngBoundsExpression, LatLngExpression } from 'leaflet';

/** Centro aproximado del país (sin contar Antártida). */
export const ARGENTINA_CENTER: LatLngExpression = [-38.5, -63.6];

/** Límites para que el usuario no se pierda arrastrando el mapa. */
export const ARGENTINA_BOUNDS: LatLngBoundsExpression = [
  [-56.0, -74.5],
  [-21.0, -52.5],
];

export const MAP_ZOOM = {
  initial: 4,
  min: 3,
  max: 14,
  /** Zoom al que se hace fly cuando se selecciona una ciudad. */
  city: 10,
} as const;

/**
 * Tiles claros y neutros (Carto Positron): la idea del concepto es
 * "Argentina neutra + pins naranjas".
 */
export const TILE_LAYER = {
  url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
} as const;
