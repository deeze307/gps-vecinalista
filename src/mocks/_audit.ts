import type { Auditable } from '@/types';

/**
 * Helper para no repetir los campos de auditoría en cada registro mock.
 * Cuando exista el backend, estos campos los devuelve la API y este archivo se borra.
 */
export const audit = (
  updatedAt = '2026-08-01T12:00:00.000Z',
  createdAt = '2025-03-10T10:00:00.000Z',
): Auditable => ({ createdAt, updatedAt });

/** Tipo utilitario: la forma "cruda" de un registro, sin auditoría. */
export type Raw<T extends Auditable> = Omit<T, 'createdAt' | 'updatedAt'>;

/** Agrega auditoría a una colección cruda. */
export const withAudit = <T extends Auditable>(rows: Raw<T>[]): T[] =>
  rows.map((row) => ({ ...row, ...audit() }) as T);
