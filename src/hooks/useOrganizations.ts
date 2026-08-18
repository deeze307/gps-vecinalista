import { organizationsService, type OrganizationFilters } from '@/services';
import { useAsync } from './useAsync';

export const useOrganizations = (filters: OrganizationFilters = {}) =>
  useAsync(() => organizationsService.getAll(filters), [filters.search, filters.cityId]);

/** Organizaciones de una ciudad. No se dispara hasta tener el id. */
export const useOrganizationsByCity = (cityId: string | undefined) =>
  useAsync(
    () => organizationsService.getByCity(cityId as string),
    [cityId],
    { skip: !cityId },
  );
