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
 * Mapa base gris del IGN (Argenmap): neutro, sin API key y con la cartografía
 * oficial argentina (Islas Malvinas, Antártida). Encaja con el concepto
 * "Argentina neutra + pins naranjas".
 *
 * Carto Positron dejó de servir tiles fuera de localhost sin API key
 * (muestra la marca de agua "API KEY REQUIRED").
 */
export const TILE_LAYER = {
  url: 'https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/mapabase_gris@EPSG%3A3857@png/{z}/{x}/{y}.png',
  attribution:
    '<a href="https://www.ign.gob.ar/AreaServicios/Argenmap/Introduccion" target="_blank">Instituto Geográfico Nacional</a> + <a href="https://www.osm.org/copyright" target="_blank">OpenStreetMap</a>',
  /** El servicio es TMS: el eje Y está invertido respecto de XYZ. */
  tms: true,
} as const;
