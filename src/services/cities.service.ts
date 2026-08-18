import type {
  City,
  CityWithDistance,
  CityWithRelations,
  ID,
  LatLng,
  Representative,
} from '@/types';
import { distanceInKm, matches } from '@/utils';
import { ApiError } from './api/ApiError';
import { mockResponse } from './api/mockClient';
import { db } from './db/mockDb';

/**
 * Resuelve las relaciones de una ciudad.
 * Es el equivalente en memoria del `include`/`join` que hará el backend.
 */
const withRelations = (city: City): CityWithRelations => {
  const province = db.provinces.find((p) => p.id === city.provinceId);
  if (!province) {
    throw new ApiError(500, `Datos inconsistentes: la ciudad "${city.slug}" no tiene provincia.`);
  }
  const representatives = db.representatives
    .filter((r) => r.cityId === city.id && r.isActive)
    .sort(byScope);

  return { ...city, province, representatives };
};

/** Nacional primero, después provincial, después local. */
const SCOPE_ORDER: Record<Representative['scope'], number> = {
  nacional: 0,
  provincial: 1,
  local: 2,
};

const byScope = (a: Representative, b: Representative) =>
  SCOPE_ORDER[a.scope] - SCOPE_ORDER[b.scope] ||
  a.lastName.localeCompare(b.lastName, 'es');

const byCityName = (a: City, b: City) => a.name.localeCompare(b.name, 'es');

export interface CityFilters {
  search?: string;
  provinceId?: ID;
  /** Sólo ciudades que hoy tienen al menos un referente activo. */
  onlyWithRepresentatives?: boolean;
}

export const citiesService = {
  /** GET /ciudades — con provincia y referentes ya resueltos. */
  async getAll(filters: CityFilters = {}): Promise<CityWithRelations[]> {
    return mockResponse(() => {
      const { search, provinceId, onlyWithRepresentatives } = filters;

      const provinceNameOf = (city: City): string =>
        db.provinces.find((p) => p.id === city.provinceId)?.name ?? '';

      return db.cities
        .filter((city) => {
          if (provinceId && city.provinceId !== provinceId) return false;
          if (search && !matches(city.name, search) && !matches(provinceNameOf(city), search)) {
            return false;
          }
          return true;
        })
        .sort(byCityName)
        .map(withRelations)
        .filter((city) => !onlyWithRepresentatives || city.representatives.length > 0);
    });
  },

  /** GET /ciudades/:slug — la ficha de ciudad del concepto. */
  async getBySlug(slug: string): Promise<CityWithRelations> {
    return mockResponse(() => {
      const city = db.cities.find((c) => c.slug === slug);
      if (!city) throw ApiError.notFound('la ciudad', slug);
      return withRelations(city);
    });
  },

  /** GET /ciudades/:id */
  async getById(id: ID): Promise<CityWithRelations> {
    return mockResponse(() => {
      const city = db.cities.find((c) => c.id === id);
      if (!city) throw ApiError.notFound('la ciudad', id);
      return withRelations(city);
    });
  },

  /** GET /provincias/:id/ciudades */
  async getByProvince(provinceId: ID): Promise<CityWithRelations[]> {
    return citiesService.getAll({ provinceId });
  },

  /**
   * GET /ciudades/cercanas?lat=&lng=
   * Alimenta el "Encontrar referentes cerca mío".
   */
  async getNearby(origin: LatLng, limit = 5, maxKm = 600): Promise<CityWithDistance[]> {
    return mockResponse(() =>
      db.cities
        .map((city) => ({
          ...withRelations(city),
          distanceKm: distanceInKm(origin, city.coordinates),
        }))
        .filter((city) => city.representatives.length > 0 && city.distanceKm <= maxKm)
        .sort((a, b) => a.distanceKm - b.distanceKm)
        .slice(0, limit),
    );
  },

  /** GET /ciudades/estadisticas — los contadores del hero. */
  async getStats(): Promise<{ cities: number; representatives: number; provinces: number }> {
    return mockResponse(() => {
      const active = db.representatives.filter((r) => r.isActive);
      const cityIds = new Set(active.map((r) => r.cityId));
      const provinceIds = new Set(
        db.cities.filter((c) => cityIds.has(c.id)).map((c) => c.provinceId),
      );
      return {
        cities: cityIds.size,
        representatives: active.length,
        provinces: provinceIds.size,
      };
    });
  },
};

/** Reexport para tests y para services que necesitan el mismo criterio de orden. */
export const sortRepresentativesByScope = byScope;
