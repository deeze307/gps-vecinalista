/**
 * Punto de entrada único de la capa de datos.
 *
 * Toda la app importa desde acá (`import { citiesService } from '@/services'`).
 * Hoy cada service resuelve contra `src/mocks`; cuando exista el backend se
 * crea la versión HTTP con la misma interfaz y se cambia sólo este archivo.
 */
export { provincesService } from './provinces.service';
export { citiesService, type CityFilters } from './cities.service';
export {
  representativesService,
  type RepresentativeFilters,
  type RepresentativeWithRelations,
} from './representatives.service';
export {
  organizationsService,
  type OrganizationFilters,
  type OrganizationWithCity,
} from './organizations.service';
export { eventsService, type EventFilters, type EventWithRelations } from './events.service';
export { ApiError, isApiError } from './api/ApiError';
export { resetDb } from './db/mockDb';
