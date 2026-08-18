import { eventsService, type EventFilters } from '@/services';
import { useAsync } from './useAsync';

export const useEvents = (filters: EventFilters = {}) =>
  useAsync(() => eventsService.getAll(filters), [filters.upcomingOnly, filters.cityId]);

/** Próximo congreso destacado — portada del "modo congreso". */
export const useFeaturedCongress = () =>
  useAsync(() => eventsService.getFeaturedCongress(), []);
