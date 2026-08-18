import type { Auditable, ID } from './common';

export interface Province extends Auditable {
  id: ID;
  /** Slug para URLs: /provincias/cordoba */
  slug: string;
  name: string;
  /** Código ISO 3166-2:AR (ej: AR-X para Córdoba). */
  isoCode: string;
  region: Region;
}

export const REGIONS = [
  'NOA',
  'NEA',
  'Cuyo',
  'Centro',
  'Patagonia',
  'Buenos Aires',
] as const;

export type Region = (typeof REGIONS)[number];
