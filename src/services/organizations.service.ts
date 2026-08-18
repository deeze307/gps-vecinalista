import type { City, ID, Organization } from '@/types';
import { matches } from '@/utils';
import { ApiError } from './api/ApiError';
import { mockResponse } from './api/mockClient';
import { db } from './db/mockDb';

export interface OrganizationWithCity extends Organization {
  city?: City;
}

const withCity = (org: Organization): OrganizationWithCity => ({
  ...org,
  city: db.cities.find((c) => c.id === org.cityId),
});

export interface OrganizationFilters {
  search?: string;
  cityId?: ID;
}

export const organizationsService = {
  /** GET /organizaciones */
  async getAll(filters: OrganizationFilters = {}): Promise<OrganizationWithCity[]> {
    return mockResponse(() =>
      db.organizations
        .filter((org) => {
          if (filters.cityId && org.cityId !== filters.cityId) return false;
          if (filters.search && !matches(org.name, filters.search)) return false;
          return true;
        })
        .sort((a, b) => a.name.localeCompare(b.name, 'es'))
        .map(withCity),
    );
  },

  /** GET /ciudades/:id/organizaciones */
  async getByCity(cityId: ID): Promise<OrganizationWithCity[]> {
    return organizationsService.getAll({ cityId });
  },

  /** GET /organizaciones/:slug */
  async getBySlug(slug: string): Promise<OrganizationWithCity> {
    return mockResponse(() => {
      const org = db.organizations.find((o) => o.slug === slug);
      if (!org) throw ApiError.notFound('la organización', slug);
      return withCity(org);
    });
  },
};
