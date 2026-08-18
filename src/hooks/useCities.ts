import { citiesService, type CityFilters } from '@/services';
import type { CityWithDistance, CityWithRelations, LatLng } from '@/types';
import { useAsync, type AsyncState } from './useAsync';

/** Listado de ciudades con provincia y referentes ya resueltos. */
export const useCities = (
  filters: CityFilters = {},
): AsyncState<CityWithRelations[]> & { refetch: () => void } =>
  useAsync(
    () => citiesService.getAll(filters),
    [filters.search, filters.provinceId, filters.onlyWithRepresentatives],
  );

/** Ficha de una ciudad por slug (`/ciudades/cordoba`). */
export const useCity = (slug: string | undefined) =>
  useAsync(
    () => citiesService.getBySlug(slug as string),
    [slug],
    { skip: !slug },
  );

/** Contadores del hero: ciudades, referentes y provincias con presencia. */
export const useNetworkStats = () => useAsync(() => citiesService.getStats(), []);

/** "Referentes cerca mío": se dispara sólo cuando ya hay posición. */
export const useNearbyCities = (
  origin: LatLng | null,
  limit = 5,
): AsyncState<CityWithDistance[]> & { refetch: () => void } =>
  useAsync(
    () => citiesService.getNearby(origin as LatLng, limit),
    [origin?.lat, origin?.lng, limit],
    { skip: !origin },
  );
