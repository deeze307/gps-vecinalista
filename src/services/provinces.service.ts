import type { ID, Province } from '@/types';
import { matches } from '@/utils';
import { ApiError } from './api/ApiError';
import { mockResponse } from './api/mockClient';
import { db } from './db/mockDb';

const byName = (a: Province, b: Province) => a.name.localeCompare(b.name, 'es');

export const provincesService = {
  /** GET /provincias */
  async getAll(search?: string): Promise<Province[]> {
    return mockResponse(() => {
      const rows = search ? db.provinces.filter((p) => matches(p.name, search)) : db.provinces;
      return [...rows].sort(byName);
    });
  },

  /** GET /provincias/:id */
  async getById(id: ID): Promise<Province> {
    return mockResponse(() => {
      const found = db.provinces.find((p) => p.id === id);
      if (!found) throw ApiError.notFound('la provincia', id);
      return found;
    });
  },

  /** GET /provincias/:slug */
  async getBySlug(slug: string): Promise<Province> {
    return mockResponse(() => {
      const found = db.provinces.find((p) => p.slug === slug);
      if (!found) throw ApiError.notFound('la provincia', slug);
      return found;
    });
  },
};
