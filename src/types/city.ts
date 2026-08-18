import type { Auditable, ID, LatLng } from './common';
import type { Province } from './province';
import type { Representative } from './representative';

export interface City extends Auditable {
  id: ID;
  /** Slug para URLs: /ciudades/cordoba */
  slug: string;
  name: string;
  provinceId: ID;
  coordinates: LatLng;
  /** Población aproximada — se usa para priorizar pins al alejar el zoom. */
  population?: number;
  /** Marca las ciudades cabecera de la red (sede de congreso, capitales, etc.). */
  isCapital?: boolean;
}

/**
 * City con sus relaciones resueltas.
 * Los services de lectura devuelven esta forma para que la UI no tenga que
 * cruzar colecciones a mano (rol que en el futuro cumplirá un `include` del backend).
 */
export interface CityWithRelations extends City {
  province: Province;
  representatives: Representative[];
}

/** City + distancia calculada respecto de una posición del usuario. */
export interface CityWithDistance extends CityWithRelations {
  /** Distancia en kilómetros. */
  distanceKm: number;
}
