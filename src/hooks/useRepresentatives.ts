import { representativesService, type RepresentativeFilters } from '@/services';
import { useAsync } from './useAsync';

export const useRepresentatives = (filters: RepresentativeFilters = {}) =>
  useAsync(
    () => representativesService.getAll(filters),
    [
      filters.search,
      filters.cityId,
      filters.provinceId,
      filters.scope,
      filters.includeInactive,
    ],
  );

export const useRepresentative = (slug: string | undefined) =>
  useAsync(
    () => representativesService.getBySlug(slug as string),
    [slug],
    { skip: !slug },
  );

export const useRepresentativeById = (id: string | undefined) =>
  useAsync(
    () => representativesService.getById(id as string),
    [id],
    { skip: !id },
  );
