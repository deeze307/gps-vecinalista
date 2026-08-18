/** Identificador de entidad. Hoy es un string; si el backend usa uuid/int, sólo cambia acá. */
export type ID = string;

/** Fecha en formato ISO 8601 (lo que devolvería una API REST). */
export type ISODate = string;

/** Punto geográfico. */
export interface LatLng {
  lat: number;
  lng: number;
}

/** Campos de auditoría comunes a todas las entidades. */
export interface Auditable {
  createdAt: ISODate;
  updatedAt: ISODate;
}

/** Respuesta paginada, para cuando exista el backend real. */
export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

/** Parámetros de paginación / orden que aceptan los services de listado. */
export interface QueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
}
